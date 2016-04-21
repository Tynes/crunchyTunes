var dataMethods = {
  setRemovalInHalfHour: function (track, tracks) {
    setTimeout(function() {
      for (var i = 0; i < tracks.length; i++) {
        if (track === tracks[i]) {
          tracks.splice(i, 1);
          break;
        }
      }
    }, 1800000);
  },
};

module.exports = dataMethods;
