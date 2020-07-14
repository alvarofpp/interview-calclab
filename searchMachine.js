module.exports = class SearchMachine {
  object = {}
  state = 0

  constructor(pattern) {
    this.regex = pattern
  }

  apply(line) {
    const rgx = this.regex[this.state]
    const capture = line.match(rgx.pattern)

    if (capture === null) {
      this.resetState()
      return
    }

    this.state += 1
    this.object[rgx.field] = capture[0].trim()

    if ('next_inline' in rgx) {
      const startLen = capture['index'] + capture[0].length
      this.apply(line.substr(startLen))
    }
  }

  isFinalState() {
    return this.state === this.regex.length
  }

  getObject() {
    const object = this.object
    this.object = {}
    return object
  }

  fillRestObject() {
    for (let i = 0; i < this.regex.length; i++) {
      const rgx = this.regex[i]
      if (!(rgx.field in this.object)) {
        this.object[rgx.field] = '-'
      }
    }
  }

  resetState() {
    this.state = 0
  }
}