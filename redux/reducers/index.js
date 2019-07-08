import { combineReducers } from 'redux';
import topic from './topic';
import user from './user';
import channel from './channel';

export default combineReducers({
  user,
  topic,
  channel
});