import React, { useState, useEffect } from 'react';
import DetailView from './detail-view';
function GetGiphies(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [pageOffset, setPageOffset] = useState(0);
  const [currPage, setCurrPage] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [detailViewClass, setDetailViewClass] = useState('');
  const [detailViewImg, setDetailViewImg] = useState('');
  const [detailViewTitle, setDetailViewTitle] = useState('');
  const [detailViewRating, setDetailViewRating] = useState('');
  const [detailViewUrl, setDetailViewUrl] = useState('');

  const perPage = 25; //results per page

  useEffect(() => {
    if (props.searchGiphysFor !== 'default') {
      fetch(
        `https://api.giphy.com/v1/gifs/search?&q=${props.searchGiphysFor}&limit=${perPage}&offset=${pageOffset}&api_key=tdu5VqiLjqndckPcArJD6l3URliWfKOG`
      )
        .then((response) => response.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setItems(result.data);
            setPageOffset(result.pagination.offset);
            setNumPages(Math.ceil(result.pagination.total_count / perPage)); //total number of pages returned
          },
          (error) => {
            console.log('error');
            setIsLoaded(true);
            setError(error);
          }
        );
    }
  }, [props.searchGiphysFor, pageOffset]); //fetch again when search term or paging changes

  const nextPage = () => {
    //Don't allow pagination past total numPages
    if (currPage < numPages) {
      setPageOffset(pageOffset + perPage);
      setCurrPage(currPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  const prevPage = () => {
    // Don't allow pagination less than 0
    if (currPage > 1) {
      setPageOffset(pageOffset - perPage);
      setCurrPage(currPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const RenderNextBtn = () => {
    //render next button:disabled if no next page is available
    if (currPage < numPages) {
      return (
        <button className='button button--paginate' onClick={nextPage}>
          Next &gt;
        </button>
      );
    } else {
      return (
        <button className='button button--paginate' disabled>
          Next &gt;
        </button>
      );
    }
  };
  const RenderPrevBtn = () => {
    //render previous button:disabled if no previous page is available
    if (currPage > 1) {
      return (
        <button className='button button--paginate' onClick={prevPage}>
          &lt; Previous
        </button>
      );
    } else {
      return (
        <button className='button button--paginate' disabled>
          &lt; Previous
        </button>
      );
    }
  };

  const openDetailView = (data) => {
    //set data to show in detail view
    setDetailViewImg(data.src);
    setDetailViewTitle(data.title);
    setDetailViewRating(data.rating);
    setDetailViewUrl(data.url);
    //set lightbox visibility to true
    setDetailViewClass('visible');
  };

  const closeDetailView = () => {
    setDetailViewClass('');
    setDetailViewImg('');
  };

  const isSearchActive = (value) => {
    return (
      'searchResults_wrapper ' +
      (props.searchGiphysFor !== 'default' ? 'visible' : '')
    );
  };

  if (props.searchGiphysFor === 'default') {
    return <div />;
  } else if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <ul className='searchResults'>
          {items.map((item) => (
            <li
              key={item.id}
              onClick={() =>
                openDetailView({
                  src: item.images.downsized_large.url,
                  title: item.title,
                  rating: item.rating,
                  url: item.url,
                })
              }
            >
              <img
                src={item.images.fixed_height_downsampled.url}
                width={item.images.fixed_height_downsampled.width}
                height={item.images.fixed_height_downsampled.height}
                alt={item.title}
              />
            </li>
          ))}
        </ul>
        <div id='pagination' className='pagination'>
          <RenderPrevBtn />
          <RenderNextBtn />
        </div>

        <DetailView
          class={detailViewClass}
          image_url={detailViewImg}
          title={detailViewTitle}
          rating={detailViewRating}
          source_url={detailViewUrl}
          closeHandler={closeDetailView}
        />
      </div>
    );
  }
}
export default GetGiphies;
