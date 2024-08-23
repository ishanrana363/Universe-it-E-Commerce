const nodemailer = require("nodemailer");
require("dotenv").config();

const smtpEmail = process.env.SMT_MAIL;
const smtpPassword = process.env.SMT_PASSWORD;

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
        user: smtpEmail, 
        pass: smtpPassword,
    },
});

const sendMail = async (data) => {


    let mailOptions = {
        from: smtpEmail,
        to: data.email, 
        subject: data.subject || 'No Subject', 
        html: data.html || '<p>No content provided</p>', 
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendMail;
