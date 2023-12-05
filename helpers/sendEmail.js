const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const sender = process.env.SENDGRID_FROM;

const sendEmail = async (data) => {
  try {
    const email = {
      ...data,
      from: sender,
    };

    await sgMail.send(email);
    return true;
  } catch (error) {
    console.error(error);
    if (error.response) {
      console.error(error.response.body);
    }
  }
};


module.exports = sendEmail;
