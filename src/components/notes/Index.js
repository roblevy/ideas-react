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
    axios.get('/ideas')
      .then(res => this.setState({ notes: res.data }))
  }

  handleNewClick() {
    axios.get('/ideas/new')
      .then(res => this.setState({
        notes: this.state.notes.concat([{ new: true, ...res.data }]),
        sortBy: 'created-date|asc'
      }))
  }

  handleDeleteClick(note) {
    axios.post('/idea/delete', note)
      .then(res => axios.get('/ideas'))
      .then(res => this.setState({ notes: res.data }));
  }

  handleEditSubmit(note) {
    axios.post('/idea/update', note)
      .then(res => axios.get('/ideas'))
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
        <h2 className="title">All your notes and ideas</h2>
        <h3 className="subtitle">Click on the plus to add a note. Click on the title or the main area to edit.</h3>
        <p>You can only write up to 139 characters in your notes, so make them succint!</p>
        <hr />
        <div class="field">
          <label class="label" for="sort">Sorted by</label>
          <div class="control">
            <div class="select">
              <select
                name="sort"
                value={this.state.sortBy}
                onChange={this.handleSortChange}
                className="select"
              >
                <option value="created_date|asc">Oldest first</option>
                <option value="created_date|desc">Newest first</option>
                <option value="title|asc">Title (A-Z)</option>
                <option value="title|desc">Title (Z-A)</option>
              </select>
            </div>
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
