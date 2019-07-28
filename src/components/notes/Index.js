import React from 'react';

import NotesShow from './Show';

class NotesIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleNewClick = this.handleNewClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
  }

  componentDidMount() {
    $http.get('/ideas')
      .then(res => this.setState({ notes: res.data }))
  }

  handleNewClick() {
    $http.get('/ideas/new')
      .then(res => this.setState({
        notes: this.state.notes.concat([res.data])
      }))
  }

  handleDeleteClick(note) {
    $http.post('/idea/delete', note)
      .then(res => $http.get('/ideas'))
      .then(res => this.setState({ notes: res.data }));
  }

  handleEditSubmit(note) {
    $http.post('/idea/update', note)
      .then(res => $http.get('/ideas'))
      .then(res => this.setState({ notes: res.data }));
  }

  render() {
    const { notes } = this.state;
    return (
      <React.Fragment>
        <h2 className="title is-1">The notes index</h2>
        <div className="notes">
          {notes && notes.map(note =>
            <NotesShow
              key={note.id}
              note={note}
              handleDelete={() => this.handleDeleteClick(note)}
              handleSubmit={this.handleEditSubmit}
            />)
          }
          <div className="box note new-note has-text-1" onClick={this.handleNewClick}>
            <p>+</p>
          </div>
        </div>
      </React.Fragment>

    );
  }
}

export default NotesIndex;
