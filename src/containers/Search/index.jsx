import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import queryString from "query-string";
import MasterPage from "../../components/MasterPage";
import Loader from "../../components/Loader";
import { Row, Col } from "../../components/Grid";
import Cards from "../../components/Cards";
import DiscoverMovies from "../../components/DiscoverMovies";
import AlertMessages from "../../components/AlertMessages";
import { getSearchedMovies } from "../../actions/search";
import "./index.sass";

const Home = ({ location }) => {
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [movies, setMovies] = useState([]);
  const [moviesError, setMoviesError] = useState("");

  useEffect(() => {
    search();
    // eslint-disable-next-line
  }, [location.search]);

  const search = async () => {
    if (location.search) {
      const parsed = queryString.parse(location.search);

      if (parsed && parsed.movie && parsed.movie.length > 0) {
        setLoading(true);
        setKeyword(parsed.movie);

        try {
          const { results } = await getSearchedMovies(parsed.movie);
          setMovies(results);
        } catch (err) {
          setMoviesError(err);
        }
      }
    }

    setLoading(false);
  };

  return (
    <MasterPage>
      <Helmet>
        <title>
          {"React Movies: "}
          {keyword || "Search"}
        </title>
      </Helmet>

      <div className="wrapper search">
        <h1>
          Results found for: <strong>{keyword}</strong>
        </h1>

        {loading ? (
          <Loader />
        ) : (
          <>
            {!!moviesError && (
              <Row>
                <Col lg={12} md={12} sm={12} xs={12}>
                  <AlertMessages show type="error" message={moviesError} />
                </Col>
              </Row>
            )}

            {!moviesError && movies.length > 0 && (
              <Row rowSpacing={15} cellSpacing={15}>
                {movies.map((item) => (
                  <Col key={item.id} lg={2} md={3} sm={6} xs={12}>
                    <Cards item={item} />
                  </Col>
                ))}
              </Row>
            )}

            {!moviesError && movies.length === 0 && (
              <>
                <Row>
                  <Col lg={12} md={12} sm={12} xs={12}>
                    <span className="search-message">Any results found.</span>
                  </Col>
                </Row>

                <div className="search-discover">
                  <DiscoverMovies />
                </div>
              </>
            )}
          </>
        )}
      </div>
    </MasterPage>
  );
};

Home.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired,
  searchedMovies: PropTypes.instanceOf(Array),
  keyword: PropTypes.string,
  error: PropTypes.string,
};

Home.defaultProps = {
  searchedMovies: [],
  keyword: null,
  error: null,
};

export default Home;
