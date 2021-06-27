import React, { useState } from 'react';
import TitleWrapper from './components/title';
import GetGiphys from './components/search-results';
import { ReactComponent as Cat } from './images/cat.svg';
import { ReactComponent as Dog } from './images/dog.svg';

import './App.scss';
function App() {
  const [searchTerm, setSearchTerm] = useState('default');
  const [searchIsActive, setSearchIsActive] = useState('');
  //const [resultsOpen, setResultsOpen] = useState(false);

  const toggleClass = (searchFor) => {
    setSearchIsActive(searchFor);
    setSearchTerm(searchFor);
  };

  const isButtonActive = (value) => {
    return (
      'button button--search ' +
      (value === searchIsActive ? 'active' : 'default')
    );
  };

  return (
    <div className='App'>
      <div className='App_content'>
        <div className='App_content_copy'>
          <TitleWrapper />
          <div className='App_content_searchButtons'>
            <button
              className={isButtonActive('cat')}
              onClick={() => toggleClass('cat')}
            >
              Team Cat
            </button>
            <button
              className={isButtonActive('dog')}
              onClick={() => toggleClass('dog')}
            >
              Team Dog
            </button>
          </div>
        </div>

        <div
          className={`App_content_illustrations ${
            searchTerm !== 'default' ? 'reduced' : ''
          }`}
        >
          <Cat />
          <Dog />
        </div>
        <div
          className={`App_content_results ${
            searchTerm !== 'default' ? 'visible' : ''
          }`}
        >
          <GetGiphys searchGiphysFor={searchTerm} />
        </div>
      </div>
    </div>
  );
}
export default App;
