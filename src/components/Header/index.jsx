/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import queryString from "query-string";
import { withRouter, Link } from "react-router-dom";
import { Row, Col } from "../Grid";
import "./index.sass";

const Header = ({ history, location }) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    searchQueryString();
    // eslint-disable-next-line
  }, [location.search]);

  const searchQueryString = () => {
    const parsed = queryString.parse(location.search);

    if (parsed && parsed.movie && parsed.movie !== search) {
      setSearch(parsed.movie);
    }
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search?movie=${search}`);
  };

  return (
    <header className="header">
      <div className="wrapper">
        <Row
          rowSpacing={5}
          cellSpacing={10}
          horizontalAlign="space-between"
          verticalAlign="center"
        >
          <Col lg={6} md={6} sm={6} xs={12}>
            <div className="header-logo">
              <Link to="/">myMovies</Link>
            </div>
          </Col>

          <Col lg={6} md={6} sm={6} xs={12}>
            <form className="header-search" onSubmit={(e) => onHandleSubmit(e)}>
              <input
                type="text"
                name="search"
                autoComplete="off"
                className="full"
                placeholder="search movie..."
                value={search}
                onChange={({ target }) => setSearch(target.value)}
                required
              />
              <button type="submit">search</button>
            </form>
          </Col>
        </Row>
      </div>
    </header>
  );
};

Header.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};

export default withRouter(Header);
