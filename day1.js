const fs = require('fs')

const addThemUp = (acc, cur) => Number(acc) + Number(cur);

let total = 0;
let freq = {};
let stop = false;

const calcFreq = e => {
  total += Number(e)
  if (!freq[total]) {
    freq[total] = 1
    // console.log("Frequency ", total)
  } else {
    freq[total]++;
    console.log("Frequency ", total, " <=========");
    stop = true;
  }
  return total;
}

fs.readFile('./data1', function (err, data) {
  if (err) throw err;
  const dataArray = data.toString().split('\n')
  console.log(dataArray.reduce(addThemUp));
  while (!stop) {
    dataArray.map(calcFreq)
  }
});
