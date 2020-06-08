/* eslint-disable camelcase */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import moment from "moment";
import Rating from "react-rating";
import MasterPage from "../../components/MasterPage";
import Loader from "../../components/Loader";
import { Row, Col } from "../../components/Grid";
import AlertMessages from "../../components/AlertMessages";
import { getMovieDetails } from "../../actions/movies";
import noImageIMG from "../../assets/images/no-image-available.jpeg";
import "./index.sass";

const Details = ({ match }) => {
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [details, setDetails] = useState({});
  const [detailsError, setDetailsError] = useState("");

  useEffect(() => {
    loadMovieDetails();
    // eslint-disable-next-line
  }, [match.params]);

  const loadMovieDetails = async () => {
    if (match.params && match.params.movieID) {
      try {
        const data = await getMovieDetails(match.params.movieID);
        setDetails(data);
      } catch (err) {
        setDetailsError(err);
      }
    } else {
      setDetailsError("OPS! We could not find that movie.");
    }

    setLoadingDetails(false);
  };

  return (
    <MasterPage>
      <Helmet>
        <title>
          {"React Movies: "}
          {details.title || "Details"}
        </title>
      </Helmet>

      <div className="wrapper details">
        {loadingDetails ? (
          <Loader />
        ) : (
          <>
            <AlertMessages
              show={!!detailsError}
              type="error"
              message={detailsError}
            />

            {!detailsError && details.id && (
              <React.Fragment>
                <h1>{details.title}</h1>

                <Row rowSpacing={10} cellSpacing={15}>
                  <Col lg={6} md={6} sm={12} xs={12}>
                    <figure className="details-image">
                      {details.backdrop_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w500/${details.backdrop_path}`}
                          alt={details.title}
                        />
                      ) : (
                        <img src={noImageIMG} alt={details.title} />
                      )}
                    </figure>
                  </Col>

                  <Col lg={6} md={6} sm={12} xs={12}>
                    <Rating
                      stop={10}
                      emptySymbol={<i className="icon-star-o" />}
                      fullSymbol={<i className="icon-star" />}
                      initialRating={details.vote_average}
                      className="details-rating"
                      readonly
                    />

                    {details.status && (
                      <h2 className="details-subtitle">
                        <strong>Status: </strong>
                        {details.status}
                      </h2>
                    )}

                    {details.release_date && (
                      <h2 className="details-subtitle">
                        <strong>Release Date: </strong>
                        {moment(new Date(details.release_date)).format(
                          "DD/MM/YYYY"
                        )}
                      </h2>
                    )}

                    {details.vote_count && (
                      <h2 className="details-subtitle">
                        <strong>Reviews: </strong>
                        {details.vote_count}
                      </h2>
                    )}

                    {details.popularity && (
                      <h2 className="details-subtitle">
                        <strong>Popularity: </strong>
                        {details.popularity}
                      </h2>
                    )}

                    {details.spoken_languages &&
                      details.spoken_languages.length > 0 && (
                        <h2 className="details-subtitle">
                          <strong>Languages: </strong>
                          {details.spoken_languages
                            .map((language) => language.name)
                            .join(", ")}
                        </h2>
                      )}

                    {details.homepage && (
                      <h2 className="details-subtitle">
                        <strong>Website: </strong>
                        <a href={details.homepage}>{details.homepage}</a>
                      </h2>
                    )}

                    <p className="details-description">
                      {details.overview || "There is no description"}
                    </p>
                  </Col>
                </Row>
              </React.Fragment>
            )}
          </>
        )}
      </div>
    </MasterPage>
  );
};

Details.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
};

export default Details;
