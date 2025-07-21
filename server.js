const express = require('express');
const nodemailer = require('nodemailer');
const admin = require('firebase-admin');
const cors = require('cors'); // Allow frontend requests

const app = express();
app.use(express.json());
app.use(cors());

const decoded = Buffer.from(process.env.GOOGLE_SERVICE_KEY_BASE64, 'base64').toString('utf8');
const serviceAccount = JSON.parse(decoded);




// 🔐 Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// 💌 Configure SMTP email using Gmail App Password
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'autocultive@gmail.com',           // ✅ Your actual Gmail address
    pass: 'ncaumahnipksqfmk'                 // ✅ Your 16-digit App Password
  }
});

// 📨 API Endpoint to send reset email
app.post('/send-reset-email', async (req, res) => {
  const { email } = req.body;

  try {
    const resetLink = await admin.auth().generatePasswordResetLink(email);

    await transporter.sendMail({
      from: '"Autocultive Support" <autocultive@gmail.com>',   // ✅ Must match auth user
      to: email,
      subject: 'Reset Your Autocultive Password',
      html: `
        <p>Hello,</p>
        <p>You requested a password reset for your Autocultive account.</p>
        <p><a href="${resetLink}">Click here to reset your password</a></p>
        <p>This link will expire in 1 hour. If you didn’t request this, ignore this email.</p>
      `,
    });

    res.status(200).send({ message: 'Password reset email sent successfully.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ error: 'Failed to send reset email.' });
  }
});


// 👋 Root route for browser test
app.get("/", (req, res) => {
  res.send("Reset email server is running!");
});

// 🔃 Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
