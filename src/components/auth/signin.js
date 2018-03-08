import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signin extends Component {
  handleFormSubmit({ email, password }) {
    console.log(email, password);
    //need to do something to log user in
    this.props.signinUser({ email, password })
  }
  
  renderInput = field => (
    <div>
      <input {...field.input} type={field.type} className="form-control" />
      {field.meta.touched && field.meta.error}
      <span>{field.meta.error}</span>
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
    const { handleSubmit, fields: { email, password }} = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email</label>
          <Field
            name="email"
            component={this.renderInput}
            type="text" 
          />
        </fieldset>
        <fieldset className="form-group">
          <label>Password</label>
          <Field
            name="password"
            component={this.renderInput}
            type="password" 
          />
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign in</button>
      </form>      
    )
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signin',
  fields: ['email', 'password']
})(
  connect(mapStateToProps, actions)(Signin)
);