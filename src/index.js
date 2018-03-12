/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import {loadClients} from './actions/clientActions';
import './styles/styles.css'; //Webpack can import CSS files too!
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
const store = configureStore();
// 1. Call dispatch on the store with an argument of this action that makes an API request
// 2. The loadClients() action is invoked, which makes an API call, and dispatches the loadClientsSuccess action
// 3. that action: store -> root reducer -> clients reducer
// 4. clients reducer handles that action, recieves client payload and return new state that has clients: clients payload
// 5. the ClientsPage component is connected to the store, so store's new state triggers the mapStateToProps function, which triggers the render function on that component
store.dispatch(loadClients());
render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
