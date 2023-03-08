import { createUserAPI } from "./services/cheerio-scraping.js";
import {
  checkValidationEmail,
  getWelcomeTemplate,
  sendWelcomeTemplateToEmail,
} from "./services/email.js";
import { User } from "../models/userSchema.model.js";
import { Tokens } from "../models/tokenSchema.model.js";

export class UserController {
  createUser = async (req, res) => {
    const { name, email, personal, prefer, pwd, phone } = req.body;
    const tokens = await Tokens.findOne({
      phone: phone,
    });
    if (!tokens || tokens.isAuth) {
      res.status(422).send("Unprocessable Entity");
    }
    const og = await createUserAPI(prefer);
    const personalBackNumber = personal.slice(-7);
    const personalMasking = personal.replace(personalBackNumber, "#######");
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
      },
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
  };

  getUser = async (req, res) => {
    const result = await User.find();
    res.send(result);
  };
}
