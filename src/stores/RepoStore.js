const AppDispatcher = require('../dispatcher/AppDispatcher');
const AppConstants = require('../constants/AppConstants');
const EventEmitter = require('events').EventEmitter;
const _ = require('underscore');

let store = {};

function loadRepoData(data) {
  store = data;
}

const RepoStore = _.extend({}, EventEmitter.prototype, {
  getList() {
    return store;
  },
  emitChange() {
    this.emit('change');
  },
  addChangeListener(callback) {
    this.on('change', callback);
  },
  removeChangeListener(callback) {
    this.removeListener('change', callback);
  },
});
AppDispatcher.register((payload) => {
  const action = payload.action;
  switch (action.actionType) {
    case AppConstants.GET_REPOS:
      loadRepoData(action.data);
      break;
    default:
      return true;
  }
  RepoStore.emitChange();
  return true;
});

module.exports = RepoStore;
