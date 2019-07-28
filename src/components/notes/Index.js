import React from 'react';

import NotesShow from './Show';

class NotesIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    $http.get('/ideas')
      .then(res => this.setState({ notes: res.data }))
  }

  render() {
    const { notes } = this.state;
    return (
      <React.Fragment>
        <h2 className="title is-1">The notes index</h2>
        <div className="columns">
          {notes && notes.map(note =>
              <NotesShow key={note.id} note={note} />)
          }
        </div>
      </React.Fragment>

    );
  }
}

export default NotesIndex;