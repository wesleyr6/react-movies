import React from "react";
import PropTypes from "prop-types";
import Header from "../Header";

const MasterPage = ({ children }) => (
  <React.Fragment>
    <Header />

    <main>{children}</main>
  </React.Fragment>
);

MasterPage.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MasterPage;
