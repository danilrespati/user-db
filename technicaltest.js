const fn = (num) => {
  let out = "";
  let multi = 1;
  for (let i = 1; i <= num; i++) {
    multi *= i;
    if (i == 1) {
      out += `${i}`;
    } else {
      out += `*${i}`;
    }
    console.log(`${out} = ${multi}`);
  }
  return "";
};

console.log(fn(10));
