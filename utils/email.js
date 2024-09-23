const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

module.exports = class Email {
  constructor(user) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.from = `דירה בולגרית <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // Use SendGrid
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
    }
    // If in development use nodemailer.
    /* Function for creating and sending emails to the users. We create the options variable and specify
    the email address, email content etc. The transporter is just a service for sending the email like
    gmail for example (for using Gmail we need to activate an option called 'less secure app' in our
    Gmail settings). For creating the transporter we use the nodemailer 'createTransport()' method, and 
    pass the required fields to it from the process.env file (For development testing we use the mailtrap
    service).   */
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  /* We use this function to actually send the email to the users. */
  async send(template, subject) {
    // 1) Render HTML based on a pug template.
    const html = pug.renderFile(`${__dirname}/../views/he/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });
    // 2) Define the email options.

    /* We define the email options using strings and information from the 'options' function argument.
        Finally to send the email we use the transporter object with the 'sendMail()' method which returns 
        a promise, and pass our 'mailOptions' into it. */
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      /* Although we already have an HTML version of the email, some people prefer to have a text version and it's
               also better from email rates and spam folders. So we use the 'html-to-text' package to convert the html
               email to a text version. */
      text: htmlToText.htmlToText(html),
    };

    // 3) Create a transport and send the email
    await this.newTransport().sendMail(mailOptions);
  }

  /* Here we use the 'send()' function. The template comes from the pug template we created and then we just add the
       subject. */
  async sendWebinarWelcome() {
    try {
      await this.send('webinarWelcome', 'וובינר השקעות הנדל"ן בבולגריה של דירה בולגרית');
    } catch (error) {
      console.error('Email error:', error);
    }
  }
};
