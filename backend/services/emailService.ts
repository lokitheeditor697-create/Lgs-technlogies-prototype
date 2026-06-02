import nodemailer from 'nodemailer';

export async function sendOfferLetterEmail(toEmail: string, studentName: string, pdfPath: string) {
  let transporter;

  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  } else {
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, 
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  }

  const mailOptions = {
    from: '"LGS Technologies" <noreply@lgstechnologies.in>',
    to: toEmail,
    subject: 'Your Internship Offer Letter - LGS Technologies',
    text: `Dear ${studentName},\n\nCongratulations! We are pleased to offer you an internship at LGS Technologies. Please find your offer letter attached.\n\nBest Regards,\nLGS Technologies Team`,
    attachments: [
      {
        filename: 'Offer_Letter.pdf',
        path: pdfPath
      }
    ]
  };

  const info = await transporter.sendMail(mailOptions);
  console.log('Email sent: %s', info.messageId);
  
  if (!process.env.SMTP_USER) {
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    return nodemailer.getTestMessageUrl(info);
  }
  
  return null;
}

export async function sendPasswordResetEmail(toEmail: string, resetLink: string) {
  let transporter;

  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  } else {
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, 
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  }

  const mailOptions = {
    from: '"LGS Technologies" <noreply@lgstechnologies.in>',
    to: toEmail,
    subject: 'Password Reset Request - LGS Technologies',
    text: `You have requested to reset your password.\n\nPlease click on the following link, or paste it into your browser to complete the process:\n\n${resetLink}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n\nBest Regards,\nLGS Technologies Team`,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log('Password reset email sent: %s', info.messageId);
  
  if (!process.env.SMTP_USER) {
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    return nodemailer.getTestMessageUrl(info);
  }
  
  return null;
}
