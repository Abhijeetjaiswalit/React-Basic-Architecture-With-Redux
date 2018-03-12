import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const clients = [
  {
    id: "1",
    name: "Abhijeet Jaiswal",
    email: "abhijeetjaiswalit@gmail.com",
  },
  {
    id: "2",
    name: "Vikas Thakur",
    email: "vikasthakurit@gmail.com",
  }
];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}
//This would be performed on the server in a real app. Just stubbing in.
const generateId = (client) => {
  return replaceAll(client.name, ' ', '-');
};

class ClientApi {

  static getAllClients() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], clients));
      }, delay);
    });
  }

  static saveClient(client) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (client.id) {
          debugger
          const existingClientIndex = clients.findIndex(a => a.id == client.id);
          clients.splice(existingClientIndex, 1, client);
        } else {
          //Just simulating creation here.
          //Cloning so copy returned is passed by value rather than by reference.
          client.id = generateId(client);
          clients.push(client);
        }
        resolve(Object.assign({}, client));
      }, delay);
    });
  }

  static deleteClient(clientId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfClientToDelete = clients.findIndex(a => a.id == clientId);
        clients.splice(indexOfClientToDelete, 1);
        resolve(Object.assign({}, clients));
      }, delay);
    });
  }
}

export default ClientApi;
