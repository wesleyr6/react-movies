/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import moment from 'moment';
import Rating from 'react-rating';
import MasterPage from '../../components/MasterPage';
import { Row, Col } from '../../components/Grid';
import AlertMessages from '../../components/AlertMessages';
import { getMovieDetails } from '../../actions/movies';
import noImageIMG from '../../assets/images/no-image-available.jpeg';
import './index.sass';

class Details extends React.Component {
  state = {
    loading: true,
  }

  componentDidMount() {
    this.loadMovieDetails();
  }

  componentDidUpdate(prevProps) {
    const {
      movieDetails,
      movieDetailsError,
      match: { params: { movieID } },
    } = this.props;

    if (prevProps.movieDetails !== movieDetails) {
      this.enableLoader(false);
    }

    if (prevProps.movieDetailsError !== movieDetailsError) {
      this.enableLoader(false);
    }

    if (prevProps.match.params.movieID !== movieID) {
      this.loadMovieDetails();
    }
  }

  loadMovieDetails = async () => {
    const {
      getMovieDetails: getMovieDetailsAction,
      match: { params: { movieID } },
    } = this.props;

    if (movieID) {
      this.enableLoader(true);
      await getMovieDetailsAction(movieID);
      this.enableLoader(false);
    }
  }

  enableLoader = (value) => {
    this.setState({ loading: value });
  }

  render() {
    const {
      movieDetailsError,
      movieDetails: {
        id,
        title,
        overview,
        backdrop_path,
        vote_average,
        release_date,
        vote_count,
        spoken_languages,
        popularity,
        homepage,
        status,
      },
    } = this.props;

    const { loading } = this.state;

    return (
      <MasterPage>
        <Helmet>
          <title>
            {'React Movies: '}
            {title || 'Details'}
          </title>
        </Helmet>

        <div className="wrapper details">
          {
            loading && (
              'loading...'
            )
          }

          {
            !loading && movieDetailsError && (
              <AlertMessages
                show
                type="error"
                message={movieDetailsError}
              />
            )
          }

          {
            !loading && !movieDetailsError && id && (
              <React.Fragment>
                <h1>{title}</h1>

                <Row rowSpacing={10} cellSpacing={15}>
                  <Col
                    lg={6}
                    md={6}
                    sm={12}
                    xs={12}
                  >
                    <figure className="details-image">
                      {
                        backdrop_path ? (
                          <img src={`https://image.tmdb.org/t/p/w500/${backdrop_path}`} alt={title} />
                        ) : (
                          <img src={noImageIMG} alt={title} />
                        )
                      }
                    </figure>
                  </Col>

                  <Col
                    lg={6}
                    md={6}
                    sm={12}
                    xs={12}
                  >
                    <Rating
                      stop={10}
                      emptySymbol={<i className="icon-star-o" />}
                      fullSymbol={<i className="icon-star" />}
                      initialRating={vote_average}
                      className="details-rating"
                      readonly
                    />

                    {
                      status && (
                        <h2 className="details-subtitle">
                          <strong>Status: </strong>
                          {status}
                        </h2>
                      )
                    }

                    {
                      release_date && (
                        <h2 className="details-subtitle">
                          <strong>Release Date: </strong>
                          {moment(new Date()).format('DD/MM/YYYY')}
                        </h2>
                      )
                    }

                    {
                      vote_count && (
                        <h2 className="details-subtitle">
                          <strong>Reviews: </strong>
                          {vote_count}
                        </h2>
                      )
                    }

                    {
                      popularity && (
                        <h2 className="details-subtitle">
                          <strong>Popularity: </strong>
                          {popularity}
                        </h2>
                      )
                    }

                    {
                      spoken_languages && spoken_languages.length > 0 && (
                        <h2 className="details-subtitle">
                          <strong>Languages: </strong>
                          {spoken_languages.map(language => language.name).join(', ')}
                        </h2>
                      )
                    }

                    {
                      homepage && (
                        <h2 className="details-subtitle">
                          <strong>Website: </strong>
                          <a href={homepage}>{homepage}</a>
                        </h2>
                      )
                    }

                    <p className="details-description">
                      {overview || 'There is no description'}
                    </p>
                  </Col>
                </Row>
              </React.Fragment>
            )
          }
        </div>
      </MasterPage>
    );
  }
}

Details.propTypes = {
  getMovieDetails: PropTypes.func.isRequired,
  movieDetails: PropTypes.instanceOf(Object),
  movieDetailsError: PropTypes.string,
  match: PropTypes.instanceOf(Object).isRequired,
};

Details.defaultProps = {
  movieDetails: {},
  movieDetailsError: null,
};

const mapStateToProps = state => ({
  movieDetails: state.movies.movieDetails,
  movieDetailsError: state.movies.movieDetailsError,
  error: state.movies.error,
});

export default connect(mapStateToProps, { getMovieDetails })(Details);
