const fs = require('fs')

let head = 0;
// let metadata = 0;
let tape = [];

function createNode(children, datas) {
  let values = []
  let metadata = 0
  // console.log("node: ", children)
  for (let i=0;i<children;i++) {
    values.push(createNode(Number(tape[head++]), Number(tape[head++])))
  }
  console.log(values)
  if (!children) {
    for (let j=0;j<datas;j++) {
      metadata += Number(tape[head++])
    }
    return metadata
  } else {
    metadata = 0;
    for (let j=0;j<datas;j++) {
      let idx = Number(tape[head++])
      if (idx <= values.length)
        metadata += values[idx-1]
    }
    return metadata
  }
  console.log("data: ",metadata)
}

fs.readFile('./data8', function (err, data) {
  if (err) throw err;
  tape = data.toString().split(' ')
  console.log(tape.length)
  console.log(createNode(Number(tape[head++]), Number(tape[head++])))
  // console.log(head)
  // console.log(metadata)
})