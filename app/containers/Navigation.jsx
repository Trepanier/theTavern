import React, { Component, PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from 'css/components/navigation';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem, Form, FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap'
const cx = classNames.bind(styles);
const {Header, Brand} = Navbar

class Navigation extends Component {

 constructor(props){
    super(props);
    this.state = {}
  }  

  componentWillMount() {
    var self = this
    fetch('/api/v1/getuser', {credentials : 'same-origin'})
    .then(function(response) {
      return response.json()
    }).then(function(json){
      self.setState(json)
      console.log("parsed json", json)
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
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
      <Form inline>
        <FormGroup controlId = 'email'>
            <ControlLabel>Email</ControlLabel>
            {' '}
            <FormControl type = 'email' placeholder = 'Email' />
        </FormGroup>
        {' '}
        <FormGroup>
            <ControlLabel>Password</ControlLabel>
            {' '}
            <FormControl type = 'password' placeholder = 'Password' />
        </FormGroup>
        {' '}
        <Button type = 'submit'>Login</Button>
      </Form>
    )
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
          <NavItem eventKey={1} href='/'>Home</NavItem>
          {this.dropDown()}
        </Nav>
      </Navbar>
      );
  }
}



export default Navigation;