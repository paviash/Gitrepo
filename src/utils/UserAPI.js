const AppActions = require('../actions/AppActions');
const request = require('superagent');

module.exports = {
  get() {
    request
      .get('https://api.github.com/users?per_page=100')
      .set('Accept', 'application/json')
      .end((err, response) => {
        AppActions.getUsers(response.body);
        if (err) {
          console.error(err);
        }
      });

    return true;
  },
};
