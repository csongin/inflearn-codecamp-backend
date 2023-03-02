import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import 'dotenv/config';
import { Tokens } from './models/tokenSchema.model.js';
import { Starbucks } from './models/starbucksSchema.model.js';
import { checkValidationPhone, getToken, sendTokenToSMS } from './controllers/services/phone.js'
import { options } from './swagger/config.js';
import { UserController } from './controllers/user.controller.js';

const app = express();
const port = 3000;
const swaggerSpec = swaggerJSDoc(options);

app.use(express.json());
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// health check
app.get('/ping', (req, res) => {
  res.send('pong');
});

const userController = new UserController();
app.post('/users', userController.createUser);
app.get('/users', userController.getUser);

app.post('/tokens/phone', async (req, res) => {
  const { phone } = req.body;
  // 1. 휴대폰번호 자릿수 맞는지 확인하기
  const isValid = await checkValidationPhone(phone);
  if (isValid === true) {
    // 2. 핸드폰 토큰 6자리 만들기
    const token = await getToken(6);
    const isValidDB = await Tokens.findOne({ phone: phone });
    if (isValidDB) {
      await MobileToken.updateOne({ $phone: phone }, { token: token })
    } else {
      const tokens = await new Tokens({
        token: token,
        phone: phone,
      });
      await tokens.save();
    }
    // 3. 핸드폰번호에 토큰 전송하기
    await sendTokenToSMS(phone, token);
    res.send(`핸드폰으로 인증 문자가 전송되었습니다.`);
  }
});

app.patch('/tokens/phone', async (req, res) => {
  const { token, phone } = req.body;
  const tokens = await Tokens.findOne({ phone: phone });
  if (!tokens) {
    res.send(false);
  } else if (tokens.token !== token) {
    res.send(false);
  }
  await Tokens.updateOne({ $token: token }, { isAuth: true });
  res.send(true);
});

app.get('/starbucks', async (req, res) => {
  const result = await Starbucks.find();
  res.send(result)
})

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://my-database:27017/mydocker");

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});