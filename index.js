const fs = require('fs')

const exam = fs.readFileSync('./EXAM.txt').toString().split('\n')

const result = []

for (let i = 0; i < exam.length; i++) {
  const line = exam[i]

  console.log(line)
  // WORK HERE
  // WORK HERE
  // WORK HERE
  // WORK HERE
  // WORK HERE
  // WORK HERE
  // WORK HERE
  // WORK HERE
  // WORK HERE
}

fs.writeFileSync('RESULT.json', JSON.stringify(result, null, 2))
