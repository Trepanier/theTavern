import React from 'react';
import {changeEditAction} from '../redux/actions'
import {connect} from 'react-redux'
import {Button} from 'react-bootstrap'


function mapStateToProps(state){
	console.log('map state', state.get('edit'))
	return {
		edit : state.get('edit')
	}

}

function mapDispatchToProps(dispatch){
	return {
		changeEdit : () => dispatch(changeEditAction())
	}

}


export default class ToggleEditButtonView extends React.Component {
	render(){
		return (<Button onClick = {()=>this.props.changeEdit()} bsStyle = 'primary'>{this.props.edit ? 'Stop Editing': 'Edit'}</Button>)
	}


}

module.exports = connect(mapStateToProps, mapDispatchToProps)(ToggleEditButtonView)