import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from './App';
import fixture_data from './utils/test-utils';
import helpers from './utils/helpers';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
  jest.spyOn(Date.prototype, 'getDay').mockReturnValue(2);
  jest.spyOn(Date.prototype, 'toISOString').mockReturnValue('2022-02-27T00:00:00.000Z');
  jest.spyOn(helpers, 'fetchArticles').mockReturnValue(fixture_data.no_country);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
  jest.restoreAllMocks();
  helpers.fetchArticles.mockRestore();
});

it('sets date to yesterday by default', function () {
  const app = mount(<App />);
  expect(app.instance().state.date).toBe('2022/02/26');
});

it('sets article count to 100 by default', function () {
  const app = mount(<App />);
  expect(app.instance().state.articleCount).toBe('100');
});

it('correctly renders loading state', () => {
  act(() => {
    render(<App loading={true} />, container);
  });

  expect(screen.getByTestId('loading-spinner')).toBeTruthy();
});

it('correctly renders error state', () => {
  act(() => {
    render(<App error={true} />, container);
  });

  expect(screen.getByTestId('error')).toBeTruthy();
});

it('fetches and renders 100 articles on load', () => {
  render(<App />, container);
  const articles = screen.getByTestId('article-list').childElementCount;
  expect(articles).toHaveLength(100);
});

it('changes the amount of articles shown on page when different article count selected', () => {
  render(<App />, container);
  const articles = screen.getByTestId('article-list').childElementCount;
  expect(articles).toHaveLength(100);

  userEvent.selectOptions(
    screen.getByTestId('select-article-count'),
    screen.getByRole('option', '50'),
  )

  expect(articles).toHaveLength(50);
  helpers.fetchArticles.mockRestore();
});

it('refetches articles when new date is selected', () => {
  const spy = jest.spyOn(App.prototype, 'fetchArticles');
  render(<App />, container);

  const dateSelect = screen.getByTestId('select-date');
  dateSelect.simulate('change', { target: { value: '2022-02-25' } });

  expect(spy).toHaveBeenCalled();
});

it('fetches articles when country is selected', () => {
  const spy = jest.spyOn(App.prototype, 'fetchArticles');
  render(<App />, container);

  userEvent.selectOptions(
    screen.getByTestId('select-country'),
    screen.getByRole('option', { value: 'AU' }),
  )

  expect(spy).toHaveBeenCalled();
});

it('fetches by country and renders articles', () => {
  jest.spyOn(helpers, 'fetchArticlesByCountry').mockReturnValue(fixture_data.country_selected);
  render(<App />, container);

  userEvent.selectOptions(
    screen.getByTestId('select-country'),
    screen.getByRole('option', { value: 'AU' }),
  )
  const spy = jest.spyOn(helpers, 'fetchArticlesByCountry');
  expect(spy).toHaveBeenCalled();

  const articles = screen.getByTestId('article-list').childElementCount;
  expect(articles).toHaveLength(100);
});
