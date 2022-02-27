import React from 'react';
import './styles/App.css';
import DateSelect from './components/DateSelect';
import CountDropDown from './components/CountDropDown';
import CountryDropDown from './components/CountryDropDown';
import ArticleList from './components/ArticleList';
import helpers from './utils/helpers';
import moment from 'moment';
import { codes } from 'iso-country-codes';

export default class App extends React.Component {
  state = {
    date: moment().subtract(1, 'days').format('YYYY-MM-DD'),
    maxDate: moment().subtract(1, 'days').format('YYYY-MM-DD'),
    articleCount: '100',
    selectedCountry: '',
    articles: [],
    countryCodes: codes,
    fetching: false,
    error: false
  }

  handleSetDate = date => {
    this.setState({ date: date });
  }

  handleSetArticleCount = count => {
    this.setState({ articleCount: count });
  }

  handleSetArticleCountry = country => {
    this.setState({ selectedCountry: country });
  }

  fetchArticles = date => {
    const formattedDate = moment(date).format('YYYY/MM/DD');
    const selectedCountry = this.state.selectedCountry;
	  const successFn = response => {
		  this.setState({ articles: response, fetching: false, error: false });
	  };
    const failureFn = error => {
        this.setState({ error: true, fetching: false });
        console.log(error);
    };

    if (selectedCountry) {
      helpers.fetchArticlesByCountry(formattedDate, selectedCountry).then(successFn, failureFn);
    } else {
      helpers.fetchArticles(formattedDate).then(successFn, failureFn);
    }
  }

  componentDidMount() {
    this.setState({ fetching: true });
    this.fetchArticles(this.state.date);
  }

  componentDidUpdate(prevProps, prevState) {
    const dateDidChange = this.state.date !== prevState.date;
    const countryDidChange = this.state.selectedCountry !== prevState.selectedCountry;

    //only refetch articles if date or country changes
    if (dateDidChange || countryDidChange) {
      this.setState({ fetching: true });
      this.fetchArticles(this.state.date);
    }
  }

  render() {
    return (
        <div className="container">
          <h1>Top Viewed Wikipedia Articles</h1>
    
          <div className="row col-md-6 offset-md-3">
            <DateSelect
              date={this.state.date}
              maxDate={this.state.maxDate}
              handleSelectDate={this.handleSetDate} />

            <CountDropDown
              count={this.state.articleCount}
              handleSelectCount={this.handleSetArticleCount} />
          </div>

          <div className="row col-md-12 offset-md-3">
            <CountryDropDown
              handleSelectCountry={this.handleSetArticleCountry}
              selectedCountry={this.state.selectedCountry}
              codes={this.state.countryCodes} />
          </div>

          <div className="col-md-6 offset-md-3">
            <ArticleList
              fetching={this.state.fetching}
              error={this.state.error}
              articles={this.state.articles}
              articleCount={this.state.articleCount} />
          </div>

        </div>
      );
  }
}