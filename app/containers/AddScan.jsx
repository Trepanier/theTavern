import React from 'react';
import classNames from 'classnames/bind';
import 'whatwg-fetch';
import styles from 'css/components/home';
import {browserHistory} from 'react-router';
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
		fetch('api/v1/scanimage', {
			method: 'POST',
			body: data
		}).then(function(response){
			console.log("Response", response)
			return response.json()
		}).then(function(json){
			self.setState(json)
			console.log('parsed json', json)
		}).catch(function(ex){
			console.log('parsing failed', ex)
		});
	}

	addToCollection() {
		fetch('api/v1/scanimage', {
			method: 'POST',
			body: data
		}).then(function(response){
			console.log("Response", response)
			return response.json()
		}).then(function(json){
			self.setState(json)
			console.log('parsed json', json)
		}).catch(function(ex){
			console.log('parsing failed', ex)
		});
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
			{this.state.name}
			<img src={`http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=${this.state.multiverseid}&type=card`} />
			<button onClick={this.addToCollection.bind(this)}>Confirm</button>
			</div>
			)
	}



	render() {
		return (
			<div>
				<input type="file" name="userPhoto" />
				<button onClick={this.imageScan.bind(this)}>Add Photo</button>
				{this.state.name ? this.confirmImage() : ''}
				{this.state.falseCard ? this.falseImage() : ''}
			</div>
		);
	}

}