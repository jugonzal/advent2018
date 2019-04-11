// node --max-old-space-size=8192 --optimize-for-size --max-executable-size=8192 node_modules/karma/bin/karma start --single-run --max_new_space_size=8192   --prod --aot


let recipes = new Uint8Array(Math.pow(2,28)-1);
let length = 0;
recipes[length++] = 3
recipes[length++] = 7

let elves = [0,1]

function* eachDigit(val) {
  // console.log('each digit of ',val)
  if (val < 10) {
    return val;
  } else {
    yield Math.floor(val/10)
    return val - Math.floor(val/10) * 10
  }
}

function mix() {
  let digits = eachDigit(recipes[elves[0]] + recipes[elves[1]])
  let d;
  do {
    d = digits.next()
    // console.log('next: ', d.value)
    // recipes.push(String.fromCharCode(d.value + 48))
    recipes[length++] = d.value
  } while (!d.done)
}

function move() {
  for (let e=0; e< elves.length; e++) {
    elves[e] = (elves[e] + (recipes[elves[e]]+1))%length
  }
  // console.log()
}

let pattern = '793061'

function compareEnd (pattern) {
  // console.log(original.slice(original.length - 5, original.length))
  for (let i = pattern.length - 1; i >= 0; i--) {
    if (pattern[i] != recipes[length - pattern.length + i])
      return false
  }
  return true
}

function compareAt (pattern, location) {
  for (let i = pattern.length - 1; i >= 0; i--) {
    if (pattern[i] != recipes[location - pattern.length + i])
      return false
  }
  return true
}


do {
  // console.log(elves)
  mix()
  move()  
  // if (length%1000000 == 0) {
  //   console.log(length)  

  // }
} while (!compareEnd(pattern))
// } while (recipes.length < 10 + warmup)
console.log(recipes.slice(length-10,length+2))
// console.log(recipes)
console.log('length: ',length-pattern.length)

for (let k = 7; k<= 141045490; k++)
  if (compareAt(pattern, k))
    console.log('Found at ',k)
