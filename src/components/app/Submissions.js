import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import { put } from 'redux-saga/effects';
import * as actions from '../../actions'



export default class Submissions extends Component {
  constructor(props){
    super(props);
  }


  render(){
    return <div>
      <h6>Submission List - {this.props.submissions.length}</h6>

      {this.props.submissions.map( (s) => {
        return <div key={s.id} style={{marginBottom: 10}}>
          <strong>{s.student.name}</strong><br/>
          Assignment: {s.assignment.title}
        </div>
      })}
    </div>

  }
}
