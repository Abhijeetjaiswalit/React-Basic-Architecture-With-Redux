import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import clientForm from './components/client/ClientForm';  //eslint-disable-line import/no-named-as-default
import ClientsPage from './components/client/ClientsPage';
import ManageClientPage from './components/client/ManageClientPage';
export default (
  <Route path="/" component={App}>
    <IndexRoute component={ClientsPage} />
    {/* <Route path="clients" component={ClientsPage} /> */}
    <Route path="client" component={clientForm} />
    <Route path="client/:id" component={clientForm} />
  </Route>
);
