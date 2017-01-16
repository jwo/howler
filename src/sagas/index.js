import { take, put, call, fork } from 'redux-saga/effects';
// import moment from 'moment';
// import electron from 'electron';
import axios from 'axios';

import * as actions from '../actions'

export function notifyAboutSubmission(submission, onClick) {

}


function* watchRequestAuthToken(getState){
  while(true){
    console.log("watchRequestAuthToken")
    const {email, password} = yield take(actions.REQUEST_AUTHENTICATION_CREDENTIALS);
    try {
      const authToken = yield call(fetchAuthToken, email, password)
      if (authToken) {
        yield put(actions.receiveAuthToken(authToken));
        yield put(actions.requestSubmissions());
      } else {
        alert("nope");
      }
    } catch (ex) {
      console.log('error while authentication', ex);
    }
  }
}


function* watchRequestSubmissions(getState) {
  while (true) {
    const { limit } = yield take(actions.REQUEST_SUBMISSIONS);
    try {
      const submissions = yield call(fetchSubmissions, getState().authToken);
      submissions.forEach( (s) => {
        put(actions.notifyAboutSubmission(s))
      })
      yield put(actions.fetchedSubmissions(submissions));

    } catch (ex) {
      console.log('error while fetching stories', ex);
    }
  }
}

function fetchAuthToken(email, password){
  var instance = axios.create({
    baseURL: 'https://online.theironyard.com/api/',
    headers: {'Content-Type': 'application/json'}
  });

  return instance.post("auth",  {
    email: email,
    password: password
  })
  .then( (response) => response.data.jwt )
  .catch( (e) => alert("Error: " + e))

}

function fetchSubmissions(authToken) {

  var instance = axios.create({
    baseURL: 'https://online.theironyard.com/api/',
    headers: {'Content-Type': 'application/json', 'Authorization': authToken}
  });

  return instance.get("assignment_submissions?search=not_graded")
  .then( (response) => response.data.data)
}

const delay = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

function* startAutoRequestSubmissions(getState) {
  while (true) {
    if (getState().authToken){
      yield put(actions.requestSubmissions());
    }
    yield call(delay, 60 * 1000); // fetch new stories every sixty seconds

  }
}


export default function* root() {
  const { store } = yield take('APP_INIT');
  yield fork(watchRequestSubmissions, store.getState);
  yield fork(watchRequestAuthToken);
  yield fork(startAutoRequestSubmissions, store.getState)

}
