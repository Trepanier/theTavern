
import Immutable from 'immutable'



function tavernReducer(previousState, action){
	console.log('DOING A REDUCE', previousState.toJS())
	switch(action.type){
		case 'CHANGE_EDITABLE':
			return previousState.set('edit', !previousState.get('edit'));
		case 'UPDATE_PROFILE':
			return previousState.setIn(['currentProfile', action.field], action.value)
		case 'SET_PROFILE':
			return previousState.set('currentProfile' , Immutable.fromJS(action.profile))
		case 'SET_AVAILABILTY':
			console.log('setting availabilty', action)
			return previousState.setIn(['currentProfile', 'availability', action.day, action.time], action.available)
	}
	return previousState

}

module.exports = tavernReducer