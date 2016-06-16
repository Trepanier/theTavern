//this.props.params.slug
import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/home';
import 'whatwg-fetch';
const cx = classNames.bind(styles);
import {browserHistory} from 'react-router';

export default class ReadPage extends React.Component {
	constructor(props){
		super(props);
		this.state={
			title: '',
			author: '',
			body: ''
		};
	}

	componentWillMount(){
		var self=this
		console.log("This.props.params.slug = " ,this.props.params.slug)
		fetch('/api/v1/posts/'+ this.props.params.slug)
		.then(function(response) {
			return response.json()
		}).then(function(json) {
			self.setState(json)
			console.log("YOOOOOO OVER HERE" , json)
		}).catch(function(ex) {
			console.log('parsing failed', ex)
		}) 
	}

	// submitEdits(){
	// 	fetch('/api/v1/posts/' + this.props.params.slug, {
	// 		method: 'PUT',
	// 		headers: {
	// 			'Accept': 'application/json',
	// 			'Content-Type': 'application/json'
	// 		},
	// 		body: JSON.stringify(this.state)
	// 	})
	// 	.then(function(response) {
	// 		return response.json()
	// 	}).then(function(json) {
	// 		console.log('parsed json', json)
	// 	}).catch(function(ex) {
	// 		console.log('parsing failed', ex)
	// 	}).then(function(){
	// 		browserHistory.push('/')
	// 	})

	// }

	// deletePost(){
 // 		console.log('DELETING POST', this.props.params.slug)
 // 		var self = this
 // 		fetch('/api/v1/posts/'+self.props.params.slug, {
 // 			method: 'DELETE',
 // 			headers: {
 // 				'Accept': 'application/json',
 // 				'Content-Type': 'application/json'
 // 			}})
 // 		.then(function(response) {
 // 			return response.json()
 // 		}).then(function(json) {
 // 			console.log('parsed json', json)
 // 		}).catch(function(ex) {
 // 			console.log('parsing failed', ex)
 // 		}).then(function(){
 // 			browserHistory.push('/')
 // 		})
 // 	}

	render(){
		return(
			<div>
			<p>Posts ID# : {this.state._id}</p>
			<p>Title:
			<input onChange={(e)=>this.setState({title: e.target.value})} value={this.state.title} /></p>
			<p>Author:
			<input onChange={(e)=>this.setState({author: e.target.value})} value={this.state.author}/></p>
			<p>Body:</p>
			<p><textarea rows='20' cols="30" onChange={(e)=>this.setState({body: e.target.value})} value={this.state.body}/></p>
			<p><input onChange={(e)=>this.setState({slug: e.target.value})} value={this.state.slug} /></p>
			<button onClick={this.submitEdits.bind(this)}>Confirm Edits</button>
			<button onClick={this.deletePost.bind(this)}>Delete</button><br/>
			</div>
				)
	}
}