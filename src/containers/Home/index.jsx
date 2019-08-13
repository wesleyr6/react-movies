import React from 'react';
import Header from '../../components/Header';
import Banner from '../../components/Banner';
import DiscoverMovies from '../DiscoverMovies';

const Home = () => (
  <React.Fragment>
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
