import React from 'react';
import Helmet from 'react-helmet';
import MasterPage from '../../components/MasterPage';

const PageNotFound = () => (
  <MasterPage>
    <Helmet>
      <title>React Movies: 404</title>
    </Helmet>

    <div className="wrapper pageNotFound">
      <h1>404: Page Not Found</h1>
    </div>
  </MasterPage>
);

export default PageNotFound;
