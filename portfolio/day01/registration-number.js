
export const checkValidationRegNumber = (regNumber) => {
  if (!regNumber.includes('-')) {
    console.log('에러 발생!!! 형식이 올바르지 않습니다!!!');
    return false;
  } else if (regNumber.indexOf('-') !== 6 || regNumber.length !== 14) {
    console.log('에러발생!!! 개수를 제대로 입력해 주세요');
    return false;
  } else {
    return true;
  }
}

export const maskingRegNumber = (regNumber, isValid) => {
  const pattern = /.{6}$/;
  console.log(regNumber.replace(pattern, '******'));
  return;
}