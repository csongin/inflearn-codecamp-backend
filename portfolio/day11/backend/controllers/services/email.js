// email.js
import { getToday } from './utils.js';
import nodemailer from 'nodemailer';
import 'dotenv/config';

export function checkValidationEmail(email) {
  if (email === undefined || !email.includes('@')) {
    console.log('정확한 이메일 주소를 입력해주세요.');
    return false;
  }
  return true;
}

// email.js

export function getWelcomeTemplate({ name, email, prefer }) {
  return `
      <html style="width: 500px">
          <body>
              <h1 style="color: blue">${name}님 가입을 환영합니다.</h1>
              <hr />
              <div>이름: ${name}</div>
              <div>이메일: ${email}</div>
              <div>좋아하는 사이트: ${prefer}</div>
              <div>가입일: ${getToday()}</div>
          </body>
      </html>
  `
}

// email.js

export async function sendWelcomeTemplateToEmail(email, template) {
  // 템플릿을 이메일에 전송
  const EMAIL_USER = process.env.EMAIL_USER;
  const EMAIL_PASS = process.env.EMAIL_PASS;
  const EMAIL_SENDER = process.env.EMAIL_SENDER;

  const transporter = await nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    }
  });
  const result = await transporter.sendMail({
    from: EMAIL_SENDER,
    to: email,
    subject: "[쏭코딩] 가입을 축하합니다!!",
    html: template
  });
  console.log(result);

  // console.log(`${email}로 템플릿 ${template}를 전송합니다.`)
}