import React, { Component, PropTypes } from 'react';
import {Link, IndexLink, browserHistory} from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from 'css/components/navigation';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem, Form, FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap'
import requestApi from '../utilities/requests'
const cx = classNames.bind(styles);
const {Header, Brand} = Navbar

class Navigation extends Component {

 constructor(props){
    super(props);
    this.state = {}
  }  

  componentWillMount() {
    requestApi('/api/v1/getuser')().then(user=>this.setState(user))
  }

  

  dropDown(){
    if(this.props.user){
      return(
        <NavDropdown eventKey={2} title= {this.props.user} id = "user-drop-down">
          <MenuItem eventKey={2.1} href={/profile/ + this.props.user}>Profile</MenuItem>
          <MenuItem eventKey={2.3} href="/logout">Log Out</MenuItem>  
        </NavDropdown> 
      )     
    } else {
      return <NavItem eventKey={2} href="/login">Login</NavItem>  
    }
  }

  loginDisplay() {
    return (
      <Form inline className="marginTop black alignRight">
        <FormGroup controlId = 'email' >
            <ControlLabel>Email</ControlLabel>
            {' '}
            <FormControl type = 'email' placeholder = 'Email' onChange= {e=> this.setState({email:e.target.value})}/>
        </FormGroup>
        {' '}
        <FormGroup>
            <ControlLabel>Password</ControlLabel>
            {' '}
            <FormControl type = 'password' placeholder = 'Password' onChange = {e=> this.setState({password:e.target.value})} />
        </FormGroup>
        {' '}
        <Button  onClick={this.loginReq.bind(this)}>Login</Button>
      </Form>
    )
  }

  loginReq() {
    var self = this
    requestApi('/api/v1/login', 'POST')({'email': this.state.email, 'password': this.state.password})
      .then(loginSuccess=>
        {
          if(loginSuccess.success === 'true'){
            self.props.toggleLogin()
            browserHistory.push('/profile/' + loginSuccess.user)
          } else if (loginSuccess.success === 'false') {
            alert('Login failed. You should feel bad.')
          }
        })
  }

  isLoggedIn(){
    if(this.props.user){
      return(
        <div>
        {this.dropDown()}
        <NavItem eventKey={3} href="/search">Search</NavItem>
        </div>
        )
    }else{
      return (
        <div>
        {this.loginDisplay()}
        </div>
        )
      }
    }

  render() {
    return (
      <Navbar className={"navbar-fixed-top"} fluid = 'true'>
        <Header>
          <Brand>
            THE TAVERN
          </Brand>
        </Header>
        <Nav>
            {this.isLoggedIn()}
        </Nav>
      </Navbar>
      );
  }
}



export default Navigation;