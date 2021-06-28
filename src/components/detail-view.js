import React, { useState } from 'react';
function DetailView(props) {
  const [imageLoaded, setImageLoaded] = useState('');
  const handleImageLoaded = () => {
    setImageLoaded('loaded');
  };
  return (
    <div
      id='detailView'
      className={'detailView ' + props.class + ' ' + imageLoaded}
    >
      <div className='detailView_content'>
        <div className='detailView_close' onClick={props.closeHandler}>
          close
        </div>
        <img
          src={props.image_url}
          alt={props.title}
          onLoad={handleImageLoaded}
        />
        <h2>Title: {props.title}</h2>
        <p>Rating: {props.rating}</p>

        <a
          className='button'
          href={props.source_url}
          target='_blank'
          rel='noreferrer'
        >
          View on giphy.com
        </a>

        <p>
          <a href='#' onClick={props.closeHandler}>
            Close
          </a>
        </p>
      </div>
    </div>
  );
}
export default DetailView;
