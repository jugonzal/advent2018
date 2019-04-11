const fs = require('fs')

const fabric = []

function initialize(n) {
  for (i = 0; i< n; i++) {
    let newRow = [];
    for (j = 0; j < n; j++) {
      newRow.push(0)
    }
    fabric.push(newRow)
  }
}

function check (claim,left, top, width, height) {
  let max = 0;
  for (let x=left; x<left+width; x++) {
    for (let y=top; y<top+height; y++) {
      max = fabric[x][y]>max?fabric[x][y]:max;
    }
  }
  if (max == 1) {
    console.log("Found: ",claim)
  }
}

function draw (claim,left, top, width, height) {
  let max = 0;
  for (let x=left; x<left+width; x++) {
    for (let y=top; y<top+height; y++) {
      fabric[x][y] += 1
      max = fabric[x][y]>max?fabric[x][y]:max;
    }
  }
}

function process (claim) {
  let found = claim.match(/#([0-9]+) @ ([0-9]+),([0-9]+): ([0-9]+)x([0-9]+)/);
  // console.log(found);
  draw(found[1],Number(found[2]),Number(found[3]),Number(found[4]),Number(found[5]))
}

function final (claim) {
  let found = claim.match(/#([0-9]+) @ ([0-9]+),([0-9]+): ([0-9]+)x([0-9]+)/);
  // console.log(found);
  check(found[1],Number(found[2]),Number(found[3]),Number(found[4]),Number(found[5]))
}

function review() {
  let total = 0;
  for (let x=0; x<1000; x++) {
    for (let y=0; y<1000; y++) {
      if (fabric[x][y] > 1)
        total++
    }
  } 
  console.log(total)
}

fs.readFile('./data3', function (err, data) {
  if (err) throw err;
  initialize(1000)
  const dataArray = data.toString().split('\n')
  for (claim of dataArray) {
    process(claim)
  }
  review()
  for (claim of dataArray) {
    final(claim)
  }

});
