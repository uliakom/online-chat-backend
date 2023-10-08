const RequestError = require("../RequesrError");
const sendEmail = require("./sendEmail");

const sendVerificationCode = async (to, verificationCode) => {
  try {
    await sendEmail({
      to,
      subject: "Email verification",
        html: `<h2>You're on your way!<br>Let's confirm your email address.</h2>
      <p>Code: ${verificationCode}</p`,
    });

    return true;
  } catch (error) {
    throw  RequestError (500, "Email sending failed");
  }
};

module.exports = sendVerificationCode;
