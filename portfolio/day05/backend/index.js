import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc';
import { options } from './swagger/config.js'
import cors from 'cors'

const app = express()
const port = 3000
const swaggerSpec = swaggerJSDoc(options);

app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/users', (req, res) => {
  const result = [
    {
      email: "aaa@gmail.com",
      name: "철수",
      phone: "010-1234-5678",
      personal: "220110-2222222",
      prefer: "https://naver.com"
    },
    {
      email: "bbb@gmail.com",
      name: "영희",
      phone: "010-2234-5678",
      personal: "220110-2222222",
      prefer: "https://naver.com"
    },
    {
      email: "ccc@gmail.com",
      name: "택수",
      phone: "010-3234-5678",
      personal: "220110-2222222",
      prefer: "https://naver.com"
    },
    {
      email: "aaa@gmail.com",
      name: "철수",
      phone: "010-1234-5678",
      personal: "220110-2222222",
      prefer: "https://naver.com"
    },
    {
      email: "aaa@gmail.com",
      name: "철수",
      phone: "010-1234-5678",
      personal: "220110-2222222",
      prefer: "https://naver.com"
    }
  ]
  res.send(result)
})

app.get('/starbucks', (req, res) => {
  const result = [
    { name: '아메리카노', kcal: 5 },
    { name: '에스프레소', kcal: 10 },
    { name: '카페라떼', kcal: 15 },
    { name: '바닐라라떼', kcal: 20 },
    { name: '아포가토', kcal: 25 },
    { name: '콜드브루', kcal: 30 },
    { name: '레몬에이드', kcal: 35 },
    { name: '자몽에이드', kcal: 40 },
    { name: '수박주스', kcal: 45 },
    { name: '참외주스', kcal: 50 },
  ]

  res.send(result)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})