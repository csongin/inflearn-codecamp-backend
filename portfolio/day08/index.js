import express from 'express'
import cors from 'cors'
import mongoose, { Model, model } from 'mongoose'
import { MobileToken } from './token.model.js'
import { checkValidationPhone, getToken, sendTokenToSMS } from './phone.js'
import 'dotenv/config';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(mongoose.set('strictQuery', false));

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.post('/tokens/phone', async (req, res) => {
  const myphone = req.body.phone;

  // 1. 휴대폰번호 자릿수 맞는지 확인하기
  const isValid = await checkValidationPhone(myphone);
  if (isValid === true) {
    // 2. 핸드폰 토큰 6자리 만들기
    const token = await getToken(6);
    const isValidDB = await MobileToken.findOne({ phone: myphone });
    if (isValidDB) {
      await MobileToken.updateOne({ $phone: myphone }, { token: token })
    } else {
      const mobileToken = await new MobileToken({
        token: token,
        phone: myphone,
      });
      await mobileToken.save();
    }
    // 3. 핸드폰번호에 토큰 전송하기
    await sendTokenToSMS(myphone, token);
    res.send(`${myphone}으로 인증 문자가 전송되었습니다.`);
  }
});

app.patch('/tokens/phone', async (req, res) => {
  const { token, phone } = req.body;
  const result = await MobileToken.findOne({ phone: phone });
  if (!result) {
    res.send(false);
  } else if (result.token !== token) {
    res.send(false);
  }
  await MobileToken.updateOne({ $token: token }, { isAuth: true });
  res.send(true);
})

mongoose.connect("mongodb://my-database:27017/tokens");
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});