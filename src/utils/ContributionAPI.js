const AppActions = require('../actions/AppActions');
const request = require('superagent');

module.exports = {
  get(repo) {
    request
      .get(`https://api.github.com/repos/${repo}/contributors`)
      .set('Accept', 'application/json')
      .end((err, response) => {
        AppActions.getContributors(response.body);
        if (err) {
          console.error(err);
        }
      });
    return true;
  },
};
