const AppDispatcher = require('../dispatcher/AppDispatcher');
const AppConstants = require('../constants/AppConstants');
const EventEmitter = require('events').EventEmitter;
const _ = require('underscore');

let store = {};

function loadContributionData(data) {
  store = data;
}

const ContributionStore = _.extend({}, EventEmitter.prototype, {
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
    case AppConstants.GET_CONTRIBUTORS:
      loadContributionData(action.data);
      break;
    default:
      return true;
  }
  ContributionStore.emitChange();
  return true;
});

module.exports = ContributionStore;
