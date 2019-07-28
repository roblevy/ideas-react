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
      <div className="column">
        {
          note && (
            <article className="box has-background-primary">
              <h3 className="title is-2">{note.title}</h3>
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

