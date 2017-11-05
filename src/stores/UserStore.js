const AppDispatcher = require('../dispatcher/AppDispatcher');
const AppConstants = require('../constants/AppConstants');
const EventEmitter = require('events').EventEmitter;
const _ = require('underscore');

let store = {};
function loadRepoData(data) {
  store = data;
}

const UserStore = _.extend({}, EventEmitter.prototype, {
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
    case AppConstants.GET_USERS:
      loadRepoData(action.data);
      break;
    default:
      return true;
  }
  UserStore.emitChange();
  return true;
});

module.exports = UserStore;
