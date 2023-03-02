import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import 'dotenv/config';
import { User } from './models/userSchema.model.js';
import { createUserAPI } from './src/cheerio-scraping.js';
import { Tokens } from './models/tokenSchema.model.js';
import { Starbucks } from './models/starbucksSchema.model.js';
import { checkValidationPhone, getToken, sendTokenToSMS } from './src/phone.js'
import { checkValidationEmail, getWelcomeTemplate, sendWelcomeTemplateToEmail } from './src/email.js'
import { options } from './swagger/config.js';

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

app.post('/users', async (req, res) => {
  const { name, email, personal, prefer, pwd, phone } = req.body;
  const tokens = await Tokens.findOne({
    phone: phone,
  });
  if (!tokens.isAuth) {
    res.status(422).send('Unprocessable Entity');
  }
  const og = await createUserAPI(prefer);
  const pernoalBackNumber = personal.slice(-7);
  const personalMasking = personal.replace(pernoalBackNumber, "#######");
  const user = new User({
    name: name,
    email: email,
    personal: personalMasking,
    prefer: prefer,
    pwd: pwd,
    phone: phone,
    og: {
      title: og.title,
      description: og.description,
      image: og.image,
    }
  });
  await user.save();
  // 1. 이메일이 정상인지 확인(1-존재여부, 2-"@"포함여부
  const isValid = checkValidationEmail(email);
  if (isValid) {
    // 2. 가입환영 템플릿 만들기
    const template = getWelcomeTemplate(user);

    // 3. 이메일에 가입환영 템플릿 전송하기
    sendWelcomeTemplateToEmail(email, template);
  }
  res.send(User.id);
});

app.get('/users', async (req, res) => {
  const result = await User.find();
  res.send(result);
});

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