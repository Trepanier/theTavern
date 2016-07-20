import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/home';
import {Form, FormGroup, FormControl, ControlLabel, Col, Row, Button, HelpBlock} from 'react-bootstrap'

export default class Calendar extends React.Component {

	times() {
		var avalibility = ["Late Night", "Night", "Afternoon", "Lunch", "Morning"]
		return avalibility.map((curr)=> {
			return (
				<tr>
					<td>{curr}</td>
					<td>test</td>
					<td>test2</td>
					<td>test3</td>
					<td>test4</td>
					<td>test5</td>
					<td>test6</td>
					<td>test7</td>
				</tr>
			)
		})
	}

	render() {
		return(
			<div className = 'profileCal'>
				<Row>
					<table>
						<tr>
							<th> </th>
							<th>Monday</th>
							<th>Tuesday</th>
							<th>Wednesday</th>
							<th>Thursday</th>
							<th>Friday</th>
							<th>Saturday</th>
							<th>Sunday</th>	
						</tr>
						{this.times()}
					</table>
				</Row>
			</div>
		)
	}
}

