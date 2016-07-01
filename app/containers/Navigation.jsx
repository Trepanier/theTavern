import React, { Component, PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';

import classNames from 'classnames/bind';
import styles from 'css/components/navigation';

const cx = classNames.bind(styles);

class Navigation extends Component {

 constructor(props){
    super(props);
    this.state = {}
  }  

  componentWillMount() {
    var self = this
    fetch('/api/v1/getuser', {credentials : 'same-origin'})
    .then(function(response) {
      return response.json()
    }).then(function(json){
      self.setState(json)
      console.log("parsed json", json)
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
  }

  logInOut(){
    if(this.props.loggedIn){
      return(
        <div> 
        {this.state.local && this.state.local.email}
        <Link to="/logout" onClick = {this.props.toggleLogin} className = {cx('item')} activeclassName={cx('active')}>Logout</Link>
        </div> 
      )     
    } else {
      return <Link to="/login"  className={cx('item')} activeClassName={cx('active')}>Login</Link>
    }
  }

  render() {
    return (
      <nav className={cx('navigation')} role="navigation">
      <IndexLink to="/" className={cx('item')} activeClassName={cx('active')}>Home</IndexLink>
      <Link to="/profile" className={cx('item')} activeClassName={cx('active')}>Profile</Link>
      <Link to="/additem/test-collection" className={cx('item')} activeClassName={cx('active')}>Add Item</Link>
      {this.logInOut()}
      </nav>
      );
  }
}


export default Navigation;