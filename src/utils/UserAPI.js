const AppActions = require('../actions/AppActions');
const request = require('superagent');

module.exports = {
  get() {
    request
      .get('https://api.github.com/repos/angular/angular/contributors')
      .query({ query: 'somequery' })
      .query({ cachebuster: Date.now().toString() })
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
