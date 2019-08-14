import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from '../../components/Grid';
import Cards from '../../components/Cards';
import AlertMessages from '../../components/AlertMessages';
import { getDiscoveryMovies } from '../../actions/movies';
import './index.sass';

class DiscoverMovies extends React.Component {
  state = {
    loading: true,
  }

  componentDidMount() {
    this.loadMovies();
  }

  componentDidUpdate(prevProps) {
    const { discoveryMovies, discoveryMoviesError } = this.props;

    if (prevProps.discoveryMovies.length !== discoveryMovies.length) {
      this.loadMovies();
    }

    if (prevProps.discoveryMoviesError !== discoveryMoviesError) {
      this.enableLoader(false);
    }
  }

  loadMovies = async () => {
    const {
      discoveryMovies,
      getDiscoveryMovies: getDiscoveryMoviesAction,
    } = this.props;

    if (discoveryMovies.length === 0) {
      this.enableLoader(true);
      await getDiscoveryMoviesAction();
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
    const { loading } = this.state;
    const { discoveryMovies, discoveryMoviesError } = this.props;

    return (
      <section className="discover-movies">
        <h1>Suggested movies</h1>
        {
          loading && (
            <span className="discover-movies-loading">loading...</span>
          )
        }

        {
          !loading && !discoveryMoviesError && discoveryMovies.length > 0 && (
            <Row rowSpacing={15} cellSpacing={15}>
              {
                discoveryMovies.map(item => (
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
          !loading && discoveryMoviesError && (
            <AlertMessages
              show
              type="error"
              message={discoveryMoviesError}
            />
          )
        }
      </section>
    );
  }
}

DiscoverMovies.propTypes = {
  getDiscoveryMovies: PropTypes.func.isRequired,
  discoveryMovies: PropTypes.instanceOf(Array),
  discoveryMoviesError: PropTypes.string,
};

DiscoverMovies.defaultProps = {
  discoveryMovies: [],
  discoveryMoviesError: null,
};

const mapStateToProps = state => ({
  discoveryMovies: state.movies.discoveryMovies,
  discoveryMoviesError: state.movies.discoveryMoviesError,
});

export default connect(mapStateToProps, { getDiscoveryMovies })(DiscoverMovies);
