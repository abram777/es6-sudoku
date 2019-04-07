/* eslint-env jest */
jest.dontMock('../src/puzzle')
jest.dontMock('../src/position')
jest.dontMock('../src/region')

const Puzzle = require('../src/puzzle').Puzzle
const Position = require('../src/position').Position

describe('Puzzle', function () {
  'use strict'
  let puzzle
  let addRegion0
  let addRegion1
  let addRegion3

  beforeEach(function () {
    puzzle = new Puzzle()

    addRegion0 = puzzle.add.bind(puzzle, 0)
    addRegion1 = puzzle.add.bind(puzzle, 1)
    addRegion3 = puzzle.add.bind(puzzle, 3)
  })

  it('regions can be locked so they are not overwritten by the user', function () {
    addRegion0(1, [0, 0])
    puzzle.lockRegionValue(0, 1)

    const region0 = puzzle.getRegionByNumber(0)
    expect(region0.containsValue(1)).toBeTruthy()

    addRegion0(2, [0, 0])
    expect(region0.containsValue(1)).toBeTruthy()
    expect(region0.containsValue(2)).toBeFalsy()

    const result = puzzle.remove(0, 1)
    expect(result).toBeFalsy()
    expect(region0.containsValue(1)).toBeTruthy()
  })

  describe('add values to multiple regions', function () {
    let region0
    let region1

    beforeEach(function () {
      addRegion0(1, Position.NORTHWEST)

      region0 = puzzle.getRegionByNumber(0)
      region1 = puzzle.getRegionByNumber(1)
    })

    it('add values to one region', function () {
      expect(region0.containsValue(1))
    })

    it('add valid values to second region maintaining values in first region intact',
      function () {
        addRegion1(1, Position.MIDWEST)
        addRegion1(9, Position.MIDDLE)

        expect(region0.containsValue(1))

        expect(region1.containsValue(1))
        expect(region1.containsValue(9))
      })

    it('cant add invalid horizontal values to second region', function () {
      const result = addRegion1(1, Position.NORTHEAST)
      expect(result).toBeFalsy()

      expect(region1.containsValue(1)).toBeFalsy()
    })

    it('cant add invalid vertical values to second region', function () {
      const result = addRegion3(1, Position.MIDWEST)
      expect(result).toBeFalsy()

      const region3 = puzzle.getRegionByNumber(3)
      expect(region3.containsValue(1)).toBeFalsy()
    })
  })
})
