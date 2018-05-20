import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {Nav, Navbar, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import { Auth } from 'aws-amplify';
import Routes from './Routes';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
  }

  async componentDidMount() {
    //This method will be called once App component is ready EVEN if broswer it is refreshed
    try {
      //To make our login information persist we need to store and load it from the browser session.
      //There are a few different ways we can do this, using Cookies or Local Storage.
      //Thankfully the AWS Amplify does this for us automatically and we just need to read from it 
      //and load it into our application state. using: Auth.currentSession()
      if (await Auth.currentSession()) { 
        this.userHasAuthenticated(true);
      }
      console.log('Authenticated? '+this.state.isAuthenticated);
    }
    catch(e) {
      if (e !== 'No current user') {
        //If it is other errordifferent than 'No current user'
        alert(e);
      }
    }
  
    this.setState({ isAuthenticating: false });
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  handleLogout = async event => {
    await Auth.signOut();
    this.userHasAuthenticated(false);
    //Because App component does not have access to the router props directly 
    //since it is not rendered inside a Route component. 
    //To be able to use the router props in our App component 
    //we will need to use the withRouter Higher-Order Component (or HOC). 
    //TODO: Read https://reactjs.org/docs/higher-order-components.html
    //TODO: Read https://reacttraining.com/react-router/web/api/withRouter
    this.props.history.push('/login'); 
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
  
    return (
      !this.state.isAuthenticating &&
      <div className='App container'>
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to='/'>Scratch</Link>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              {this.state.isAuthenticated
                ? <NavItem onClick={this.handleLogout}>Logout</NavItem>
                : <Fragment>
                  {/* WHY NOT?
                      <Link to='/signup'>Signup</Link>
                  */}
                    <LinkContainer to='/signup'>
                      <NavItem>Signup</NavItem>
                    </LinkContainer>
                    <LinkContainer to='/login'>
                      <NavItem>Login</NavItem>
                    </LinkContainer>
                  </Fragment>
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes childProps={childProps} />
      </div>
    );
  }
}

export default withRouter(App);