

//USER/LOGIN ACTIONS
function setUserAction(user){
	return{
		type: "SET_USER",
		user
	}
}

function toggleLoginAction(){
	return{
		type: "TOGGLE_LOGIN"
	}
}

//PROFILE ACTIONS
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

function addToListAction(list, item){
	return {
		type: 'ADD_LIST_ITEM',
		list,
		item
	}
}

function deleteFromListAction(list, item){
	return {
		type: 'REMOVE_LIST_ITEM',
		list,
		item
	}
}


//SEARCH ACTIONS
function setSearchAction(search) {
	return {
		type: 'SET_SEARCH',
		search
	}
}

module.exports = {
	toggleLoginAction,
	setUserAction,
	updateProfileAction,
	setProfileAction,
	changeAvailabiltyAction,
	changeEditAction,
	addToListAction,
	deleteFromListAction,
	setSearchAction
}