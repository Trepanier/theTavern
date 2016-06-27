import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/home';
import {browserHistory} from 'react-router';
const cx = classNames.bind(styles);


export default class Profile extends React.Component {

  constructor(props){
    super(props);
    this.state={};
  }

  componentWillMount(){
    var self = this
    fetch('/api/v1/getuser', {credentials : 'same-origin'})
    .then(function(response) {
      return response.json()
    }).then(function(json) {
      self.setState(json)
      console.log("YOOOOOO OVER HERE" , json)
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
  }

	render() {
  
    return (
    	<div>
      		<h1>Profile</h1>
          {this.state.local && this.state.local.username}
      		<h2>Name Goes Here</h2>
      	</div>
    );
  }
};