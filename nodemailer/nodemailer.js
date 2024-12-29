const nodemailer = require("nodemailer")

// Load enviornment variables
require("dotenv").config();


const sendMail = async (email, subject, message) => {
    const tranporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.PASS_USER
        }
    });

    const mailOption = {
        from: email,
        to: process.env.EMAIL_USER,
        subject,
        text: message
    }

    // send email
    try {
        await tranporter.sendMail(mailOption)
        console.log("Mail sent to", process.env.EMAIL_USER)
    } catch (error) {
        console.log("Error send message", error.message);
    }
}

module.exports = sendMail

