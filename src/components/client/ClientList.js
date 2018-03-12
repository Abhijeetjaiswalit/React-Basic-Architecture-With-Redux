import React, { PropTypes } from 'react';
import ClientListRow from './ClientListRow';

const ClientList = ({ clients, deleteClient }) => {
    return (
        <table className="table table-bordered table-condensed table-hover">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody id="form-list-client-body">
                {clients.map(client =>
                    <ClientListRow key={client.id} client={client} deleteClient={deleteClient.bind(this, client)} />
                )}
            </tbody>
        </table>
    );
};

// CourseList.propTypes = {
//     courses: PropTypes.array.isRequired
// };

export default ClientList;
