let selectedPosition

const keys = {
  49: 1,
  50: 2,
  51: 3,
  52: 4,
  53: 5,
  54: 6,
  55: 7,
  56: 8,
  57: 9
}

function convertDataPositionToArray (dataPosition) {
  return dataPosition.split(',').map(point => parseInt(point, 10))
}

function animateResult (result) {
  selectedPosition.removeClass('success')
  selectedPosition.removeClass('fail')

  if (result !== undefined && result !== null) {
    const correspondingResultClass = result ? 'success' : 'fail'

    selectedPosition.addClass(correspondingResultClass)

    return result
  }

  return false
}

function keyUpEvent (ev, addValueCallback) {
  if (selectedPosition) {
    const keyCode = ev.keyCode

    if (keyCode >= 49 && keyCode <= 57) {
      const regionNumber = selectedPosition.data('region')
      const value = keys[keyCode]
      const position = selectedPosition.data('position')

      // Add to puzzle structure before modifying the DOM
      const success = animateResult(addValueCallback(regionNumber, value, position))

      if (success) {
        selectedPosition.text(value)
      }
    }
  }
}

function positionClickEvent (ev, previousPositionValidCallback) {
  if (selectedPosition) {
    const regionNumber = selectedPosition.data('region')
    const position = convertDataPositionToArray(selectedPosition.data('position'))

    if (previousPositionValidCallback(regionNumber, position)) {
      selectedPosition.addClass('success')
    }

    selectedPosition.removeClass('fail')
    selectedPosition.removeClass('selected')
  }

  selectedPosition = $(ev.target)
  selectedPosition.addClass('selected')
}

function inputClickEvent (ev, addValueCallback, removeCallback) {
  if (selectedPosition) {
    const $input = $(ev.target)
    const regionNumber = selectedPosition.data('region')
    const value = $input.text()

    if ($input && $input.hasClass('remove')) {
      const success = removeCallback(regionNumber, selectedPosition.text())

      if (success) {
        animateResult()
        selectedPosition.text('')
      }
    } else {
      const position = selectedPosition.data('position')
      const success = animateResult(addValueCallback(regionNumber, value, position))

      if (success) {
        selectedPosition.text(value)
      }
    }
  }
}

function howToPlayClickEvent (ev, $htmlElement) {
  ev.preventDefault()

  $htmlElement.toggleClass('show')
}

module.exports = { convertDataPositionToArray, keyUpEvent, positionClickEvent, inputClickEvent, howToPlayClickEvent }
