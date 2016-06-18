import React from 'react';

import classNames from 'classnames/bind';
import styles from 'css/components/home';
import 'whatwg-fetch';
const cx = classNames.bind(styles);
import {browserHistory} from 'react-router';

/*
 * Note: This is kept as a container-level component, 
 *  i.e. We should keep this as the container that does the data-fetching 
 *  and dispatching of actions if you decide to have any sub-components.
 */

 export default class AddPost extends React.Component {

  constructor(props){
    super(props);
    this.state={};
  }

  submitPost(){
    fetch('/api/v1/posts', {
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then(function(response) {
      return response.json()
    }).then(function(json) {
      console.log('parsed json', json)
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    }).then(function(){
      browserHistory.push('/')
    })
  };


  render() {
    return (
      <div className={cx('home')}>
      <h1 className={cx('home__header')}>WELCOME TO THE POST EDITOR</h1>
      <p>Slug Search: <input onChange={(e)=>this.setState({slug: e.target.value})} /></p>
      <p>Title</p>
      <p><input onChange={(e)=>this.setState({title: e.target.value})} /></p>
      <p>Author</p>
      <p><input onChange={(e)=>this.setState({author: e.target.value})} /></p>
      <p>Body</p>
      <p><textarea onChange={(e)=>this.setState({body: e.target.value})} /></p>
      <button onClick={this.submitPost.bind(this)}>Submit</button>
       </div>
       );
     }

   };
