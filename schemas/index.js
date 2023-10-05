const {
  verifySchema,
  passwordResetSchema,
  resendVerifySchema,
} = require("./auth/verify");

const { registerSchema, loginSchema, refreshSchema } = require("./auth/auth");

const messageSchema = require("./chat/message");

module.exports = {
  registerSchema,
  loginSchema,
  refreshSchema,
  verifySchema,
  resendVerifySchema,
  passwordResetSchema,

 messageSchema
};