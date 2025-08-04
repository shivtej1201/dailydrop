const forgotPasswordTemplate = ({ name, otp }) => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.5;">
      <p>Dear ${name},</p>
      <p>We received a request to reset your password for your Dailydrop account.</p>
      <p>Please use the following OTP (One-Time Password) to reset your password:</p>
      
      <div style="font-size: 24px; font-weight: bold; 
                  background-color: #f2f2f2; 
                  padding: 10px 20px; 
                  display: inline-block; 
                  border-radius: 5px; 
                  margin: 10px 0;">
        ${otp}
      </div>
      
      <p>This OTP is valid for 10 minutes. Please do not share it with anyone.</p>
      <p>If you did not request a password reset, you can safely ignore this email.</p>
      
      <p>Thanks,<br/>The Dailydrop Team</p>
    </div>
  `;
};

export default forgotPasswordTemplate;
