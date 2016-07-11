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
		fetch('/api/v1/logout',{credentials : 'same-origin'})
		.then(()=> self.props.toggleLogin())
	}

	render(){
		return (
			<div className = 'centerText marginTop'>
				<h1>Thanks for using Collection Box!</h1>
				<p>You have logged out</p>
			</div>
		)
	}
}