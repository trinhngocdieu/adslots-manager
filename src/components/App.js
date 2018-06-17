import React from "react";
import { connect } from "react-redux";
import { ProgressBar } from "react-bootstrap";
import NotificationSystem from "react-notification-system";

import Menu from "./common/Menu";
import "../stylesheets/main.scss";

export class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch({type: 'ADSLOT_FETCH_LIST'});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.message !== this.props.message) {
      this.notification.addNotification({
        message: nextProps.message ,
        level: 'success'
      });
    }
  }

  render() {
    const {adslots, children} = this.props;
    if (!adslots.length) {
      return (
        <ProgressBar active now={100}/>
      );
    }

    return (
      <div className="container">
        <div>
          <Menu/>
        </div>
        <div>
          {children}
        </div>
        <div className="footer">
          <span>
            Adslots Manager © 2018
          </span>
        </div>
        <NotificationSystem ref={e => this.notification = e} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    adslots: state.adslots.data || [],
    message: state.adslots.message
  };
}
export default connect(mapStateToProps)(App);
