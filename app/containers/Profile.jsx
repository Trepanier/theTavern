import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/home';
import {Link, IndexLink, browserHistory} from 'react-router';
import {connect} from 'react-redux'
import {Form, FormGroup, FormControl, ControlLabel, Col, Row, Button, HelpBlock} from 'react-bootstrap'
import _ from 'lodash';
const cx = classNames.bind(styles);
import requestApi from '../utilities/requests'
import Calendar from './Calendar'
import ToggleEditButton from '../components/ToggleEditButton'
import ProfileField from '../components/ProfileField'
import ProfileListField from '../components/ProfileListField'
import {setProfileAction, changeEditAction} from '../redux/actions'
import editButtonBehavior from '../components/ToggleEditBehavior'
import getProfileBehavior from '../components/getProfileBehavior'



function mapStateToProps(state){
  return { 
    currentProfile : state.get("currentProfile"),
    userName : state.getIn(["currentProfile", "userName"]),
    edit : state.get("edit")
  }
}

function mapDispatchToProps(dispatch){
  return {
    setProfile : (profile) => dispatch(setProfileAction(profile)),
    changeEdit : () => dispatch(changeEditAction()) 
  }
}


class CommitButtonView extends React.Component {
  updateProfile(e) {
    e.preventDefault()
    requestApi('/api/v1/updateprofile', 'PUT')(this.props.currentProfile.toJS())
      .then(this.props.changeEdit)
  }

  render(){
    return <div className='btn btn-primary' onClick={(e)=>this.updateProfile(e)}>Commit</div>
  }
}

var CommitButton = editButtonBehavior(getProfileBehavior(CommitButtonView))



class ProfileView extends React.Component {

 whosProfile() {
  requestApi('/api/v1/getprofile/' + this.props.params.slug)()
    .then((profile)=>{
      this.props.setProfile(profile)
    })
 }

  componentWillMount(){
    var self = this
    self.whosProfile()
  }




  render() {
    return (
      <div className = 'container-fluid marginTop centerText profileCD'>
        <h1 className = 'profileName'>{this.props.userName}'s Profile</h1>
        <h2 className = 'marginTop' >Description of individual goes here</h2>
        <Row>
          <Col md = {6}>
          <ToggleEditButton/>
            <h4>
              <ul className = 'leftText'>
                <li>Name: <ProfileField field='name'/></li>
                <li>User Name: <ProfileField field='userName'/></li>
                <li>Age: <ProfileField field='age'/></li>
                <li>Location: <ProfileField field='location'/></li>
                <li>Phone: <ProfileField field='phone'/></li>
                <li>Email: <ProfileField field='email'/></li>
                <li>Host: <ProfileField field='host'/></li>
                <li>Drink: <ProfileField field='alcohol'/></li>
                <li>Skill: <ProfileField field='skillLevel'/></li>
                <li>Position: <ProfileField field='position'/></li>
                <li>Game: <ProfileListField field='games'/></li>
                <li>Friends: <ProfileListField field='friends'/></li>
                <li>Blocked Users: <ProfileListField field='blockedUser' /></li>
              </ul>
            </h4>
            <CommitButton /><br/><br/>
          </Col>

          <Col md = {6}>
            <a><li>suggestions/party #1</li></a>
            <a><li>suggestions/party #2</li></a>
            <a><li>suggestions/party #3</li></a>
          </Col>
        </Row>
        <Row>
          <Col md = {12}>
            <Calendar/>
          </Col>
        </Row>
      </div>
     );
  }
};



module.exports = connect(mapStateToProps , mapDispatchToProps)(ProfileView)