import { createStore } from 'redux'
import tavernReducer from './reducer'
import Immutable from 'immutable'


var initialState = Immutable.fromJS({
	loggedIn: false,
	currentUser : {},
	currentProfile: {},
	edit: false
})

module.exports =  createStore(tavernReducer, initialState)