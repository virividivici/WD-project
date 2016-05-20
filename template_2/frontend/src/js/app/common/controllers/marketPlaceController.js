angular.module( 'saas' )

.controller( 'marketPlaceCtrl', [ '$scope', function( $scope ) {

  var fullScreenFunc = HTMLVideoElement.prototype.requestFullscreen ||
    HTMLVideoElement.prototype.mozRequestFullScreen ||
    HTMLVideoElement.prototype.webkitRequestFullScreen ||
    HTMLVideoElement.prototype.msRequestFullScreen;


  $scope.expandIntro = false;
  $scope.currentItem = null;
  $scope.currentVideo = null;


  $scope.slideProductRow = function( id ) {
    var $items = $( '#' + id ).find( '.item' ),
      $first = $items.first(),
      $last = $items.last();

    $first.insertAfter( $last );
  }


  $scope.setCurrentItem = function( item ) {
    $scope.currentItem = item;
    return true;
  }


  // IE 8! Add Flash fallback to video elements...
  if ( navigator.appVersion.indexOf( "MSIE 8." ) !== -1 ) {
    $scope.stopVideo = function( id ) {
      $( '#swfVideoObj' ).remove();

      $scope.currentVideo = null;
      return false;
    }

    $scope.setCurrentVideo = function( video ) {
      $scope.stopVideo();

      var videoSrc = document.getElementById( video + '-swf' ),
        movie = $( videoSrc ).val();

      $( videoSrc )
        .after(
          '<object id="swfVideoObj" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" type="application/x-shockwave-flash" codebase="https://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="500" height="281">' +
          '<param name="movie" value="' + movie + '" />' +
          '<param name="quality" value="high" />' +
          '<param name="controller" value="true" />' +
          '<param name="autoplay" value="false" />' +
          '<embed src="' + movie +
          '" quality="high" pluginspage="https://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="500" height="281" ></embed></object>'
        );

      $scope.currentVideo = video;
      return true;
    }
  }

  // Not IE 8!
  else {
    $scope.stopVideo = function( id ) {
      $( id ? '#' + id : 'body' ).find( 'video' ).each( function( elem ) {
        try {
          console.log(this);
          this.pause();
          this.currentTime = 0;
        }
        catch ( ex ) {
          console.info( ex )
        }
      } )

      $scope.currentVideo = null;
      return false;
    }


    $scope.setCurrentVideo = function( id ) {
      $scope.stopAllVideos();

      var videoElement = document.getElementById( id );
      videoElement.play();

      if ( typeof fullScreenFunc === 'function' && navigator.userAgent.match(
          /(?:Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone)/i ) ) {
        fullScreenFunc.call( videoElement )
      }

      $scope.currentVideo = id;
      return true;
    }
  }


  $scope.stopAllVideos = function() {
    $scope.stopVideo();
  }

} ] );
