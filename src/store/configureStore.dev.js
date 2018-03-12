import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
//import { api } from '../middlewares/api';
export default function configureStore(initialState) {
  const middlewares = [
    //api,
    thunk,
    reduxImmutableStateInvariant()
  ];
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares)
  );
}
