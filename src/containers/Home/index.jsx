import React from "react";
import Helmet from "react-helmet";
import Header from "../../components/Header";
import Banner from "../../components/Banner";
import DiscoverMovies from "../../components/DiscoverMovies";

const Home = () => (
  <React.Fragment>
    <Helmet>
      <title>React Movies: Home</title>
    </Helmet>

    <Header />
    <Banner />

    <main>
      <div className="wrapper">
        <DiscoverMovies />
      </div>
    </main>
  </React.Fragment>
);

export default Home;
