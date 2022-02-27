const axios = require("axios");

const helpers = {
    fetchArticles: function (date) {
        let queryURL = `https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/${date}`;

        return axios.get(queryURL).then(response => response.data.items[0].articles);
    },

    fetchArticlesByCountry: function (date, country) {
        let queryURL = `https://wikimedia.org/api/rest_v1/metrics/pageviews/top-per-country/${country}/all-access/${date}`

        return axios.get(queryURL).then(response => response.data.items[0].articles);
    },
};

export default helpers;