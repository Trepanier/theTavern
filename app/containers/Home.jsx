import React from 'react';
import 'whatwg-fetch';
import { Link } from 'react-router';
import {browserHistory} from 'react-router';

/*
 * Note: This is kept as a container-level component, 
 *  i.e. We should keep this as the container that does the data-fetching 
 *  and dispatching of actions if you decide to have any sub-components.
 */
 export default class Home extends React.Component {

 	constructor(props){
 		super(props);
 		this.state={
 			posts: [],
 			text: "",
 		};
 	}

 	componentWillMount(){
 		var self = this
 		fetch('/api/v1/posts')
 		.then(function(response) {
 			return response.json()
 		}).then(function(json) {
 			self.setState({posts: json })
 		}).catch(function(ex) {
 			console.log('parsing failed', ex)
 		})
 	}

 	compare(){
 		var self = this
 		if(this.state.text === ""){
 			return ""
 		}
 		return this.state.posts
 		.filter((value) => value.title.toLowerCase().startsWith(self.state.text.toLowerCase()))
 		.map((value) => (<div>
 			<PostItem post = {value}/>
 			</div>) 
 		)
 	}

 	textChange(event){
 		this.setState({text: event.target.value})
 	}

 	display(){
 		return <div>{this.state.posts.map((post)=>(<PostItem post={post}/>))}</div>
 	}

 	render() {
 		var self = this
 		return (
 			<div>
 			<h1>HOME PAGE</h1>
 			<h3>Search by Title:</h3>
 			<input
 			type = "text" 
 			name = "Search"
 			value = {this.state.text}
 			onChange = {(event) => {this.textChange(event)}}
 			placeholder = "Search... " 
 			/>
 			{this.compare()}<br/>
 			<h2>All Posts:</h2>
 			{this.display()}
 			</div>
 			);
 	}

 };


 class PostItem extends React.Component{

 	render(){
 		var self =this
 		return(<div>
 			<Link to={`read/${self.props.post.slug}`}>{(self.props.post.title)}</Link>
 			<br/>
 			</div>)
 	}
 }
