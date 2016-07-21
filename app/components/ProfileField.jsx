import React from 'react';
import {updateProfileAction} from '../redux/actions'
import {connect} from 'react-redux'
import {Button} from 'react-bootstrap'


function mapStateToProps(state, ownProps){
  console.log('map state', state.get('currentProfile'))
  return {
    edit : state.get('edit'),
    value: state.getIn(['currentProfile', ownProps.field]),
    field: ownProps.field
  }

}

function mapDispatchToProps(dispatch, ownProps){
  return {
    updateProfile : (value) => dispatch(updateProfileAction(ownProps.field, value))
  }

}


export default class ProfileFieldsView extends React.Component {
  render(){
    if (this.props.edit){
      return  (<div>
        <input className="black" type = 'text' onChange={(e) => this.props.updateProfile(e.target.value)} value = {this.props.value}/>
        </div>)
    } else {
      return <span>{this.props.value}</span>
    }
  }


}

module.exports = connect(mapStateToProps, mapDispatchToProps)(ProfileFieldsView)  





  // textOutput(curr) {
  //   const updateState = (e) =>{
  //     var profile = this.state.currentProfile
  //     profile[curr] = e.target.value
  //     this.setState({currentProfile : profile})
  //   }

  //   const toggleHideValue = (value) =>
      // this.setState(_.set(this.state, `currentProfile.hiddenValues[${value}]`, !_.get(this.state, `currentProfile.hiddenValues[${value}]`, false)))

  //   if(this.props.edit === true) {
  //      return( 
  //       <div>
  //       <input className="black" type = 'text' onChange={updateState.bind(this)} id = {`textbox${curr}`} value = {this.state.currentProfile[curr]}/>
  //       <input type='checkbox' onClick={toggleHideValue.bind(this, curr)} checked={_.get(this.state, `currentProfile.hiddenValues[${curr}]`)}/>hide
  //       </div>
  //       )
  //   }else if(!_.get(this.state, `currentProfile.hiddenValues[${curr}]`)){
  //     return (
  //       <span>{this.state.currentProfile[curr]}</span>
  //     )
  //   } else {
  //     return <span>Life is a mystery...</span>
  //   }
  // }