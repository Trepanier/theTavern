import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/home';
import {Link, IndexLink, browserHistory} from 'react-router';
import _ from 'lodash';
const cx = classNames.bind(styles);
import {Grid, Col, Row, Button} from 'react-bootstrap'
import requestApi from '../utilities/requests'


export default class Profile extends React.Component {

  constructor(props){
    super(props);
    this.state={
      currentUser : ""
    };
  }

  loggedInUser() {
    requestApi('/api/v1/getuser')()
      .then((user)=>this.setState({currentUser: user}))
 }

 whosProfile() {
  requestApi('/api/v1/getprofile/' + this.props.params.slug)()
    .then((profile)=>this.setState({currentProfile: profile}))
 }

  componentWillMount(){
    var self = this
    self.loggedInUser()
  }



  render() {
    return (
     <div className = 'marginTop'>
     </div>
     );
  }
};