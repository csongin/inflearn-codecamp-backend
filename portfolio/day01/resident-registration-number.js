import { checkValidationRegNumber, maskingRegNumber } from './registration-number.js';

const customRegistrationNumber = (regNumber) => {
  // 1. 주민번호 가운데가 "-"로 구성되어 있는지
  // 2. 주민번호 앞 6자리, 뒤 7자리로 구성되어 있는지
  const isValid = checkValidationRegNumber(regNumber);

  // 3. 뒤 7자리 중, 끝 6자리는 *로 변경해서 콘솔에 출력하기
  if (isValid) {
    maskingRegNumber(regNumber, isValid);
  }
}

customRegistrationNumber("210510-1010101");
customRegistrationNumber("210510-1010101010101");
customRegistrationNumber("2105101010101");
