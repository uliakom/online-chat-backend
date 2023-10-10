const bcrypt = require("bcrypt");
const User = require('../models/user.js');
const jwt = require("jsonwebtoken");


const {
   controllerWrapper,
 RequestError,
  generateTokens,
  sendEmail,
  sendVerificationCode,
  getRandomInteger
} = require("../helpers");


const register = async (req, res, next) => {
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  const email = user.email;

  const currentUser = await User.findOne({ email });
  if (currentUser !== null && currentUser.verify) {
    throw RequestError(409, "Provided email already exists");
  }
  if (currentUser && !currentUser.verify) {
    throw RequestError(403, "User needs to complete verification");
  }

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

  if (!user) throw RequestError(404, "Not found");

  if (user.verify || verificationCode !== Number(user.verificationCode)) {
    throw RequestError(400, "Code is wrong");
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
