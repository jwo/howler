import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import Submissions from './Submissions'
import SignIn from './SignIn'
import styles from './../../styles/main.css';

export default class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render(){

    const { authToken, submissions } = this.props.getState();

    return <div>
      {!authToken &&
        <SignIn dispatch={this.props.dispatch}  />
      }
      {authToken &&
        <Submissions dispatch={this.props.dispatch} submissions={submissions}/>
      }
    </div>;
  }
}
