import * as types from './actionTypes';
import axios from 'axios';
import clientApi from '../api/mockClientApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { API_HOST, API_LOADING, API_REQUEST, API_REQUEST_FAIL, API_REQUEST_SAVE } from '../commons/const';

export function loadClientsSuccess(clients) {
  return { type: types.LOAD_CLIENTS_SUCCESS, clients };
}

export function createClientSuccess(client) {
  return { type: types.CREATE_CLIENT_SUCCESS, client };
}

export function updateClientSuccess(client) {
  return { type: types.UPDATE_CLIENT_SUCCESS, client };
}
export function deleteClientSuccess(client) {
  return { type: types.DELETE_CLIENT_SUCCESS, client };
}

export function loadClients() {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    dispatch(showLoading());
    return clientApi.getAllClients().then(clients => {
      dispatch(loadClientsSuccess(clients));
      dispatch(hideLoading());
    }).catch(error => {
      dispatch(hideLoading());
      throw (error);
    });
  };
}
// export function saveClient(params) {
//   params = {
//     name: "Test Name",
//     age: 27
//   }
//   return async dispatch => {
//     function onSuccess(success) {
//       debugger
//       dispatch({ type: types.CREATE_CLIENT_SUCCESS, payload: success });
//       return success;
//     }
//     function onError(error) {
//       dispatch({ type: ERROR_GENERATED, error });
//       return error;
//     }
//     try {
//       debugger
//       const success = await axios.post('http://172.10.155.101:4000/addStudent', params);
//       debugger
//       return onSuccess(success);
//     } catch (error) {
//       return onError(error);
//     }
//   }
// }
export function saveClient(client) {
  return function (dispatch, getState) {
    debugger
    dispatch(beginAjaxCall());
    dispatch(showLoading());
    debugger
    return clientApi.saveClient(client).then(client => {
      client.id ? dispatch(updateClientSuccess(client)) :
        dispatch(createClientSuccess(client));
      dispatch(hideLoading());
    }).catch(error => {
      dispatch(ajaxCallError(error));
      dispatch(hideLoading());
      throw (error);
    });
  };
}

export function deleteClient(client) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    dispatch(showLoading());
    return clientApi.deleteClient(client.id).then(clients => {
      dispatch(deleteClientSuccess(clients));
      dispatch(hideLoading());
    }).catch(error => {
      dispatch(ajaxCallError(error));
      dispatch(hideLoading());
      throw (error);
    });
  };
}