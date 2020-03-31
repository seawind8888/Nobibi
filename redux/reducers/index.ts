import { combineReducers } from 'redux';
import user from './user';
import topic from './topic';
import { User, Topic } from '../../@types'
import channel, { ChannelStateType } from './channel';

export interface AppStateType {
  user: User,
  channel: ChannelStateType,
  topic: Topic
}

export const rootReducer = combineReducers<AppStateType>({
  user,
  channel,
  topic
});