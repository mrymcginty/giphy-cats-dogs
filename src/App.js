import React, { useState, useEffect } from 'react';
import Title from './components/title';
import GetGiphys from './components/search-results';
import Button from './components/search-button';
import { ReactComponent as Cat } from './images/cat.svg';
import { ReactComponent as Dog } from './images/dog.svg';

import './App.scss';
function App() {
  const [searchTerm, setSearchTerm] = useState('dog');
  const [username, setUsername] = useState('Default username');

  return (
    <div className='App'>
      <div className='App_header'>
        <div className='App_header_copy'>
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
        </div>

        <GetGiphys searchGiphysFor={searchTerm} />
        <div className='App_header_illustrations'>
          <Cat />
          <Dog />
        </div>
      </div>
    </div>
  );
}
export default App;
