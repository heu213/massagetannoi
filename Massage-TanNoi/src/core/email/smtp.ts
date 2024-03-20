import nodemailer from 'nodemailer';
import {
  SMTP_SERVER, SMTP_PORT, SMTP_USER, SMTP_PASSWORD,
} from '@core/config';

const transporter = nodemailer.createTransport({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  host: process.env.SMTP_SERVER || SMTP_SERVER,
  port: process.env.SMTP_PORT || SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER || SMTP_USER,
    pass: process.env.SMTP_PASSWORD || SMTP_PASSWORD,
  },
});



export default transporter;
