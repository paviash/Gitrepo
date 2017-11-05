const AppActions = require('../actions/AppActions');
const request = require('superagent');

module.exports = {
  get(repo) {
    request
      .get(`https://api.github.com/repos/${repo}/contributors`)
      .set('Accept', 'application/json')
      .end((err, response) => {
        if (response.status === 200) {
          AppActions.getContributors(response.body);
        } else {
          AppActions.getContributors({ msg: 'Error' });
        }
      });
    return true;
  },
};
