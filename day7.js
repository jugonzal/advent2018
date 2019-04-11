const fs = require('fs')

let rules = []
let time = 0
let next = [null,null,null,null,null]

function process (rule) {
  let found = rule.toString().split(' ')
  let obj = {from: found[1], to: found[7], end: 1000}
  rules.push(obj)
}

function remaining () {
  let total = 0;
  for (let r of rules) {
    if (r.from.charCodeAt(0)>=64)
      total++
  }
  return total;
}

function anythingDone () {
  for (let r of rules) {
    if (r.end == time)
      doneStep(r.to)
  }
  for (let i=0; i<5; i++) {
    if (next[i] && next[i].end == time)
      next[i] = null
  }
}

function doneStep (step) {
  for (let r of rules) {
    if (r.from == step)
      r.from = '@'
  }
}

function noOtherReqs(step) {
  for (let r of rules) {
    if (r.from.charCodeAt(0)>=65 && r.to == step)
      return false
  }
  return true
}

function endsAt(step) {
  for (let r of rules) {
    if (r.from == '=' && r.to == step)
      return r.end
  }
  return 1000;
}

function nextStep() {
  for (let r of rules) {
    if (r.from == '@') {
      // console.log('checking...', r)
      if (noOtherReqs(r.to) && endsAt(r.to) >= time) {
        r.from = '='
        r.start = time
        r.end = time + r.to.charCodeAt(0) - 4
        console.log(r)
        return {work: r.to, end: r.end} ;        
      }
    }
  }
  return null;
}

fs.readFile('./data7', function (err, data) {
  if (err) throw err;
  const dataArray = data.toString().split('\n')
  // rules.push({from: '@', to: 'C'})
  rules.push({from: '@', to: 'O', end:1000})
  rules.push({from: '@', to: 'P', end:1000})
  for (rule of dataArray) {
    process(rule)
  }

  do {
    // console.log(rules)
    anythingDone()

    rules = rules.sort((a,b) => {
       let main = a.from.charCodeAt(0) - b.from.charCodeAt(0)
       if (!main)
        return a.to.charCodeAt(0) - b.to.charCodeAt(0)
       else
        return main
    })
    rules = rules.reduce((acc, cur) => {
      // console.log('reducer ',acc)
      if (cur.from == acc[acc.length-1].from && cur.to == acc[acc.length-1].to)
        return acc
      else {
        acc.push(cur)
        return acc
      } 
    },[{from: rules[0].from, to: rules[0].to, start: rules[0].start, end: rules[0].end}])
    // if (remaining() < 95)
    //   console.log(rules)
    // console.log('steps ',remaining())
    for (let i=0; i<5; i++) {
      if (!next[i]) {
        next[i] = nextStep()
        if (next[i])
          console.log('Elf #',i,' started =====> ',next[i])
      }
    }
    time++
  } while (remaining() > 0)
  console.log(rules)
  console.log('Finished in: ', time)
});