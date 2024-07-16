const nodeMailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
//const express = require('express');
//const app = express();
//require('dotenv').config();
const sendEmail = async (options) => {
    console.log('SMTP Host:', process.env.SMPT_HOST);
    console.log('SMTP Port:', process.env.SMPT_PORT);
    console.log('SMTP Mail:', process.env.SMPT_MAIL);
    console.log('SMTP App Password:', process.env.SMPT_APP_PASS);
    const transporter = nodeMailer.createTransport({
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        secure: true, // Use SSL
        auth: {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_APP_PASS,
        },
        authMethod: 'LOGIN', // Specify the authentication method
    });

    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.to,
        subject: options.subject,
        html: options.message,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;