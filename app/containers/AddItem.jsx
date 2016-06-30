import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/home';
import 'whatwg-fetch';
import {browserHistory} from 'react-router';
const cx = classNames.bind(styles);

/*
 * Note: This is kept as a container-level component, 
 *  i.e. We should keep this as the container that does the data-fetching 
 *  and dispatching of actions if you decide to have any sub-components.
 */

 export default class AddItem extends React.Component {

 	checkName() {
 		var self = this
 		fetch('/api/v1/collection/' + this.state.name) 
 		.then(function(response) {
 			return response.json()
 		}).then(function(json) {
 			self.setState({card : json})
 			console.log('parsed json', json)
 		}).catch(function(ex) {
 			console.log('parsing failed', ex)
 		})
 	}


 	submitPost() {
 		data.append('name', this.state.name)
 		fetch('/api/v1/collection/' + this.props.params.slug, {
 			method: 'PUT',
 			body: data
 		}).then(function(response) {
 			return response.json()
 		}).then(function(json) {
 			console.log('parsed json', json)
 		}).catch(function(ex) {
 			console.log('parsing failed', ex)
 		})
 	}

 	constructor(props) {
 		super(props);
 		this.state = {	
 			name: ''
 		};
 	}

 	render() {
 		return (
 			<div className={cx('home')}>
 			<h1 className={cx('home__header')}>Welcome to <em>(INSERT COMPANY NAME)</em>!</h1>
 			<p>Name<input onChange={(e) => this.setState({name: e.target.value})} /></p>
 			{this.state.card.name ? this.state.card.name : ''}
 			<button onClick={this.submitPost.bind(this)}>add to collection</button>
 			</div>
 		);
 	}

 };
