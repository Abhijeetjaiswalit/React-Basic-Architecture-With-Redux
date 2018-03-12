import React, { propTypes } from 'react';
import { browserHistory } from 'react-router';
import ReactDOM from 'react-dom';
import TextInput from '../common/TextInput';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as clientActions from '../../actions/clientActions';
import { toastr } from 'react-redux-toastr';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
class ClientForm extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            client: Object.assign({}, props.client),
            errors: {},
            saving: false
        };
        this.updateClientState = this.updateClientState.bind(this);
        //this.saveClient = this.saveClient.bind(this);
    }

    componentDidMount() {
        this.props.initialize(this.props.client);
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.client.id != nextProps.client.id) {
            // Necessary to populate form when existing client is loaded directly.
            this.setState({ client: Object.assign({}, nextProps.client) });
            this.props.initialize(nextProps.client);
        }
    }
    submitHandler(values) {
        this.props.actions.saveClient(this.state.client)
            .then(() => {
                toastr.success('Success', 'Client saved.');
                this.redirect()
            })
            .catch(error => {
                this.setState({ saving: false });
            });
    }
    // async submitHandler(values) {
    //     // event.preventDefault();
    //     this.setState({ saving: true });
    //     try {
    //         const response = await this.props.actions.saveClient(this.state.client)
    //         debugger
    //         if (response) {
    //             toastr.success('Success', 'Client saved.');
    //             this.redirect()
    //         }
    //     }
    //     catch (error) {
    //         alert(error);
    //     }
    // }
    redirect() {
        browserHistory.push('/');
    }
    updateClientState(event) {
        const field = event.target.name;
        let client = this.state.client;
        client[field] = event.target.value;
        return this.setState({ client: client });
    }
    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="row">
                <div className="col-md-12">
                    <form className="form-horizontal" id="form-edit-client" onSubmit={handleSubmit(this.submitHandler.bind(this))}>
                        <fieldset>
                            <legend className="title">Client</legend>
                            <div className="form-group">
                                <label className="col-md-4 control-label" htmlFor="client-name">Name</label>
                                <div className="col-md-4">
                                    <Field
                                        name="name"
                                        className="form-control input-md"
                                        component={TextInput}
                                        onChange={this.updateClientState}
                                        placeholder="your client's name"
                                    />
                                    {/* <input id="client-name" name="client-name" type="text" placeholder="your client's name" className="form-control input-md"> */}
                                    {/* <span className="help-block">Full name of your customer</span> */}
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-4 control-label" htmlFor="client-email">Email</label>
                                <div className="col-md-4">
                                    <Field
                                        name="email"
                                        className="form-control input-md"
                                        component={TextInput}
                                        onChange={this.updateClientState}
                                        placeholder="your client's email"
                                    />
                                    {/* <input id="client-email" name="client-email" className="form-control" placeholder="yourname@yourdomain.com" type="text"> */}
                                    {/* <p className="help-block">Email of your client</p> */}
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="col-md-4 control-label" htmlFor="btn-save"></label>
                                <div className="col-md-4">
                                    <button id="btn-save" type="submit" name="btn-save" className="btn btn-success">Save</button>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        );
    };
}

// ClientForm.propTypes = {
//     client: PropTypes.object.isRequired,
//     actions: PropTypes.object.isRequired
// };
function getClientById(clients, id) {
    const client = clients.filter(client => client.id == id);
    if (client) return client[0]; //since filter returns an array, have to grab the first.
    return null;
}

function mapStateToProps(state, ownProps) {
    const clientId = ownProps.params ? ownProps.params.id : null; // from the path `/client/:id`
    let client = { id: '', name: '', email: '' };
    if (clientId && state.clients.length > 0) {
        client = getClientById(state.clients, clientId);
    }
    return {
        client: client
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(clientActions, dispatch)
    };
}
function validate(values) {
    const errors = {}
    if (!values.name) {
        errors.name = "please enter client's name.";
    }
    if (!values.email) {
        errors.email = "please enter client's email.";
    }
    return errors;
}
const $ClientForm = reduxForm({
    form: 'clientDemoForm',
    validate: validate
})(ClientForm);

export default connect(mapStateToProps, mapDispatchToProps)($ClientForm)