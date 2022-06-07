/* eslint-disable react/no-danger */
import React from "react";
import PropTypes from "prop-types";
import "./index.sass";

// Types (success as default): warning, success, error, info

class AlertMessages extends React.Component {
  AlertMessages = React.createRef();

  state = {
    showAlert: false,
  };

  componentDidMount() {
    this.showHideAlert();
  }

  componentDidUpdate(prevProps) {
    const { show } = this.props;

    if (prevProps.show !== show) {
      this.showHideAlert(show);
    }
  }

  showHideAlert = async (boolValue) => {
    const { show } = this.props;

    await this.setState({
      showAlert: boolValue || show,
    });
  };

  render() {
    const { type, message, className } = this.props;

    const { showAlert } = this.state;

    const icon = () => {
      switch (type) {
        case "error": {
          return <i className="icon-error" />;
        }

        case "warning": {
          return <i className="icon-warning" />;
        }

        case "info": {
          return <i className="icon-info" />;
        }

        default: {
          return <i className="icon-success" />;
        }
      }
    };

    if (showAlert) {
      return (
        <div
          ref={(el) => {
            this.AlertMessages = el;
          }}
          className={`alertMessages alertMessages-${type} ${className}`}
        >
          {icon()}
          <span
            className="alertMessages-message"
            dangerouslySetInnerHTML={{ __html: message }}
          />
        </div>
      );
    }

    return <React.Fragment />;
  }
}

AlertMessages.propTypes = {
  show: PropTypes.bool,
  type: PropTypes.string,
  message: PropTypes.node.isRequired,
  className: PropTypes.string,
};

AlertMessages.defaultProps = {
  type: "success",
  show: true,
  className: "",
};

export default AlertMessages;
