const fs = require('fs')

const grid = [];
const locations = [];
const totals = {};

function initialize(size) {
  function newRow(size) {
    let row=[];
    for (let i=0;i<size;i++) {
      row.push({})
    }
    return row;
  }
  for (let i=0; i<size; i++) {
    grid.push(newRow(size))
  }
}

function location(id, coords) {
  let sa = (coords.split(', '))
  let x = Number(sa[0])
  let y = Number(sa[1])
  locations.push([id, x, y])
  grid[x][y][id] = 0
}

function distance(x1, y1, x2, y2) {
  // console.log(x1,y1,x2,y2,Math.abs(x1 - x2) + Math.abs(y1 - y2))
  return Math.abs(x1 - x2) + Math.abs(y1 - y2)
}

function closest(obj) {
  let min = 500;
  let closest;
  for (key in obj) {
    if (obj[key] < min) {
      closest = key
      min = obj[key]
    } else if (obj[key] == min) {
      closest = '.'
    }
  }
  // console.log(obj, closest)
  return closest
}

function addThem(obj) {
  let total = 0;
  for (key in obj) {
    total += obj[key]
  }
  // console.log(obj, closest)
  return total<10000?'#':'.'
}

fs.readFile('./data6', function (err, data) {
  if (err) throw err;
  initialize(400)
  const dataArray = data.toString().split('\n')
  let id = 65;
  for (coords of dataArray) {
    location(String.fromCharCode(id),coords)
    id++;
  }

  for (let x=0; x<400; x++) {
    for (let y=0; y<400; y++) {
      for (point of locations) {
        grid[x][y][point[0]] = distance(x, y, point[1], point[2])
      }
    }
    // console.log(x)
  }

  for (let x=0; x<400; x++) {
    // part One uses closest
    // grid[x] = grid[x].map(closest)

    // part Two uses addThem
    grid[x] = grid[x].map(addThem)

    console.log(grid[x].join(''))
  }

  console.log(locations)

  for (let x=0; x<400; x++) {
    for (let y=0; y<400; y++) {
      if (!totals[grid[x][y]])
        totals[grid[x][y]] = 1
      else
        totals[grid[x][y]]++
    }
  }

  // get rid of all entries at the borders... they are infinite
  for (let x=0; x<400; x++) {
    // console.log(grid[x][0], grid[x][399])
    delete totals[grid[x][0]]
    delete totals[grid[x][399]]
  }
  for (let y=0; y<400; y++) {
    // console.log(grid[0][y],grid[399][y])
    delete totals[grid[0][y]]
    delete totals[grid[399][y]]
  }
    
  console.log(totals)
});
