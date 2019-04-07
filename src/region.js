class Region {
  constructor (number) {
    this.number = number
    this.grid = {}
    this.occupiedPositions = {}
  }

  static isPositionValid (position) {
    const x = position[0]
    const y = position[1]

    if ((x < 0 || x > 2) || (y < 0 || y > 2)) {
      return false
    }

    return true
  }

  containsValue (value) {
    return Boolean(this.grid[value])
  }

  add (value, position) {
    if (this.canAddToGrid(value, position)) {
      this.grid[value] = position
      this.occupiedPositions[position.toString()] = true

      return true
    }
    return false
  }

  getValuePosition (value) {
    return this.grid[value]
  }

  remove (value) {
    if (!this.containsValue(value)) {
      return false
    }

    this.occupiedPositions[this.getValuePosition(value).toString()] = false
    delete this.grid[value]

    return true
  }

  isPositionOccupied (position) {
    return this.occupiedPositions[position.toString()]
  }

  canAddToGrid (value, position) {
    return Region.isPositionValid(position) &&
               !this.containsValue(value) &&
               !this.isPositionOccupied(position)
  }

  isComplete (log) {
    if (log) console.log(this.grid)
    return Object.keys(this.grid).length === 9
  }
}

module.exports = { Region }
