import React, { useContext } from "react";
import { Row, Col } from "../../components/Grid";
import Cards from "../../components/Cards";
import AlertMessages from "../../components/AlertMessages";
import Loader from "../../components/Loader";
import GlobalContext from "../../context/global";
import "./index.sass";

const DiscoverMovies = () => {
  const {
    loadingDiscoverMovies,
    discoverMovies,
    discoverMoviesError,
  } = useContext(GlobalContext);

  return (
    <section className="discover-movies">
      <h1>Suggested movies</h1>
      {loadingDiscoverMovies && (
        <span className="discover-movies-loading">
          <Loader />
        </span>
      )}

      {!loadingDiscoverMovies &&
        !discoverMoviesError &&
        discoverMovies.length > 0 && (
          <Row rowSpacing={15} cellSpacing={15}>
            {discoverMovies.map((item) => (
              <Col key={item.id} lg={2} md={3} sm={6} xs={12}>
                <Cards item={item} />
              </Col>
            ))}
          </Row>
        )}

      {!loadingDiscoverMovies && discoverMoviesError && (
        <AlertMessages show type="error" message={discoverMoviesError} />
      )}
    </section>
  );
};

export default DiscoverMovies;
