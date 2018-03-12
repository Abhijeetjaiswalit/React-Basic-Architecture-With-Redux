import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as clientActions from '../../actions/clientActions';
import ClientList from './ClientList';
import { browserHistory } from 'react-router';
import { toastr } from 'react-redux-toastr';
class ClientsPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.redirectToAddClientPage = this.redirectToAddClientPage.bind(this);
        this.deleteClient = this.deleteClient.bind(this);
        this.confirmDelete = this.confirmDelete.bind(this);
    }
    redirectToAddClientPage() {
        browserHistory.push('/client');
    }
    deleteClient(client) {
        this.props.actions.deleteClient(client)
            .then(() => {
                toastr.success('Success', 'Client deleted successfully!');
            })
            .catch(error => {
                alert(error)
                toastr.error(error);
            });
    }
    confirmDelete(client) {
        const toastrConfirmOptions = {
            onOk: () => this.deleteClient(client)
        };
        toastr.confirm('Are you sure you want to delete ' + client.name, toastrConfirmOptions);
    }
    // redirect() {
    //     browserHistory.push('/')
    // }
    render() {
        const { clients } = this.props;
        return (
            <div className="col-md-12 clientpage" >
                <form id="form-list-client">
                    <legend>List of clients</legend>
                    <div className="pull-right">
                        <a className="btn btn-default-btn-xs btn-primary"><i className="glyphicon glyphicon-refresh"></i> Refresh</a>
                        <a className="btn btn-default-btn-xs btn-success" onClick={this.redirectToAddClientPage}><i className="glyphicon glyphicon-plus"></i> New</a>
                    </div>
                    <ClientList clients={clients} deleteClient={this.confirmDelete} />
                </form>
            </div>
        );
    }
}

// CoursesPage.propTypes = {
//   courses: PropTypes.array.isRequired,
//   actions: PropTypes.object.isRequired
// };

function mapStateToProps(state, ownProps) {
    debugger
    //const clientId = ownProps.params ? ownProps.params.id : null; // from the path `/course/:id`
    return {
        clients: state.clients
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(clientActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientsPage);
