import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/home';
import {Link, IndexLink, browserHistory} from 'react-router';
import _ from 'lodash';
const cx = classNames.bind(styles);
import {Form, FormGroup, FormControl, ControlLabel, Col, Row, Button, HelpBlock} from 'react-bootstrap'
import requestApi from '../utilities/requests'


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
    console.log("editTracker curr", curr)
    this.setState({currentProfile :{[curr] : document.getElementById(curr).value}})
  }

  textOutput(curr) {
    const updateState = (e) =>{
      var profile = this.state.currentProfile
      profile[curr] = e.target.value
      this.setState({currentProfile : profile})
    }

    if(this.state.edit === true) {
       return( 
        <input className="black" type = 'text' onChange={updateState.bind(this)}id = {curr} value = {this.state.currentProfile[curr]}/>
        )
    }else{
      return (
        <span>{this.state.currentProfile[curr]}</span>
      )
    }
  }

  switchEdit(e){
    e.preventDefault()
    var self = this
    self.setState({edit: !self.state.edit})
    console.log("State.edit," , self.state.edit)
  }


  render() {
    return (
      <Form className = 'marginTop centerText'>
        <h1 className = 'profileName'>{this.state.currentProfile.userName}'s Profile</h1>
        <h2 className = 'marginTop' >Description of individual goes here</h2>
        <Col col-md = {6}>
        <button onClick = {this.switchEdit.bind(this)}>Edit</button>
          <h4>
            Name: {this.textOutput('name')}<br />
            User Name: {this.textOutput('userName')}<br />
            Age: {this.textOutput('age')}<br />
            Location: {this.textOutput('location')}<br />
            Phone: {this.textOutput('phone')}<br />
            Email: {this.textOutput('email')}<br />
            Host: {this.textOutput('host')}<br />
            Drink: {this.textOutput('alcohol')}<br />
            Skill: {this.textOutput('skillLevel')}<br />
            Position: {this.textOutput('position')}<br />
            Game: {this.textOutput('games')}<br />
            Friends: {this.textOutput('friends')}<br />
          </h4>

          <button onClick = {console.log(this.state.currentProfile)}>CONFIRM</button>
        </Col>

        <Col col-md = {6}>
          <li>suggestions/party #1</li>
          <li>suggestions/party #2</li>
          <li>suggestions/party #3</li>
        </Col>
        <Form>
          add calander here
        </Form>
      </Form>
     );
  }
};