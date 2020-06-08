/* global document */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoaderIMG from "../../assets/images/loader.svg";
import "./index.sass";

const Loader = ({
  horizontalAlign,
  verticalAlign,
  containerHeight,
  full,
  description,
}) => {
  useEffect(() => {
    if (full) {
      document.body.classList.add("body-overflow");
    }

    return () => {
      document.body.classList.remove("body-overflow");
    };
  }, [full]);

  if (full) {
    return (
      <div className="loader">
        <div className="loader-bg" />
        <div className="loader-content">
          <img
            src={LoaderIMG}
            alt="Loading..."
            className="loader-content-img"
          />
          <span className="loader-content-description">{description}</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="loader-inline"
      style={{
        height: containerHeight === 0 ? "auto" : containerHeight,
        alignContent: verticalAlign,
        alignItems: verticalAlign,
        justifyContent: horizontalAlign,
      }}
    >
      <img src={LoaderIMG} alt="Loading..." />
    </div>
  );
};

Loader.propTypes = {
  full: PropTypes.bool,
  description: PropTypes.string,
  containerHeight: PropTypes.number,
  verticalAlign: PropTypes.string,
  horizontalAlign: PropTypes.string,
};

Loader.defaultProps = {
  full: false,
  description: "Carregando, aguarde...",
  containerHeight: 0,
  verticalAlign: "flex-start",
  horizontalAlign: "flex-start",
};

export default Loader;
