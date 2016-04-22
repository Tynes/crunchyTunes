var _ = require('lodash');

var dataMethods = {
  setRemovalInHalfHour: function (track, tracks) {
    setTimeout(function() {
      dataMethods.removeFromStore(track, tracks);
    }, 1800000);
  },
  removeFromStore: function(itemToRemove, store) {
    for (var i = 0; i < store.length; i++) {
      if (_.isEqual(store[i], itemToRemove)) {
        store.splice(i, 1);
        return;
      }
    }
  },
  addToStore: function(itemToAdd, store) {
    if (Array.isArray(store)) {
      store.push(itemToAdd);
    } else {
      console.log('we only currently support adding to arrays');
    }
  },
};

module.exports = dataMethods;

// 1800000 - half hour
// maybe use a setInterval instead to clean out songs
// the setTimeOut sets an expired property to true
// the setInterval checks for any that have expired and removes them
// this could enable auto-deletion of songs
