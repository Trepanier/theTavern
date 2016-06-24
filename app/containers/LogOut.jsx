import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/home';
import 'whatwg-fetch';
import { Link } from 'react-router';
const cx = classNames.bind(styles);
import {browserHistory} from 'react-router';

export default class Logout extends React.Component {

	constructor(props){
		super(props);
		this.state={};
	}

	componentWillMount(){
		var self = this
		fetch('/api/v1/getuser', {credentials : 'same-origin'})
		.then(function(response) {
			return response.json()
		}).then(function(json) {
			self.setState(json)
		}).catch(function(ex) {
			console.log('parsing failed', ex)
		})
		fetch('/api/v1/logout',{credentials : 'same-origin'})
	}

	render(){
		return(<div>
		<h1>Thanks for using Collection Box!</h1>
		<p>User {this.state.local && this.state.local.username} has logged out</p>
		</div>)
	}

}