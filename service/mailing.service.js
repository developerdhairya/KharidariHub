const queueMail = require('../util/mailer');


function sendVerificationToken(emailId, token) {
  queueMail({
    emailId: props.emailId,
    subject: 'Welcome to Kharidari Hub',
    body: `Thanks for testing my project.Your otp for email verification is ${verificationToken}`,
  });
}

module.exports={
  sendVerificationToken,
};
