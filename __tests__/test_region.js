/* eslint-env jest */
jest.dontMock('../src/region')
jest.dontMock('../src/position')

const Region = require('../src/region').Region
const Position = require('../src/position').Position

describe('Region', function () {
  'use strict'

  let region

  beforeEach(function () {
    region = new Region()
  })

  it('basic functions', function () {
    let result = region.add(1, Position.NORTHWEST)
    expect(result).toBeTruthy()
    expect(region.containsValue(1)).toBeTruthy()
    expect(region.getValuePosition(1)).toEqual([0, 0])
    expect(region.isPositionOccupied(Position.NORTHWEST)).toBeTruthy()

    result = region.remove(1)
    expect(result).toBeTruthy()
    expect(region.containsValue(1)).toBeFalsy()
    expect(region.isPositionOccupied(Position.NORTHWEST)).toBeFalsy()
  })

  describe('basic behaviour', function () {
    beforeEach(function () {
      region.add(1, Position.NORTHWEST)
    })

    it('cant add a value to a position out of the bounds of a 3x3 grid', function () {
      let result = region.add(5, [3, 3])
      expect(result).toBeFalsy()
      expect(region.containsValue(5)).toBeFalsy()

      result = region.add(5, [-1, 100])
      expect(result).toBeFalsy()
      expect(region.containsValue(5)).toBeFalsy()
    })

    it('cant add a value to a position already occupied by another value', function () {
      region.add(2, Position.NORTHWEST)

      expect(region.containsValue(2)).toBeFalsy()
      expect(region.containsValue(1)).toBeTruthy()
    })

    it('cant add value in a different position if its already in the region', function () {
      region.add(1, Position.SOUTHEAST)

      expect(region.getValuePosition(1)).not.toEqual(Position.SOUTHEAST)
      expect(region.getValuePosition(1)).toEqual(Position.NORTHWEST)
    })

    it('can add a value in a different position if its removed from the original position first',
      function () {
        region.remove(1)
        region.add(1, Position.SOUTHEAST)

        expect(region.getValuePosition(1)).not.toEqual(Position.NORTHWEST)
        expect(region.getValuePosition(1)).toEqual(Position.SOUTHEAST)
      })

    it('is complete once the 3x3 grid is full', function () {
      region.add(2, Position.NORTH)
      region.add(3, Position.NORTHEAST)
      region.add(4, Position.MIDWEST)
      region.add(5, Position.MIDDLE)
      region.add(6, Position.MIDEAST)
      region.add(7, Position.SOUTHWEST)
      region.add(8, Position.SOUTH)
      expect(region.isComplete()).toBeFalsy()

      region.add(9, Position.SOUTHEAST)
      expect(region.isComplete()).toBeTruthy()

      region.remove(9)
      expect(region.isComplete()).toBeFalsy()

      region.add(9, Position.SOUTHEAST)
      expect(region.isComplete()).toBeTruthy()
    })
  })
})
