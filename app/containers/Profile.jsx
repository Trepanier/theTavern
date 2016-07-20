import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/home';
import {Link, IndexLink, browserHistory} from 'react-router';
import _ from 'lodash';
const cx = classNames.bind(styles);
import {Form, FormGroup, FormControl, ControlLabel, Col, Row, Button, HelpBlock} from 'react-bootstrap'
import requestApi from '../utilities/requests'
import Calendar from './Calendar'


export default class Profile extends React.Component {

  constructor(props){
    super(props);
    this.state={
      currentUser : "",
      currentProfile: "",
      edit: false
    };
  }

  loggedInUser() {
    requestApi('/api/v1/getuser')()
      .then((user)=>this.setState({currentUser: user}))
 }

 whosProfile() {
  requestApi('/api/v1/getprofile/' + this.props.params.slug)()
    .then((profile)=>{
      this.setState({currentProfile: profile})
    })
 }

  componentWillMount(){
    var self = this
    self.loggedInUser()
    self.whosProfile()
  }

  editTracker(curr){
    this.setState({currentProfile :{[curr] : document.getElementById(curr).value}})
  }

  textOutput(curr) {
    const updateState = (e) =>{
      var profile = this.state.currentProfile
      profile[curr] = e.target.value
      this.setState({currentProfile : profile})
    }

    const toggleHideValue = (value) =>
      this.setState(_.set(this.state, `currentProfile.hiddenValues[${value}]`, !_.get(this.state, `currentProfile.hiddenValues[${value}]`, false)))

    if(this.state.edit === true) {
       return( 
        <div>
        <input className="black" type = 'text' onChange={updateState.bind(this)} id = {`textbox${curr}`} value = {this.state.currentProfile[curr]}/>
        <input type='checkbox' onClick={toggleHideValue.bind(this, curr)} checked={_.get(this.state, `currentProfile.hiddenValues[${curr}]`)}/>hide
        </div>
        )
    }else if(!_.get(this.state, `currentProfile.hiddenValues[${curr}]`)){
      return (
        <span>{this.state.currentProfile[curr]}</span>
      )
    } else {
      return <span>Life is a mystery...</span>
    }
  }

  switchEdit(e){
    e.preventDefault()
    var self = this
    self.setState({edit: !self.state.edit})
  }

  updateProfile(e) {
    e.preventDefault()
    var self = this
    requestApi('/api/v1/updateprofile', 'PUT')(self.state.currentProfile)
      .then(self.setState({edit : false}))
  }


  render() {
    console.log("availability", this.state.currentProfile.availability)
    return (
      <div className = 'container-fluid marginTop centerText profileCD'>
        <h1 className = 'profileName'>{this.state.currentProfile.userName}'s Profile</h1>
        <h2 className = 'marginTop' >Description of individual goes here</h2>
        <Row>
          <Col md = {6}>
          <Button onClick = {this.switchEdit.bind(this)} bsStyle = 'primary'>Edit</Button>
            <h4>
              <ul className = 'leftText'>
                <li>Name: {this.textOutput('name')}</li>
                <li>User Name: {this.textOutput('userName')}</li>
                <li>Age: {this.textOutput('age')}</li>
                <li>Location: {this.textOutput('location')}</li>
                <li>Phone: {this.textOutput('phone')}</li>
                <li>Email: {this.textOutput('email')}</li>
                <li>Host: {this.textOutput('host')}</li>
                <li>Drink: {this.textOutput('alcohol')}</li>
                <li>Skill: {this.textOutput('skillLevel')}</li>
                <li>Position: {this.textOutput('position')}</li>
                <li>Game: {this.textOutput('games')}</li>
                <li>Friends: {this.textOutput('friends')}</li>
              </ul>
            </h4>

            <Button onClick = {this.updateProfile.bind(this)} bsStyle = 'primary'>CONFIRM</Button><br/><br/>
          </Col>

          <Col md = {6}>
            <a><li>suggestions/party #1</li></a>
            <a><li>suggestions/party #2</li></a>
            <a><li>suggestions/party #3</li></a>
          </Col>
        </Row>
        <Row>
          <Col md = {12}>
            <Calendar availability={this.state.currentProfile.availability}/>
          </Col>
        </Row>
      </div>
     );
  }
};