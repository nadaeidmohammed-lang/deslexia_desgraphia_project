"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailMock = void 0;
const nodemailer = require("nodemailer");
const sendEmailMock = async (email, otp) => {
    console.log('=================================');
    console.log('[MOCK EMAIL SERVICE]');
    console.log(`To: ${email}`);
    console.log('Subject: Password Reset Request');
    console.log(`🔑 YOUR OTP IS: ${otp}`);
    console.log('=================================');
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'OTP Verification',
        html: `
      <h2>Email Verification</h2>
      <p>Your OTP code is:</p>
      <h1>${otp}</h1>
      <p>This code will expire soon.</p>
    `,
    });
    return true;
};
exports.sendEmailMock = sendEmailMock;
//# sourceMappingURL=sendEmail.js.map