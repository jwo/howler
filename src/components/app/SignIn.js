import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import * as actions from '../../actions';

export default class SignIn extends Component {

  constructor(props){
    super(props)

    this.state = {
      email: "",
      password: ""
    }

    this.handleSignIn = this.handleSignIn.bind(this);
  }

  handleSignIn(event){
    event.preventDefault();
    const {dispatch} = this.props;

    dispatch(actions.requestAuthenticateCredentials({
      email: this.state.email,
      password: this.state.password
    }))

  }
  render(){
    return <form onSubmit={this.handleSignIn}>

    <label htmlFor="email">Email</label>
    <input type="text" value={this.state.email} onChange={ (e) => this.setState({email: e.target.value})} />

    <label htmlFor="password">Password</label>
    <input type="password" value={this.state.password} onChange={ (e) => this.setState({password: e.target.value})} />

    <input type="submit" className="button" value="Sign in"/>

    </form>
  }
}
