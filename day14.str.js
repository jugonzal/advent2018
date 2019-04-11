// node --max-old-space-size=8192 --optimize-for-size --max-executable-size=8192 node_modules/karma/bin/karma start --single-run --max_new_space_size=8192   --prod --aot


let recipesBuffer = new Uint8Array(Math.pow(2,28)-1);

recipes.push('3')
recipes.push('7')

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
  let digits = eachDigit(Number(recipes[elves[0]]) + Number(recipes[elves[1]]))
  let d;
  do {
    d = digits.next()
    // console.log('next: ', d.value)
    recipes.push(String.fromCharCode(d.value + 48))
  } while (!d.done)
}

function move() {
  for (let e=0; e< elves.length; e++) {
    elves[e] = (elves[e] + (Number(recipes[elves[e]])+1))%recipes.length
  }
  // console.log()
}

let pattern = '793061'

function progress() {
    console.log(recipes.length);
}

function compareEnd (original, pattern) {
  // console.log(original.slice(original.length - 5, original.length))
  for (let i = pattern.length - 1; i >= 0; i--) {
    if (pattern[i] != original[original.length - pattern.length + i])
      return false
  }
  return true
}

// let warmup = 30

do {
  // console.log(elves)
  mix()
  move()  
  if (recipes.length%100000 == 0) {
    console.log(recipes.length, elves[0]*100.0/recipes.length, elves[1]*100.0/recipes.length)  

  }
} while (!compareEnd(recipes, pattern))
// } while (recipes.length < 10 + warmup)
console.log(recipes.slice(recipes.length-10,recipes.length))
// console.log(recipes)
console.log(recipes.length-pattern.length)


// YIKES 70M recipes and still counting.