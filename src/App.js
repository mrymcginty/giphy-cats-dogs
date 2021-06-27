import React, { useState, useEffect } from 'react';
import Title from './components/title';
import GetGiphys from './components/search-results';
import Button from './components/search-button';
import { ReactComponent as Cat } from './images/cat.svg';
import { ReactComponent as Dog } from './images/dog.svg';

import './App.scss';
function App() {
  const [searchTerm, setSearchTerm] = useState('default');
  const [username, setUsername] = useState('Default username');

  return (
    <div className='App'>
      <div className='App_header'>
        <Title />
        <div className='searchBy_wrapper'>
          <Button
            stateChanger={setSearchTerm}
            label='Team Cat'
            searchTerm='cat'
          />
          <Button
            stateChanger={setSearchTerm}
            label='Team Dog'
            searchTerm='dog'
          />
        </div>
        <GetGiphys searchGiphysFor={searchTerm} />
        <div className='catdog_wrapper'>
          <Cat />
          <Dog />
        </div>
      </div>
    </div>
  );
}
export default App;
