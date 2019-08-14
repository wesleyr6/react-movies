import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Rating from 'react-rating';
import noImageIMG from '../../assets/images/no-image-available.jpeg';
import './index.sass';

const Cards = (props) => {
  const { item } = props;

  return (
    <div className="cards" title={item.title}>
      <Link to={`/${item.id}`}>
        <figure className="cards-image">
          {
            item.backdrop_path ? (
              <img src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`} alt={item.title} />
            ) : (
              <img src={noImageIMG} alt={item.title} />
            )
          }

        </figure>

        <div className="cards-content">
          <h2 className="cards-title">{item.title}</h2>
          <Rating
            stop={10}
            emptySymbol={<i className="icon-star-o" />}
            fullSymbol={<i className="icon-star" />}
            initialRating={item.vote_average}
            readonly
            className="cards-rating"
          />
          <p className="cards-description">
            {moment(new Date(item.release_date)).format('YYYY')}
          </p>
        </div>
      </Link>
    </div>
  );
};

Cards.propTypes = {
  item: PropTypes.instanceOf(Object).isRequired,
};

export default Cards;
