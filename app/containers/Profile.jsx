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

    const toggleHideValue = (value) =>
      this.setState(_.set(this.state, `currentProfile.hidden[${value}]`, !_.get(this.state, `currentProfile.hidden[${value}]`, false)))

    if(this.state.edit === true) {
       return( 
        <div>
        <input className="black" type = 'text' onChange={updateState.bind(this)} id = {`textbox${curr}`} value = {this.state.currentProfile[curr]}/>
        <input type='checkbox' onClick={toggleHideValue.bind(this, curr)} checked={_.get(this.state, `currentProfile.hidden[${curr}]`)}/>Hidden
        </div>
        )
    }else if(!_.get(this.state, `currentProfile.hidden[${curr}]`)){
      console.log('NOT HIDDEDN',_.get(this.state, `currentProfile.hidden`))
      return (
        <span>{this.state.currentProfile[curr]}</span>
      )
    } else {
      return <span>Life is a mystery...</span>
    }
  }

  // checkHidden(name){
  //   var checkboxes = document.querySelectorAll('input[name="' + name + '"]:checked')
  //   var values = [];
  //    Array.prototype.forEach.call(checkboxes, function(el){
  //       values.push(el.value)
  //    });
  //    return values;
  // }

  switchEdit(e){
    e.preventDefault()
    var self = this
    self.setState({edit: !self.state.edit})
    console.log("State.edit," , self.state.edit)
  }

  updateProfile(e) {
    e.preventDefault()
    var self = this
    
    // var temp = self.checkHidden('hiddenCheck');
    // self.setState({hidden: temp})
    // console.log("hidden values", self.state.hidden)
    
    requestApi('/api/v1/updateprofile', 'PUT')(self.state.currentProfile)
      .then(self.setState({edit : false}))
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

          <button onClick = {this.updateProfile.bind(this)}>CONFIRM</button>
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