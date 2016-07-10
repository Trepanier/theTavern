import React from 'react';
import classNames from 'classnames/bind';
import 'whatwg-fetch';
import styles from 'css/components/home';
import {browserHistory} from 'react-router';
import { Link } from 'react-router';
import { Button, Row, form, FormGroup, ControlLabel, FormControl, Col } from 'react-bootstrap'
const cx = classNames.bind(styles);

export default class AddScan extends React.Component {

	constructor(props) {
 		super(props);
 		this.state = {
 			name: '',
 			multiverseid:'',
 			falseCard: false
 		}
 	}	

	imageScan() {
		this.setState({falseCard: false})
		var self = this
		var input = document.querySelector('input[type = "file"]')
 		var data = new FormData()
 		data.append('userPhoto', input.files[0])
		fetch('/api/v1/scanimage', {
			method: 'POST',
			body: data
		}).then(function(response){
			console.log("Response", response)
			return response.json()
		}).then(function(json){
			self.setState({card: json})
			console.log('parsed json', json)
		}).catch(function(ex){
			console.log('parsing failed', ex)
		});
	}

	multiScan() {
		this.setState({falseCard: false})
		var self = this
		var input = document.querySelector('input[type = "file"]')
 		var data = new FormData()
 		data.append('userPhoto', input.files[0])
		fetch('/api/v1/scanmultipleimages', {
			method: 'POST',
			body: data
		}).then(function(response){
			console.log("Response", response)
			return response.json()
		}).then(function(json){
			self.setState({mulitcard: json})
			console.log('parsed json', json)
		}).catch(function(ex){
			console.log('parsing failed', ex)
		});
	}

	addToCollection() {
		var self = this
		var info
		if(self.card){
			info = this.state.card
		} else if(self.multicard){
			info = this.state.multicard
		}
		fetch('/api/v1/collection/' + self.props.params.slug, {
			method: 'PUT',
			headers: {
 				'Accept': 'application/json', 
 				'Content-Type': 'application/json'
 			},
 			body: JSON.stringify(info)
		}).then(function(response){
			console.log("Response", response)
			return response.json()
		}).then(function(json){
			self.setState(json)
			console.log('parsed json', json)
		}).catch(function(ex){
			console.log('parsing failed', ex)
		});
		self.setState({failed: false, name: ''})
	}

	falseImage() {
		return (
			<div>
				<p>Could not find card.</p>
				<p>Make sure this is a Magic the Gathering card from Eternal Masters.</p>
			</div>
			)
	}

	confirmImage(){
		return (
			<div className = 'centerText'>
				<Row className = 'centerText'>
					{this.state.card.name}
				</Row>
				<Row className = 'centerText'>
					<img src={`http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=${this.state.card.multiverseid}&type=card`} />
				</Row>
				<Row className = 'centerText'>
					<Button onClick={this.addToCollection.bind(this)}>Confirm</Button>
				</Row>	
			</div>
			)
	}

	switchButton() {
		var self = this
		self.setState({buttonState: !self.state.buttonState})
	}

	displayButton() {
		if(this.state.buttonState) {
			return (<Button onClick = {this.multiScan.bind(this)} bsStyle = 'primary'>Add Photo</Button>)
		} else {
			return (<Button onClick={this.imageScan.bind(this)} bsStyle = 'primary'>Add Photo</Button>)
		}
	}

//will need to change bottom button
	render() {
		return (
			<div className = 'centerText'>
				<form>
					<FormGroup>
						<FormControl type="file" name="userPhoto" />
							{this.state.card ? this.confirmImage() : ''}
							{this.displayButton()}
							{this.state.falseCard ? this.falseImage() : ''}
							<Button><Link to={"/additem/" + this.props.params.slug}>Search via Name</Link></Button>
							<p><input type = 'checkbox' id = "changeButton" onClick = {this.switchButton.bind(this)}/>For Multiple Cards at Once</p>
					</FormGroup>
				</form>
			</div>
		);
	}
}