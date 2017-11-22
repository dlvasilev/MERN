import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component {
  renderLinks() {
    if(!this.props.authenticated) {
      return [
        <li className="nav-item" key="signin">
          <Link className="nav-link" to="/signin">Sign in</Link>
        </li>,
        <li className="nav-item" key="signup">
          <Link className="nav-link" to="/signup">Sign up</Link>
        </li>
      ];
    } else {
      return [
        <li className="nav-item" key="user">
          <Link className="nav-link" to="/user">User</Link>
        </li>,
        <li className="nav-item" key="sigout">
          <Link className="nav-link" to="/signout">Sign out</Link>
        </li>
      ];
    }
  }

  render() {
    return (
      <nav className="navbar navbar-light">
        <Link to="/" className="navbar-brand">NERM</Link>
        <ul className="nav navbar-nav">
          {this.renderLinks()}
        </ul>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(Header);
