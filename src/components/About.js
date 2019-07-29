import React from 'react';

const About = () => ( 
  <section className="content">
    <h2 className="title">About this page</h2>
    <p>
      This is a demonstration of a simple React app.

      It includes some of the standard setup, like Webpack and Babel, and also a CSS framework called <a href="https://bulma.io/" target="blank">Bulma</a>. 

      The additional styling is done with SCSS, loaded using Webpack's <span className="is-family-monospace">sass-loader</span>.
    </p>
    <p>
      The 'backend' is a mocked version of axios, which pretends to take a couple of milliseconds to retrieve data via a RESTful API but is in fact entirely in memory.

      See <span className="is-family-monospace">/dist/mock-backend.js</span> for details of how it works.
    </p>
    <p>
    </p>

  </section>
)

export default About;
