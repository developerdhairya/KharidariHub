var nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();



const mailTo=(props)=>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAILID,
          pass: process.env.PASSWORD
        }
      });
      
      var mailOptions = {
        from: process.env.EMAILID,
        to: props.emailId,
        subject: props.subject,
        text: props.body
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

module.exports=mailTo;