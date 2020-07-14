/**
 * Performs a sequence of searches (this.regex),
 * saving the results to an object (this.object).
 * @type {SearchMachine}
 */
module.exports = class SearchMachine {
  object = {}
  state = 0

  constructor(pattern) {
    this.regex = pattern
  }

  /**
   * Applies the search according to the state.
   * @param line {string}
   */
  apply(line) {
    const rgx = this.regex[this.state]
    const capture = line.match(rgx.pattern)

    // If you don't capture anything
    if (capture === null) {
      this.resetState()
      return
    }

    this.state += 1
    this.object[rgx.field] = capture[0].trim()

    // If you have function to apply on the return
    if ('apply_func' in rgx) {
      this.object[rgx.field] = rgx.apply_func(this.object[rgx.field])
    }

    // If you want to apply another search on the same line
    if ('same_line' in rgx) {
      const startLen = capture['index'] + capture[0].length
      this.apply(line.substr(startLen))
    }
  }

  /**
   * Checks to see if the object is filled.
   * @returns {boolean}
   */
  objectFilled() {
    return Object.keys(this.object).length > 0
  }

  /**
   * Check to see if it's in the final state.
   * @returns {boolean}
   */
  isFinalState() {
    return this.state === this.regex.length
  }

  /**
   * Get the object.
   * @returns {object}
   */
  getObject() {
    const object = this.object
    this.object = {}

    return object
  }

  /**
   * Fills the object with the remaining fields.
   */
  fillRestObject() {
    for (let i = 0; i < this.regex.length; i++) {
      const rgx = this.regex[i]
      if (!(rgx.field in this.object)) {
        this.object[rgx.field] = '-'
      }
    }
  }

  /**
   * Assigns to the initial state.
   */
  resetState() {
    this.state = 0
  }
}
