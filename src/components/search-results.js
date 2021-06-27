import React, { useState, useEffect } from 'react';

function GetGiphies(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [pageOffset, setPageOffset] = useState(0);
  const [currPage, setCurrPage] = useState(1);
  const [numPages, setNumPages] = useState(0);

  const perPage = 25;

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    if (props.searchGiphysFor !== 'default') {
      fetch(
        `https://api.giphy.com/v1/gifs/search?&q=${props.searchGiphysFor}&limit=${perPage}&offset=${pageOffset}&api_key=tdu5VqiLjqndckPcArJD6l3URliWfKOG`
      )
        .then((response) => response.json())
        .then(
          (result) => {
            console.log(result);
            setIsLoaded(true);
            setItems(result.data);
            setPageOffset(result.pagination.offset);
            setNumPages(Math.ceil(result.pagination.total_count / perPage));
          },
          // Note: it's important to handle errors here
          //         // instead of a catch() block so that we don't swallow
          //         // exceptions from actual bugs in components.
          (error) => {
            console.log('error');
            setIsLoaded(true);
            setError(error);
          }
        );
    }
  }, [props.searchGiphysFor, pageOffset]);

  const nextPage = () => {
    //Don't allow pagination past total numPages
    if (currPage < numPages) {
      setPageOffset(pageOffset + perPage);
      setCurrPage(currPage + 1);
    }
  };
  const prevPage = () => {
    // Don't allow pagination less than 0
    if (currPage > 1) {
      setPageOffset(pageOffset - perPage);
      setCurrPage(currPage - 1);
    }
  };

  const RenderNextBtn = () => {
    if (currPage < numPages) {
      return (
        <button className='button button--paginate' onClick={nextPage} title>
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

  if (props.searchGiphysFor === 'default') {
    return <div />;
  } else if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <p>Searching for: {props.searchGiphysFor}</p>
        <ul className='searchResults'>
          {items.map((item) => (
            <li key={item.id}>
              <img
                src={item.images.preview_gif.url}
                width={item.images.preview_gif.width}
                height={item.images.preview_gif.height}
                alt={item.images.preview_gif.title}
              />
            </li>
          ))}
        </ul>
        <div className='pagination'>
          <RenderPrevBtn />
          <RenderNextBtn />
        </div>
      </div>
    );
  }
}
export default GetGiphies;
