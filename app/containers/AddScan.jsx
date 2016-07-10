import React from 'react';
import classNames from 'classnames/bind';
import 'whatwg-fetch';
import styles from 'css/components/home';
import {browserHistory} from 'react-router';
import { Link, IndexLink} from 'react-router';
import { Button, Row, form, FormGroup, ControlLabel, FormControl, Col } from 'react-bootstrap'
const cx = classNames.bind(styles);

function filterOne(arrN, filtinfo){
	var skip = false
	return arrN.reduce(function(prev, curr){
		if(skip || !filtinfo(curr)){
			console.log("Prev= ", prev," Curr= ", curr)
			return prev.concat(curr)
		}else{
			skip = true
			return prev
		}
	},[]);
}

export default class AddScan extends React.Component {

	constructor(props) {
 		super(props);
 		this.state = {
 		}
 	}	

	imageScan() {
		var self = this
		self.setState({})
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
		var self = this
		self.setState({})
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
			self.setState({multipleCards : json})
			console.log('parsed json', json)
		}).catch(function(ex){
			console.log('parsing failed', ex)
		});
	}

	addToCollection() {
		var self = this
		var sendInfo
		console.log("HELLO OVER HERE")
		if(_.get(self.state, 'card')){
			sendInfo = self.state.card
		} else if (_.get(self.state, 'multipleCards')) {
			sendInfo = self.state.multipleCards
		}
		console.log("Sendinfo = ", sendInfo)
		fetch('/api/v1/collection/' + self.props.params.slug, {
			method: 'PUT',
			headers: {
 				'Accept': 'application/json', 
 				'Content-Type': 'application/json'
 			},
 			body: JSON.stringify(sendInfo)
		}).then(function(response){
			console.log("Response", response)
			return response.json()
		}).then(function(json){
			self.setState(json)
			console.log('parsed json', json)
		}).catch(function(ex){
			console.log('parsing failed', ex)
		});
		self.setState({})
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
			<div>
			{this.state.card.name}
			<img src={`http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=${this.state.card.multiverseid}&type=card`} />
			<Button onClick={this.addToCollection.bind(this)} bsStyle = 'primary'>Confirm</Button>
			</div>
			)
	}

	switchButton() {
		var self = this
		self.setState({buttonState: !self.state.buttonState})
	}

	displayButton() {
		if(this.state.buttonState) {
			return (<Button onClick = {this.multiScan.bind(this)} bsStyle = 'primary' className = 'checkboxAddScan'>Add Photo</Button>)
		} else {
			return (<Button onClick={this.imageScan.bind(this)} bsStyle = 'primary' className = 'checkboxAddScan'>Add Photo</Button>)
		}
	}

	displayDelete(card){
		var self = this
        return <Button onClick={self.removeCard.bind(self, card)} bsStyle = 'danger'>Delete</Button>
    }

    removeCard(card){
    	this.setState({multipleCards: filterOne(this.state.multipleCards, (obj) => obj.name === card.name)})
    }

	displayMultiple() {
		var self = this
		if(_.get(self.state, 'multipleCards')) {
			return self.state.multipleCards.map((card)=>
				<div>
				<p><img src={`http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=${card.multiverseid}&type=card`} />
				{this.displayDelete(card)}</p>
				</div>
			)
		}
	}

//will need to change bottom button
	render() {
		return (
			<div>
			<form>
				<FormGroup>
					<Row className = 'centerText'>
					<h1 className={cx('home__header paddingAddScan')}>Search via Photo Name!</h1>
					<ControlLabel>
						<input type = "file" name = "userPhoto" />
					</ControlLabel>
					</Row>
					<Row className = 'centerText'>
						{this.displayButton()}
						{this.state.card && !this.state.card.falseCard? this.confirmImage() : ''}
						{_.get(this.state, 'card.falseCard')? this.falseImage() : ''}
					<ControlLabel><input type = 'checkbox' id = "changeButton" onClick = {this.switchButton.bind(this)}/> For Multiple Cards at Once</ControlLabel>
						{this.displayMultiple()}
						{this.state.multipleCards ? <Button onClick={this.addToCollection.bind(this)} bsStyle = 'primary'>Confirm</Button> : ""}
						<Button><Link to={"/additem/" + this.props.params.slug} bsStyle = 'primary'>Search via Name</Link></Button>
					</Row>
				</FormGroup>
			</form>
			</div>
		);
	}
}