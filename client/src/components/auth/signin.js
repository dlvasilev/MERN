import _ from 'lodash';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const FIELDS = {
  email: {
    type: 'email',
    label: 'Email',
    errorMsg: 'Please enter an email'
  },
  password: {
    type: 'password',
    label: 'Password',
    errorMsg: 'Please enter a password'
  }
};

class Signin extends Component {
  handleFormSubmit({ email, password }) {
    this.props.signinUser({ email, password });
  }

  renderField(field) {
    const { input, label, type, meta: { touched, error } } = field;

    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <fieldset className={className}>
        <label>{label}: </label>
        <input
          {...input}
          placeholder={label}
          type={type}
          className="form-control"  />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </fieldset>
    );
  }

  renderAlert() {
    if(this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      )
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="row">

        <form className="col-md-4 col-md-offset-4"
          onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          {_.map(FIELDS, (field, fieldName) => {
            return (
              <Field
                name={fieldName}
                component={this.renderField}
                key={fieldName}
                {...field} />
            );
          })}
          {this.renderAlert()}
          <button action="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

function validate(formProps) {
  const errors = {};

  _.each(FIELDS, (field, fieldName) => {
    if(!formProps[fieldName]) {
      errors[fieldName] = field.errorMsg;
    }
  });

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  validate,
  form: 'signin'
})(
  connect(mapStateToProps, actions)(Signin)
);
