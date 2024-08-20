const nodemailer = require("nodemailer");
require("dotenv").config();

const smtpEmail = process.env.SMT_MAIL;
const smtpPassword = process.env.SMT_PASSWORD;

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for other ports
    auth: {
        user: smtpEmail, // Using the environment variable
        pass: smtpPassword,
    },
});

const sendMail = async (data) => {
    // Log data to check the contents
    console.log('Sending email with the following data:', data);

    let mailOptions = {
        from: smtpEmail,
        to: data.email, // Recipient's email address
        subject: data.subject || 'No Subject', // Default subject if none provided
        html: data.html || '<p>No content provided</p>', // Default HTML content if none provided
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendMail;
