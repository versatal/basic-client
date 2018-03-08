import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signup extends Component {
  handleFormSubmit(formProps) {
    //console.log(email, password);
    //need to do something to log user in
    this.props.signupUser(formProps)
  }
  
  renderInput = field => (
    <div>
      <input {...field.input} type={field.type} className="form-control" />
      {
        field.meta.touched && 
        field.meta.error &&
        <span className="error">{field.meta.error}</span>
      } 
    </div>
  )

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }
  
  render() {
    const { handleSubmit, fields: { email, password, passwordConfirm }} = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <Field
            name="email"
            component={this.renderInput}
            type="text" 
          />
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <Field
            name="password"
            component={this.renderInput}
            type="password" 
          />
        </fieldset>
        <fieldset className="form-group">
          <label>Confirm Password:</label>
          <Field
            name="passwordConfirm"
            component={this.renderInput}
            type="password" 
          />
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign Up</button>
      </form>      
    )
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }
  
  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }
  
  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  }
  
  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match';
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate
})(
  connect(mapStateToProps, actions)(Signup)
);