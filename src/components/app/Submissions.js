import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class Submissions extends Component {
  constructor(props){
    super(props);

    this.state = {
      submissions: [],
      totalCount: 0,
      hasFetched: false
    }
  }

  componentWillMount(){
    var instance = axios.create({
      baseURL: 'https://online.theironyard.com/api/',
      headers: {'Content-Type': 'application/json', 'Authorization': this.props.authToken}
    });

    instance.get("assignment_submissions?search=not_graded")
    .then( (response) => {
      if (response.data.data) {
        this.setState({
          hasFetched: true,
          totalCount: response.data.meta.count,
          submissions: response.data.data
        })
      } else {
        alert("Error finding assignments")
      }
    })
    .catch( (e) => alert("Error: " + e))

  }

  render(){
    const hasNotFetched = <div>...</div>;
    const hasFetched = <div>
      <h6>Submission List - {this.state.totalCount}</h6>

      {this.state.submissions.map( (s) => {
        return <div key={s.id} style={{marginBottom: 10}}>
          <strong>{s.student.name}</strong><br/>
          Assignment: {s.assignment.title}
        </div>
      })}
    </div>

    if (this.state.hasFetched === true) {
      return hasFetched
    } else {
      return hasNotFetched
    }
  }
}

Submissions.PropTypes = {
  authToken: PropTypes.string.isRequired
}
