const AppActions = require('../actions/AppActions');
const request = require('superagent');

module.exports = {
  get(user) {
    request
      .get(`https://api.github.com/users/${user}/repos`)
      .query({ query: 'somequery' })
      .query({ cachebuster: Date.now().toString() })
      .set('Accept', 'application/json')
      .end((err, response) => {
        AppActions.receiveRepoInfo(response.body);
        if (err) {
          console.error(err);
        }
      });
    return true;
  },
};
