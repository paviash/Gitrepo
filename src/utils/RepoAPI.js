const AppActions = require('../actions/AppActions');
const request = require('superagent');

module.exports = {
  get(user) {
    request
      .get(`https://api.github.com/users/${user}/repos`)
      .set('Accept', 'application/json')
      .end((err, response) => {
        if (response.status === 200) {
          AppActions.getRepoList(response.body);
        } else {
          AppActions.getRepoList({ msg: 'Error' });
        }
        return true;
      });
  },
};
