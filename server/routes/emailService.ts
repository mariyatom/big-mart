import nodemailer from 'nodemailer'

//npm install --save-dev @types/nodemailer
// then declare a module in the root in  .d.ts,  content:declare module 'nodemailer'

export async function sendOrderEmail(to: string, orderSummary: string) {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Or use an SMTP service
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS, // App password (not the regular password)
    },
  })

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Your Order Confirmation',
    html: orderSummary, // HTML formatted order summary
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('Order email sent successfully!')
  } catch (error) {
    console.error('Error sending email:', error)
    throw error
  }
}
