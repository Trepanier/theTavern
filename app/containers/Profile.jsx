import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/home';
import {Link, IndexLink, browserHistory} from 'react-router';
import _ from 'lodash';
const cx = classNames.bind(styles);
import {Grid, Col, Row} from 'react-bootstrap'


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

  removeItem(card) {
    var self = this
    return fetch('/api/v1/collection/remove/', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json', 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({user: self.state.profile.user, name: card.name}) 
    }).then(function(response) {
      return response.json()
    }).then(function(json) {
      console.log('parsed json', json)
      self.state.profile.userKollection = json
      self.setState({profile: self.state.profile})
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
  }

  componentWillMount(){
    var self = this
    self.loggedInUser()
    self.profileUser()
  }

  displayDelete(card){
    var self = this
    if(_.get(this.state, 'currentUser.local.userName', null) === this.state.profile.user){
        return <button onClick={self.removeItem.bind(self, card)}>Delete</button>
      }
    }

  displayKollection(){
    var self = this
    var colStyle = {
      paddingTop: '90px',

    }
    var rowStyle = {
      position: 'relative'
    }
    if(_.get(self.state , "profile.userKollection")){
      return self.state.profile.userKollection.map((card)=>
        <Row>
           <Col sm={4} md={4}>
              <img src={`http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=${card.multiverseid}&type=card`} />
            </Col>
            <Col  style={colStyle} sm={8}  md={7}>
              <div>{card.name}<br/></div>
              {card.originalText}<br/>
              <a className = {"link"} href = {`http://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=${card.multiverseid}`} target="_blank">Offical Page</a>
              <a className = {"link"} href = {`http://sales.starcitygames.com/search.php?substring=${card.name}&t_all=All&start_date=2010-01-29&end_date=2012-04-22&order_1=finish&limit=25&action=Show%2BDecks&card_qty%5B1%5D=1&auto=Y`} target="_blank">Card INFO</a>
              {this.displayDelete(card)}
            </Col>
        </Row>
      )
    }
  }

  render() {
    return (
     <div>
      <h1>Profile</h1>
      {this.state.currentUser.local && this.state.currentUser.local.userName}
      <Grid>{this.displayKollection()}</Grid>
     </div>
     );
  }
};