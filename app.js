import express from 'express';
import bodyParser from 'body-parser';
import env from 'dotenv';
import nodemailer from 'nodemailer';

env.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.post('/contact', (req, res) => {
    
  console.log('Form Data:', req.body);

  const { fName, email, subject, message } = req.body;

  if (!fName || !email || !subject || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_RECEIVER,
    subject: subject,
    text: `Message from ${fName} with email address: ${email}\n\n${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error occurred:', error);
      return res
        .status(500)
        .json({ message: 'Error sending email: ' + error.toString() });
    }
    console.log('Email sent:', info.response);
    res.status(200).json({ message: 'Email sent successfully' });
  });
});

app.listen(port, () => {
  console.log(`The server is running on port: ${port}`);
});
