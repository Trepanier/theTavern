import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/home';
import {browserHistory} from 'react-router';
const cx = classNames.bind(styles);


export default class Profile extends React.Component {

	render() {
    return (
    	<div>
      		<h1>Profile</h1>
      		<img />
      		<h2>Name Goes Here</h2>
      		<p></p>
      	</div>
    );
  }
};