// import {SearchMachine} from './searchMachine'
const SearchMachine = require('./searchMachine')
const fs = require('fs')
const exam = fs.readFileSync('./EXAM.txt').toString().split('\n')
const result = []

const searchMachine = new SearchMachine([
  {field: 'name', pattern: /(?<=Exame\s*:).+/,},
  {
    field: 'result',
    pattern: /(?<=Resultado\s*:\s*)[0-9,.]+/,
    apply_func: (value) => {
      var newValue = value.replace('.', '')
        .replace(',', '.')
      return parseFloat(newValue)
    },
    next_inline: true,
  },
  {field: 'unit', pattern: /.+/,},
  {field: 'material', pattern: /(?<=Material\s*:\s*).+/,},
  {field: 'metodo', pattern: /(?<=Método\s*:\s*).+/,},
])

for (let i = 0; i < exam.length; i++) {
  const line = exam[i]

  if (line === '') {
    if (searchMachine.objectFilled()) {
      searchMachine.fillRestObject()
      result.push(searchMachine.getObject())
    }
    searchMachine.resetState()
    continue
  }

  searchMachine.apply(line)

  if (searchMachine.isFinalState()) {
    result.push(searchMachine.getObject())
  }
}

if (searchMachine.objectFilled()) {
  searchMachine.fillRestObject()
  result.push(searchMachine.getObject())
}

fs.writeFileSync('RESULT.json', JSON.stringify(result, null, 2))
