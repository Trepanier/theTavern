


function updateProfileAction(field, value){
	return {
		type: 'UPDATE_PROFILE',
		field,
		value
	}

}

function setProfileAction(profile){
	return{
		type: 'SET_PROFILE',
		profile
	}

}

function changeAvailabiltyAction(day, time, available){
	return{
		type: 'SET_AVAILABILTY',
		day,
		time,
		available
		}
}

function changeEditAction(){
	return {
		type: 'CHANGE_EDITABLE'
	}
}


module.exports = {
	updateProfileAction,
	setProfileAction,
	changeAvailabiltyAction,
	changeEditAction
}