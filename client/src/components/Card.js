import React from 'react';
import { Link } from "react-router-dom";

const Card = (props) => {
  const { title } = props
  return (
    <div className='pending__items'>
      <label className="iosLabel">iOS</label>
      <p className='title'>{title}</p>
      <p className='comment'>
        <Link to='/comments'>2 Comments</Link>
      </p>
    </div>
  );
}

export default Card;