// import {SearchMachine} from './searchMachine'
const SearchMachine = require('./searchMachine')
const fs = require('fs')
const exam = fs.readFileSync('./EXAM.txt').toString().split('\n')
const result = []

const searchMachine = new SearchMachine([
  {field: 'name', pattern: /(?<=Exame\s*:).+/,},
  {field: 'result', pattern: /(?<=Resultado\s*:\s*)[0-9,.]+/, next_inline: true,},
  {field: 'unit', pattern: /.+/,},
  {field: 'material', pattern: /(?<=Material\s*:\s*).+/,},
  {field: 'metodo', pattern: /(?<=Método\s*:\s*).+/,},
])

for (let i = 0; i < exam.length; i++) {
  const line = exam[i]

  if (line === '') {
    searchMachine.resetState()
    continue
  }

  searchMachine.apply(line)

  if (searchMachine.isFinalState()) {
    const newObject = searchMachine.getObject()
    result.push(newObject)
  }
}

if (! searchMachine.isFinalState()) {
  searchMachine.fillRestObject()
  const newObject = searchMachine.getObject()
  result.push(newObject)
}

fs.writeFileSync('RESULT.json', JSON.stringify(result, null, 2))
