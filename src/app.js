import React from 'react';
import ReactDOM from  'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './scss/main.scss';
import 'bulma/css/bulma.css';

import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/About';
import NotesIndex from './components/notes/Index';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <Header />
        <main className="section">
          <Switch>
            <Route path="/about" component={About} />
            <Route path="/" component={NotesIndex} />
          </Switch>
        </main>
        <Footer />
      </Router>

    );
  }
}

ReactDOM.render(
  <App />, document.getElementById('root')
);
