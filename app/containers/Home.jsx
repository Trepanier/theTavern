import React from 'react';
import 'whatwg-fetch';
import { Link, IndexLink } from 'react-router';
import {browserHistory} from 'react-router';
import {Form, FormGroup, FormControl, ControlLabel, Col, Row, Button, HelpBlock} from 'react-bootstrap'
import requestApi from '../utilities/requests'
import GroupForm from '../components/GroupForm'

/*
 * Note: This is kept as a container-level component, 
 *  i.e. We should keep this as the container that does the data-fetching 
 *  and dispatching of actions if you decide to have any sub-components.
 */
 
 export default class Home extends React.Component {



 	constructor(props){
 		super(props);
 		this.state={
 			value: ''
 		};
 	}

 	signUpRequest() {
 		requestApi('api/v1/signup', 'POST')(this.state)
 		.then((json)=> this.setState(json))
 	}

 	signUpDisplay() {
 		return (
	 		<Form horizontal>

	 			<GroupForm id='userName' label='UserName' placeholder='Username' type='text' update={(val) => this.setState({'userName': val})} />
	 			<GroupForm id='email' label='Email' placeholder='Email'type='email' update={(val) => this.setState({'email': val})}/>
	 			<GroupForm id='password' label='Password' placeholder='Password' type='password' update={(val) => this.setState({'password': val})} />
	 			<GroupForm id='confirmPassword' label='Confirm Password' placeholder='Confirm Password' type='password' update={(val) => this.setState({'confirmPassword': val})}/>

	 			<Col smOffset = {2} sm = {2} md = {2}>
	 				<Button type = 'submit' onClick = {this.signUpRequest.bind(this)}>Signup</Button>
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