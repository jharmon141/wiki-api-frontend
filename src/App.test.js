import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import App from './App';
import ArticleList from './components/ArticleList';
import fixture_data from './utils/test-utils';
import { shallow, configure } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import { screen } from '@testing-library/dom';

configure({ adapter: new Adapter() });

let container = null;
let list_of_articles = fixture_data.no_country.response.data.items[0].articles;
let list_of_articles_by_country = fixture_data.country_selected.response.data.items[0].articles;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
  global.Date.now = jest.fn(() => new Date('2022-02-27T10:20:30Z').getTime())
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
  jest.restoreAllMocks();
});

it('sets date to yesterday by default', function () {
  const app = shallow(<App />);
  expect(app.state('date')).toBe('2022-02-26');
});

it('sets article count to 100 by default', function () {
  const app = shallow(<App />);
  expect(app.state('articleCount')).toBe('100');
});

it('correctly renders loading state', () => {
  render(<ArticleList fetching={true}/>, container);

  expect(screen.getByTestId('loading-spinner')).toBeTruthy();
});

it('correctly renders error state', () => {
  render(<ArticleList error={true}/>, container);

  expect(screen.getByTestId('error-state')).toBeTruthy();
});

it('renders the selected amount of articles', () => {
  render(<ArticleList articleCount={100} articles={list_of_articles} />, container);
  expect(screen.getAllByTestId('article')).toHaveLength(100);

  render(<ArticleList articleCount={50} articles={list_of_articles} />, container);
  expect(screen.getAllByTestId('article')).toHaveLength(50);
});

it('renders articles selected by country', () => {
  render(<ArticleList articleCount={100} articles={list_of_articles_by_country} />, container);
  expect(screen.getAllByTestId('article')).toHaveLength(100);
});