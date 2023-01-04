const genaps = (n) => {
  let i = 2;
  let out = "";
  for (let c = 0; c < n; c++) {
    out += `${i} `;
    i += 2;
  }
  console.log(out);
};

const primas = (n) => {
  let num = 2;
  let isPrime = true;
  let c = 0;
  let out = "";
  while (c < n) {
    for (let d = 2; d < num; d++) {
      if (num % d == 0) isPrime = false;
    }
    if (isPrime) {
      out += `${num} `;
      c++;
    } else {
      isPrime = true;
    }
    num++;
  }
  console.log(out);
};

// genaps(100);
// primas(100);
