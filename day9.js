// circular list

class Marble {
  constructor(value) {
    this.value = value
    this.clockwise = this
    this.counterclockwise = this
  }

  insert(recentMarble) {
    recentMarble.clockwise = this.clockwise.clockwise
    recentMarble.counterclockwise = this.clockwise
    this.clockwise.clockwise.counterclockwise = recentMarble
    this.clockwise.clockwise = recentMarble
  }

  remove7cc() {
    let oldMarble = this.counterclockwise
      .counterclockwise
      .counterclockwise
      .counterclockwise
      .counterclockwise
      .counterclockwise
      .counterclockwise
    oldMarble.clockwise.counterclockwise = oldMarble.counterclockwise
    oldMarble.counterclockwise.clockwise = oldMarble.clockwise
    return oldMarble
  }

  print() {
    console.log(this.value,'->')
    for (let next = this.clockwise; next !== this; next = next.clockwise) 
      console.log(next.value,'->')
  }


}

class Players {
  constructor(howMany) {
    this.total = howMany
    this.scores = new Array(howMany)
    this.scores.fill(0)
  }

  start(player) {
    if (player <= this.total)
      this.current = player
  }

  score(value) {
    if (this.current)
      this.scores[this.current-1] += value    
    return this
  }

  next() {
    if (this.current < this.total)
      this.current ++
    else 
      this.current = 1
    return this
  }

  print() {
    console.log(this.scores)
  }

}

players = new Players(403)
let current = new Marble(0)
players.start(1)
for (let i=1; i<=7192000; i++) {
  players.next()
  if (i%23) {
    let recent = new Marble(i)
    current.insert(recent)
    current = recent
  } else {
    current = current.remove7cc()
    // console.log('Removed ',current.value)
    players.score(i + current.value)
    current = current.clockwise
  }
  if (i%70000 == 0) console.log(i)
}
// current.print()
// players.print()
console.log("Max: ",players.scores.reduce((acc, cur) => cur > acc? cur: acc))