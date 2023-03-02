import { checkValidationPhone } from "../../class/01-05-token-count-api-facade-import/phone.js";
import { checkValidationEmail } from "../../class/02-05-welcome-template-api/email.js";
import { checkValidationRegNumber } from "../day01/registration-number.js";

const createWelcomeTemplate = ({
  name,
  email,
  regNumber,
  phoneNumber,
  myFavoriteSite,
}) => {
  const isValidEmail = checkValidationEmail(email);
  const isValidRegNumber = checkValidationRegNumber(regNumber);
  const isValidPhone = checkValidationPhone(phoneNumber);
  if (isValidEmail && isValidRegNumber && isValidPhone) {
    const result = `
      <html>
        <body>
          <h1>${name}님 가입을 환영합니다.</h1>
          <hr />
          <div>이메일: ${email}</div>
          <div>주민번호: ${regNumber}살</div>
          <div>휴대폰 번호: ${phoneNumber}</div>
          <div>내가 좋아하는 사이트: ${myFavoriteSite}</div>
        </body>
      </html> 
    `;
    console.log(result);
  }
};

const user = {
  name: "철수",
  email: "aaa@aaa.com",
  regNumber: "210510-1234567",
  phoneNumber: "00000000000",
  myFavoriteSite: "codebootcamp.co.kr",
};

createWelcomeTemplate(user);
