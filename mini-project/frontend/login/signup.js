// 휴대폰 인증 토큰 전송하기
const getValidationNumber = async () => {
  const phoneNumber01 = document.getElementById('PhoneNumber01').value;
  const phoneNumber02 = document.getElementById('PhoneNumber02').value;
  const phoneNumber03 = document.getElementById('PhoneNumber03').value;

  await axios.post("http://localhost:3000/tokens/phone", {
    phone: phoneNumber01 + phoneNumber02 + phoneNumber03
  }).then((res) => {
    console.log(res);
  })
  document.querySelector('#ValidationInputWrapper').style.display = 'flex'
  console.log('인증 번호 전송');
}

// 회원 가입 API 요청
const submitSignup = async () => {
  const name = document.getElementById('SignupName').value;
  const email = document.getElementById('SignupEmail').value;
  const personal1 = document.getElementById('SignupPersonal1').value;
  const personal2 = document.getElementById('SignupPersonal2').value;
  const phoneNumber01 = document.getElementById('PhoneNumber01').value;
  const phoneNumber02 = document.getElementById('PhoneNumber02').value;
  const phoneNumber03 = document.getElementById('PhoneNumber03').value;
  const pwd = document.getElementById('SignupPwd').value;
  const prefer = document.getElementById('SignupPrefer').value;

  await axios.post("http://localhost:3000/users", {
    name: name,
    email: email,
    personal: `${personal1}-${personal2}`,
    prefer: prefer,
    pwd: pwd,
    phone: phoneNumber01 + phoneNumber02 + phoneNumber03,
  })
  console.log('회원 가입 이메일 전송')
}
