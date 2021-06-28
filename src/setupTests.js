// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import TitleWrapper from './components/title';
import GetGiphys from './components/search-results';
import DetailView from './components/detail-view';

// basic smoke test
it('App renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

// test('have a cat button', () => {
//   const { container, getByText } = render(<App />);
//   expect(getByText('Hello, world!')).toBeInTheDocument();
//   expect(container.firstChild).toMatchInlineSnapshot(`
//     <h1>Hello, World!</h1>
//   `);
// });
