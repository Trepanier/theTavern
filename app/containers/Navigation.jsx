import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import classNames from 'classnames/bind';
import styles from 'css/components/navigation';

const cx = classNames.bind(styles);

class Navigation extends Component {

  logInOut(){
    if(this.props.loggedIn){
      return <Link to="/logout" onClick = {this.props.toggleLogin} className = {cx('item')} activeclassName={cx('active')}>Logout</Link>
    }else{
      return <Link to="/login"  className={cx('item')} activeClassName={cx('active')}>Login</Link>
    }
  }

  constructor(props){
    super(props);
    this.state = {
      search: ''
    }
  }

  search() {
    
  }

  render() {
    return (
      <nav className={cx('navigation')} role="navigation">
      <Link to="/" className={cx('item')} activeClassName={cx('active')}>Home</Link>
      {this.logInOut()}
      <input onChange={(e)=>this.setState({search:e.target.value})} />
      <button onClick={this.search.bind(this)}>Search Collections</button>
      </nav>
      );
  }
}

export default Navigation;