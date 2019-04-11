const fs = require('fs')

const word2counts = w => {
  let c = {}
  for (l of w) {
    c[l] = c[l]?c[l]+1:1;
  }
  return c;
}

const count2 = (acc, cur) => {
  for (k in cur) {
    if (cur[k] == 2)
      return acc + 1;
  }
  return acc;
}
const count3 = (acc, cur) => {
  for (k in cur) {
    if (cur[k] == 3)
      return acc + 1;
  }
  return acc;
}

// const count3 = (acc, cur) => 

fs.readFile('./data2', function (err, data) {
  if (err) throw err;
  const dataArray = data.toString().split('\n')
  console.log(dataArray.map(word2counts).reduce(count2,0));
  console.log(dataArray.map(word2counts).reduce(count3,0));
  // deep search
  // for each element...
  for (s1 of dataArray) {
    //   search the whole array
    for (s2 of dataArray) {
      //      for another element that is only different in 1 place
      if (diff(s1, s2) == 1)
        console.log(s1, " similar to ",s2)
    }
  }
});

function diff(s1, s2) {
  let diff = 0
  for (i = 0; i < s1.length; i++) {
    if (s1[i] != s2[i]) diff++;
  }
  return diff
}
