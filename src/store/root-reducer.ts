import { combineReducers } from '@reduxjs/toolkit';
import { reducer as calendarReducer } from '../slices/calendar';
import { reducer as chatReducer } from '../slices/chat';
import { reducer as mailReducer } from '../slices/mail';

export const rootReducer = combineReducers({
  calendar: calendarReducer,
  chat: chatReducer,
  mail: mailReducer
});
