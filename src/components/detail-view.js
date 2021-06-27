import React from 'react';
function DetailView(props) {
  return (
    <div id='detailView' className={'detailView ' + props.class}>
      <div className='detailView_content'>
        <div className='detailView_close' onClick={props.closeHandler}>
          close
        </div>
        <img src={props.image_url} alt={props.title} />
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
