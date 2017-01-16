import { combineReducers } from 'redux';
import * as actions from '../actions';

const authTokenReducer = (state = null, action) => {
  if (action.type === actions.RECEIVE_AUTH_TOKEN){
    return action.authToken;
  }
  return state;
}

const submissionsReducer = (state=[], action) => {
  if (action.type === actions.FETCHED_SUBMISSIONS){
    return action.submissions;
  }
  return state;
}

export default combineReducers({
  authToken: authTokenReducer,
  submissions: submissionsReducer
});
