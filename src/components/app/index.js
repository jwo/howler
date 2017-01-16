import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import Submissions from './Submissions'
import SignIn from './SignIn'

// require('../../../less/main.less');

import styles from './../../styles/main.css';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      authToken: ""
    }

    this.onSignIn = this.onSignIn.bind(this);

  }

  onSignIn(token){
    this.setState({
      authToken: token
    })
  }

  render(){

    return <div>
      {!this.state.authToken &&
        <SignIn onSignIn={this.onSignIn} />
      }
      {this.state.authToken &&
        <Submissions authToken={this.state.authToken}/>
      }
    </div>;
  }
}



// ReactDOM.render(React.createElement(MyComponent, {}), document.getElementById('content'));
