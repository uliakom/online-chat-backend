const express = require("express");
const router = express.Router();

const { authenticate, validateBody } = require("../middlewares");

const {
  loginSchema,
  refreshSchema,
  registerSchema,
  verifySchema,
  resendVerifySchema,
  passwordResetSchema,
} = require("../schemas");

const { authController } = require("../controllers");

const jsonParser = express.json();

router.post(
  "/register",
  jsonParser,
  validateBody(registerSchema),
  authController.register
);


router.post(
  "/verify",
  jsonParser,
  validateBody(verifySchema),
  authController.verify
);

router.post(
  "/login",
  jsonParser,
  validateBody(loginSchema),
  authController.login
);

router.get("/logout",authenticate, authController.logout);

module.exports = router;