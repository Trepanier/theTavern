import {connect} from 'react-redux'

function mapStateToProps(state){
  return { 
    currentProfile : state.get("currentProfile"),
  }
}

function mapDispatchToProps(dispatch){
  return {
    setProfile : (profile) => dispatch(setProfileAction(profile)),
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)