angular.module('saas')

    .controller('marketPlaceIntroCtrl', ['$scope', function ($scope) {
        $scope.currentIntroVideo = null;

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

        $scope.setCurrentIntroVideo = function(video) {
            $scope.currentIntroVideo = video;

            if (navigator.appVersion.indexOf("MSIE 8.") !== -1) {
                var identefier = video + '-swf';
                var videoSrc = document.getElementById(identefier);
                var movie = $(videoSrc).val();
                var videoObject = '<object id="swfVideoObj" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" type="application/x-shockwave-flash" codebase="https://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="500" height="281">'
                  + '<param name="movie" value="'+ movie +'" />'
                  + '<param name="quality" value="high" />'
                  + '<param name="controller" value="true" />'
                  + '<param name="autoplay" value="false" />'
                  + '<embed src="'+ movie
                  + '" quality="high" pluginspage="https://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="500" height="281" ></embed></object>';

                $(videoSrc).after(videoObject);
            }
            else {
                $("video").each(function() {
                  this[0].pause();
                });

                var videoElement = document.getElementById(video);
                var source = $(videoElement).find('source');
                var mp4Video = source[0];
                mp4Video.src = $(mp4Video).attr('id');
                var ogvVideo = source[1];
                ogvVideo.src = $(ogvVideo).attr('id');
                videoElement.load();

                if( navigator.userAgent.match(/Android/i)
                  || navigator.userAgent.match(/webOS/i)
                  || navigator.userAgent.match(/iPhone/i)
                  || navigator.userAgent.match(/iPad/i)
                  || navigator.userAgent.match(/iPod/i)
                  || navigator.userAgent.match(/BlackBerry/i)
                  || navigator.userAgent.match(/Windows Phone/i)
                 ){
                    if (videoElement.requestFullscreen) {
                      videoElement.requestFullscreen();
                    } else if (videoElement.mozRequestFullScreen) {
                      videoElement.mozRequestFullScreen();
                    } else if (videoElement.webkitRequestFullscreen) {

                      videoElement.webkitRequestFullscreen();
                    }
                }

            }


            return true;
        }

        $scope.stopVideo = function (el) {

             $scope.currentIntroVideo = null;
            if(navigator.appVersion.indexOf("MSIE 8.")!=-1) {
                $('#swfVideoObj').remove();
                return true;

             }else {
                var parentElement = document.getElementById(el);
                var videoElement = parentElement.getElementsByTagName('video')[0];

                videoElement.pause();
                return true;
            }
        }



}]);
