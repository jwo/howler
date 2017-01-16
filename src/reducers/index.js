import { combineReducers } from 'redux';
import * as actions from '../actions';

const userReducer = (state = null, action) => {
  return state;
}

export default combineReducers({
  user: userReducer
});
