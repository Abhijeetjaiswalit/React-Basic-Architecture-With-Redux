import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const ClientListRow = ({ client, deleteClient }) => {
    return (
        <tr>
            {/* <td><a href={client.watchHref} target="_blank">Watch</a></td>
            <td><Link to={'/course/' + client.id}>{client.title}</Link></td>
            <td>{client.Id}</td> */}
            <td>{client.name}</td>
            <td>{client.email}</td>
            <td>
                <a title="view this user" className="btn btn-default btn-sm "> <i className="glyphicon glyphicon-eye-open text-primary"></i> </a>
                <Link to={'/client/' + client.id} title="edit this user" className="btn btn-default btn-sm "> <i className="glyphicon glyphicon-edit text-primary"></i> </Link>
                <a title="delete this user" onClick={deleteClient} className="btn btn-default btn-sm "> <i className="glyphicon glyphicon-trash text-danger"></i> </a>

                {/* <a title="check credit" className="btn btn-default btn-sm "> <i className="glyphicon glyphicon-duplicate text-danger"></i> </a>
                <a title="generate invoice" className="btn btn-default btn-sm "> <i className="glyphicon glyphicon-level-up bg-success"></i> </a> */}

            </td>
        </tr>
    );
};

// CourseListRow.propTypes = {
//   course: PropTypes.object.isRequired
// };

export default ClientListRow;
