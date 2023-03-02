const getToday = () => {
  const date = new Date();
  const yyyy = date.getFullYear();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const seconds = ("0" + date.getSeconds()).slice(-2);
  const timeStr = `${hours}:${minutes}:${seconds}`;

  mm = mm < 10 ? `0${mm}` : mm;
  dd = dd < 10 ? `0${dd}` : dd;

  console.log(`오늘은 ${yyyy}년 ${mm}월 ${dd}일 ${timeStr}입니다.`);
  return;
};

getToday();
