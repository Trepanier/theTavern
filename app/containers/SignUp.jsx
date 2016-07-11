import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/home';
import 'whatwg-fetch';
const cx = classNames.bind(styles);
import {browserHistory} from 'react-router';
import {Button, form, FormGroup, ControlLabel, FormControl, Col, Row} from 'react-bootstrap';

export default class SignUp extends React.Component {
	constructor(props){
		super(props)
		this.state ={
			userName:'',
			email:'',
			password:'',
			success:''
		}
	}

	pullUser(){
		var self = this
		console.log(self)
		fetch('/api/v1/signup', {
			credentials : 'same-origin',
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email : self.state.email,
				password : self.state.password,
				userName : self.state.userName
			})
		})
		.then(function(response) {
			return response.json()
		}).then(function(json) {
			self.setState(json)
		}).catch(function(ex) {
			console.log('parsing failed', ex)
		}).then(function(){
			if(self.state.success === "true"){
				self.createCollection()
				browserHistory.push('/')
			}
		})
	}

	createCollection(){
		var self = this
		fetch('/api/v1/collection', {
			credentials : 'same-origin',
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				user: self.state.userName,
				title: self.state.userName + "\'s Collection",
				userKollection: [],
				slug: self.state.userName
			})
		})
		.then(function(response) {
			return response.json()
		}).then(function(json) {
			console.log(json)
		}).catch(function(ex) {
			console.log('parsing failed', ex)
		})
	}

	inUse(){
		if(this.state.success === "false"){
			return "This Email or Username is already in use."
		}
	}

	render(){
		var self = this 
		return(
			<div className = 'marginTop'>
			<label className = 'alertText'>{this.inUse()}</label>
			<form>
				<FormGroup>
					<Row>
						<Col sm={3}>
							<ControlLabel>Username</ControlLabel>
							<FormControl placeHolder= "Enter Username" onChange={(e)=>this.setState({userName:e.target.value})}/><br />
						</Col>
					</Row>
				</FormGroup>
				<FormGroup>
					<Row>
						<Col sm={3}>
							<ControlLabel>Email</ControlLabel>
							<FormControl type="email" placeHolder = "Enter Email" onChange={(e)=>this.setState({email:e.target.value})}/><br />
						</Col>
					</Row>
				</FormGroup>
				<FormGroup>
					<Row>
						<Col sm={3}>
							<ControlLabel>Password</ControlLabel>
							<FormControl type="password" placeHolder= "Enter Password" onChange={(e)=>this.setState({password:e.target.value})}/><br />
						</Col>
					</Row>
				</FormGroup>
			</form>
			<Button onClick ={this.pullUser.bind(this)} bsStyle = 'primary'>Sign Up</Button>
			</div>)
		}
	}