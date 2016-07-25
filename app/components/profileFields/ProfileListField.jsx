import React from 'react';
import {addToListAction, deleteFromListAction} from '../../redux/actions'
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




export default class ProfileListFieldView extends React.Component {

	listDisplay(list){
		return list.map((item)=>{
			if(this.props.edit) {
				return(<div>{item}<span className='red invisableButton' onClick={() => this.props.deleteFromList(this.props.field, item)}>X</span><br/></div>)
			} else {
				return(<div>{item}<br/></div>)
			}
		})
	}

	render(){

		if(this.props.edit){
			return(<span>{this.props.label}: <div>
				<input className="black" type='textbox' id={this.props.field} /><span className='green invisableButton twentyTwo' onClick={() => this.props.addToList(this.props.field, document.getElementById(this.props.field).value)}>+</span>
				{this.listDisplay(this.props.value)}
				</div>
				</span>)
		}else{	
			return(
				<span>{this.props.label}: 
				<div className ="green">
				{this.listDisplay(this.props.value)}
				</div>
				</span>)
			}
		}	
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(ProfileListFieldView)