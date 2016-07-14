import React from 'react';
import 'whatwg-fetch';
import { Link, IndexLink } from 'react-router';
import {browserHistory} from 'react-router';
import {Form, FormGroup, FormControl, ControlLabel, Col, Row, Button} from 'react-bootstrap'
/*
 * Note: This is kept as a container-level component, 
 *  i.e. We should keep this as the container that does the data-fetching 
 *  and dispatching of actions if you decide to have any sub-components.
 */
 
 export default class Home extends React.Component {

 	constructor(props){
 		super(props);
 		this.state={};
 	}

 	signUpDisplay() {
 		return (
	 		<Form horizontal>
	 			<FormGroup controlId = 'userName'>
	 				<Col componentClass = {ControlLabel} sm = {2} md = {2}>
	 					Username
	 				</Col>
	 				<Col sm = {4} md = {4}>
	 					<FormControl type = 'text' placeholder = 'Username' />
	 				</Col>
	 			</FormGroup>
	 			
	 			<FormGroup controlId = 'email'>
	 				<Col componentClass = {ControlLabel} sm = {2} md = {2}>
	 					Email
	 				</Col>
	 				<Col sm = {4} md = {4}>
	 					<FormControl type = 'email' placeholder = 'Email' />
	 				</Col>
	 			</FormGroup>
	 			
	 			<FormGroup controlId = 'password'>
	 				<Col componentClass = {ControlLabel} sm = {2} md = {2}>
	 					Password
	 				</Col>
	 				<Col sm = {4} md = {4}>
	 					<FormControl type = 'password' placeholder = 'Password' />
	 				</Col>
	 			</FormGroup>
	 			
	 			<FormGroup controlId = 'confirmPassword'>
	 				<Col componentClass = {ControlLabel} sm = {2} md = {2}>
	 					Confirm Password
	 				</Col>
	 				<Col sm = {4} md = {4}>
	 					<FormControl type = 'password' placeholder = 'Confirm Password' />
	 				</Col>
	 			</FormGroup>

	 			<Col smOffset = {2} sm = {2} md = {2}>
	 				<Button type = 'submit'>Signup</Button>
	 			</Col>
	 		</Form>
	 	)
 	}

 	render(){
 		return (
 			<div className = 'centerText marginTop'>
 				<h1 className = 'profileName'>Welcome to The Tavern</h1>
 				<h2>The Tavern is a place where D & D users and enthusiasts gather to plan their next party</h2>
 				{this.signUpDisplay()}
 			</div>

 		)
 	} 	
 }