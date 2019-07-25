import { combineReducers } from 'redux';
import user from './user';
import topic from './topic';
import channel from './channel';

export default combineReducers({
  user,
  channel,
  topic
});