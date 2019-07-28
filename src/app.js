import React from 'react';
import ReactDOM from  'react-dom';
import 'bulma/css/bulma.css';

import Header from './components/Header';
import Footer from './components/Footer';
import NotesIndex from './components/notes/Index';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <NotesIndex />
        <Footer />
      </React.Fragment>

    );
  }
}

ReactDOM.render(
  <App />, document.getElementById('root')
);
