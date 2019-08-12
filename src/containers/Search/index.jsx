import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { connect } from 'react-redux';
import MasterPage from '../../components/MasterPage';
import { Row, Col } from '../../components/Grid';
import Cards from '../../components/Cards';
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
    const { searchedMovies, keyword, history } = this.props;
    const parsed = queryString.parse(history.location.search);

    if (prevProps.searchedMovies.length !== searchedMovies.length
      || prevProps.keyword !== keyword) {
      this.onHandleChange('loading', false);
    }

    if (parsed && parsed.movie && keyword !== parsed.movie) {
      this.search();
    }
  }

  search = () => {
    const {
      history,
      getSearchedMovies: getSearchedMoviesAction,
    } = this.props;

    if (history.location.search) {
      const parsed = queryString.parse(history.location.search);

      if (parsed && parsed.movie && parsed.movie.length > 0) {
        getSearchedMoviesAction(parsed.movie);
      } else {
        this.onHandleChange('loading', false);
      }
    } else {
      this.onHandleChange('loading', false);
    }
  }

  onHandleChange = (name, value) => {
    this.setState({ [name]: value });
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
                          <span className="search-message">{error}</span>
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
  history: PropTypes.instanceOf(Object).isRequired,
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
