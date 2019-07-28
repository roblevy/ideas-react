import React from 'react';

class NotesShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.setState({
      note: this.props.note
    });
  }
  render() {
    const { note } = this.state;
    return (
      <div>
      {
        note && (
          <article className="note">
            <h3 className="title">{note.title}</h3>
            <div className="body">
              <p>{note.body}</p>
            </div>
          </article>
        )
      }
      </div>

    );
  }
}

export default NotesShow;

