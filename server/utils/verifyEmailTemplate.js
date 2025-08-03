const verifyEmailTemplate = ({ name, url }) => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.5;">
      <p>Dear ${name},</p>
      <p>Thank you for registering with Dailydrop!</p>
      <p>Please verify your email by clicking the button below:</p>
      <a href="${url}" 
         style="display:inline-block;padding:10px 20px;background-color:#007BFF;
         color:white;text-decoration:none;border-radius:5px;margin-top:10px;">
         Verify Email
      </a>
      <p>If you did not sign up, you can ignore this email.</p>
    </div>
  `;
};

export default verifyEmailTemplate;
