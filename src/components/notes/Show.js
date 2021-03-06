import React from 'react';

class NotesShow extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.beginEditing = this.beginEditing.bind(this);
    this.titleRef = React.createRef();
    this.bodyRef = React.createRef();
    this.state = {
      editTitle: false,
      editBody: false
    };
  }

  componentDidMount() {
    this.setState({
      note: this.props.note
    }, () => {
      if (this.state.note.new) {
        this.beginEditing('editTitle', this.titleRef);
      }
    });
  }

  onChange(event) {
    let { name, value } = event.target;
    if (name === 'body') {
      value = value.substr(0, 139);
    }
    this.setState({
      note: {
        ...this.state.note,
        [name]: value
      }
    })
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.handleSubmit(this.state.note);
    this.setState({
      editTitle: false,
      editBody: false
    })
  }

  beginEditing(field, ref) {
    this.setState({
      [field]: true
    }, () => {
      ref.current.focus();
    });
  }

  render() {
    const { note, editTitle, editBody } = this.state;
    const charsRemaining = note && 139 - note.body.length;
    return (
      <article className="box is-paddingless message note is-primary">
        {
          note && (
            <form onSubmit={this.onSubmit}>
              <div className="message-header is-marginless">
                {editTitle ?
                    <input
                      name="title"
                      className="title-input is-size-6"
                      value={note.title || ''}
                      onChange={this.onChange}
                      onBlur={this.onSubmit}
                      ref={this.titleRef}
                      placeholder="Note title"
                    />
                    :
                    <h3
                      className="title-text is-size-6"
                      onClick={() => this.beginEditing('editTitle', this.titleRef)}
                    >{note.title}</h3>
                }
                <div className="level-right">
                  <button
                    type="button"
                    className="delete is-small"
                    onClick={this.props.handleDelete}
                  ></button>
                </div>
              </div>
              <div className="message-body is-paddingless">
            {editBody ?
                <div className="body-editing">
                  <textarea
                    name="body"
                    className="body is-size-7"
                    value={note.body || ''}
                    onChange={this.onChange}
                    onBlur={this.onSubmit}
                    ref={this.bodyRef}
                  />
                  {charsRemaining <= 15 &&
                      <p className="body-length">{charsRemaining}</p> }
                </div>
                :
                <p
                  className="body is-size-7"
                  onClick={() => this.beginEditing('editBody', this.bodyRef)}
                >{note.body}</p>
            }
          </div>
            </form>
          )
        }
      </article>

    );
  }
}

export default NotesShow;

