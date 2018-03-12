import { combineReducers } from 'redux';
import clients from './clientReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { loadingBarReducer } from 'react-redux-loading-bar';
import { reducer as formReducer } from 'redux-form';
const rootReducer = combineReducers({
  clients,
  form: formReducer,
  toastr: toastrReducer,
  loadingBar: loadingBarReducer,
  ajaxCallsInProgress
});

export default rootReducer;
