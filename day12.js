let initial = '.#..##..#.....######.....#....####.##.#.#...#...##.#...###..####.##.##.####..######......#..##.##.##'
let base = 0
// let initial = '#..#.#..##......###...###'

// const data = [ '####. => #',
//   '###.# => #',
//   '###.. => #',
//   '##.## => #',
//   '##.#. => #',
//   '#.### => #',
//   '#.#.# => #',
//   '.#### => #',
//   '.##.. => #',
//   '.#.## => #',
//   '.#.#. => #',
//   '.#... => #',
//   '..#.. => #',
//   '...## => #' ]

const data = [ '##### => .',
  '####. => .',
  '###.# => #',
  '###.. => .',
  '##.## => .',
  '##.#. => #',
  '##..# => #',
  '##... => .',
  '#.### => .',
  '#.##. => #',
  '#.#.# => #',
  '#.#.. => .',
  '#..## => .',
  '#..#. => #',
  '#...# => #',
  '#.... => .',
  '.#### => #',
  '.###. => .',
  '.##.# => #',
  '.##.. => .',
  '.#.## => #',
  '.#.#. => #',
  '.#..# => #',
  '.#... => #',
  '..### => .',
  '..##. => .',
  '..#.# => #',
  '..#.. => .',
  '...## => .',
  '...#. => #',
  '....# => .',
  '..... => .' ]



class Rules {
  constructor () {
    this.rules = {}
  }

  add (rule) {
    this.rules[rule.substring(0,5)] = rule.substring(9)
  }

  get (rule) {
    if (this.rules[rule])
      return this.rules[rule]
    else
      return '.'
  }

  print () {
    console.log(this.rules)
  }
}

function count() {
  let points = 0;
  for (let k = 0; k < initial.length; k++) {
    if (initial[k] == '#')
      points = points + k + base
  }
  return points;
}

let myRules = new Rules()
data.forEach(r => myRules.add(r))

console.log(initial)
for (let k = 1; k<= 500000; k++) {
  if (initial.substring(0,3) != '...') {
    initial = '..' + initial
    base = base - 2;
  } 
  // if (initial.substring(initial.length-2) != '..') {
  initial = initial + '...'
  // }
  final = '..'
  for (let i = 2; i < initial.length-2; i++) {
    // console.log('Rule ',initial.substring(i-2,i+3))
    final += myRules.get(initial.substring(i-2,i+3))
  }
  if (final.substring(0,5) == '.....') {
    final = final.substring(2)
    base = base + 2
  }
  if (final.substring(final.length-5) == '.....') {
    final = final.substring(0, final.length-2)
  }
  initial = final
  if (k%50000 == 0) {
    console.log(k, base, count())
  }
}

console.log("Points: ", count())