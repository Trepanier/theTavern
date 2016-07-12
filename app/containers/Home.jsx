import React from 'react';
import 'whatwg-fetch';
import { Link, IndexLink } from 'react-router';
import {browserHistory} from 'react-router';
import { Carousel } from 'react-bootstrap'
const {Item, Caption} = Carousel
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
		 		<Item>
			 		<img width={223} height={311} src= "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=413591&type=card" />
			 		<Caption>
				 		<h3>Bill just added Force of Will to their Collection</h3>
				 		<p>(recent activity feature to be added in the future)</p>
			 		</Caption>
		 		</Item>
		 		<Item>
			 		<img  width={223} height={311} src= "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=413767&type=card" />
			 		<Caption>
				 		<h3>Lydar now has Mana Crypt for trade</h3>
				 		<p>(recent activity feature to be added in the future)</p>
			 		</Caption>
		 		</Item>
		 		<Item>
			 		<img width={223} height={311} src= "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=413790&type=card" />
			 		<Caption>
				 		<h3>Trep just traded Wasteland</h3>
				 		<p>(recent activity feature to be added in the future)</p>
			 		</Caption>
		 		</Item>
	 		</Carousel>
	 	)
 	}

 	render(){
 		return (
 			<div className = 'centerText marginTop'>
 				<h1 className = 'profileName'>Welcome to the Collection Box</h1>
 				<div>
 					<h2>The Collection Box helps individuals store, view, and trade 
 					their collections online with other users. Either enter your login
 					information or <Link to = "/signup">Sign Up Here</Link>.</h2>
 					{this.carouselSlideShow()}
 					<h3>Users Collections</h3>
 					<h4>{this.displayUsers()}</h4>
 				</div>
 			</div>
 			)
 	} 	
 }