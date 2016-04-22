var _ = require('lodash');
var EventEmitter = require('events');
var socket = require('./websockets.js');

var dataMethods = {
  setRemovalInHalfHour: (track, tracks, callback) => {
    setTimeout(() => {
      dataMethods.removeFromStore(track, tracks);
      callback();
    }, 1800000);
  },
  removeFromStore: (itemToRemove, store) => {
    for (var i = 0; i < store.length; i++) {
      if (_.isEqual(store[i], itemToRemove)) {
        store.splice(i, 1);
        return;
      }
    }
  },
  addToStore: (itemToAdd, store) => {
    if (Array.isArray(store)) {
      store.push(itemToAdd);
    } else {
      console.log('we only currently support adding to arrays');
    }
  },
};

module.exports = dataMethods;
