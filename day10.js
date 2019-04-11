const fs = require('fs')

let grid = []

function initialize(position) {
  let found = position.match(/position=<([^,]+),\s([^>]+)>\svelocity=<\s*([^,]+),\s*([^>]+)>/);
  // console.log(found)
  grid.push({
    x: Number(found[1]),
    y: Number(found[2]),
    dx: Number(found[3]),
    dy: Number(found[4])
  })
}

function move(position) {
  position.x = position.x + position.dx
  position.y = position.y + position.dy
  return position
}

function rows(acc, cur) {
  if (!acc[cur.y])
    acc[cur.y] = 1
  else
    acc[cur.y] += 1
  return acc;
}

function render(grid) {
  let output = `
  <html>
    <body>
      <canvas id="canvas"></canvas>

    <script>
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'red';`
    //ctx.fillRect(10, 10, 150, 100);
    for (pos of grid) {
      output += `ctx.fillRect(${pos.x}, ${pos.y}, 1, 1);`
    }
  output += `</script>
    </body>
  </html>`
  return output
}

fs.readFile('./data10', function (err, data) {
  if (err) throw err;
  const dataArray = data.toString().split('\n')
  for (position of dataArray) {
    initialize(position)
  }

  let entropy = 100;
  let newer = 99;
  let seconds = 0;
  while (newer <= entropy) {
    entropy = newer
    grid = grid.map(move)
    newer = Object.keys(grid.reduce(rows,{})).length
    seconds++;
    if (newer == 10)
      console.log("found after ",seconds," seconds") 
      // console.log(render(grid))
  }

})