import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function courseReducer(state = initialState.clients, action) {
  switch (action.type) {
    case types.LOAD_CLIENTS_SUCCESS:
      return action.clients;
    case types.CREATE_CLIENT_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.client)
      ];
    // case types.CREATE_CLIENT_SUCCESS:
    // debugger
    //   return [
    //     ...state,
    //     Object.assign({}, action.payload)
    //   ];
    case types.UPDATE_CLIENT_SUCCESS:
      return [
        ...state.filter(client => client.id !== action.client.id),
        Object.assign({}, action.client)
      ];
    case types.DELETE_CLIENT_SUCCESS:
      initialState.clients = [];
      const newState = Object.assign([], action.client);
      return newState;
    default:
      return state;
  }
}
