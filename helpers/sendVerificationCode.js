const HttpError = require("../helpers/httpError");
const sendEmail = require("./sendEmail");

const sendVerificationCode = async (to, verificationCode) => {
  try {
    await sendEmail({
      to,
      subject: "Email verification",
        html: `<h2>You're on your way!<br>Let's confirm your email address.</h2>
      <p>Code: ${verificationCode}</p`,
    });

    return { statusCode: 200 };
  } catch (error) {
     console.error(error.response.body);
    throw new HttpError (500, "Email sending failed");
  }
};

module.exports = sendVerificationCode;
