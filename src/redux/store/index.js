import { thunk } from 'redux-thunk';
import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage';
import { persistReducer, createTransform } from 'redux-persist';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

import auth from '../slice/auth';
import trip from '../slice/trip';

const authTransform = createTransform(
  (inboundState) => ({
    token: inboundState.token,
    user: inboundState.user
  }),
  null
);

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
  transforms: [authTransform]
};

const reducers = combineReducers({
  auth,
  trip
});

const rootReducer = (state, action) => {
  if (action.type === 'authReducer/Logout') {
    state = undefined;
  }
  return reducers(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default configureStore({
  reducer: persistedReducer,
  middleware: () => [thunk, logger],
  devTools: true
});
