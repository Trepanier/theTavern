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

	render(){
		return(<div>
			<h1>MAIN HOME</h1>
			</div>);
	} 	

}