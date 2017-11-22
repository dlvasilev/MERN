import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signout extends Component {
  componentWillMount() {
    this.props.signoutUser();
  }

  render() {
    return (
      <div>
        <h3>Sorry, to see you go...</h3>
      </div>
    );
  }
}

export default connect(null, actions)(Signout);
