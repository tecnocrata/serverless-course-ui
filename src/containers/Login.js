import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { Auth } from 'aws-amplify';
import LoaderButton from "../components/LoaderButton";
import './Login.css';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: '',
      password: ''
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });
  
    try {
      await Auth.signIn(this.state.email, this.state.password);
      //BTW I think aws-amplify is storing session info into LocalStorage
      this.props.userHasAuthenticated(true);
      this.props.history.push('/'); //This method comes from React's Route component (React Router v4)
      this.setState({ isLoading: false });
    } catch (e) {
      alert(e.message);
    }
  }

  //Well explanation about this file in: https://serverless-stack.com/chapters/create-a-login-page.html
  render() {
    return (
      <div className='Login'>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId='email' bsSize='large'>
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type='email'
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId='password' bsSize='large'>
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type='password'
            />
          </FormGroup>
          <LoaderButton
            block
            bsSize='large'
            disabled={!this.validateForm()}
            type='submit'
            isLoading={this.state.isLoading}
            text='Login'
            loadingText='Logging in…'
            />
        </form>
      </div>
    );
  }
}