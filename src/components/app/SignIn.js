import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class SignIn extends Component {

  constructor(props){
    super(props)

    this.state = {
      username: "",
      password: ""
    }

    this.handleSignIn = this.handleSignIn.bind(this);
  }

  handleSignIn(event){
    event.preventDefault();

    var instance = axios.create({
      baseURL: 'https://online.theironyard.com/api/',
      headers: {'Content-Type': 'application/json'}
    });

    instance.post("auth",  {
      email: this.state.username,
      password: this.state.password
    })
    .then( (response) => {
      if (response.data.jwt) {
        this.props.onSignIn(response.data.jwt)
      } else {
        alert("Sorry, could not authenticate you")
      }
    })
    .catch( (e) => alert("Error: " + e))

  }
  render(){
    return <form onSubmit={this.handleSignIn}>

    <label htmlFor="username">Username</label>
    <input type="text" value={this.state.username} onChange={ (e) => this.setState({username: e.target.value})} />

    <label htmlFor="password">Password</label>
    <input type="password" value={this.state.password} onChange={ (e) => this.setState({password: e.target.value})} />

    <input type="submit" className="button" value="Sign in"/>

    </form>
  }
}

SignIn.PropTypes = {
  onSignIn: PropTypes.func.isRequired
}
