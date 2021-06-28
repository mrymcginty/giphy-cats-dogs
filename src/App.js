import React, { useState } from 'react';
import TitleWrapper from './components/title';
import GetGiphys from './components/search-results';
import { ReactComponent as Cat } from './images/cat.svg';
import { ReactComponent as Dog } from './images/dog.svg';

import './App.scss';

function App() {
  const [searchTerm, setSearchTerm] = useState('default');
  const [searchIsActive, setSearchIsActive] = useState('');

  //   update the searchTerm, called on button click
  const toggleSearch = (searchFor) => {
    setSearchIsActive(searchFor);
    setSearchTerm(searchFor);
  };

  // apply active class to search buttons if value matches searchTerm
  const isButtonActive = (value) => {
    return (
      'button button--search ' +
      (value === searchIsActive ? 'active' : 'default')
    );
  };

  return (
    <div className='App'>
      <div className='App_content'>
        {/* Header wrapper > title, buttons, characters */}
        {/* If we have a search terms, apply our modifier class */}
        <div
          className={`App_content_header ${
            searchTerm !== 'default' ? 'reduced' : ''
          }`}
        >
          {/* Title & Buttons */}
          <div className='App_content_copy'>
            <TitleWrapper />
            <div className='App_content_searchButtons'>
              <button
                className={isButtonActive('cat')}
                onClick={() => toggleSearch('cat')}
              >
                Team Cat
              </button>
              <button
                className={isButtonActive('dog')}
                onClick={() => toggleSearch('dog')}
              >
                Team Dog
              </button>
            </div>
          </div>
          {/* Cat and Dog characters */}
          {/* If we have a search terms, apply our modifier class */}
          <div
            className={`App_content_illustrations ${
              searchTerm !== 'default' ? 'reduced' : ''
            }`}
          >
            <Cat />
            <Dog />
          </div>
        </div>

        {/* Giphy Results */}
        {/* If we have a search terms, apply our modifier class */}
        <div
          className={`App_content_results ${
            searchTerm !== 'default' ? 'visible' : ''
          }`}
        >
          <GetGiphys searchGiphysFor={searchTerm} />
        </div>
      </div>
      <div className='footer'>
        Mary McGinty |{' '}
        <a href='mailto:mry.mcginty@gmail.com'>mry.mcginty@gmail.com</a>
      </div>
    </div>
  );
}
export default App;
