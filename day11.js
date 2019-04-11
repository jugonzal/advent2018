

function power (x, y, serial) {
  let rackId = x + 10
  let val = (rackId * y + serial) * rackId
  return val < 1000 ? Math.floor(val/100) - 5 : Math.floor(val/100) - Math.floor(val/1000)*10 - 5
}

// console.log(power(3,5,8))
// console.log(power(122,79,57))
// console.log(power(217,196,39))
// console.log(power(101,153,71))

const grid = []
for (let x=1; x<=300; x++) {
  let row = [];
  for (let y=1; y<=300; y++) {
    row.push(power(x, y, 2866))
  }
  grid.push(row)
}

function cellPower(x, y, s) {
  let power = 0;
  for (let i=x; i<x+s; i++)
    for (let k=y; k<y+s; k++)
      power += grid[i][k]
  return power
}

const cell = []

for (s = 1; s<301; s++)
  for (x = 0; x < 301-s; x++) 
    for (y = 0; y < 301-s; y++) {
      cell.push({x: x+1, y: y+1, s: s, p: cellPower(x,y,s)})
    }

console.log(cell.sort((a,b) => b.p - a.p))