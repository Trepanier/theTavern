import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/home';
import {Link, IndexLink, browserHistory} from 'react-router';
import _ from 'lodash';
const cx = classNames.bind(styles);
import {Grid, Col, Row, Button} from 'react-bootstrap'


export default class Profile extends React.Component {

  constructor(props){
    super(props);
    this.state={
      currentUser : "",
      profile: {
        userKollection: []
      }
    };
  }

  loggedInUser() {
    var self = this
    return fetch('/api/v1/getuser', {credentials : 'same-origin'})
    .then(function(response) {
      return response.json()
    }).then(function(json) {
      self.setState({currentUser: json})
      console.log('USER', self.state.currentUser)
    }).catch(function(ex) {
      console.log('user parsing failed', ex)
    })
  }

  componentWillMount(){
    var self = this
    self.loggedInUser()
  }



  render() {
    return (
     <div className = 'marginTop'>
      <h1 className = 'centerText profileName'>{this.state.currentUser.local.userName}</h1>
     </div>
     );
  }
};