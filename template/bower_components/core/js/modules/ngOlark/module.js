/* OLARK code begin */
/*jshint -W083, -W107 */
window.olark || (function(c) {
	var f = window,
		d = document,
		l = f.location.protocol == "https:" ? "https:" : "http:",
		z = c.name,
		r = "load";
	var nt = function() {
		f[z] = function() {
			(a.s = a.s || []).push(arguments);
		};
		var a = f[z]._ = {},
			q = c.methods.length;
		while (q--) {
			(function(n) {
				f[z][n] = function() {
					f[z]("call", n, arguments);
				};
			})(c.methods[q]);
		}
		a.l = c.loader;
		a.i = nt;
		a.p = {
			0: +new Date()
		};
		a.P = function(u) {
			a.p[u] = new Date() - a.p[0];
		};

		function s() {
			a.P(r);
			f[z](r);
		}
		f.addEventListener ? f.addEventListener(r, s, false) : f.attachEvent("on" + r, s);
		var ld = function() {
			function p(hd) {
				hd = "head";
				return ["<", hd, "></", hd, "><", i, ' onl' + 'oad="var d=', g, ";d.getElementsByTagName('head')[0].", j, "(d.", h, "('script')).", k, "='", l, "//", a.l, "'", '"', "></", i, ">"].join("");
			}
			var i = "body",
				m = d[i];
			if (!m) {
				return setTimeout(ld, 100);
			}
			a.P(1);
			var j = "appendChild",
				h = "createElement",
				k = "src",
				n = d[h]("div"),
				v = n[j](d[h](z)),
				b = d[h]("iframe"),
				g = "document",
				e = "domain",
				o;
			n.style.display = "none";
			m.insertBefore(n, m.firstChild).id = z;
			b.frameBorder = "0";
			b.id = z + "-loader";
			if (/MSIE[ ]+6/.test(navigator.userAgent)) {
				b.src = "javascript:false";
			}
			b.allowTransparency = "true";
			v[j](b);
			try {
				b.contentWindow[g].open();
			} catch (w) {
				c[e] = d[e];
				o = "javascript:var d=" + g + ".open();d.domain='" + d.domain + "';";
				b[k] = o + "void(0);";
			}
			try {
				var t = b.contentWindow[g];
				t.write(p());
				t.close();
			} catch (x) {
				b[k] = o + 'd.write("' + p().replace(/"/g, String.fromCharCode(92) + '"') + '");d.close();';
			}
			a.P(2);
		};
		ld();
	};
	nt();
})({
	loader: "static.olark.com/jsclient/loader0.js",
	name: "olark",
	methods: ["configure", "extend", "declare", "identify"]
});
/* OLARK code end */

/* Do not remove the code below */
(function(root, factory) {
	// AMD
	if (typeof define === 'function' && define.amd) {
		define(['angular', 'olark'], function(angular, olark) {
			return factory({}, angular, olark);
		});
	}
	// Node.js
	else if (typeof exports === 'object') {
		module.exports = factory({}, require('angular'), require('olark'));
	}
	// Angular
	else if (angular) {
		factory(root, root.angular, root.olark);
	}
}(this, function(global, angular, olark) {
	if (olark && global && !global.olark) {
		global.olark = olark;
	}

	function $OlarkProvider() {
		var provider = this;

		provider.development = false;
		provider.olark_id = '2738-852-10-6190';
		provider.configure = olarkAs('configure');

		if (!provider.development) {
			if (global.olark && global.olark.identify && provider.olark_id) {
				global.olark.identify(provider.olark_id);
			}
		}

		function olarkAs(type) {
			return function() {
				if (!type) {
					global.olark.apply(global.olark, arguments);
				}
				if (global.olark[type]) {
					global.olark[type].apply(global.olark, arguments);
				}
			};
		}

		provider.$get = function() {
			var fakeOlark = logAs(),
				$olark = olarkAs(),
				isDev = (provider.development),
				logAs = function logAs(type) {
					return function() {
						console.log('Olark: ' + (type || ''), arguments);
					};
				};

			fakeOlark.identify = logAs('identify');
			fakeOlark.configure = logAs('configure');
			$olark.configure = olarkAs('configure');
			$olark.identify = olarkAs('identify');
			return (isDev) ? fakeOlark : $olark;
		};
	}

	angular.module('ngOlark', [])
		.provider('$olark', $OlarkProvider)
		.provider('Olark', $OlarkProvider);

	angular.module('angular-olark', ['ngOlark']);
}));