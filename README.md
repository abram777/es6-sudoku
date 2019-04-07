# ES6 Sudoku

### How to run:

**TL;DR:** You can see the game running by going [here](http://4bram.com/sudoku/).

## Development

### Dependencies

- `nodejs 8.14.x`
- `parcel 1.10.x`
- `yarn 1.12.x`

### Building & Testing

- Nodejs is required to build the source code.

- Install required dependencies with:

      yarn

  This will install several things but among the most important ones is **Jest** so we can run tests.

- Run tests with:

      yarn test

- Build the source code with:

      yarn build

  This will generate a folder called `dist` which will contain all the files we need to view the game in a browser, by just opening `index.html`.


### Technologies Used

- Javascript (ES6)

  It's possible to use es6 in the project with the help of [babeljs](https://babeljs.io/)(formely 6to5), this javascript compiler allows us to use upcoming features while still loading vanilla javascript in the browser (IE9+ compatible). The best example of leveraging the use of a new feature is the Puzzle, and Region objects which were written using the new class syntax. This allows for the creation of more complex objects in a more understandable fashion than what we would otherwise have if we would have written the objects by extending their prototype. [jQuery](https://jquery.com/) is also used heavily for DOM manipulations.

- [Pug](https://github.com/pugjs/pug)

  Layout templates were built with and transpiled to HTML with gulp. Jade is a very simple template language that allows for fast html generation and offers features that make it more mantainable e.g. extending templates and/or including partial templates.

- [Stylus](https://learnboost.github.io/stylus/)

  Similarly to jade, Stylus and gulp are used to generate CSS. Like other similar tools i.e. sass or less, stylus offers features such as variables, mixins, functions, etc. Specifically talking about CSS, the rules created are compatible with IE10+, and the latest Firefox/Chrome. It also has some mobile browser support which were made posible by using media queries.

- [Jest](https://facebook.github.io/jest/)

  Testing framework based on [jasmine](http://jasmine.github.io/), that has some very cool features most notably automatic mocking. It also comes with packaged with other tools and conventions which make testing very easy and a lot of fun.

- [Parcel](https://parceljs.org/)


### Improvements + TODOS

The puzzle logic was made in the simplest way posible and with the assumption the game would not scale beyond a 9x9 grid format.
Time performance was prioritized before memory performance. A profiler can help see how much this sacrifice impacts the game and posibly reveal the bottle necks that would need to be address.

Integration tests with selenium would be a plus.

The game could be improved by the use of an mvc framework like Ember, Angular, or preferably (personal opinion) with React. Right now the puzzle data structure is decoupled from the changes that are brought in by user inputs, this makes it so we have to "manually" keep both the browser state and logical structures state in sync.  A framework like the before mentioned have features that could improve this scenario.

Similarly a CSS framework/toolkit, like Bootstrap or Skeleton could help the current layout have better browser support (desktop and browser). It's reasonable to believe there are some edge cases that might have been missed that can lead to a bug or two.

Right now the game is just one puzzle, it would be nice to add some sort of puzzle generation.
