/* eslint-env jest */
jest.dontMock('../src/puzzle')
jest.dontMock('../src/position')
jest.dontMock('../src/region')

const Puzzle = require('../src/puzzle').Puzzle
const Position = require('../src/position').Position

describe('wikipedia example', function () {
  'use strict'

  let puzzle
  let addRegion0
  let addRegion1
  let addRegion2
  let addRegion3
  let addRegion4
  let addRegion5
  let addRegion6
  let addRegion7
  let addRegion8

  beforeEach(function () {
    puzzle = new Puzzle()
    addRegion0 = puzzle.add.bind(puzzle, 0)
    addRegion1 = puzzle.add.bind(puzzle, 1)
    addRegion2 = puzzle.add.bind(puzzle, 2)
    addRegion3 = puzzle.add.bind(puzzle, 3)
    addRegion4 = puzzle.add.bind(puzzle, 4)
    addRegion5 = puzzle.add.bind(puzzle, 5)
    addRegion6 = puzzle.add.bind(puzzle, 6)
    addRegion7 = puzzle.add.bind(puzzle, 7)
    addRegion8 = puzzle.add.bind(puzzle, 8)

    addRegion0(5, Position.NORTHWEST)
    addRegion0(3, Position.NORTH)
    addRegion0(6, Position.MIDWEST)
    addRegion0(9, Position.SOUTH)
    addRegion0(8, Position.SOUTHEAST)

    addRegion1(7, Position.NORTH)
    addRegion1(1, Position.MIDWEST)
    addRegion1(9, Position.MIDDLE)
    addRegion1(5, Position.MIDEAST)

    addRegion2(6, Position.SOUTH)

    addRegion3(8, Position.NORTHWEST)
    addRegion3(4, Position.MIDWEST)
    addRegion3(7, Position.SOUTHWEST)

    addRegion4(6, Position.NORTH)
    addRegion4(8, Position.MIDWEST)
    addRegion4(3, Position.MIDEAST)
    addRegion4(2, Position.SOUTH)

    addRegion5(3, Position.NORTHEAST)
    addRegion5(1, Position.MIDEAST)
    addRegion5(6, Position.SOUTHEAST)

    addRegion6(6, Position.NORTH)

    addRegion7(4, Position.MIDWEST)
    addRegion7(1, Position.MIDDLE)
    addRegion7(9, Position.MIDEAST)
    addRegion7(8, Position.SOUTH)

    addRegion8(2, Position.NORTHWEST)
    addRegion8(8, Position.NORTH)
    addRegion8(5, Position.MIDEAST)
    addRegion8(7, Position.SOUTH)
    addRegion8(9, Position.SOUTHEAST)
  })

  it('solve puzzle', function () {
    // Puzzle isnt complete
    expect(puzzle.isSolved()).toBeFalsy()

    // Solve region 1
    addRegion0(4, Position.NORTHEAST)
    addRegion0(7, Position.MIDDLE)
    addRegion0(2, Position.MIDEAST)
    addRegion0(1, Position.SOUTHWEST)
    expect(puzzle.getRegionByNumber(0).isComplete()).toBeTruthy()

    // First region completed correctly
    addRegion1(6, Position.NORTHWEST)

    // Solve region 2
    // Invalid horizontal entry in second region
    addRegion1(3, Position.NORTHEAST)
    expect(puzzle.getRegionByNumber(1).containsValue(3)).toBeFalsy()

    addRegion1(8, Position.NORTHEAST)
    addRegion1(3, Position.SOUTHWEST)
    addRegion1(4, Position.SOUTH)
    addRegion1(2, Position.SOUTHEAST)

    // Second region solved correctly
    expect(puzzle.getRegionByNumber(1).isComplete()).toBeTruthy()

    // Solve region 3
    addRegion2(9, Position.NORTHWEST)
    addRegion2(1, Position.NORTH)
    addRegion2(2, Position.NORTHEAST)
    addRegion2(3, Position.MIDWEST)
    addRegion2(4, Position.MIDDLE)
    addRegion2(8, Position.MIDEAST)
    addRegion2(5, Position.SOUTHWEST)
    addRegion2(7, Position.SOUTHEAST)

    // Third region solved correctly
    expect(puzzle.getRegionByNumber(2).isComplete()).toBeTruthy()

    // Solve region 4
    addRegion3(5, Position.NORTH)
    addRegion3(9, Position.NORTHEAST)
    addRegion3(2, Position.MIDDLE)
    addRegion3(6, Position.MIDEAST)
    addRegion3(1, Position.SOUTH)
    addRegion3(3, Position.SOUTHEAST)

    // Fourth region solved correctly
    expect(puzzle.getRegionByNumber(3).isComplete()).toBeTruthy()

    // Puzzle is still not complete
    expect(puzzle.isSolved()).toBeFalsy()

    // Solve region 5
    addRegion4(7, Position.NORTHWEST)
    addRegion4(1, Position.NORTHEAST)
    addRegion4(5, Position.MIDDLE)
    addRegion4(9, Position.SOUTHWEST)
    addRegion4(4, Position.SOUTHEAST)

    // Fifth region solved correctly
    expect(puzzle.getRegionByNumber(4).isComplete()).toBeTruthy()

    // Solve region 6
    addRegion5(4, Position.NORTHWEST)
    addRegion5(2, Position.NORTH)
    addRegion5(7, Position.MIDWEST)
    addRegion5(9, Position.MIDDLE)
    addRegion5(8, Position.SOUTHWEST)
    addRegion5(5, Position.SOUTH)

    // Sixth region solved correctly
    expect(puzzle.getRegionByNumber(5).isComplete()).toBeTruthy()

    // Solve region 7
    // Invalid vertical entry in seventh region
    addRegion6(8, Position.NORTHWEST)
    expect(puzzle.getRegionByNumber(6).containsValue(8)).toBeFalsy()

    addRegion6(9, Position.NORTHWEST)
    addRegion6(1, Position.NORTHEAST)
    addRegion6(2, Position.MIDWEST)
    addRegion6(8, Position.MIDDLE)
    addRegion6(7, Position.MIDEAST)
    addRegion6(3, Position.SOUTHWEST)
    addRegion6(4, Position.SOUTH)
    addRegion6(5, Position.SOUTHEAST)

    // Seventh region solved correctly
    expect(puzzle.getRegionByNumber(6).isComplete()).toBeTruthy()

    // Solve region 8
    addRegion7(5, Position.NORTHWEST)
    addRegion7(3, Position.NORTH)
    addRegion7(7, Position.NORTHEAST)
    addRegion7(2, Position.SOUTHWEST)
    addRegion7(6, Position.SOUTHEAST)

    // Eighth region solved correctly
    expect(puzzle.getRegionByNumber(7).isComplete()).toBeTruthy()

    // Solve region 9
    addRegion8(4, Position.NORTHEAST)
    addRegion8(6, Position.MIDWEST)
    addRegion8(3, Position.MIDDLE)
    addRegion8(1, Position.SOUTHWEST)

    // Ninth region solved correctly
    expect(puzzle.getRegionByNumber(8).isComplete()).toBeTruthy()

    // Puzzle is complete
    expect(puzzle.isSolved()).toBeTruthy()
  })
})
