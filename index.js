const SearchMachine = require('./searchMachine')
const fs = require('fs')
const exam = fs.readFileSync('./EXAM.txt').toString().split('\n')
const result = []

const searchMachine = new SearchMachine([
  {
    field: 'name',
    pattern: /(?<=Exame\s*:).+/,
  },
  {
    field: 'result',
    pattern: /(?<=Resultado\s*:\s*)[0-9,.]+/,
    apply_func: (value) => {
      var newValue = value.replace('.', '')
        .replace(',', '.')
      return parseFloat(newValue)
    },
    same_line: true,
  },
  {
    field: 'unit',
    pattern: /.+/,
  },
  {
    field: 'material',
    pattern: /(?<=Material\s*:\s*).+/,
  },
  {
    field: 'metodo',
    pattern: /(?<=Método\s*:\s*).+/,
  },
])

for (let i = 0; i < exam.length; i++) {
  const line = exam[i]

  if (line === '') {
    // If the object has already begun to be filled
    if (searchMachine.objectFilled()) {
      searchMachine.fillRestObject()
      result.push(searchMachine.getObject())
    }
    searchMachine.resetState()
    continue
  }

  // Apply the search
  searchMachine.apply(line)

  // If the entire hunt set has occurred ideally
  if (searchMachine.isFinalState()) {
    result.push(searchMachine.getObject())
  }
}

// Get the last object
if (searchMachine.objectFilled()) {
  searchMachine.fillRestObject()
  result.push(searchMachine.getObject())
}

fs.writeFileSync('RESULT.json', JSON.stringify(result, null, 2))
