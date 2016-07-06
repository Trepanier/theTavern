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

 	constructor(props) {
 		super(props);
 		this.state = {	
 			search: '',
 			failed: false
 		};
 	}

 	checkName() {
 		var self = this
 		self.setState({failed: false})
 		fetch('/api/v1/cards/' + this.state.search) 
 		.then(function(response) {
 			console.log("response", response)
 			return response.json()
 		}).then(function(json) {
 			console.log("json", json)
 			self.setState(json)
 			console.log("state" , self.state)
 	}).catch(function(ex) {
 		console.log('parsing failed', ex)
 	})
 }


 addToCollection() {
 	var self = this
 	console.log('addToCollection card state:', self.state.card)
 	fetch('/api/v1/collection/' + self.props.params.slug, {
 		method: 'PUT',
 		headers: {
 			'Accept': 'application/json', 
 			'Content-Type': 'application/json'
 		},
 		body: JSON.stringify(self.state.card)	
 	}).then(function(response) {
 		return response.json()
 	}).then(function(json) {
 		console.log('parsed json', json)
 	}).catch(function(ex) {
 		console.log('parsing failed', ex)
 	})
 }

 confirmImage(){
 	console.log(this.state)
 		return (
 			<div>
 			{this.state.name}
 			<img src={`http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=${this.state.multiverseid}&type=card`} />
 			<button onClick={this.addToCollection.bind(this)}>Confirm</button>
 			</div>
 			)
 	}


 searchFailed(){
 	return (<div>
 		No Card Found
 	</div>);
 }

 render() {
 	return (
 		<div className={cx('home')}>
 		<h1 className={cx('home__header')}>Add your picture here!</h1>
 		<p>Name<input onChange={(e) => this.setState({search: e.target.value})} /></p>
 		{this.state.name ? this.confirmImage() : ''}
 		{this.state.failed ? this.searchFailed() : ''}
 		<button onClick={this.checkName.bind(this)}>add to collection</button>
 		</div>
 		);
 }

};
