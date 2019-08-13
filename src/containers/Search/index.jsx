import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { connect } from 'react-redux';
import MasterPage from '../../components/MasterPage';
import { Row, Col } from '../../components/Grid';
import Cards from '../../components/Cards';
import DiscoverMovies from '../DiscoverMovies';
import AlertMessages from '../../components/AlertMessages';
import { getSearchedMovies } from '../../actions/search';
import './index.sass';

class Home extends React.Component {
  state = {
    loading: true,
  }

  componentDidMount() {
    this.search();
  }

  componentDidUpdate(prevProps) {
    const { location, keyword } = this.props;

    if (prevProps.keyword !== keyword) {
      this.enableLoader(false);
    }

    if (prevProps.location.search !== location.search) {
      this.search();
    }
  }

  search = () => {
    const {
      location,
      getSearchedMovies: getSearchedMoviesAction,
    } = this.props;

    if (location.search) {
      const parsed = queryString.parse(location.search);

      if (parsed && parsed.movie && parsed.movie.length > 0) {
        this.enableLoader(true);
        getSearchedMoviesAction(parsed.movie);
      } else {
        this.enableLoader(false);
      }
    } else {
      this.enableLoader(false);
    }
  }

  enableLoader = (value) => {
    this.setState({
      loading: value,
    });
  }

  render() {
    const {
      searchedMovies,
      error,
      keyword,
    } = this.props;

    const { loading } = this.state;

    return (
      <MasterPage>
        <div className="wrapper search">
          <h1>
            Results found for:
            {' '}
            <strong>{keyword}</strong>
          </h1>
          {
              !loading ? (
                <React.Fragment>
                  {
                    !error && searchedMovies.length > 0 && (
                      <Row rowSpacing={15} cellSpacing={15}>
                        {
                          searchedMovies.map(item => (
                            <Col
                              key={item.id}
                              lg={2}
                              md={3}
                              sm={6}
                              xs={12}
                            >
                              <Cards item={item} />
                            </Col>
                          ))
                        }
                      </Row>
                    )
                  }

                  {
                    !error && searchedMovies.length === 0 && (
                      <React.Fragment>
                        <Row>
                          <Col
                            lg={12}
                            md={12}
                            sm={12}
                            xs={12}
                          >
                            <span className="search-message">Any results found.</span>
                          </Col>
                        </Row>

                        <div className="search-discover">
                          <DiscoverMovies />
                        </div>
                      </React.Fragment>
                    )
                  }

                  {
                    error && (
                      <Row>
                        <Col
                          lg={12}
                          md={12}
                          sm={12}
                          xs={12}
                        >
                          <AlertMessages
                            show
                            type="error"
                            message={error}
                          />
                        </Col>
                      </Row>
                    )
                  }
                </React.Fragment>
              ) : (
                <React.Fragment>
                  loading...
                </React.Fragment>
              )
            }
        </div>
      </MasterPage>
    );
  }
}

Home.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired,
  getSearchedMovies: PropTypes.func.isRequired,
  searchedMovies: PropTypes.instanceOf(Array),
  keyword: PropTypes.string,
  error: PropTypes.string,
};

Home.defaultProps = {
  searchedMovies: [],
  keyword: null,
  error: null,
};

const mapStateToProps = state => ({
  searchedMovies: state.search.searchedMovies,
  keyword: state.search.keyword,
  error: state.search.error,
});

export default connect(mapStateToProps, { getSearchedMovies })(Home);
