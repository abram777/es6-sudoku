const { Puzzle } = require('./puzzle')
const dom = require('./dom-scripting')
const { generateExamplePuzzle } = require('./example-puzzle')

$(function () {
  'use strict'

  const puzzle = new Puzzle()
  const $positions = $('.position')
  const $rules = $('.rules')
  const $gameWon = $('.game-won-prompt')

  function addValue (region, value, position) {
    const result = puzzle.add(region, value, dom.convertDataPositionToArray(position))

    if (result && puzzle.isSolved()) {
      $('.game-info').addClass('show')
      $gameWon.addClass('show')
      $rules.addClass('hide')
      unregisterListeners()
    }

    return result
  }

  generateExamplePuzzle($positions, (regionNumber, value, position) => {
    const result = puzzle.add(regionNumber, value, dom.convertDataPositionToArray(position))
    puzzle.lockRegionValue(regionNumber, value)

    return result
  })

  $positions.on('click', (ev) => {
    dom.positionClickEvent(ev, (regionNumber, position) => {
      return puzzle.getRegionByNumber(regionNumber).isPositionOccupied(position)
    })
  })

  $('body').on('keyup', (ev) => {
    dom.keyUpEvent(ev, addValue, puzzle.remove.bind(puzzle))
  })

  $('.input').on('click', (ev) => {
    dom.inputClickEvent(ev, addValue, puzzle.remove.bind(puzzle))
  })

  $('.how-to-play').on('click', (ev) => {
    dom.howToPlayClickEvent(ev, $('.game-info'))
  })

  function unregisterListeners () {
    $('body').off('keyup')
    $('.input').off('click')
    $('.how-to-play').off('click')
    $positions.off('click')
  }
})
