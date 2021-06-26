import React, { useState, useEffect } from 'react';
import Button from './button';

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
      return <button onClick={nextPage}>Next Page</button>;
    } else {
      return <button disabled>Next Page</button>;
    }
  };
  const RenderPrevBtn = () => {
    if (currPage > 1) {
      return <button onClick={prevPage}>Previous Page</button>;
    } else {
      return <button disabled>Previous Page</button>;
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        You're searching for: {props.searchGiphysFor}
        Total num pages = {numPages}
        <br />
        you are on page: {currPage}
        <br />
        <RenderPrevBtn />
        <br />
        <RenderNextBtn />
        <br />
        {/* {pagination(currPage, numPages)} */}
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <img
                src={item.images.downsized_large.url}
                width={item.images.downsized_large.width}
                height={item.images.downsized_large.height}
                alt={item.images.downsized_large.title}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
export default GetGiphies;
