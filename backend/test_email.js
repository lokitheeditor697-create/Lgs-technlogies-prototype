const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'lgstechnologiess@gmail.com',
    pass: 'chvp ylpo vegq eajw'.replace(/\s+/g, '') // remove spaces just in case
  }
});

const mailOptions = {
  from: 'lgstechnologiess@gmail.com',
  to: 'lgstechnologiess@gmail.com', // send to self to test
  subject: 'Test Email from Nodemailer',
  text: 'If you see this, nodemailer is working!'
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('Error:', error);
  } else {
    console.log('Email sent:', info.response);
  }
});
