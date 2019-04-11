
function merge (array1, array2) {
  if (array1 === undefined){
    return (array2);
  }
  if (array2 === undefined) {
    return (array1);
  }
  else {
    let array = []
    var i = 0;
    while (array1 !== undefined && array2 !== undefined) {
      if (array1[i] <= array2[i]){
        array.push(array1[i]);
        array1.pop(array[i]);
        i++;
      }
      else {
        array.push(array2[i]);
        array2.pop(array[i]);
        i++;
      }
    return array;
    }
  }
}

console.log(merge([ 4, 5, 6 ], [ 1, 2, 3, 4 ]), "=?", [ 1, 2, 3, 4, 4, 5, 6 ]);
console.log(merge([ 4 ], [ 2, 5, 8 ]), "=?", [ 2, 4, 5, 8 ]);
console.log(merge([ 1, 2, 6 ], []), "=?", [ 1, 2, 6 ]);