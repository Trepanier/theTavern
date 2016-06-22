import React from 'react';

import classNames from 'classnames/bind';
import styles from 'css/components/home';
import 'whatwg-fetch';
const cx = classNames.bind(styles);

/*
 * Note: This is kept as a container-level component, 
 *  i.e. We should keep this as the container that does the data-fetching 
 *  and dispatching of actions if you decide to have any sub-components.
 */

 export default class AddItem extends React.Component {
 	submitPost() {
 		fetch('/api/v1/FrontCollection', {
 			method: 'POST',
 			headers: {
 				'Accept': 'application/json',
 				'Content-Type': 'application/json'
 			},
 			body: JSON.stringify(this.state)
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
 			title: '',
 			category: '',
 			description: '',
 			rarity: '',
 			condition: ''
 		};
 	}

 	render() {
 		return (
 			<div className={cx('home')}>
 			<h1 className={cx('home__header')}>Welcome to <em>(INSERT COMPANY NAME)</em>!</h1>
 			<p>title<input onChange={(e) => this.setState({title: e.target.value})} /></p>
 			<p>category<input onChange={(e) => this.setState({slug: e.target.value})} /></p>
 			<p>description<textarea onChange={(e) => this.setState({body: e.target.value})} /></p>
 			<p>rarity<input onChange={(e) => this.setState({title: e.target.value})} /></p>
 			<p>condition<input onChange={(e) => this.setState({title: e.target.value})} /></p>
 			<button onClick={() => this.submitPost()}>add to collection</button>
 			</div>
 			);
 	}

 };
