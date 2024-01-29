const { SECRET_KEY } = process.env;
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { RequestError } = require("../helpers");
const HttpError = require("../helpers/httpError");

const authenticate = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer = "", token = ""] = authorization.split(" ");
    if (bearer !== "Bearer") {
      throw new HttpError(401);
    }
    try {
      const { id } = jwt.verify(token, SECRET_KEY);
      const user = await User.findById(id);
      if (!user || !user.token) {
        throw new HttpError(401, "Unauthorize");
      }
      req.user = user;
      next();
    } catch (error) {
      throw new HttpError(401, error.message);
    }
  } catch (error) {
    next(error);
  }
};
module.exports = authenticate;