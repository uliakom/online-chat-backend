const bcrypt = require("bcrypt");
const User = require('../models/user.js');
const jwt = require("jsonwebtoken");


const {
   controllerWrapper,
  HttpError,
  generateTokens,
  sendEmail,
  sendVerificationCode,
  getRandomInteger
} = require("../helpers");


const register = async (req, res, next) => {
  const user = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };
  const email = user.email;

  const currentUser = await User.findOne({ email });
  if (currentUser !== null && currentUser.verify) {
    throw new HttpError(500, "Provided email already exists");
  }
  // if (currentUser && !currentUser.verify) {
  //   throw new HttpError(403, "User needs to complete verification");
  // }

  user.password = await bcrypt.hash(user.password, 10);
  const verificationCode = getRandomInteger();

  await User.create({ ...user, verificationCode });

  await sendVerificationCode(email, verificationCode);

  res.status(201).json({
    user: { email },
    message: "Verify code sent to email",
  });
};

const verify = async (req, res, next) => {
  const { email, verificationCode } = req.body;

  const user = await User.findOne({ email });

  if (!user) throw new HttpError(404, "Not found");

  if (user.verify || verificationCode !== Number(user.verificationCode)) {
    throw new HttpError(400, "Code is wrong");
  }

  const { _id: id } = user;
  const { token, refreshToken } = generateTokens(id);

  await User.findByIdAndUpdate(id, {
    token,
    refreshToken,
    verify: true,
    verificationCode: "",
  });

  return res.json({ token, refreshToken, user: { name: user.name, email } });
};


module.exports = {
  register: controllerWrapper(register),
  verify: controllerWrapper(verify)
}