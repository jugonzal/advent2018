const fs = require('fs')

const guards = {}
let currentGuard;
let lastSleep;

function newTimeSheet () {
  let timeSheet = [];
  for (let i=0;i<60;i++) {
    timeSheet.push(0)
  }
  return timeSheet;
}

function newGuard(ID) {
  if (!guards[ID]) {
    guards[ID] = newTimeSheet()
  }
  console.log("Guard ",ID)
  return guards[ID]
}

function sleepy(timesheet, start, end) {
  console.log("Sleepy ", start, end)
  for (let i=start; i<end; i++) {
    timesheet[i]++
  }
}

function process (log) {
  // console.log(log)
  let found = log.match(/\[1518-([0-9]{2})-([0-9]{2}) ([0-9]{2}):([0-9]{2})\]\s([A-Za-z]{5})\s([^\s]+)/);
  // console.log(found);
  // check(found[1],Number(found[2]),Number(found[3]),Number(found[4]),Number(found[5]))
  switch (found[5]) {
    case 'Guard':
      currentGuard = newGuard(found[6])
      break;
    case 'falls':
      lastSleep = Number(found[4])
      break;
    case 'wakes':
      sleepy(currentGuard, lastSleep, Number(found[4]))
      break;
  } 
}

function mostAsleep () {
  for (guard in guards) {
    console.log(guard, guards[guard].reduce((acc, cur) => acc + cur))
  }
}

fs.readFile('./data4.sorted', function (err, data) {
  if (err) throw err;
  const dataArray = data.toString().split('\n')
  for (log of dataArray) {
    process(log)
  }
  // sleepy(guards['#1723'],38,46)
  // sleepy(guards['#1723'],33,37)
  // sleepy(guards['#1723'],33,42)
  console.log(guards)
  mostAsleep()
});