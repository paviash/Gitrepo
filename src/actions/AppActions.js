const AppDispatcher = require('../dispatcher/AppDispatcher');
const AppConstants = require('../constants/AppConstants');

module.exports = {
  getRepoList(repositories) {
    AppDispatcher.handleAction({
      actionType: AppConstants.GET_REPOS,
      data: repositories,
    });
  },
  getContributors(contributions) {
    AppDispatcher.handleAction({
      actionType: AppConstants.GET_CONTRIBUTORS,
      data: contributions,
    });
  },
};
