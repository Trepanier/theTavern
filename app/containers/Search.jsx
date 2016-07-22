import React from 'react';
import 'whatwg-fetch';
import { Link } from 'react-router';
import {browserHistory} from 'react-router';

export default class Search extends React.Component {
	


	render () {
		return (
			<div className='marginBiggerTop'>
				<h1>Search Page</h1>
                <select>
                	<option value='times'>Times</option>
                	<option value='location'>Location</option>
                	<option value='game'>Game</option>
                </select>
                <input type='checkbox' />Dungeon Master
                <input type='checkbox' />Player		
			</div>
		)
	}
};