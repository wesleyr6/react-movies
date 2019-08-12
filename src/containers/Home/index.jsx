import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import Banner from '../../components/Banner';
import { Row, Col } from '../../components/Grid';
import Cards from '../../components/Cards';
import { getDiscoveryMovies } from '../../actions/movies';
import './index.sass';

class Home extends React.Component {
  state = {
    discoveryMoviesLoading: true,
  }

  componentDidMount() {
    this.discoveryMovies();
  }

  componentDidUpdate(prevProps) {
    const { discoveryMovies } = this.props;

    if (prevProps.discoveryMovies.length !== discoveryMovies.length) {
      this.onHandleChange('discoveryMoviesLoading', false);
    }
  }

  discoveryMovies = () => {
    const {
      discoveryMovies,
      getDiscoveryMovies: getDiscoveryMoviesAction,
    } = this.props;

    if (discoveryMovies.length <= 0) {
      getDiscoveryMoviesAction();
    } else {
      this.setState({
        discoveryMoviesLoading: false,
      });
    }
  }

  onHandleChange = (name, value) => {
    this.setState({ [name]: value });
  }

  render() {
    const { discoveryMovies } = this.props;
    const { discoveryMoviesLoading } = this.state;

    return (
      <React.Fragment>
        <Header />
        <Banner />

        <main>
          <div className="wrapper">
            <section className="featured-videos">
              <h1>Suggested movies</h1>
              {
                !discoveryMoviesLoading && discoveryMovies.length > 0 ? (
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
                ) : (
                  <React.Fragment>
                    loading...
                  </React.Fragment>
                )
              }
            </section>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

Home.propTypes = {
  getDiscoveryMovies: PropTypes.func.isRequired,
  discoveryMovies: PropTypes.instanceOf(Array),
};

Home.defaultProps = {
  discoveryMovies: [],
};

const mapStateToProps = state => ({
  discoveryMovies: state.movies.discoveryMovies,
});

export default connect(mapStateToProps, { getDiscoveryMovies })(Home);
