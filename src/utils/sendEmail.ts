export const sendEmailMock = async (email: string, otp: string) => {
    console.log('======================================');
    console.log(`📧 [MOCK EMAIL SERVICE]`);
    console.log(`To: ${email}`);
    console.log(`Subject: Password Reset Request`);
    console.log(`🔑 YOUR OTP IS: ${otp}`);
    console.log('======================================');
    return true;
  };