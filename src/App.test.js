import React from 'react';
import {
  render,
  fireEvent,
  screen,
  cleanup,
  waitFor,
  within,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DetailView from './components/detail-view';
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
test('Detail View shows the content and a close button', () => {
  // Arrange
  const handleClose = jest.fn();

  // Act
  const { getByText, getAllByText } = render(
    <DetailView
      class='test'
      image_url='https://giphy.com/embed/3o6Zt481isNVuQI1l6'
      title='test title'
      rating='rating: pg'
      source_url='https://giphy.com/gifs/cat-smoke-smoking-3o6Zt481isNVuQI1l6/embed'
      closeHandler={handleClose}
    />
  );
  // Assert
  expect(getByText('test title')).toBeTruthy();

  // Act
  fireEvent.click(getAllByText(/close/i)[0]);

  // Assert
  expect(handleClose).toHaveBeenCalledTimes(1);
});
