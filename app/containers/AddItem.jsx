import React from 'react';

import classNames from 'classnames/bind';
import styles from 'css/components/home';
import 'whatwg-fetch';
const cx = classNames.bind(styles);
import {browserHistory} from 'react-router';

/*
 * Note: This is kept as a container-level component, 
 *  i.e. We should keep this as the container that does the data-fetching 
 *  and dispatching of actions if you decide to have any sub-components.
 */

 export default class AddItem extends React.Component {


 	submitPost() {
 		var input = document.querySelector('input[type = "file"]')
 		var data = new FormData()
 		data.append('userPhoto', input.files[0])
 		data.append('title', this.state.title)
 		data.append('category', this.state.category)
 		data.append('description', this.state.description)
 		data.append('rarity', this.state.rarity)
 		data.append('condition', this.state.condition)
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
 			<p>category<input onChange={(e) => this.setState({category: e.target.value})} /></p>
 			<p>description<textarea onChange={(e) => this.setState({description: e.target.value})} /></p>
 			<p>rarity<input onChange={(e) => this.setState({rarity: e.target.value})} /></p>
 			<p>condition<input onChange={(e) => this.setState({condition: e.target.value})} /></p>
 			<input type="file" name="userPhoto" />
 			<button onClick={this.submitPost.bind(this)}>add to collection</button>
 			</div>
 		);
 	}

 };
