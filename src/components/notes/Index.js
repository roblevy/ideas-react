import React from 'react';

import NotesShow from './Show';

class NotesIndex extends React.Component {
  constructor(props) {
    super(props);
    this.handleNewClick = this.handleNewClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.sortNotes = this.sortNotes.bind(this);
    this.state = {
      sortBy: 'created-date|asc'
    };
  }

  componentDidMount() {
    $http.get('/ideas')
      .then(res => this.setState({ notes: res.data }))
  }

  handleNewClick() {
    $http.get('/ideas/new')
      .then(res => this.setState({
        notes: this.state.notes.concat([{ new: true, ...res.data }]),
        sortBy: 'created-date|asc'
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

  handleSortChange(event) {
    const { notes } = this.state;
    this.setState({
      sortBy: event.target.value
    });
  }

  sortNotes() {
    if (!this.state.notes) { return null };
    const [ sortBy, order ] = this.state.sortBy.split('|');
    const sorter = order === 'asc' ? -1 : 1;
    return this.state.notes.sort((a, b) =>
      a[sortBy] < b[sortBy] ? sorter : sorter * -1);
  }

  render() {
    const sortedNotes = this.sortNotes();
    return (
      <React.Fragment>
        <h2 className="title is-1">The notes index</h2>
        <hr />
        <div className="level">
          <div className="level-left">
            <p>Sorted by:</p>
            <select
              name="sort"
              value={this.state.sortBy}
              onChange={this.handleSortChange}
            >
              <option value="created_date|asc">Oldest first</option>
              <option value="created_date|desc">Newest first</option>
              <option value="title|asc">Title (A-Z)</option>
              <option value="title|desc">Title (Z-A)</option>
            </select>
          </div>
        </div>
        <div className="notes">
          {sortedNotes && sortedNotes.map(note =>
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
