angular.module('saas')

  .controller('saasVideoCtrl', ['$scope', function($scope) {
    $scope.displayVideo = false;

    /**
     * Opens the modal dialog, and once it has appeared, start the video playing
     */
    $scope.showModal = function(modalId) {
      $('#' + modalId)
        .on('shown.bs.modal', function(event) {
          var $vid = $(this).find('video');

          $vid[0].play();
        })
        .modal()
    };

    $scope.stopVideo = function(elementId, event) {
      var videoElement = document.getElementById(elementId);
      videoElement.pause();
      return true;
    };

    $scope.playVideo = function(elementId, event) {
      $("video").each(function () {
        if(navigator.appVersion.indexOf("MSIE 8.") === -1){
          this.pause();
        }
      });

      // Detect if IE 8
      if (navigator.appVersion.indexOf("MSIE 8.") !== -1) {
        $scope.displayVideo = true;
      }
      else {
        var videoElement = document.getElementById(elementId),
          source = $(videoElement).find('source'),
          mp4Video = source[0],
          ogvVideo = source[1];

        mp4Video.src = $(mp4Video).attr('id');
        ogvVideo.src = $(ogvVideo).attr('id');

        $scope.displayVideo = true;
        videoElement.load();

        if (navigator.userAgent.match(/(?:Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone)/i)) {
          if (videoElement.requestFullscreen) {
            videoElement.requestFullscreen();
          }
          else if (videoElement.mozRequestFullScreen) {
            videoElement.mozRequestFullScreen();
          }
          else if (videoElement.webkitRequestFullscreen) {
            videoElement.webkitRequestFullscreen();
          }
        }

        videoElement.play();
      }
    };

  }
]);
