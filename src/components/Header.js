import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import classNames from 'classnames';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headerIsActive: false
    }
    this.toggleHeader = this.toggleHeader.bind(this);
  }

  toggleHeader() {
    this.setState({
      headerIsActive: !this.state.headerIsActive
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({
        headerIsActive: false
      })
    }
  }

  render() {
    return (
      <header>
        <nav
          className='navbar is-primary has-text-dark'
          role="navigation"
          aria-label="main navigation"
        >
          <div className="navbar-brand">
            <Link className="navbar-item" to="/">
              Note so simple
            </Link>

            <a
              role="button"
              className={classNames({
                'navbar-burger': true, 'burger': true,
                'is-active': this.state.headerIsActive
              })}
              aria-label="menu"
              aria-expanded="false"
              onClick={this.toggleHeader}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          <div className={classNames({
            'navbar-menu': true,
            'is-active': this.state.headerIsActive
          })}>
            <div className="navbar-start">
              <Link to="/" className="navbar-item">
                Home
              </Link>

              <Link to="/about" className="navbar-item">
                About
              </Link>

            </div>

          </div>
        </nav>
      </header>
    );
  }
}

export default withRouter(Header);
