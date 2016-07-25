import React from 'react';
import {updateProfileAction} from '../../redux/actions'
import {Button} from 'react-bootstrap'
import {connect} from 'react-redux'


function mapStateToProps(state, ownProps){
  console.log('map state', state.get('currentProfile'))
  return {
    edit : state.get('edit'),
    value: state.getIn(['currentProfile', ownProps.field]),
  }

}

function mapDispatchToProps(dispatch, ownProps){
  return {
    updateProfile : (value) => dispatch(updateProfileAction(ownProps.field, value)),
    addToList : (list, item) => dispatch(addToListAction(list, item)),
    deleteFromList : (list, item) => dispatch(deleteFromListAction(list, item))
  }

}

export default class ProfileCheckboxFieldsView extends React.Component {
  render(){
    if (this.props.edit){
      return  (
        <span>{this.props.label}: <input type = 'checkbox' onChange={(e) => this.props.updateProfile(e.target.checked)} checked={this.props.value} /></span>
      )
    } else if (this.props.value) {
      return (<span>Willing to be a {this.props.label}</span>)
    } else {
    	return (<span/>)
    }
  }


}

module.exports = connect(mapStateToProps, mapDispatchToProps)(ProfileCheckboxFieldsView) 