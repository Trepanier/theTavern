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
    this.state={};
  }

    componentWillMount(){
    this.setState(this.state)
  }

	render(){
		return (
			<div>
			<h1>Welcome to the Collection Box</h1>
				<div>
					<h2>The Collection Box helps individuals store, view, and trade 
					their collections online with other users. Either enter your login
					information or signup as a new user.</h2>
					<p>Recent Activity 'news feed goes here'</p>
				</div>
			</div>
		)
	} 	
}