const AppDispatcher = require('../dispatcher/AppDispatcher');
const AppConstants = require('../constants/AppConstants');

module.exports = {
  receiveRepoInfo(repoInfo) {
    AppDispatcher.handleAction({
      actionType: AppConstants.GET_REPOS,
      data: repoInfo,
    });
  },
  getUsers(userInfo) {
    AppDispatcher.handleAction({
      actionType: AppConstants.GET_USERS,
      data: userInfo,
    });
  },
  getContributors(contributions) {
    AppDispatcher.handleAction({
      actionType: AppConstants.GET_CONTRIBUTORS,
      data: contributions,
    });
  },
};
