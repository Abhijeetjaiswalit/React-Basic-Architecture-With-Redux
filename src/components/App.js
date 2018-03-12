// This component handles the App template used on every page.
import React, { PropTypes } from 'react';
import ReduxToastr from 'react-redux-toastr';
import LoadingBar from 'react-redux-loading-bar';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <LoadingBar style={{ backgroundColor: '#29D', height: '3px', position: 'fixed', left: 0, top: 0, zIndex: 9999 }} />
        <ReduxToastr
          timeOut={3000}
          newestOnTop={false}
          preventDuplicates
          position='top-right'
          transitionIn='fadeIn'
          transitionOut='fadeOut' />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
};

export default App;
