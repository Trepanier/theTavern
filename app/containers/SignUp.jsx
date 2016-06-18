import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/home';
import 'whatwg-fetch';
const cx = classNames.bind(styles);
import {browserHistory} from 'react-router';

export default class SignUp extends React.Component {
	constructor(props){
		super(props)
		this.state ={
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
				password : self.state.password
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
				browserHistory.push('/')
			}
		})
	}

	inUse(){
		if(this.state.success === "false"){
			return "This Email is already in use."
		}
	}

	render(){
		var self = this 
		return(<div>
			Sign Up for a FREE account:<br/>
			<div style={{color:"red"}}>{this.inUse()}</div>
			Email:
			<input onChange={(e)=>this.setState({email:e.target.value})}/><br/>
			Password: 
			<input onChange={(e)=>this.setState({password:e.target.value})}/><br/>
			<button onClick ={this.pullUser.bind(this)}>Sign Up</button>
			</div>)
		}
	}