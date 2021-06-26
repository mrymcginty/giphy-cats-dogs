import React, { useState, useEffect } from 'react';
import GetGiphys from './components/search-results';
import Button from './components/button';

function App() {
  const [searchTerm, setSearchTerm] = useState('default');
  const [username, setUsername] = useState('Default username');

  return (
    <div className='App'>
      <p>Show me:</p>
      <Button
        variant='primary'
        size={'lg'}
        stateChanger={setSearchTerm}
        label='cats'
      />
      <Button
        variant='primary'
        size={'lg'}
        stateChanger={setSearchTerm}
        label='dogs'
      />
      <GetGiphys searchGiphysFor={searchTerm} />
    </div>
  );
}
export default App;
