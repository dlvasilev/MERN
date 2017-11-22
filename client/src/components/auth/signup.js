import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
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
  },
  passwordConfirm: {
    type: 'password',
    label: 'Confirm password',
    errorMsg: 'Please enter a password confirmation'
  }
};

class Signup extends Component {
  handleFormSubmit(formProps) {
    this.props.signupUser(formProps);
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

  renderField(field) {
    const { input, label, type, meta: { touched, error } } = field;

    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <fieldset className={className}>
        <label>{label}</label>
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

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
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
        <button action="submit" className="btn btn-primary">Sign up</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error }
}

function validate(formProps) {
  const errors = {};

  _.each(FIELDS, (field, fieldName) => {
    if(!formProps[fieldName]) {
      errors[fieldName] = field.errorMsg;
    }
  });

  if (formProps.password != formProps.passwordConfirm) {
    errors.password = 'Passwords must match';
  }

  return errors;
}

export default reduxForm({
  validate,
  form: 'signup'
})(
  connect(mapStateToProps, actions)(Signup)
);
