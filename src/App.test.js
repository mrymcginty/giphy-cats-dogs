import React from 'react';
import {
  render,
  fireEvent,
  screen,
  cleanup,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GetGiphies from './components/search-results';
import App from './App';

const container = document.querySelector('#app');
afterEach(cleanup);

test('No giphys loaded initially', () => {
  const { getByTestId } = render(<App />);

  expect(getByTestId('default-results')).toBeInTheDocument();
});

test('cat button clicked, returns ul containing 25 images or less', async () => {
  const { getByText, getByTestId, getByRole } = render(<App />);

  const button = screen.getByRole('button', { name: 'Team Cat' });
  fireEvent.click(button);

  await waitFor(() =>
    expect(screen.getByTestId('search-results-ul')).toBeInTheDocument()
  );

  let images = screen.getAllByTestId('result-img');
  expect(images.length).toBeLessThanOrEqual(25);
});

test('dog button clicked, returns ul containing 25 images or less', async () => {
  const { getByText, getByTestId, getByRole } = render(<App />);

  const button = screen.getByRole('button', { name: 'Team Dog' });
  fireEvent.click(button);

  await waitFor(() =>
    expect(screen.getByTestId('search-results-ul')).toBeInTheDocument()
  );

  let images = screen.getAllByTestId('result-img');
  expect(images.length).toBeLessThanOrEqual(25);
});
