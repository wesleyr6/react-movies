/* eslint-disable no-undef */
import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { withRouter, Link } from 'react-router-dom';
import { Row, Col } from '../Grid';
import './index.sass';

class Header extends React.Component {
  state = {
    search: '',
  }

  componentDidMount() {
    this.searchQueryString();
  }

  searchQueryString = () => {
    const { history } = this.props;
    const { search } = this.state;
    const parsed = queryString.parse(history.location.search);

    if (parsed && parsed.movie && parsed.movie !== search) {
      this.setState({
        search: parsed.movie,
      });
    }
  }

  onHandleChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  }

  onHandleSubmit = (e) => {
    e.preventDefault();

    const { search } = this.state;
    const { history } = this.props;

    history.push(`/search?movie=${search}`);
  }

  render() {
    const { search } = this.state;

    return (
      <header className="header">
        <div className="wrapper">
          <Row
            rowSpacing={5}
            cellSpacing={10}
            horizontalAlign="space-between"
            verticalAlign="center"
          >
            <Col
              lg={6}
              md={6}
              sm={6}
              xs={12}
            >
              <div className="header-logo">
                <Link to="/">myMovies</Link>
              </div>
            </Col>

            <Col
              lg={6}
              md={6}
              sm={6}
              xs={12}
            >
              <form className="header-search" onSubmit={e => this.onHandleSubmit(e)}>
                <input
                  type="text"
                  name="search"
                  autoComplete="off"
                  className="full"
                  placeholder="search movie..."
                  value={search}
                  onChange={({ target }) => this.onHandleChange(target.name, target.value)}
                  required
                />
                <button type="submit">
                  search
                </button>
              </form>
            </Col>
          </Row>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};

export default withRouter(Header);
