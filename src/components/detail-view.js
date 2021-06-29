import React, { useState } from 'react';
function DetailView(props) {
  const [imageLoaded, setImageLoaded] = useState('');
  //update imageLoaded  inline with img onLoad event
  const handleImageLoaded = () => {
    setImageLoaded('loaded');
  };
  return (
    <div className={'detailView ' + props.class + ' ' + imageLoaded}>
      <div className='detailView_content'>
        <div className='detailView_close' onClick={props.closeHandler}>
          close
        </div>
        <img
          src={props.image_url}
          alt={props.title}
          onLoad={handleImageLoaded}
        />
        <h2>{props.title}</h2>
        <p>{props.rating}</p>

        <a
          className='button'
          href={props.source_url}
          target='_blank'
          rel='noreferrer'
        >
          View on giphy.com
        </a>

        <p>
          <button className='close_inline' onClick={props.closeHandler}>
            Close
          </button>
        </p>
      </div>
    </div>
  );
}
export default DetailView;
