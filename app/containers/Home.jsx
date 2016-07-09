import React from 'react';
import 'whatwg-fetch';
import { Link, IndexLink } from 'react-router';
import {browserHistory} from 'react-router';
import { Carousel } from 'react-bootstrap'

/*
 * Note: This is kept as a container-level component, 
 *  i.e. We should keep this as the container that does the data-fetching 
 *  and dispatching of actions if you decide to have any sub-components.
 */
 
 export default class Home extends React.Component {

 	constructor(props){
 		super(props);
 		this.state={};
 	}

 	componentWillMount(){
 		var self = this
 		fetch('api/v1/getallusers/')
 		.then(function(response){
 			return response.json()
 		}).then(function(json){
 			self.setState(json)
 			console.log("This is the current state", self.state)
 		}).catch(function(ex) {
 			console.log('parsing failed', ex)
 		})
 	}

 	displayUsers(){
 		var self = this
 		var userArr = Object.keys(self.state).map(function (key) {return self.state[key]});
    		return userArr.map((user)=>
    			<div>
    			<Link to={"/profile/" + user.local.userName}>{user.local.userName}</Link>
    			</div>
    		)
 	}

 	carouselSlideShow() {
 		return (
 			<Carousel className = 'carousel-inner img'>
		 		<Carousel.Item>
			 		<img width={223} height={311} src= "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=413591&type=card" />
			 		<Carousel.Caption>
				 		<h3>New card added from Fred1234</h3>
				 		<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
			 		</Carousel.Caption>
		 		</Carousel.Item>
		 		<Carousel.Item>
			 		<img width={223} height={311} src= "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=413767&type=card" />
			 		<Carousel.Caption>
				 		<h3>Second slide label</h3>
				 		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
			 		</Carousel.Caption>
		 		</Carousel.Item>
		 		<Carousel.Item>
			 		<img width={223} height={311} src= "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=413790&type=card" />
			 		<Carousel.Caption>
				 		<h3>Third slide label</h3>
				 		<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
			 		</Carousel.Caption>
		 		</Carousel.Item>
	 		</Carousel>
	 	)
 	}

 	render(){
 		return (
 			<div className = 'centerText'>
 				<h1>Welcome to the Collection Box</h1>
 				<div>
 					<h2>The Collection Box helps individuals store, view, and trade 
 					their collections online with other users. Either enter your login
 					information or <Link to = "/signup">Sign Up Here</Link>.</h2>
 					{this.carouselSlideShow()}
 					<h3>Users Collections</h3>
 					{this.displayUsers()}
 				</div>
 			</div>
 			)
 	} 	
 }