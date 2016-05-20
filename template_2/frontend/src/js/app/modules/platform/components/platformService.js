
(function(angular) {
  'use strict';

  angular.module('platformModule')

    .service('platformService', ['$window', '$log', function($window, $log) {

      var platform = $window.navigator.platform,
        ua = $window.navigator.userAgent;

      var m = $window.location.search.match(/platform=(\w+)/);

      if (m) {
        platform = m[1];
      }

      $log.log('platform="%s", ua="%s"', platform, ua);

      var browser, version, mobile = false, os, osversion, bit;

      if (/MSIE/.test(ua)) {
        browser = 'Internet Explorer';

        if (/IEMobile/.test(ua)) {
          mobile = true;
        }

        version = /MSIE \d+[.]\d+/.exec(ua)[0].split(' ')[1];
      }
      else if (/Chrome/.test(ua)) {
        if (/CrOS/.test(ua)) {
          platform = 'CrOS';
        }

        browser = 'Chrome';
        version = /Chrome\/[\d\.]+/.exec(ua)[0].split('/')[1];
      }
      else if (/Opera/.test(ua)) {
        browser = 'Opera';

        if (/mini/.test(ua) || /Mobile/.test(ua)) {
          mobile = true;
        }
      }
      else if (/Android/.test(ua)) {
        browser = 'Android Webkit Browser';
        os = {
          id: 'android',
          name: /Android\s[\.\d]+/.exec(ua)[0],
          mobile: true
        };
      }
      else if (/Firefox/.test(ua)) {
        browser = 'Firefox';

        if (/Fennec/.test(ua)) {
          mobile = true;
        }

        version = /Firefox\/[\.\d]+/.exec(ua)[0].split('/')[1];
      }
      else if (/Safari/.test(ua)) {
        browser = 'Safari';

        if ((/iPhone/.test(ua)) || (/iPad/.test(ua)) || (/iPod/.test(ua))) {
          os = {
            id: 'ios',
            name: 'iOS',
            mobile: true
          };
        }
      }

      if (!version) {
        version = /Version\/[\.\d]+/.exec(ua);

        if (version) {
          version = version[0].split('/')[1];
        }
        else {
          version = /Opera\/[\.\d]+/.exec(ua)[0].split('/')[1];
        }
      }

      if (platform === 'MacIntel' || platform === 'MacPPC') {
        os = {
          id: 'osx',
          name: 'Mac OS X'
        };

        os.version = /10[\.\_\d]+/.exec(ua)[0];
        if (/[\_]/.test(os.version)) {
          os.version = os.version.split('_').join('.');
        }
      }
      else if (platform === 'CrOS') {
        os = {
          id: 'chrome',
          name: 'ChromeOS'
        };
      }
      else if (platform === 'Win32' || platform == 'Win64') {
        os = {
          id: 'windows',
          name: 'Windows'
        };
      }
      else if (!os && /Android/.test(ua)) {
        os = {
          id: 'android',
          name: 'Android',
          mobile: true
        };
      }
      else if (!os && /Linux/.test(platform)) {
        os = {
          id: 'linux',
          name: 'Linux'
        };
      }
      else if (!os && /Windows/.test(ua)) {
        os = {
          id: 'windows',
          name: 'Windows'
        };
      }

      var res = {
        browser : {
          name: browser,
          version : version
        },
        os : angular.extend({
          mobile: false,
          version: osversion
        }, os)
      };

      $log.log(res);

      return res;

    }]);

})(angular);
