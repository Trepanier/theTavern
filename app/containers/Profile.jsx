import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/home';
import {Link, IndexLink, browserHistory} from 'react-router';
import _ from 'lodash';
const cx = classNames.bind(styles);


export default class Profile extends React.Component {

  constructor(props){
    super(props);
    this.state={
      currentUser : "",
      profile: ""
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

  profileUser() {
    var self = this
    return fetch('/api/v1/collection/' + self.props.params.slug)
    .then(function(response) {
      return response.json()
    }).then(function(json) {
      self.setState({profile: json})
      console.log('PROFILE', self.state.profile)
    }).catch(function(ex) {
      console.log('profile parsing failed', ex)
    })
  }

  componentWillMount(){
    var self = this
    self.loggedInUser()
    self.profileUser()
  }

  displayKollection(){
    if(_.get(this.state , "profile.userKollection")){
    return this.state.profile.userKollection.map((card)=>
      <div>
      <img src={`http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=${card.multiverseid}&type=card`} />
      <p>{card.name}</p>
      <p><a href = {`http://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=${card.multiverseid}`} target="_blank">Offical Page</a></p>
      <p><a href = {`http://sales.starcitygames.com/search.php?substring=${card.name}&t_all=All&start_date=2010-01-29&end_date=2012-04-22&order_1=finish&limit=25&action=Show%2BDecks&card_qty%5B1%5D=1&auto=Y`} target="_blank">Card INFO</a></p>
      </div>)
    }
  }

  render() {
    return (
    	<div>
      <h1>Profile</h1>
      {this.state.currentUser.local && this.state.currentUser.local.userName}

      {this.displayKollection()}



      </div>
      );
  }
};