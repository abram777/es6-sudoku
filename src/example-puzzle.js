const generateExamplePuzzle = ($positions, addValueCallback) => {
  const gridHash = {
    '0,0,0': 5,
    '0,0,1': 3,
    '0,1,0': 6,
    '0,2,1': 9,
    '0,2,2': 8,

    '1,0,1': 7,
    '1,1,0': 1,
    '1,1,1': 9,
    '1,1,2': 5,

    '2,2,1': 6,

    '3,0,0': 8,
    '3,1,0': 4,
    '3,2,0': 7,

    '4,0,1': 6,
    '4,1,0': 8,
    '4,1,2': 3,
    '4,2,1': 2,

    '5,0,2': 3,
    '5,1,2': 1,
    '5,2,2': 6,

    '6,0,1': 6,

    '7,1,0': 4,
    '7,1,1': 1,
    '7,1,2': 9,
    '7,2,1': 8,

    '8,0,0': 2,
    '8,0,1': 8,
    '8,1,2': 5,
    '8,2,1': 7,
    '8,2,2': 9
  }

  $positions.each((index, positionHtml) => {
    const $position = $(positionHtml)
    const region = $position.data('region')
    const position = $position.data('position')
    const gridHashKey = region + ',' + position

    if (gridHash[gridHashKey]) {
      const success = addValueCallback(region, gridHash[gridHashKey], position)

      if (success) {
        $position.text(gridHash[gridHashKey])
      }
    }
  })
}

module.exports = { generateExamplePuzzle }
