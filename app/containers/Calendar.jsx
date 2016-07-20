import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/home';
import {Form, FormGroup, FormControl, ControlLabel, Col, Row, Button, HelpBlock} from 'react-bootstrap'

export default class Calendar extends React.Component {


	switchAv(time, day){

	}

	checkAv(time, day){
		console.log("Time: ", time , " Day: ", day)
		if(this.props.edit){
			if(this.props.availability[day][time]){
				return(
					<div className = 'green invisableButton' onClick = {()=>this.props.setAvailability(day, time, false)}>Available</div>
					)
			}else{
				return(
				<div className = 'red invisableButton' onClick = {()=>this.props.setAvailability(day, time, true)}>-</div>
				)
			}
		}else{
			if(this.props.availability[day][time]){
				return(
					<span className = 'green'>Available</span>
					)
			}else{
				return(
				<span className = 'red'>-</span>
				)
			}
		}	
	}

	times() {
		
		var dayTimes = ["Morning", "Lunch", "Afternoon", "Night", "GraveYard"]
		return dayTimes.map((curr)=> {
			return (
				<tr>
					<td>{curr}</td>
					<td>{this.checkAv(curr , "Monday")}</td>
					<td>{this.checkAv(curr , "Tuesday")}</td>
					<td>{this.checkAv(curr , "Wednesday")}</td>
					<td>{this.checkAv(curr , "Thursday")}</td>
					<td>{this.checkAv(curr , "Friday")}</td>
					<td>{this.checkAv(curr , "Saturday")}</td>
					<td>{this.checkAv(curr , "Sunday")}</td>
				</tr>
			)
		})
	}

	render() {
		if(this.props.availability){
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
		} else {
			return <Row><h1>Loading availability...</h1></Row>
		}
	}
}

