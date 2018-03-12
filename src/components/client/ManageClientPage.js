import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as clientActions from '../../actions/clientActions';
import ClientForm from './ClientForm';

class ManageClientPage extends React.Component {


    //   courseFormIsValid() {
    //     let formIsValid = true;
    //     let errors = {};

    //     if (this.state.course.title.length < 5) {
    //       errors.title = 'Title must be at least 5 characters.';
    //       formIsValid = false;
    //     }

    //     this.setState({ errors: errors });
    //     return formIsValid;
    //   }


    saveClient(event) {
        event.preventDefault();
        // if (!this.courseFormIsValid()) {
        //   return;
        // }
        this.setState({ saving: true });
        this.props.actions.saveCourse(this.state.client)
            .then(() => this.redirect())
            .catch(error => {
                toastr.error(error);
                this.setState({ saving: false });
            });
    }

    redirect() {
        this.setState({ saving: false });
        toastr.success('Client saved');
        this.context.router.push('/');
    }

    render() {
        return (
            <ClientForm  />
        );
    }
}

// ManageCoursePage.propTypes = {
//   course: PropTypes.object.isRequired,
//   authors: PropTypes.array.isRequired,
//   actions: PropTypes.object.isRequired
// };

//Pull in the React Router context so router is available on this.context.router.
// ManageCoursePage.contextTypes = {
//   router: PropTypes.object
// };



export default ManageClientPage;
