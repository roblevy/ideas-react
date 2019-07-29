# Ideas/Notes in React

This is a demonstration of a simple React app.

It includes some of the standard setup, like Webpack and Babel, and also a CSS framework called <a href="https://bulma.io/" target="blank">Bulma</a>. 

The additional styling is done with SCSS, loaded using Webpack's `sass-loader`.


The 'backend' is a mocked version of axios, which pretends to take a couple of milliseconds to retrieve data via a RESTful API but is in fact entirely in memory.

See `/dist/mock-backend.js` for details of how it works.

# Running the app

To get up and running, simply type:

```
yarn
yarn start
```
