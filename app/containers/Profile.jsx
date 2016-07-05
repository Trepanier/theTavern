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

  loggedInUser() {
    var self = this
    return fetch('/api/v1/getuser', {credentials : 'same-origin'})
    .then(function(response) {
      return response.json()
    }).then(function(json) {
      self.setState(json)
      console.log("YOOOOOO OVER HERE" , json)
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
  }

  profileUser() {
    var self = this
    return fetch('/api/v1/collection/' + this.props.params.slug)
  }

  componentWillMount(){
    var self = this
    self.loggedInUser()
    .then(()=>self.profileUser.bind(self))
  }

	render() {
    return (
    	<div>
      		<h1>Profile</h1>
          {this.state.local && this.state.local.email}
      	</div>
    );
  }
};