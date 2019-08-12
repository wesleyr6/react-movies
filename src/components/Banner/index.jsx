import React from 'react';
import bannerIMG from '../../assets/images/aquaman-banner.jpg';
import './index.sass';

const Banner = () => (
  <article className="banner">
    <img src={bannerIMG} alt="" />
  </article>
);

export default Banner;
