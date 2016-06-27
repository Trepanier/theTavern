import React from 'react';
import classNames from 'classnames/bind';
import 'whatwg-fetch';
import styles from 'css/components/home';
import {browserHistory} from 'react-router';
const cx = classNames.bind(styles);

export default class AddScan extends React.Component {

	imageScan() {
		var input = document.querySelector('input[type = "file"]')
 		var data = new FormData()
 		data.append('userPhoto', input.files[0])
		fetch('api/v1/scanimage', {
			method: 'POST',
			body: data
		}).then(function(response){
			return response.json()
		}).then(function(json){
			console.log('parsed json', json)
		}).catch(function(ex){
			console.log('parsing failed', ex)
		});
	}

	render() {
		return (
			<div>
				<button onClick={this.imageScan.bind(this)}>Add Photo</button>
			</div>
		);
	}

}