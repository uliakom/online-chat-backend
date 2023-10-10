const jwt = require("jsonwebtoken");

const { SECRET_KEY, REFRECH_SECRET_KEY } = process.env;


const generateTokens = (id) => {
  const payload = { id };

  const accessToken = jwt.sign(payload, SECRET_KEY, {
    expiresIn: "12h",
  });
  const refreshToken = jwt.sign(payload, REFRECH_SECRET_KEY, {
    expiresIn: "24h",
  });

  return { token: accessToken, refreshToken };
};

module.exports = generateTokens;