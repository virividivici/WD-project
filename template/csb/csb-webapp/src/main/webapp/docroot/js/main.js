/*
 AngularJS v1.5.5
 (c) 2010-2016 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(A,d){'use strict';function p(){return["$animate",function(w){return{restrict:"AE",transclude:"element",priority:1,terminal:!0,require:"^^ngMessages",link:function(n,l,a,c,m){var k=l[0],f,q=a.ngMessage||a.when;a=a.ngMessageExp||a.whenExp;var d=function(a){f=a?x(a)?a:a.split(/[\s,]+/):null;c.reRender()};a?(d(n.$eval(a)),n.$watchCollection(a,d)):d(q);var e,r;c.register(k,r={test:function(a){var g=f;a=g?x(g)?0<=g.indexOf(a):g.hasOwnProperty(a):void 0;return a},attach:function(){e||m(n,function(a){w.enter(a,
null,l);e=a;var g=e.$$attachId=c.getAttachId();e.on("$destroy",function(){e&&e.$$attachId===g&&(c.deregister(k),r.detach())})})},detach:function(){if(e){var a=e;e=null;w.leave(a)}}})}}}]}var x=d.isArray,t=d.forEach,y=d.isString,z=d.element;d.module("ngMessages",[]).directive("ngMessages",["$animate",function(d){function n(a,c){return y(c)&&0===c.length||l(a.$eval(c))}function l(a){return y(a)?a.length:!!a}return{require:"ngMessages",restrict:"AE",controller:["$element","$scope","$attrs",function(a,
c,m){function k(a,c){for(var b=c,f=[];b&&b!==a;){var h=b.$$ngMessageNode;if(h&&h.length)return e[h];b.childNodes.length&&-1==f.indexOf(b)?(f.push(b),b=b.childNodes[b.childNodes.length-1]):b.previousSibling?b=b.previousSibling:(b=b.parentNode,f.push(b))}}var f=this,q=0,p=0;this.getAttachId=function(){return p++};var e=this.messages={},r,s;this.render=function(g){g=g||{};r=!1;s=g;for(var e=n(c,m.ngMessagesMultiple)||n(c,m.multiple),b=[],q={},h=f.head,k=!1,p=0;null!=h;){p++;var u=h.message,v=!1;k||t(g,
function(a,b){!v&&l(a)&&u.test(b)&&!q[b]&&(v=q[b]=!0,u.attach())});v?k=!e:b.push(u);h=h.next}t(b,function(a){a.detach()});b.length!==p?d.setClass(a,"ng-active","ng-inactive"):d.setClass(a,"ng-inactive","ng-active")};c.$watchCollection(m.ngMessages||m["for"],f.render);a.on("$destroy",function(){t(e,function(a){a.message.detach()})});this.reRender=function(){r||(r=!0,c.$evalAsync(function(){r&&s&&f.render(s)}))};this.register=function(g,c){var b=q.toString();e[b]={message:c};var d=a[0],h=e[b];f.head?
(d=k(d,g))?(h.next=d.next,d.next=h):(h.next=f.head,f.head=h):f.head=h;g.$$ngMessageNode=b;q++;f.reRender()};this.deregister=function(c){var d=c.$$ngMessageNode;delete c.$$ngMessageNode;var b=e[d];(c=k(a[0],c))?c.next=b.next:f.head=b.next;delete e[d];f.reRender()}}]}}]).directive("ngMessagesInclude",["$templateRequest","$document","$compile",function(d,n,l){return{restrict:"AE",require:"^^ngMessages",link:function(a,c,m){var k=m.ngMessagesInclude||m.src;d(k).then(function(d){l(d)(a,function(a){c.after(a);
a=l.$$createComment?l.$$createComment("ngMessagesInclude",k):n[0].createComment(" ngMessagesInclude: "+k+" ");a=z(a);c.after(a);c.remove()})})}}}]).directive("ngMessage",p()).directive("ngMessageExp",p())})(window,window.angular);
//# sourceMappingURL=angular-messages.min.js.map
/*
 AngularJS v1.5.5
 (c) 2010-2016 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(S,q){'use strict';function Aa(a,b,c){if(!a)throw Ma("areq",b||"?",c||"required");return a}function Ba(a,b){if(!a&&!b)return"";if(!a)return b;if(!b)return a;ba(a)&&(a=a.join(" "));ba(b)&&(b=b.join(" "));return a+" "+b}function Na(a){var b={};a&&(a.to||a.from)&&(b.to=a.to,b.from=a.from);return b}function X(a,b,c){var d="";a=ba(a)?a:a&&P(a)&&a.length?a.split(/\s+/):[];r(a,function(a,f){a&&0<a.length&&(d+=0<f?" ":"",d+=c?b+a:a+b)});return d}function Oa(a){if(a instanceof G)switch(a.length){case 0:return[];
case 1:if(1===a[0].nodeType)return a;break;default:return G(ca(a))}if(1===a.nodeType)return G(a)}function ca(a){if(!a[0])return a;for(var b=0;b<a.length;b++){var c=a[b];if(1==c.nodeType)return c}}function Pa(a,b,c){r(b,function(b){a.addClass(b,c)})}function Qa(a,b,c){r(b,function(b){a.removeClass(b,c)})}function U(a){return function(b,c){c.addClass&&(Pa(a,b,c.addClass),c.addClass=null);c.removeClass&&(Qa(a,b,c.removeClass),c.removeClass=null)}}function pa(a){a=a||{};if(!a.$$prepared){var b=a.domOperation||
Q;a.domOperation=function(){a.$$domOperationFired=!0;b();b=Q};a.$$prepared=!0}return a}function ga(a,b){Ca(a,b);Da(a,b)}function Ca(a,b){b.from&&(a.css(b.from),b.from=null)}function Da(a,b){b.to&&(a.css(b.to),b.to=null)}function V(a,b,c){var d=b.options||{};c=c.options||{};var e=(d.addClass||"")+" "+(c.addClass||""),f=(d.removeClass||"")+" "+(c.removeClass||"");a=Ra(a.attr("class"),e,f);c.preparationClasses&&(d.preparationClasses=Y(c.preparationClasses,d.preparationClasses),delete c.preparationClasses);
e=d.domOperation!==Q?d.domOperation:null;Ea(d,c);e&&(d.domOperation=e);d.addClass=a.addClass?a.addClass:null;d.removeClass=a.removeClass?a.removeClass:null;b.addClass=d.addClass;b.removeClass=d.removeClass;return d}function Ra(a,b,c){function d(a){P(a)&&(a=a.split(" "));var b={};r(a,function(a){a.length&&(b[a]=!0)});return b}var e={};a=d(a);b=d(b);r(b,function(a,b){e[b]=1});c=d(c);r(c,function(a,b){e[b]=1===e[b]?null:-1});var f={addClass:"",removeClass:""};r(e,function(b,c){var d,e;1===b?(d="addClass",
e=!a[c]):-1===b&&(d="removeClass",e=a[c]);e&&(f[d].length&&(f[d]+=" "),f[d]+=c)});return f}function D(a){return a instanceof q.element?a[0]:a}function Sa(a,b,c){var d="";b&&(d=X(b,"ng-",!0));c.addClass&&(d=Y(d,X(c.addClass,"-add")));c.removeClass&&(d=Y(d,X(c.removeClass,"-remove")));d.length&&(c.preparationClasses=d,a.addClass(d))}function qa(a,b){var c=b?"-"+b+"s":"";la(a,[ma,c]);return[ma,c]}function ta(a,b){var c=b?"paused":"",d=Z+"PlayState";la(a,[d,c]);return[d,c]}function la(a,b){a.style[b[0]]=
b[1]}function Y(a,b){return a?b?a+" "+b:a:b}function Fa(a,b,c){var d=Object.create(null),e=a.getComputedStyle(b)||{};r(c,function(a,b){var c=e[a];if(c){var s=c.charAt(0);if("-"===s||"+"===s||0<=s)c=Ta(c);0===c&&(c=null);d[b]=c}});return d}function Ta(a){var b=0;a=a.split(/\s*,\s*/);r(a,function(a){"s"==a.charAt(a.length-1)&&(a=a.substring(0,a.length-1));a=parseFloat(a)||0;b=b?Math.max(a,b):a});return b}function ua(a){return 0===a||null!=a}function Ga(a,b){var c=T,d=a+"s";b?c+="Duration":d+=" linear all";
return[c,d]}function Ha(){var a=Object.create(null);return{flush:function(){a=Object.create(null)},count:function(b){return(b=a[b])?b.total:0},get:function(b){return(b=a[b])&&b.value},put:function(b,c){a[b]?a[b].total++:a[b]={total:1,value:c}}}}function Ia(a,b,c){r(c,function(c){a[c]=da(a[c])?a[c]:b.style.getPropertyValue(c)})}var Q=q.noop,Ja=q.copy,Ea=q.extend,G=q.element,r=q.forEach,ba=q.isArray,P=q.isString,va=q.isObject,C=q.isUndefined,da=q.isDefined,Ka=q.isFunction,wa=q.isElement,T,xa,Z,ya;C(S.ontransitionend)&&
da(S.onwebkittransitionend)?(T="WebkitTransition",xa="webkitTransitionEnd transitionend"):(T="transition",xa="transitionend");C(S.onanimationend)&&da(S.onwebkitanimationend)?(Z="WebkitAnimation",ya="webkitAnimationEnd animationend"):(Z="animation",ya="animationend");var ra=Z+"Delay",za=Z+"Duration",ma=T+"Delay",La=T+"Duration",Ma=q.$$minErr("ng"),Ua={transitionDuration:La,transitionDelay:ma,transitionProperty:T+"Property",animationDuration:za,animationDelay:ra,animationIterationCount:Z+"IterationCount"},
Va={transitionDuration:La,transitionDelay:ma,animationDuration:za,animationDelay:ra};q.module("ngAnimate",[]).directive("ngAnimateSwap",["$animate","$rootScope",function(a,b){return{restrict:"A",transclude:"element",terminal:!0,priority:600,link:function(b,d,e,f,z){var B,s;b.$watchCollection(e.ngAnimateSwap||e["for"],function(e){B&&a.leave(B);s&&(s.$destroy(),s=null);if(e||0===e)s=b.$new(),z(s,function(b){B=b;a.enter(b,null,d)})})}}}]).directive("ngAnimateChildren",["$interpolate",function(a){return{link:function(b,
c,d){function e(a){c.data("$$ngAnimateChildren","on"===a||"true"===a)}var f=d.ngAnimateChildren;q.isString(f)&&0===f.length?c.data("$$ngAnimateChildren",!0):(e(a(f)(b)),d.$observe("ngAnimateChildren",e))}}}]).factory("$$rAFScheduler",["$$rAF",function(a){function b(a){d=d.concat(a);c()}function c(){if(d.length){for(var b=d.shift(),z=0;z<b.length;z++)b[z]();e||a(function(){e||c()})}}var d,e;d=b.queue=[];b.waitUntilQuiet=function(b){e&&e();e=a(function(){e=null;b();c()})};return b}]).provider("$$animateQueue",
["$animateProvider",function(a){function b(a){if(!a)return null;a=a.split(" ");var b=Object.create(null);r(a,function(a){b[a]=!0});return b}function c(a,c){if(a&&c){var d=b(c);return a.split(" ").some(function(a){return d[a]})}}function d(a,b,c,d){return f[a].some(function(a){return a(b,c,d)})}function e(a,b){var c=0<(a.addClass||"").length,d=0<(a.removeClass||"").length;return b?c&&d:c||d}var f=this.rules={skip:[],cancel:[],join:[]};f.join.push(function(a,b,c){return!b.structural&&e(b)});f.skip.push(function(a,
b,c){return!b.structural&&!e(b)});f.skip.push(function(a,b,c){return"leave"==c.event&&b.structural});f.skip.push(function(a,b,c){return c.structural&&2===c.state&&!b.structural});f.cancel.push(function(a,b,c){return c.structural&&b.structural});f.cancel.push(function(a,b,c){return 2===c.state&&b.structural});f.cancel.push(function(a,b,d){if(d.structural)return!1;a=b.addClass;b=b.removeClass;var e=d.addClass;d=d.removeClass;return C(a)&&C(b)||C(e)&&C(d)?!1:c(a,d)||c(b,e)});this.$get=["$$rAF","$rootScope",
"$rootElement","$document","$$HashMap","$$animation","$$AnimateRunner","$templateRequest","$$jqLite","$$forceReflow",function(b,c,f,v,I,Wa,u,sa,w,x){function R(){var a=!1;return function(b){a?b():c.$$postDigest(function(){a=!0;b()})}}function J(a,b,c){var g=D(b),d=D(a),k=[];(a=h[c])&&r(a,function(a){ia.call(a.node,g)?k.push(a.callback):"leave"===c&&ia.call(a.node,d)&&k.push(a.callback)});return k}function k(a,b,c){var g=ca(b);return a.filter(function(a){return!(a.node===g&&(!c||a.callback===c))})}
function p(a,k,h){function l(c,g,d,h){f(function(){var c=J(oa,a,g);c.length?b(function(){r(c,function(b){b(a,d,h)});"close"!==d||a[0].parentNode||N.off(a)}):"close"!==d||a[0].parentNode||N.off(a)});c.progress(g,d,h)}function A(b){var c=a,g=m;g.preparationClasses&&(c.removeClass(g.preparationClasses),g.preparationClasses=null);g.activeClasses&&(c.removeClass(g.activeClasses),g.activeClasses=null);F(a,m);ga(a,m);m.domOperation();p.complete(!b)}var m=Ja(h),x,oa;if(a=Oa(a))x=D(a),oa=a.parent();var m=
pa(m),p=new u,f=R();ba(m.addClass)&&(m.addClass=m.addClass.join(" "));m.addClass&&!P(m.addClass)&&(m.addClass=null);ba(m.removeClass)&&(m.removeClass=m.removeClass.join(" "));m.removeClass&&!P(m.removeClass)&&(m.removeClass=null);m.from&&!va(m.from)&&(m.from=null);m.to&&!va(m.to)&&(m.to=null);if(!x)return A(),p;h=[x.className,m.addClass,m.removeClass].join(" ");if(!Xa(h))return A(),p;var s=0<=["enter","move","leave"].indexOf(k),t=v[0].hidden,w=!g||t||H.get(x);h=!w&&y.get(x)||{};var I=!!h.state;w||
I&&1==h.state||(w=!K(a,oa,k));if(w)return t&&l(p,k,"start"),A(),t&&l(p,k,"close"),p;s&&L(a);t={structural:s,element:a,event:k,addClass:m.addClass,removeClass:m.removeClass,close:A,options:m,runner:p};if(I){if(d("skip",a,t,h)){if(2===h.state)return A(),p;V(a,h,t);return h.runner}if(d("cancel",a,t,h))if(2===h.state)h.runner.end();else if(h.structural)h.close();else return V(a,h,t),h.runner;else if(d("join",a,t,h))if(2===h.state)V(a,t,{});else return Sa(a,s?k:null,m),k=t.event=h.event,m=V(a,h,t),h.runner}else V(a,
t,{});(I=t.structural)||(I="animate"===t.event&&0<Object.keys(t.options.to||{}).length||e(t));if(!I)return A(),O(a),p;var ia=(h.counter||0)+1;t.counter=ia;M(a,1,t);c.$$postDigest(function(){var b=y.get(x),c=!b,b=b||{},g=0<(a.parent()||[]).length&&("animate"===b.event||b.structural||e(b));if(c||b.counter!==ia||!g){c&&(F(a,m),ga(a,m));if(c||s&&b.event!==k)m.domOperation(),p.end();g||O(a)}else k=!b.structural&&e(b,!0)?"setClass":b.event,M(a,2),b=Wa(a,k,b.options),p.setHost(b),l(p,k,"start",{}),b.done(function(b){A(!b);
(b=y.get(x))&&b.counter===ia&&O(D(a));l(p,k,"close",{})})});return p}function L(a){a=D(a).querySelectorAll("[data-ng-animate]");r(a,function(a){var b=parseInt(a.getAttribute("data-ng-animate")),c=y.get(a);if(c)switch(b){case 2:c.runner.end();case 1:y.remove(a)}})}function O(a){a=D(a);a.removeAttribute("data-ng-animate");y.remove(a)}function l(a,b){return D(a)===D(b)}function K(a,b,c){c=G(v[0].body);var g=l(a,c)||"HTML"===a[0].nodeName,d=l(a,f),h=!1,k,e=H.get(D(a));(a=G.data(a[0],"$ngAnimatePin"))&&
(b=a);for(b=D(b);b;){d||(d=l(b,f));if(1!==b.nodeType)break;a=y.get(b)||{};if(!h){var p=H.get(b);if(!0===p&&!1!==e){e=!0;break}else!1===p&&(e=!1);h=a.structural}if(C(k)||!0===k)a=G.data(b,"$$ngAnimateChildren"),da(a)&&(k=a);if(h&&!1===k)break;g||(g=l(b,c));if(g&&d)break;if(!d&&(a=G.data(b,"$ngAnimatePin"))){b=D(a);continue}b=b.parentNode}return(!h||k)&&!0!==e&&d&&g}function M(a,b,c){c=c||{};c.state=b;a=D(a);a.setAttribute("data-ng-animate",b);c=(b=y.get(a))?Ea(b,c):c;y.put(a,c)}var y=new I,H=new I,
g=null,oa=c.$watch(function(){return 0===sa.totalPendingRequests},function(a){a&&(oa(),c.$$postDigest(function(){c.$$postDigest(function(){null===g&&(g=!0)})}))}),h={},A=a.classNameFilter(),Xa=A?function(a){return A.test(a)}:function(){return!0},F=U(w),ia=S.Node.prototype.contains||function(a){return this===a||!!(this.compareDocumentPosition(a)&16)},N={on:function(a,b,c){var g=ca(b);h[a]=h[a]||[];h[a].push({node:g,callback:c});G(b).on("$destroy",function(){y.get(g)||N.off(a,b,c)})},off:function(a,
b,c){if(1!==arguments.length||q.isString(arguments[0])){var g=h[a];g&&(h[a]=1===arguments.length?null:k(g,b,c))}else for(g in b=arguments[0],h)h[g]=k(h[g],b)},pin:function(a,b){Aa(wa(a),"element","not an element");Aa(wa(b),"parentElement","not an element");a.data("$ngAnimatePin",b)},push:function(a,b,c,g){c=c||{};c.domOperation=g;return p(a,b,c)},enabled:function(a,b){var c=arguments.length;if(0===c)b=!!g;else if(wa(a)){var d=D(a),h=H.get(d);1===c?b=!h:H.put(d,!b)}else b=g=!!a;return b}};return N}]}]).provider("$$animation",
["$animateProvider",function(a){function b(a){return a.data("$$animationRunner")}var c=this.drivers=[];this.$get=["$$jqLite","$rootScope","$injector","$$AnimateRunner","$$HashMap","$$rAFScheduler",function(a,e,f,z,B,s){function v(a){function b(a){if(a.processed)return a;a.processed=!0;var d=a.domNode,L=d.parentNode;e.put(d,a);for(var f;L;){if(f=e.get(L)){f.processed||(f=b(f));break}L=L.parentNode}(f||c).children.push(a);return a}var c={children:[]},d,e=new B;for(d=0;d<a.length;d++){var f=a[d];e.put(f.domNode,
a[d]={domNode:f.domNode,fn:f.fn,children:[]})}for(d=0;d<a.length;d++)b(a[d]);return function(a){var b=[],c=[],d;for(d=0;d<a.children.length;d++)c.push(a.children[d]);a=c.length;var e=0,f=[];for(d=0;d<c.length;d++){var x=c[d];0>=a&&(a=e,e=0,b.push(f),f=[]);f.push(x.fn);x.children.forEach(function(a){e++;c.push(a)});a--}f.length&&b.push(f);return b}(c)}var I=[],q=U(a);return function(u,B,w){function x(a){a=a.hasAttribute("ng-animate-ref")?[a]:a.querySelectorAll("[ng-animate-ref]");var b=[];r(a,function(a){var c=
a.getAttribute("ng-animate-ref");c&&c.length&&b.push(a)});return b}function R(a){var b=[],c={};r(a,function(a,g){var d=D(a.element),e=0<=["enter","move"].indexOf(a.event),d=a.structural?x(d):[];if(d.length){var k=e?"to":"from";r(d,function(a){var b=a.getAttribute("ng-animate-ref");c[b]=c[b]||{};c[b][k]={animationID:g,element:G(a)}})}else b.push(a)});var d={},e={};r(c,function(c,h){var k=c.from,f=c.to;if(k&&f){var p=a[k.animationID],y=a[f.animationID],l=k.animationID.toString();if(!e[l]){var x=e[l]=
{structural:!0,beforeStart:function(){p.beforeStart();y.beforeStart()},close:function(){p.close();y.close()},classes:J(p.classes,y.classes),from:p,to:y,anchors:[]};x.classes.length?b.push(x):(b.push(p),b.push(y))}e[l].anchors.push({out:k.element,"in":f.element})}else k=k?k.animationID:f.animationID,f=k.toString(),d[f]||(d[f]=!0,b.push(a[k]))});return b}function J(a,b){a=a.split(" ");b=b.split(" ");for(var c=[],d=0;d<a.length;d++){var k=a[d];if("ng-"!==k.substring(0,3))for(var e=0;e<b.length;e++)if(k===
b[e]){c.push(k);break}}return c.join(" ")}function k(a){for(var b=c.length-1;0<=b;b--){var d=c[b];if(f.has(d)&&(d=f.get(d)(a)))return d}}function p(a,c){a.from&&a.to?(b(a.from.element).setHost(c),b(a.to.element).setHost(c)):b(a.element).setHost(c)}function L(){var a=b(u);!a||"leave"===B&&w.$$domOperationFired||a.end()}function O(b){u.off("$destroy",L);u.removeData("$$animationRunner");q(u,w);ga(u,w);w.domOperation();y&&a.removeClass(u,y);u.removeClass("ng-animate");K.complete(!b)}w=pa(w);var l=0<=
["enter","move","leave"].indexOf(B),K=new z({end:function(){O()},cancel:function(){O(!0)}});if(!c.length)return O(),K;u.data("$$animationRunner",K);var M=Ba(u.attr("class"),Ba(w.addClass,w.removeClass)),y=w.tempClasses;y&&(M+=" "+y,w.tempClasses=null);var H;l&&(H="ng-"+B+"-prepare",a.addClass(u,H));I.push({element:u,classes:M,event:B,structural:l,options:w,beforeStart:function(){u.addClass("ng-animate");y&&a.addClass(u,y);H&&(a.removeClass(u,H),H=null)},close:O});u.on("$destroy",L);if(1<I.length)return K;
e.$$postDigest(function(){var a=[];r(I,function(c){b(c.element)?a.push(c):c.close()});I.length=0;var c=R(a),d=[];r(c,function(a){d.push({domNode:D(a.from?a.from.element:a.element),fn:function(){a.beforeStart();var c,d=a.close;if(b(a.anchors?a.from.element||a.to.element:a.element)){var g=k(a);g&&(c=g.start)}c?(c=c(),c.done(function(a){d(!a)}),p(a,c)):d()}})});s(v(d))});return K}}]}]).provider("$animateCss",["$animateProvider",function(a){var b=Ha(),c=Ha();this.$get=["$window","$$jqLite","$$AnimateRunner",
"$timeout","$$forceReflow","$sniffer","$$rAFScheduler","$$animateQueue",function(a,e,f,z,B,s,v,I){function q(a,b){var c=a.parentNode;return(c.$$ngAnimateParentKey||(c.$$ngAnimateParentKey=++R))+"-"+a.getAttribute("class")+"-"+b}function u(k,f,x,s){var l;0<b.count(x)&&(l=c.get(x),l||(f=X(f,"-stagger"),e.addClass(k,f),l=Fa(a,k,s),l.animationDuration=Math.max(l.animationDuration,0),l.transitionDuration=Math.max(l.transitionDuration,0),e.removeClass(k,f),c.put(x,l)));return l||{}}function sa(a){J.push(a);
v.waitUntilQuiet(function(){b.flush();c.flush();for(var a=B(),d=0;d<J.length;d++)J[d](a);J.length=0})}function w(c,e,f){e=b.get(f);e||(e=Fa(a,c,Ua),"infinite"===e.animationIterationCount&&(e.animationIterationCount=1));b.put(f,e);c=e;f=c.animationDelay;e=c.transitionDelay;c.maxDelay=f&&e?Math.max(f,e):f||e;c.maxDuration=Math.max(c.animationDuration*c.animationIterationCount,c.transitionDuration);return c}var x=U(e),R=0,J=[];return function(a,c){function d(){l()}function v(){l(!0)}function l(b){if(!(R||
G&&N)){R=!0;N=!1;g.$$skipPreparationClasses||e.removeClass(a,fa);e.removeClass(a,da);ta(h,!1);qa(h,!1);r(A,function(a){h.style[a[0]]=""});x(a,g);ga(a,g);Object.keys(J).length&&r(J,function(a,b){a?h.style.setProperty(b,a):h.style.removeProperty(b)});if(g.onDone)g.onDone();ea&&ea.length&&a.off(ea.join(" "),y);var c=a.data("$$animateCss");c&&(z.cancel(c[0].timer),a.removeData("$$animateCss"));C&&C.complete(!b)}}function K(a){n.blockTransition&&qa(h,a);n.blockKeyframeAnimation&&ta(h,!!a)}function M(){C=
new f({end:d,cancel:v});sa(Q);l();return{$$willAnimate:!1,start:function(){return C},end:d}}function y(a){a.stopPropagation();var b=a.originalEvent||a;a=b.$manualTimeStamp||Date.now();b=parseFloat(b.elapsedTime.toFixed(3));Math.max(a-V,0)>=S&&b>=m&&(G=!0,l())}function H(){function b(){if(!R){K(!1);r(A,function(a){h.style[a[0]]=a[1]});x(a,g);e.addClass(a,da);if(n.recalculateTimingStyles){na=h.className+" "+fa;ja=q(h,na);E=w(h,na,ja);$=E.maxDelay;ha=Math.max($,0);m=E.maxDuration;if(0===m){l();return}n.hasTransitions=
0<E.transitionDuration;n.hasAnimations=0<E.animationDuration}n.applyAnimationDelay&&($="boolean"!==typeof g.delay&&ua(g.delay)?parseFloat(g.delay):$,ha=Math.max($,0),E.animationDelay=$,aa=[ra,$+"s"],A.push(aa),h.style[aa[0]]=aa[1]);S=1E3*ha;U=1E3*m;if(g.easing){var d,f=g.easing;n.hasTransitions&&(d=T+"TimingFunction",A.push([d,f]),h.style[d]=f);n.hasAnimations&&(d=Z+"TimingFunction",A.push([d,f]),h.style[d]=f)}E.transitionDuration&&ea.push(xa);E.animationDuration&&ea.push(ya);V=Date.now();var H=S+
1.5*U;d=V+H;var f=a.data("$$animateCss")||[],s=!0;if(f.length){var p=f[0];(s=d>p.expectedEndTime)?z.cancel(p.timer):f.push(l)}s&&(H=z(c,H,!1),f[0]={timer:H,expectedEndTime:d},f.push(l),a.data("$$animateCss",f));if(ea.length)a.on(ea.join(" "),y);g.to&&(g.cleanupStyles&&Ia(J,h,Object.keys(g.to)),Da(a,g))}}function c(){var b=a.data("$$animateCss");if(b){for(var d=1;d<b.length;d++)b[d]();a.removeData("$$animateCss")}}if(!R)if(h.parentNode){var d=function(a){if(G)N&&a&&(N=!1,l());else if(N=!a,E.animationDuration)if(a=
ta(h,N),N)A.push(a);else{var b=A,c=b.indexOf(a);0<=a&&b.splice(c,1)}},f=0<ca&&(E.transitionDuration&&0===W.transitionDuration||E.animationDuration&&0===W.animationDuration)&&Math.max(W.animationDelay,W.transitionDelay);f?z(b,Math.floor(f*ca*1E3),!1):b();P.resume=function(){d(!0)};P.pause=function(){d(!1)}}else l()}var g=c||{};g.$$prepared||(g=pa(Ja(g)));var J={},h=D(a);if(!h||!h.parentNode||!I.enabled())return M();var A=[],B=a.attr("class"),F=Na(g),R,N,G,C,P,ha,S,m,U,V,ea=[];if(0===g.duration||!s.animations&&
!s.transitions)return M();var ka=g.event&&ba(g.event)?g.event.join(" "):g.event,Y="",t="";ka&&g.structural?Y=X(ka,"ng-",!0):ka&&(Y=ka);g.addClass&&(t+=X(g.addClass,"-add"));g.removeClass&&(t.length&&(t+=" "),t+=X(g.removeClass,"-remove"));g.applyClassesEarly&&t.length&&x(a,g);var fa=[Y,t].join(" ").trim(),na=B+" "+fa,da=X(fa,"-active"),B=F.to&&0<Object.keys(F.to).length;if(!(0<(g.keyframeStyle||"").length||B||fa))return M();var ja,W;0<g.stagger?(F=parseFloat(g.stagger),W={transitionDelay:F,animationDelay:F,
transitionDuration:0,animationDuration:0}):(ja=q(h,na),W=u(h,fa,ja,Va));g.$$skipPreparationClasses||e.addClass(a,fa);g.transitionStyle&&(F=[T,g.transitionStyle],la(h,F),A.push(F));0<=g.duration&&(F=0<h.style[T].length,F=Ga(g.duration,F),la(h,F),A.push(F));g.keyframeStyle&&(F=[Z,g.keyframeStyle],la(h,F),A.push(F));var ca=W?0<=g.staggerIndex?g.staggerIndex:b.count(ja):0;(ka=0===ca)&&!g.skipBlocking&&qa(h,9999);var E=w(h,na,ja),$=E.maxDelay;ha=Math.max($,0);m=E.maxDuration;var n={};n.hasTransitions=
0<E.transitionDuration;n.hasAnimations=0<E.animationDuration;n.hasTransitionAll=n.hasTransitions&&"all"==E.transitionProperty;n.applyTransitionDuration=B&&(n.hasTransitions&&!n.hasTransitionAll||n.hasAnimations&&!n.hasTransitions);n.applyAnimationDuration=g.duration&&n.hasAnimations;n.applyTransitionDelay=ua(g.delay)&&(n.applyTransitionDuration||n.hasTransitions);n.applyAnimationDelay=ua(g.delay)&&n.hasAnimations;n.recalculateTimingStyles=0<t.length;if(n.applyTransitionDuration||n.applyAnimationDuration)m=
g.duration?parseFloat(g.duration):m,n.applyTransitionDuration&&(n.hasTransitions=!0,E.transitionDuration=m,F=0<h.style[T+"Property"].length,A.push(Ga(m,F))),n.applyAnimationDuration&&(n.hasAnimations=!0,E.animationDuration=m,A.push([za,m+"s"]));if(0===m&&!n.recalculateTimingStyles)return M();if(null!=g.delay){var aa;"boolean"!==typeof g.delay&&(aa=parseFloat(g.delay),ha=Math.max(aa,0));n.applyTransitionDelay&&A.push([ma,aa+"s"]);n.applyAnimationDelay&&A.push([ra,aa+"s"])}null==g.duration&&0<E.transitionDuration&&
(n.recalculateTimingStyles=n.recalculateTimingStyles||ka);S=1E3*ha;U=1E3*m;g.skipBlocking||(n.blockTransition=0<E.transitionDuration,n.blockKeyframeAnimation=0<E.animationDuration&&0<W.animationDelay&&0===W.animationDuration);g.from&&(g.cleanupStyles&&Ia(J,h,Object.keys(g.from)),Ca(a,g));n.blockTransition||n.blockKeyframeAnimation?K(m):g.skipBlocking||qa(h,!1);return{$$willAnimate:!0,end:d,start:function(){if(!R)return P={end:d,cancel:v,resume:null,pause:null},C=new f(P),sa(H),C}}}}]}]).provider("$$animateCssDriver",
["$$animationProvider",function(a){a.drivers.push("$$animateCssDriver");this.$get=["$animateCss","$rootScope","$$AnimateRunner","$rootElement","$sniffer","$$jqLite","$document",function(a,c,d,e,f,z,B){function s(a){return a.replace(/\bng-\S+\b/g,"")}function v(a,b){P(a)&&(a=a.split(" "));P(b)&&(b=b.split(" "));return a.filter(function(a){return-1===b.indexOf(a)}).join(" ")}function I(c,e,f){function k(a){var b={},c=D(a).getBoundingClientRect();r(["width","height","top","left"],function(a){var d=c[a];
switch(a){case "top":d+=C.scrollTop;break;case "left":d+=C.scrollLeft}b[a]=Math.floor(d)+"px"});return b}function p(){var c=s(f.attr("class")||""),d=v(c,l),c=v(l,c),d=a(z,{to:k(f),addClass:"ng-anchor-in "+d,removeClass:"ng-anchor-out "+c,delay:!0});return d.$$willAnimate?d:null}function B(){z.remove();e.removeClass("ng-animate-shim");f.removeClass("ng-animate-shim")}var z=G(D(e).cloneNode(!0)),l=s(z.attr("class")||"");e.addClass("ng-animate-shim");f.addClass("ng-animate-shim");z.addClass("ng-anchor");
w.append(z);var K;c=function(){var c=a(z,{addClass:"ng-anchor-out",delay:!0,from:k(e)});return c.$$willAnimate?c:null}();if(!c&&(K=p(),!K))return B();var M=c||K;return{start:function(){function a(){c&&c.end()}var b,c=M.start();c.done(function(){c=null;if(!K&&(K=p()))return c=K.start(),c.done(function(){c=null;B();b.complete()}),c;B();b.complete()});return b=new d({end:a,cancel:a})}}}function q(a,b,c,e){var f=u(a,Q),s=u(b,Q),z=[];r(e,function(a){(a=I(c,a.out,a["in"]))&&z.push(a)});if(f||s||0!==z.length)return{start:function(){function a(){r(b,
function(a){a.end()})}var b=[];f&&b.push(f.start());s&&b.push(s.start());r(z,function(a){b.push(a.start())});var c=new d({end:a,cancel:a});d.all(b,function(a){c.complete(a)});return c}}}function u(c){var d=c.element,e=c.options||{};c.structural&&(e.event=c.event,e.structural=!0,e.applyClassesEarly=!0,"leave"===c.event&&(e.onDone=e.domOperation));e.preparationClasses&&(e.event=Y(e.event,e.preparationClasses));c=a(d,e);return c.$$willAnimate?c:null}if(!f.animations&&!f.transitions)return Q;var C=B[0].body;
c=D(e);var w=G(c.parentNode&&11===c.parentNode.nodeType||C.contains(c)?c:C);U(z);return function(a){return a.from&&a.to?q(a.from,a.to,a.classes,a.anchors):u(a)}}]}]).provider("$$animateJs",["$animateProvider",function(a){this.$get=["$injector","$$AnimateRunner","$$jqLite",function(b,c,d){function e(c){c=ba(c)?c:c.split(" ");for(var d=[],e={},f=0;f<c.length;f++){var r=c[f],q=a.$$registeredAnimations[r];q&&!e[r]&&(d.push(b.get(q)),e[r]=!0)}return d}var f=U(d);return function(a,b,d,v){function q(){v.domOperation();
f(a,v)}function D(a,b,d,e,g){switch(d){case "animate":b=[b,e.from,e.to,g];break;case "setClass":b=[b,x,G,g];break;case "addClass":b=[b,x,g];break;case "removeClass":b=[b,G,g];break;default:b=[b,g]}b.push(e);if(a=a.apply(a,b))if(Ka(a.start)&&(a=a.start()),a instanceof c)a.done(g);else if(Ka(a))return a;return Q}function u(a,b,d,e,g){var f=[];r(e,function(e){var k=e[g];k&&f.push(function(){var e,g,f=!1,h=function(a){f||(f=!0,(g||Q)(a),e.complete(!a))};e=new c({end:function(){h()},cancel:function(){h(!0)}});
g=D(k,a,b,d,function(a){h(!1===a)});return e})});return f}function C(a,b,d,e,g){var f=u(a,b,d,e,g);if(0===f.length){var h,k;"beforeSetClass"===g?(h=u(a,"removeClass",d,e,"beforeRemoveClass"),k=u(a,"addClass",d,e,"beforeAddClass")):"setClass"===g&&(h=u(a,"removeClass",d,e,"removeClass"),k=u(a,"addClass",d,e,"addClass"));h&&(f=f.concat(h));k&&(f=f.concat(k))}if(0!==f.length)return function(a){var b=[];f.length&&r(f,function(a){b.push(a())});b.length?c.all(b,a):a();return function(a){r(b,function(b){a?
b.cancel():b.end()})}}}var w=!1;3===arguments.length&&va(d)&&(v=d,d=null);v=pa(v);d||(d=a.attr("class")||"",v.addClass&&(d+=" "+v.addClass),v.removeClass&&(d+=" "+v.removeClass));var x=v.addClass,G=v.removeClass,J=e(d),k,p;if(J.length){var L,O;"leave"==b?(O="leave",L="afterLeave"):(O="before"+b.charAt(0).toUpperCase()+b.substr(1),L=b);"enter"!==b&&"move"!==b&&(k=C(a,b,v,J,O));p=C(a,b,v,J,L)}if(k||p){var l;return{$$willAnimate:!0,end:function(){l?l.end():(w=!0,q(),ga(a,v),l=new c,l.complete(!0));return l},
start:function(){function b(c){w=!0;q();ga(a,v);l.complete(c)}if(l)return l;l=new c;var d,e=[];k&&e.push(function(a){d=k(a)});e.length?e.push(function(a){q();a(!0)}):q();p&&e.push(function(a){d=p(a)});l.setHost({end:function(){w||((d||Q)(void 0),b(void 0))},cancel:function(){w||((d||Q)(!0),b(!0))}});c.chain(e,b);return l}}}}}]}]).provider("$$animateJsDriver",["$$animationProvider",function(a){a.drivers.push("$$animateJsDriver");this.$get=["$$animateJs","$$AnimateRunner",function(a,c){function d(c){return a(c.element,
c.event,c.classes,c.options)}return function(a){if(a.from&&a.to){var b=d(a.from),q=d(a.to);if(b||q)return{start:function(){function a(){return function(){r(d,function(a){a.end()})}}var d=[];b&&d.push(b.start());q&&d.push(q.start());c.all(d,function(a){e.complete(a)});var e=new c({end:a(),cancel:a()});return e}}}else return d(a)}}]}])})(window,window.angular);
//# sourceMappingURL=angular-animate.min.js.map
/*
 AngularJS v1.5.5
 (c) 2010-2016 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(n,e){'use strict';function B(a){var c=[];w(c,e.noop).chars(a);return c.join("")}function h(a,c){var b={},d=a.split(","),l;for(l=0;l<d.length;l++)b[c?e.lowercase(d[l]):d[l]]=!0;return b}function C(a,c){null===a||void 0===a?a="":"string"!==typeof a&&(a=""+a);g.innerHTML=a;var b=5;do{if(0===b)throw x("uinput");b--;n.document.documentMode&&t(g);a=g.innerHTML;g.innerHTML=a}while(a!==g.innerHTML);for(b=g.firstChild;b;){switch(b.nodeType){case 1:c.start(b.nodeName.toLowerCase(),D(b.attributes));
break;case 3:c.chars(b.textContent)}var d;if(!(d=b.firstChild)&&(1==b.nodeType&&c.end(b.nodeName.toLowerCase()),d=b.nextSibling,!d))for(;null==d;){b=b.parentNode;if(b===g)break;d=b.nextSibling;1==b.nodeType&&c.end(b.nodeName.toLowerCase())}b=d}for(;b=g.firstChild;)g.removeChild(b)}function D(a){for(var c={},b=0,d=a.length;b<d;b++){var l=a[b];c[l.name]=l.value}return c}function y(a){return a.replace(/&/g,"&amp;").replace(E,function(a){var b=a.charCodeAt(0);a=a.charCodeAt(1);return"&#"+(1024*(b-55296)+
(a-56320)+65536)+";"}).replace(F,function(a){return"&#"+a.charCodeAt(0)+";"}).replace(/</g,"&lt;").replace(/>/g,"&gt;")}function w(a,c){var b=!1,d=e.bind(a,a.push);return{start:function(a,f){a=e.lowercase(a);!b&&G[a]&&(b=a);b||!0!==u[a]||(d("<"),d(a),e.forEach(f,function(b,f){var g=e.lowercase(f),h="img"===a&&"src"===g||"background"===g;!0!==H[g]||!0===z[g]&&!c(b,h)||(d(" "),d(f),d('="'),d(y(b)),d('"'))}),d(">"))},end:function(a){a=e.lowercase(a);b||!0!==u[a]||!0===A[a]||(d("</"),d(a),d(">"));a==
b&&(b=!1)},chars:function(a){b||d(y(a))}}}function t(a){if(a.nodeType===n.Node.ELEMENT_NODE)for(var c=a.attributes,b=0,d=c.length;b<d;b++){var e=c[b],f=e.name.toLowerCase();if("xmlns:ns1"===f||0===f.indexOf("ns1:"))a.removeAttributeNode(e),b--,d--}(c=a.firstChild)&&t(c);(c=a.nextSibling)&&t(c)}var x=e.$$minErr("$sanitize"),E=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,F=/([^\#-~ |!])/g,A=h("area,br,col,hr,img,wbr"),q=h("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),k=h("rp,rt"),v=e.extend({},k,q),q=e.extend({},
q,h("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,section,table,ul")),k=e.extend({},k,h("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var")),I=h("circle,defs,desc,ellipse,font-face,font-face-name,font-face-src,g,glyph,hkern,image,linearGradient,line,marker,metadata,missing-glyph,mpath,path,polygon,polyline,radialGradient,rect,stop,svg,switch,text,title,tspan"),
G=h("script,style"),u=e.extend({},A,q,k,v),z=h("background,cite,href,longdesc,src,xlink:href"),v=h("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,tabindex,target,title,type,valign,value,vspace,width"),k=h("accent-height,accumulate,additive,alphabetic,arabic-form,ascent,baseProfile,bbox,begin,by,calcMode,cap-height,class,color,color-rendering,content,cx,cy,d,dx,dy,descent,display,dur,end,fill,fill-rule,font-family,font-size,font-stretch,font-style,font-variant,font-weight,from,fx,fy,g1,g2,glyph-name,gradientUnits,hanging,height,horiz-adv-x,horiz-origin-x,ideographic,k,keyPoints,keySplines,keyTimes,lang,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mathematical,max,min,offset,opacity,orient,origin,overline-position,overline-thickness,panose-1,path,pathLength,points,preserveAspectRatio,r,refX,refY,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,rotate,rx,ry,slope,stemh,stemv,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,systemLanguage,target,text-anchor,to,transform,type,u1,u2,underline-position,underline-thickness,unicode,unicode-range,units-per-em,values,version,viewBox,visibility,width,widths,x,x-height,x1,x2,xlink:actuate,xlink:arcrole,xlink:role,xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,xmlns,xmlns:xlink,y,y1,y2,zoomAndPan",
!0),H=e.extend({},z,k,v),g;(function(a){if(a.document&&a.document.implementation)a=a.document.implementation.createHTMLDocument("inert");else throw x("noinert");var c=(a.documentElement||a.getDocumentElement()).getElementsByTagName("body");1===c.length?g=c[0]:(c=a.createElement("html"),g=a.createElement("body"),c.appendChild(g),a.appendChild(c))})(n);e.module("ngSanitize",[]).provider("$sanitize",function(){var a=!1;this.$get=["$$sanitizeUri",function(c){a&&e.extend(u,I);return function(a){var d=
[];C(a,w(d,function(a,b){return!/^unsafe:/.test(c(a,b))}));return d.join("")}}];this.enableSvg=function(c){return e.isDefined(c)?(a=c,this):a}});e.module("ngSanitize").filter("linky",["$sanitize",function(a){var c=/((ftp|https?):\/\/|(www\.)|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>"\u201d\u2019]/i,b=/^mailto:/i,d=e.$$minErr("linky"),g=e.isString;return function(f,h,m){function k(a){a&&p.push(B(a))}function q(a,b){var c;p.push("<a ");e.isFunction(m)&&(m=m(a));if(e.isObject(m))for(c in m)p.push(c+
'="'+m[c]+'" ');else m={};!e.isDefined(h)||"target"in m||p.push('target="',h,'" ');p.push('href="',a.replace(/"/g,"&quot;"),'">');k(b);p.push("</a>")}if(null==f||""===f)return f;if(!g(f))throw d("notstring",f);for(var r=f,p=[],s,n;f=r.match(c);)s=f[0],f[2]||f[4]||(s=(f[3]?"http://":"mailto:")+s),n=f.index,k(r.substr(0,n)),q(s,f[0].replace(b,"")),r=r.substring(n+f[0].length);k(r);return a(p.join(""))}}])})(window,window.angular);
//# sourceMappingURL=angular-sanitize.min.js.map
// save a reference to the core implementation
var indexOfValue = _.indexOf;

// using .mixin allows both wrapped and unwrapped calls:
// _(array).indexOf(...) and _.indexOf(array, ...)
_.mixin({

    // return the index of the first array element passing a test
    indexOf: function(array, test) {
        // delegate to standard indexOf if the test isn't a function
        if (!_.isFunction(test)) return indexOfValue(array, test);
        // otherwise, look for the index
        for (var x = 0; x < array.length; x++) {
            if (test(array[x])) return x;
        }
        // not found, return fail value
        return -1;
    }

});
(function() {
	'use strict';
	angular.module('payment', [])
	    .controller('npgCtrl',[ '$scope','$sce', '$parse', function($scope, $sce, $parse) {
            
            $scope.paymentForm = npgForm || {};
           

            $scope.trustSrc = function(src) {
                
                return $sce.trustAsResourceUrl(src);
            };
            
        }])
		.controller('paymentCtrl',[ '$scope', function($scope) {
			
			$scope.iframedisplay = false;
			$scope.submitDisabled= true;
			$scope.submitPayhost = function() {
			
				$scope.submitDisabled= true;
				return true;
			}
			$(window).load(function() {
				if($('#securePaymentWindow').length) {
					$('#securePaymentWindow').modal('show');
				}
			});
            
		}])
		.controller('momoCtrl',[ '$scope', '$http' , function($scope, $http) {
			
			$scope.displayVerification = false;
			$scope.displayVerificationErrorMsg = '';
			$scope.restUrl = SaaS.restlocation.split('/en/');

            $scope.sendVerificationCode= function(opt1, opt2){

				
            	$scope.restUrl = SaaS.restlocation.split('/en/');
				var options = {};

                options.token = opt1;
                options.header = opt2;
                var opts = angular.extend({
                    token: '',
                    header: ''
                }, options);
               
                var headers = {};
                headers[opts.header] = opts.token;
               	
                var mobileNumber = $("#moMobileNumber").intlTelInput("getNumber").split('+')[1];
             
                $scope.restUrl = SaaS.restlocation.split('/en/');
               	$http({
                    url: $scope.restUrl[0] + 'rest/momo/verificationcode/' + mobileNumber,
                    method: "GET",
                    data: {},
                    headers: headers
                    
                })
                .then(function(response) {
                        $scope.displayVerificationErrorMsg = false;
                        $scope.displayVerification = true;
                    },
                    function(response) { // optional
                        
                        $scope.displayVerificationErrorMsg = false;
                        $scope.displayVerification = true;
                    }
                );
            }


            $scope.requestPayment= function(opt1, opt2){

				
            	$scope.restUrl = SaaS.restlocation.split('/en/');
				var options = {};

                options.token = opt1;
                options.header = opt2;
                var opts = angular.extend({
                    token: '',
                    header: ''
                }, options);
               
                var headers = {};
                headers[opts.header] = opts.token;
               	
                var verificationcode = $("#verificationCode").val();
                console.log(verificationcode , headers);
                $scope.restUrl = SaaS.restlocation.split('/en/');
                console.log($scope.restUrl[0]);
               	$http({
                    url: $scope.restUrl[0] + 'rest/momo/verify/' + verificationcode,
                    method: "POST",
                    data: {},
                    headers: headers
                    
                })
                .then(function(response) {
                	
                	
		                if(response.status == 201)	{

		                 	$scope.displayVerification = true;
		                }
		                else {
		                 	$scope.displayVerificationErrorMsg = response.statusText;
		                    //$scope.displayVerification = false;
		                }


                    },
                    function(response) { // optional

	                    $scope.displayVerificationErrorMsg = response.statusText;
	                    $scope.displayVerification = false;
                    }
                );
            }

		}]);
//return loaded


})();angular.module('filters', []).filter('cardtype', function() {
  return function(input) {
  	var type ='000';
  	
	if (/^4[0-9]{6,}$/.test(input)) {
		type="001";
	}else {
		if(/^5[0-9]{5,}$/.test(input)){
	       	type="002";
	    }else{
	    	if(/^3[47][0-9]{5,}$/.test(input)){
		       	type="003";
		    }else{
		    	if(/^3(?:0[0-5]|[68][0-9])[0-9]{4,}$/.test(input)){
			       	type="005";
			    }else{
			    	if(/^6(?:011|5[0-9]{2})[0-9]{3,}$/.test(input)){
				       	type="004";	    	
				    }else{
				    	if(/^(?:2131|1800|35[0-9]{3})[0-9]{3,}$/.test(input)){
					       	type="007";	    	
					    }
				    }	
			    }
		    }
	    }
	}

	
	
    return type;
  };
});(function() {
  'use strict';
  angular.module('marketplace', [])
    .factory('SmoothScroll', function() {
      return {
        animation: 0,
        to: function(p) {
          var c = 0,
            t = 0,
            b = 0,
            f = 0,
            d = 60 * (280 / 1000),
            _easeIn = function(t, b, c, d) {
              return -c * (t /= d) * (t - 2) + b;
            },
            
            _getScrollTop = function _getScrollTop() {
              console.log("1");
              if (typeof pageYOffset != 'undefined') {
                return pageYOffset;
              } else {
                var B = document.body,
                  D = document.documentElement;
                D = (D.clientHeight) ? D : B;
                return D.scrollTop;
              }
            },

            _getTopPadding = function _getTopPadding() {
              console.log("2");
              if (window.innerWidth < 415) {
                return 60;
              } else if (window.innerWidth < 569) {
                return 35;
              } else {
                return 0;
              }
            },
            _animate = function() {
              console.log(this);
              b = t;
              c = f - b;
              t = _easeIn(1, b, c, d);
              this.animation = window.requestAnimationFrame(_animate);
              document.body.scrollTop = t;
              document.documentElement.scrollTop = t;
              if (Math.abs(f - b) < 0.25) {
                window.cancelAnimationFrame(this.animation);
                document.body.scrollTop = Math.round(t);
                document.documentElement.scrollTop = Math.round(t);
              }
            };
          t = _getScrollTop();
          console.log(t);
          f = p - _getTopPadding();
          console.log(f);
          _animate();
        }
      };
    })
    .controller('marketplaceCtrl',['SmoothScroll', '$scope', '$window',  '$rootScope', function(SmoothScroll, $scope, $window,  $rootScope) {
      
      $scope.mobileView = false; 
   
      $scope.currentItem = null;
      $scope.currentVideo = null;

      var categoryList = [];

      $scope.setCategorylist = function(id) {
        console.log("5");
          categoryList.push("#"+id);
          $scope.$emit('categoryList', categoryList);
      }

      $scope.spiedElements = {};

      var _getTopPadding = function _getTopPadding() {
        console.log("6");
        if (window.innerWidth < 321) {
          return 48;
        } else if (window.innerWidth < 569) {
          return 48;
        } else {
          return 50;
        }
      },
      getActiveElement = function getActiveElement() {
        console.log("7");
        var i, key;
        $scope.selectedElement = '';
        for (i = Object.keys($scope.spiedElements).length - 1; i >= 0; i -= 1) {
          key = Object.keys($scope.spiedElements)[i];
          if (($window.pageYOffset + _getTopPadding()) >= $scope.spiedElements[key]) {
            $scope.selectedElement = key;
            break;
          }
        };
        $scope.$broadcast('setSpyAnchor', $scope.selectedElement);
      };

      angular.element($window).bind("scroll", function() {
        console.log("8");
        $scope.$broadcast('getSpiedY');
      });

      $scope.$on('setSpiedY', function(event, elementoptions) {
        console.log("9");
        if ($scope.spiedElements[elementoptions.id] === undefined) {
          $scope.spiedElements[elementoptions.id] = {};
        }
        $scope.spiedElements[elementoptions.id] = elementoptions.y;
        getActiveElement();
      });

      if( navigator.userAgent.match(/Android/i)
          || navigator.userAgent.match(/webOS/i)
          || navigator.userAgent.match(/iPhone/i)
          || navigator.userAgent.match(/iPad/i)
          || navigator.userAgent.match(/iPod/i)
          || navigator.userAgent.match(/BlackBerry/i)
          || navigator.userAgent.match(/Windows Phone/i)
         ){

          $scope.mobileView = true;
        }
      $scope.setCurrentItem = function(item) {
        console.log(item);

        angular.forEach(document.querySelectorAll('video'), function(elem) {
          if (!elem.paused) {
            elem.pause();
          }
  
        });
        
        if($scope.currentItem == item) {
          $scope.currentItem = null;
        } 
        else {
          $scope.currentItem = item;
        }
        
      }

      $scope.setCurrentVideo = function(video) {
        console.log(video);
        $scope.currentVideo = video;
        var videoElement = document.getElementById('video' + video);
        console.log(videoElement);
      }

      //This controls when the category bar moves
      var _getTopPadding = function _getTopPadding() {
        console.log("10");
        if (window.innerWidth < 415) {
          return 822;
        } else if (window.innerWidth < 569) {
          return 68;
        } else {
          return 787;
        }
      };


      $rootScope.$on('categoryList', function(event,data) { 
        console.log("11");
        $rootScope.$broadcast('categoryListDown', data);
      });

      $scope.$on('categoryListDown', function(event,data) { 
        console.log("12");
        categoryList = data;
      });

      function getTopPadding() {
        console.log("13");
        if (window.innerWidth < 321) {
          return 95;
        } else if (window.innerWidth < 769) {
          return 96;
        } else {
          return 50;
        }
      };
      
      var topPadding = getTopPadding();

      angular.element($window).bind("scroll", function() {

        if (this.pageYOffset >= _getTopPadding()) {
            $scope.headerPositionClassChange = true;
            $scope.$apply();
          } else {
            $scope.headerPositionClassChange = false;
            $scope.$apply();
          }

          
        if (document.querySelector(categoryList[0]) != null) {
          
          var offsetTop = [];
          for (var i = 0; i < categoryList.length; i++) {

             if (  i != categoryList.length-1 ) {
               if ( this.pageYOffset > document.querySelector(categoryList[i]).offsetTop-topPadding-2 && this.pageYOffset < document.querySelector(categoryList[i+1]).offsetTop ){
                $scope.selectedIndex = i;
                console.log("in "+i);
               }
             };

             if ( i == categoryList.length-1 ) {
               if ( this.pageYOffset > document.querySelector(categoryList[i]).offsetTop-topPadding-2 ){
                $scope.selectedIndex = i;
                console.log("in last"+i);
               }
             };

             if ( this.pageYOffset < document.querySelector(categoryList[0]).offsetTop-topPadding-2 ){
                $scope.selectedIndex = null;
                console.log("in first "+null);
               }

             $scope.$apply();

          };
          
        }
      });

      $scope.scrollTo = function scrollTo(pos, $index) {
        $scope.selectedIndex = $index;

        SmoothScroll.to((isNaN(pos)) ?
          (document.querySelector(pos) === null) ?
          0 : document.querySelector(pos).offsetTop : pos);
      };
      

     
    }]);
})();(function() {
	'use strict';
	angular.module('myprofile', [])
	
		.controller('myprofileCtrl',['$scope', '$timeout', '$http', function($scope, $timeout, $http) {


			$('.pull-down').each(function() {
			    $(this).css('margin-top', $(this).parent().height()-$(this).height())
			});

			$scope.currentCountry = currentCountry;

			// @TODO find forms in this page and add them automatically
			$scope.postCodeShown = function(countryName) {
				return $scope.currentCountry == countryName;
			};

			$scope.forms = {
				'personalDetails' : {
				 	'enabled' : false
				},
				'verification' :  {
					'enabled' : false,
					'loading' : false,
					isLoading : function() {
						return this.loading;
					}
					
				},
				'securityDetails' : {
					'enabled' : false,
					'editingPassword' : false,
					isEditingPassword : function () {
						return this.editingPassword;
					}
				},
				'businessDetails' : {
					'enabled' : false
				},
				'marketingDetails' : {
					'enabled' : false
				}
			};
			

			$scope.changeCountry = function(model) {
				$scope.currentCountry = model;
			};

			$scope.editPassword = function() {
				$scope.forms['securityDetails'].editingPassword = true;
			};

			$scope.tokenTimeLeft = null;
			$scope.securityToken = false;

			$scope.getTokenTimeLeft = function() {
				return $scope.tokenTimeLeft;
			};

			$scope.getToken = function() {
				return $scope.securityToken;
			};

			$scope.securityTokenExists = function() {
				if($scope.tokenTimeLeft>0) return $scope.securityToken;
				return false;
			};

			$scope.enableForm = function(form) {
				// disable all form fields
				$("section.disableable").find("input, select, button, fieldset").not('[type=submit]').prop('disabled',true);

				// hide all submit buttons
				//$("section.disableable").find("input[type=submit], button").not('.dontHide').hide();
				
				// update local variables
				for (var k in $scope.forms){
				    if ($scope.forms.hasOwnProperty(k)) {
				         $scope.forms[k].enabled = false;
				    }
				}

				// switch current form on
				$scope.forms[form].enabled=true;
				// enable and switch on all its fields
				$('#'+form).find('input, select, button, fieldset').not('[type=submit]').not('#addressCountry,#dummyPassword').removeAttr('disabled');
				$('#'+form).find('input, select, button, fieldset').show();

				;

				if(form == 'verification') {
					if($scope.securityTokenExists()) $scope.enableForm('securityDetails');
					document.getElementById('verification.curpassword').value="";
				}
				else {
					document.getElementById('verification.curpassword').value="*********";
				}

			};

			$scope.isFormEnabled = function(form) {
				return $scope.forms[form].enabled;
			}
			
			
			$scope.countdown = function () {
				
				if($scope.getTokenTimeLeft()>0) {
					
					$scope.tokenTimeLeft--;
					$timeout(function(){$scope.countdown();},1000);
				}
				else {
					$scope.securityToken = false;
					return false;
				} 
			};


			$scope.wrongPassword = false;

			$scope.displayPasswordError =  function() {
				return $scope.wrongPassword;

			}


			$scope.confirmPassword = function(context,token,header) {

				var options = {};

				options.token = token;
                options.header = header;
                var opts = angular.extend({
                    token: '',
                    header: ''
                }, options);

                var headers = {};
                headers[opts.header] = opts.token;

                $scope.forms['verification'].loading = true;

				$http({
                    url: context+'/rest/my-profile/verifypassword/',
                    method: "POST",
                    data: document.getElementById('verification.curpassword').value
                    ,
                    headers: headers
                })
                .then(function(response) {
                		$scope.forms['verification'].loading = false;
                      	if(response.data.authenticated) {
	                      	document.getElementById('verification.curpassword').value = "";
							$scope.wrongPassword = false;
							$scope.securityToken = response.data.token;
							$scope.tokenTimeLeft = response.data.timeToLive;
							$scope.enableForm('securityDetails');
							$('.pull-down').each(function() {
							    $(this).css('margin-top', $(this).parent().height()-$(this).height())
							});
	                      	return true;
                      	}
                      	else {
                      		$scope.wrongPassword = true;
                      	}
                    },
                    function(response) { // optional

                      $scope.forms['verification'].loading = false;

                      
                      document.getElementById('verification.curpassword').value = "";
                       return false;
                    }
                );

				
				

				$timeout(function(){$scope.countdown();},1000);

				//alert("password confirmed");
			};



		}]);

//return loaded


})();(function() {
	'use strict';
	angular.module('pricing', [])
	
		.controller('pricingTierCtrl',[ '$scope', '$rootScope', '$sce', '$http', '$window', '$timeout', function($scope, $rootScope, $sce, $http, $window, $timeout) {
			
			$scope.qty = 1;
			$scope.addOnStep = 1;
			$scope.cartSize;
			$scope.restUrl = SaaS.restlocation.split('/en/');
			$scope.totalProducts = 0;
          
			//Handles add to cart CTA + REST
			$scope.addToCart = function(kkIdVal, quantityVal, nameVal, price, opt1, opt2, priceFreq, addOneStepCode) {
				console.log(nameVal)
				$scope.calcProducts();
				var prodUrl = $scope.getProductUrl();
				var totalProducts = $scope.totalProducts;
				var imageSrc = $scope.getImageSrc();
				var productPrice = price * quantityVal;
				console.log(addOneStepCode);
				$scope.addedItem = {
					"0" : {
				    	"kkId": kkIdVal,
				    	"quantity": quantityVal,
				    	"name": nameVal,
				    	"addOn": false,
				    	"addOnStep": 10,
				    	"addOneStepCode": addOneStepCode,
				    	"unitPrice": productPrice,
				    	"path": prodUrl,
				    	"priceFrequency": priceFreq,
				    	"imageSource": imageSrc
				    }
				};
				//Convert object to string
				var cartDataStr = JSON.stringify($scope.addedItem);
				//Convert new index to string
				var newIndexStr = kkIdVal.toString();
				//Replace index with new index
				var cartDataStrUpdated = cartDataStr.replace("0", newIndexStr); 
				//Convert cart data back to an object
				var updatedCartDataObj = JSON.parse(cartDataStrUpdated);


				var options = {};
				options.token = opt1;
	            options.header = opt2;
	          	var opts = angular.extend({
	                        token: '',
	                        header: ''
	                    }, options);
				var headers = {};
	            headers[opts.header] = opts.token;

				$http({
					url: $scope.restUrl[0] + 'rest/managecart/items',
					method: "POST",
					data: updatedCartDataObj,
					headers: headers
				})
				.success(function (data, status, headers, config) {
					$rootScope.cartData = data;
					$scope.notificationAddToCart();
				})
				.error(function (data, status, headers, config) {
					console.log("Ajax failed - Add to cart");
				});
			}

			$scope.getSizeOfCart = function() {
				$scope.cartSize = Object.keys($scope.cartData).length;
			}

			$scope.getProductUrl = function(){
				var pageLink = $window.location.href.split("/");
				var relativeUrl = pageLink[pageLink.length-1];
				return relativeUrl;
			}
			$scope.calcProducts = function() {
				$scope.totalProducts = $window.document.getElementsByClassName("product").length;
			}
			$scope.getImageSrc = function() {
				return $('.intro-module img').attr('src');
			}
			$scope.notificationAddToCart = function() {
				$scope.cartNotification = true;
				$timeout( function() {
					$scope.cartNotification = false;
				}, 1500 );
			}

			$scope.tierSet = [];
			$scope.tierKKName = '';
			$scope.tierKKId = 0;
			$scope.tierKKPrice = 0;

			$scope.selectTier = function() {
				
				$scope.tierKKId = $scope.tierDD;
				
				for (var i = $scope.tierSet.length - 1; i >= 0; i--) {
					
					if($scope.tierSet[i].tierId == $scope.tierDD) {
						console.log($scope.tierSet[i].tierName);
						$scope.tierKKName = $scope.tierSet[i].tierName;
						$scope.tierKKPrice = $scope.tierSet[i].tierPrice;
					}
				};
			
			}


			$scope.setTiers = function(tierOrder, tierName, tierId, tierPrice) {
				
				if(tierOrder == 0) {
					
					$scope.tierDD = tierId;
				}
				var obj = {	
					'tierId' : tierId,
					'tierName' : tierName,
					'tierPrice' : tierPrice
				}
				console.log(obj);
				$scope.tierSet.push(obj);
			}
			
		}]);

})();(function() {
	'use strict';
	angular.module('inviteusers', [])
		
		.controller('inviteUsersCtrl', ['$scope',
			function($scope) {
				$scope.newUserList = {
			        'users': json
			    };

			    $scope.addUser = function(array){
			    	
			        var newUser =
			        {
			            'firstname': '',
			            'lastname': '',
			            'email': '',
			            'role': ''
			        };

			        $scope.newUserList.users.push(newUser);
			    }

			    $scope.removeUser = function(id){
			        var user_to_remove = $scope.newUserList[id];
			        $scope.newUserList.users.splice(id, 1);
			    }

			    $scope.submitNewUserList = function(){
			        console.log('your list sir',$scope.newUserList);
			    }

			    $scope.TooltipDemoCtrl = function ($scope) {
			      $scope.dynamicTooltip = 'about role';
			    }

			    $scope.setUserRole = function(roleId, index) {
			    	console.log(roleId, index);
			    	$scope['role0'] = roleId;
			    }

			}
		]);
})();(function() {
	'use strict';
	angular.module('manageapps', [])
		
		.controller('manageProductCtrl', ['$scope', 'postService', '$http', function ($scope, postService, $http) {

				//commented out for until Michal enables the task on build
				//$http.get(SaaS.location + '/docroot/assets/js/json_' + locale + '.properties').success(function(data) {
					//$scope.i18nMessages = data;
				//});
				$scope.deleteConfirme=false;
				$scope.initValue = function (id, identifier, value){
		            
				    $scope.deleteConfirme=false;
					
					if($scope[id]){

						$scope[identifier + id ] = value;

					}else{

						$scope[identifier + id] = value;
					}

				}

		        $scope.updatelicence = function (item) {
		            
		            $scope[item] = true;
		        }

		        $scope.updatelicenceNext = function (item) {
		          
		            $scope[item] = false;
		        }

				$scope.deleteSubscription = function(productId, url){

					var ajaxURL = url +  '/' + productId;

					var data = {};
		            data.productId = productId;
		            data.origin = "Remove Subscription";

					var callback = $scope.deleteSubscriptionCallback;

		            $scope.makeAjaxCall(ajaxURL, data, callback);
				}

				$scope.unassignUser = function (userId, value, url, modelId){
		            
		            var ajaxURL = url + userId + '/' + value;

		            var data = {};
		            data.userId = userId;
		            data.value = value;
		            data.origin = "Unassign User";
		            data.modelId = modelId;

		            var callback = $scope.unassignUserCallback;
		            // console.log('pre scope: ', $scope);
		            $scope.makeAjaxCall(ajaxURL, data, callback);

		        }

		        $scope.ViewLicences_unassignUser = function (userId, modelId, url, parentId, reassign){
		            
		            var ajaxURL = url + userId + '/' + modelId;

		            // var classid = 'userRow_'+userId;


		            // alert(classid);

		            var data = {};
		            data.userId = userId;
		         
		            $scope.removeUser=false;




		            data.value = modelId;
		            data.origin = "Unassign User";
		            data.modelId = modelId;
		            data.reassignable = reassign;
		            data.parentId = parentId;

		            var callback = $scope.unassignUserCallback;
		            // console.log('pre scope: ', $scope);
		           // $scope.makeAjaxCall(ajaxURL, data, callback);

		        }

		        $scope.deleteSubscriptionCallback = function(response){

					var currentProductId = response.postData.productId;

					$scope['cancelledComplete' + currentProductId] = true;

		        }

		        $scope.unassignUserCallback = function(response){
		            console.log(response.postData)
					var prodId = response.postData.value;
		            var userId = response.postData.userId;         
					$scope['assigned'+prodId] = $scope['assigned' + prodId] - 1;          
					$scope['available' + prodId] = $scope['available' + prodId] + 1;
		            $scope['checkbox' + prodId + userId] = true;

		        }
 
				$scope.makeAjaxCall = function(ajaxURL, data, callbackFn){
					// console.log('making call', $scope);
		            var options = {};

		            // Options can include _csrf.token & headerName
		            options.token = $scope.serverToken;
		            options.header = $scope.serverHeader;

		            postService.postData(ajaxURL, data, options).then(function (response) {

		                if (response.data.success) {
		                    
		                   // alert(response.data.success);
		                    $scope.ajaxErrorHeader = '';
		                    if(callbackFn){
		                        callbackFn(response);
		                    }

		                }
		                else {
		                    $scope.ajaxErrorHeader = data.origin;
		                    $scope.ajaxErrorMessage = response.data.error;
		                    
		                    //console.log('Error: ', response.data.error);
		                }

		            });

		        }

			}
		]);
})();(function() {
	'use strict';
	angular.module('manageusers', [])
		
		.controller('manageUsersCtrl', ['$scope', 'postService', '$http',
			function($scope, postService, $http) {

				//  Define list of results
		        $scope.results = json;

		        // Define current visible result
		        $scope.currentResults = $scope.results;
		        // Init current tab to null
		        $scope.currentTab = "";
		        // Init tabArray to empty object
		        $scope.currentTabArray = [];
		        // Init error header to empty
		        $scope.ajaxErrorHeader = "";

		        $scope.confirmBgClass = '';


		        //commented out for until Michal enables the task on build
		       // $http.get(SaaS.location + '/docroot/assets/js/json_' + locale + '.properties').success(function(data) {
		        	//$scope.i18nMessages = data;
		        //});
				
				$scope.i18nMessages = {
					"i18n.status.CREATED" : "Created",
					"i18n.status.ACTIVATED" : "Activated",
					"i18n.status.DELETED" : "Deleted",
					"i18n.status.SUSPENDED" : "Suspended",
					"i18n.status.PROVISIONING" : "Provisioning",
					"i18n.status.LOCKED" : "Locked",
					"i18n.status.INVITED" : "INVITED",
					"i18n.usergroup.master_users" : "Account Holder",
					"i18n.usergroup.managers_with_purchase_authority" : "Purchasing Manager",
					"i18n.usergroup.managers" : "Manager",
					"i18n.usergroup.users" : "Employee"
				};

		        $scope.setUserStatusDisplay = function (userId, userStatus) {

		            $scope['userStatusModel'+userId] = userStatus;
		            
		        }
		        $scope.getUserStatusDisplay = function (userId) {

		            var status = $scope['userStatusModel'+userId];
		            
		            if (typeof $scope.i18nMessages === 'undefined') {
		            	return status;
		            }
		        	return $scope.i18nMessages[status];
		        }
		        
		        $scope.setUserGroupDisplay = function (userId, allUserRole, userGroupId) {
		        	  
		            angular.forEach(allUserRole, function(listObj, index){
	            	    // Once found remove from scope                    
	                    if(listObj.id == userGroupId){
	                        $scope['userRoleModel'+userId] = listObj.displayName;
	                    }
		            });
		        }
		        
		        $scope.getUserGroupDisplay = function (userId) {
		            var group = $scope['userRoleModel'+userId];
		            if (typeof $scope.i18nMessages === 'undefined') {
		            	return status;
		            }                                                                  
		            return $scope.i18nMessages[group];
		        }

		        $scope.updateMe = function (item) {
		                  
		            $scope[item] = true;
		        }
		        $scope.processTab = function(array){
		            //check if tab being clicked for a second time (to turn off)
		            if($scope.currentTabArray[0] === array[0]){
		                //reset
		                $scope.currentTabArray = [];
		            }else{
		                //set to clicked tab array
		                $scope.currentTabArray = array;
		            }
		        }

		        //var dataUrls = $($event.currentTarget).parents('form').attr('data-ajax-urls');

		        $scope.changeUserGroup = function (userId, value, url){
		            $scope.roleIsLoading = true;
		            //Set ajax URL from options sent through
		            var ajaxURL = url + userId + '/' + value;
		            // Create data object so that postData in return object is ready to use in callbacks
		            var data = {};
		            data.userId = userId;
		            data.value = value;
		            data.origin = "Change Group";
		            var callback = $scope.changeUserGroupCallback;
		            // Make the Ajax call
		            $scope.makeAjaxCall(ajaxURL, data, callback);
		        }

		        $scope.changeUserGroupCallback = function (response) {
		            
		            $scope.roleIsLoading = false;     
		            $scope['userRoleModel'+response.postData.userId] = response.data.displayName;
		            $scope['editrole'+response.postData.userId] = false;
		        }

		        $scope.changeUserStatus = function (userId, value, url){
		            $scope.statusIsLoading = true;
		            var ajaxURL = url + userId + '/' + value;
		            // Create data object so that postData in return object is ready to use in callbacks
		            var data = {};
		            data.userId = userId;
		            data.value = value;
		            data.origin = "Change Status";
		            var callback = $scope.changeUserStatusCallback;
		            // Make the Ajax call
		            $scope.makeAjaxCall(ajaxURL, data, callback);

		        }
		        $scope.changeUserStatusCallback = function(response){
		            $scope.statusIsLoading = false;
		            $scope['userStatusModel'+response.postData.userId] = response.data.displayName;
		            $scope['editstatus'+response.postData.userId] = false;
		        }

		        $scope.unsubscribeProduct = function (userId, value, url){
		            $scope['removingLicence'+ userId + value] = true;
		            var ajaxURL = url + userId + '/' + value;
		            // Create data object so that postData in return object is ready to use in callbacks
		            var data = {};
		            data.userId = userId;
		            data.value = value;
		            data.origin = "Unsubscribe Product";

		            // Set a function to run on a custom callback
		            var callback = $scope.unsubscribeProductCallback;

		            // Make the Ajax call
		            $scope.makeAjaxCall(ajaxURL, data, callback);

		        }
		        $scope.confirmRemoveUser = function(item){
		         
		            $scope[item] = true;
		        }

		        $scope.cancelRemoveUser = function(item){
		           
		            $scope[item] = false;
		        }
		        $scope.removeUser = function (event, userId) {

		            // Handle 'remove User' button
		            
		            var data = {};
		            data.userId = userId;
		            data.origin = "Remove User";

		            // // save local copy
		            // var _scope = $scope;

		            var ajaxURL = $(event.currentTarget).attr('data-path');

		            var callback = $scope.removeUserCallback;

		            $scope.makeAjaxCall(ajaxURL, data, callback);

		        }

		        $scope.unsubscribeProductCallback = function(response , identifier){
		            
		            // Hunt to find the original product clicked
		            angular.forEach($scope.results.users, function(userObject, key){
		                
		                // Loop all users until response user is found
		                if(userObject.id == response.postData.userId){
		                    
		                    // Once found loop all products
		                    angular.forEach(userObject.products, function(product, key){

		                        // Once found remove from scope
		                        if(product.productId == response.postData.value){
		                            userObject.products.splice( $.inArray(product,userObject.products) ,1 );
		                        }
		                    });

		                }

		            });
		            
		        }

		        $scope.confirmRemoveUserLicence = function (identifier, userId , productId) {

		            $scope[identifier + userId + productId] = true;
		            
		        }

		        $scope.cancelRemoveUserLicence = function (identifier, userId , productId) {

		            $scope[identifier + userId + productId] = false;
		          
		        }

		        $scope.removeUserCallback = function(response){
		            // success so remove user

		            // Find the user in results, based on id
		            var newUsers = _.reject($scope.results.users, function(el) {
		                return el.id === response.postData.userId;
		            });

		            // remove user
		            $scope.results.users = newUsers;

		            $scope.currentTab = "";
		            $scope.currentTabArray = [];

		            // Remove from current users
		            newUsers = _.reject($scope.currentResults.users, function(el) {
		                return el.id === response.postData.userId;
		            });

		            // remove the user
		            $scope.currentResults.users = newUsers;
		        }

		        $scope.makeAjaxCall = function(ajaxURL, data, callbackFn){

		            var options = {};

		            // Options can include _csrf.token & headerName
		            options.token = $scope.serverToken;
		            options.header = $scope.serverHeader;

		            postService.postData(ajaxURL, data, options).then(function (response) {
		               
		                if (response.data.success) {
		                   
		                    // Reset error
		                    $scope.ajaxErrorHeader = '';

		                    // Check to see if there is a custom callback
		                    if(callbackFn){
		                        // Run custom callback
		                        callbackFn(response);
		                    }

		                }
		                else {
		                	
		                    // If there is an error set model vars to show in UI (if applicable)
		                    $scope.ajaxErrorHeader = data.origin;
		                    $scope.ajaxErrorMessage = response.data.error;
		                }

		            });

		        }


			}
		])
	.filter('userFilter', function() {
        //custom filter
      return function(users, searchText, currentTabArray) {
        //set up the regex to search against search term loosely
        var searchRegx = new RegExp(searchText, "i");
        //check if any search terms or tabs are selected
        if (searchText == undefined && currentTabArray == []) {
            //If not return whole user list
            return users;
        }
        //if search criteria, set up empty return object
        var result = [];
        var i = 0;
        //loop throug all users
        for(i = 0; i < users.length; i++) {
            //group first and last name
            var fullName = users[i].firstName + " " + users[i].lastName;
            //first check search term against email and name
            if (fullName.search(searchRegx) != -1 ||
                users[i].email.search(searchText) != -1) {
                //check if there is a tab selected
                if(currentTabArray.length){
                    //if so grab first letter of last name
                    var firstLetter = users[i].lastName.substring(0,1).toLowerCase();
                    //check if current last name first letter matches current array of allowed letters
                    if(currentTabArray.indexOf(firstLetter) > -1){
                        //if yes push into shown array
                        result.push(users[i]);
                    }
                }else{
                    //no tab selected add this to shown list
                    result.push(users[i]);
                }

            }
        }
        //return user list to be shown
        return result;
      }
    });
})();(function() {
	'use strict';
	angular.module('navigation', [])
		
		.controller('navigationCtrl', ['$scope', '$window', '$http', function($scope, $window, $http) {

			$scope.mobileViewDetect = window.innerWidth > 415? false : true;
			
			$scope.navTransparent = false;
			$scope.languageMenu = false;
			$scope.nav = {};
			$scope.nav = {
				'marketplace': navInit.marketplace || false,
				'help': navInit.help || false,
				'manageApps': navInit.manageApps || false,
				'managePeople': navInit.managePeople || false,
				'myProfile': navInit.myProfile || false,
				'dashboard': navInit.dashboard || false,
				'myPayment': navInit.myPayments || false,
				'login': navInit.login || false
			};

			$scope.detectMarketplaceUrl = function(){
				var pageLinkArr = $window.location.href.split("/");
				var relativeUrl = pageLinkArr[pageLinkArr.length-1];
				if (relativeUrl == "marketplace") {
					$scope.navTransparent = true;
				}
				else {
					$scope.navTransparent = false;
				}
			}
			$scope.detectMarketplaceUrl();

			$scope.resetLanguage = function(langUrl, ajaxUrl, opt1, opt2) {
					
					var options = {};
					// Options can include _csrf.token & headerName
					options.token = opt1;
					options.header = opt2;

					$http({
	                        url: ajaxUrl,
	                        method: "POST",
	                        data: {},
	                        headers: options
	                    })
	                    .then(function(response) {
	                        window.location.href = langUrl;
	                    
	                    },
	                    function(response) { // optional
	                        window.location.href = langUrl;
	                    });


			}

			


			$scope.toggleDropdowns = function(dropdown) {
				
				if (dropdown == 'language') {
					
					$scope.languageSelected = !$scope.languageSelected;
					$scope.cartOpen = false;
					$scope.myProfileSelected = false;
				}
				else if (dropdown == 'profile') {
					
					$scope.myProfileSelected = !$scope.myProfileSelected;
					$scope.languageSelected = false;
					$scope.cartOpen = false;
					
				}
				else if (dropdown == 'shoppingCart') {
					
					$scope.cartOpen = !$scope.cartOpen;
					$scope.languageSelected = false;
					$scope.myProfileSelected = false;
				}
			}
			if($('.dropdown-menu').length > 0) {
				$(document).mouseup(function (e) {
			
				    var containerUser = $('.dropdown-menu');

				    if (!containerUser.is(e.target) // if the target of the click isn't the container...
				        && containerUser.has(e.target).length === 0) // ... nor a descendant of the container
				    {
				    	var scope = angular.element($(".dropdown-menu")).scope();
				        scope.$apply(function(){
					        $scope.myProfileSelected = false;	
					        if(e.target.className == 'pull-left hidden-sm active') {
				        		$scope.myProfileSelected = !$scope.myProfileSelected;
				        	}        
					    });
				    }
				});
			}
			if($('.language-panel').length > 0) {
				$(document).mouseup(function (e) {
				
				    var containerLanguage = $('.language-panel');
				    var selectLanguage = $('.locale');

				    if (!containerLanguage.is(e.target) // if the target of the click isn't the container...
				        && containerLanguage.has(e.target).length === 0 && !selectLanguage.is(e.target) // if the target of the click isn't the container...
				        && selectLanguage.has(e.target).length === 0) // ... nor a descendant of the container
				    {
				    	var scope = angular.element($(".language-panel")).scope();
				        scope.$apply(function(){
				        	
					        $scope.languageSelected = false;	
					        if(e.target.className == 'pull-left selected') {
				        		$scope.languageSelected = !$scope.languageSelected;
				        	}        
					    });
				    }
				});
			}
		}]);
})();(function() {
	'use strict';
	angular.module('product', [])

		.controller('productCtrl', ['$scope',
			function ($scope) {

			$scope.modulePosition = 0;
			$scope.maxLimit = true;
			$scope.minLimit = true;
			$scope.pricingHasRoom = true;

			$scope.pricingShowLess = function() {
				var moduleWidth = $('.pricing-tier').width();
				var totalPricingModules = $('.pricing-tier').length;
				var totalPricingModulesWidth = -1 * ((moduleWidth * totalPricingModules - (3 * moduleWidth)) + (totalPricingModules * 30));
				$scope.modulePosition = $scope.modulePosition + moduleWidth;
				$('.horizontal-scroll-inner').css('margin-left', $scope.modulePosition+'px');
				if ($scope.modulePosition < 0) {
					$scope.minLimit = false;
				}
				else {
					$scope.minLimit = true;
				}
				if ($scope.modulePosition > totalPricingModulesWidth) {
					$scope.maxLimit = false;
				}
				else {
					$scope.maxLimit = true;
				}
			}
			$scope.pricingShowMore = function() {
				var moduleWidth = $('.pricing-tier').width();
				var totalPricingModules = $('.pricing-tier').length;
				if (totalPricingModules > 4) {
					totalPricingModules = totalPricingModules / 2;
				}
				var totalPricingModulesWidth = -1 * ((moduleWidth * totalPricingModules - (3 * moduleWidth)) + (totalPricingModules * 30));

				console.log('(1)'+moduleWidth+'(2)'+totalPricingModules+'(3)'+totalPricingModulesWidth);
				$scope.modulePosition = $scope.modulePosition - moduleWidth;
				$('.horizontal-scroll-inner').css('margin-left', $scope.modulePosition-30+'px');
				if ($scope.modulePosition > totalPricingModulesWidth) {
					$scope.maxLimit = false;
				}
				else {
					$scope.maxLimit = true;
				}
				if ($scope.modulePosition < 0) {
					$scope.minLimit = false;
				}
				else {
					$scope.minLimit = true;
				}
			}
			$scope.checkTotalPricingModules = function() {
				var totalPricingModules = $('.pricing-tier').length;
				if (window.innerWidth > 1024) {
					if(totalPricingModules > 4) {
						$scope.maxLimit = false;
						$scope.pricingHasRoom = false;
					}
					else {
						$scope.maxLimit = true;
					}
				}
				if (window.innerWidth < 1025) {
					if(totalPricingModules > 3) {
						$scope.maxLimit = false;
						$scope.pricingHasRoom = false;
					}
					else {
						$scope.maxLimit = true;
					}
				}
				if (window.innerWidth < 769) {
					if(totalPricingModules > 2) {
						$scope.maxLimit = false;
						$scope.pricingHasRoom = false;
					}
					else {
						$scope.maxLimit = true;
					}
				}
				if (window.innerWidth < 430) {
					$scope.pricingHasRoom = false;
					$scope.maxLimit = true;
					$scope.maxLimit = true;
				}
			}
			$scope.checkTechSpecHeight = function() {
				if ($('.limit-height').height() > 380) {
					$scope.viewHideLinks = true;
				}
				else {
					$scope.viewHideLinks = false;
				}
			}
			$scope.checkTotalPricingModules();
		}]);
})();
(function() {
	'use strict';
	angular.module('products', [])

		.controller('productsCtrl', ['$scope', 'postService', 
			function ($scope, postService) {
			
			$scope.products = productsJson;
			$scope.productsBackUp = angular.copy(productsJson);
			$scope.cancelImmediate = false;
			$scope.savedChanges = null;
			$scope.saveChangesButton = false;
			$scope.discardChanges = function() {
				$scope.products = angular.copy($scope.productsBackUp);
			}
			
			$scope.getTotal = function() {
				var total = 0;
				for (var i=0; i<$scope.products.length; i++) {
					if ($scope.products[i].checked == true) {
						total += $scope.products[i].price;
					}
				}
				return total;
			}
			
			$scope.updateCompanyProducts = function(ajaxUrl, opt1, opt2) {
				$scope.saveChangesButton = true;
				var postData = $scope.products;
			       
				var options = {};
				
				options.token = opt1;
				options.header = opt2;
				ajaxUrl = ajaxUrl + "/" + $scope.cancelImmediate; 
				console.log("ajaxUrl",ajaxUrl);

				postService.postData(ajaxUrl, postData, options).then(function (response) {
				       $scope.saveChangesButton = false;
				       console.log("success",response.data.success);				       	
				       if(response.data.success == true){
					    $scope.savedChanges = true;
				       } else{
					    $scope.savedChanges = false;
				       }
				       console.log("response.data.companyProducts",response.data.companyProducts);
				       $scope.products = response.data.companyProducts;
				       $scope.productsBackUp = angular.copy(response.data.companyProducts);
				});
			}
		}]);
})();(function() {
	'use strict';
	angular.module('service', [])
		
		 .factory('postService', function($http) {

	        function postData(ajaxURL, postData, options) {

            var opts = angular.extend({
                token: '',
                header: ''
            }, options);
              // console.log('token',options.token,'header' ,options.header);
            var headers = {};
            headers[opts.header] = opts.token;
            var postData = postData;

            return $http({
                    url: ajaxURL,
                    method: "POST",
                    data: postData,
                    headers: headers
                    // headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })
                .then(function(response) {

                        var returnData = {
                            postData: response.config.data,
                            data: response.data
                        }

                        // success
                        return returnData;
                    },
                    function(response) { // optional
                        // failed

                        return response;
                    }
                );
        }

        return {
            postData: postData
        }
    });
})();(function() {
	'use strict';
	angular.module('resetpassword', [])

		.controller('resetpasswordCtrl', ['$scope', 'resetpasswordserviceCall', 
			function ($scope, resetpasswordserviceCall) {
			
			$scope.newPassword = "";
			
			$scope.callResetPasswordService = function(ajaxUrl) {
				resetpasswordserviceCall.getData(ajaxUrl).then(function (response) {
						if(response.data.success == true){
							$scope.newPassword = "New Password : "+response.data.password;
						}else{
							$scope.newPassword = "Unable retrieve the password please try again";
						}
				});
			}
		}]);
})();(function() {
	'use strict';
	angular.module('resetpasswordservice', [])
		
		 .factory('resetpasswordserviceCall', function($http) {

	        function getData(ajaxURL) {
     
            var getData = getData;

            return $http({
                    url: ajaxURL,
                    method: "GET"
                })
                .then(function(response) {
                    console.log(response)
                      var returnData = {
                            postData: response.config.data,
                            data: response.data,
                            status: response.status
                        };
                        // success
                        return returnData;
                    },
                    function(response) { // optional
                        // failed
                   
                        return response;
                    }
                );
        }

        return {
            getData: getData
        }
    });
})();(function() {
	'use strict';
	angular.module('manageusertype', [])
		.controller('manageusertypeCtrl', ['$scope','resetpasswordserviceCall',
			function($scope,resetpasswordserviceCall) {

				$scope.switchUserType=function(emailId,isDbitUser,ajaxUrl){
					
					var message = "Please confirm the switch to " + (isDbitUser==='false'?"DB-IT":"NON DB-IT");
					
					var r = confirm(message);
					if (r == true) {
						/*
							resetpasswordserviceCall.getData(ajaxUrl).then(function (response) {
								console.log("RESPONSE ",response);
								if(response.data.success == true){
									alert("Is DB IT CUSTOMER "+response.data.dbitCustomer)
								}else{
									alert("response.data.error")
								}
							});
						*/
						
					} else {
						txt = "You pressed Cancel!";
					}
					
					
				};
				
			}]).directive('switchuser', function (resetpasswordserviceCall) {
			  return {
				  restrict: 'A',
				  link: function ($scope, element, attrs) {
					  element.on('click', function () {
						  var message = "Please confirm the switch to " + (attrs.dbitcustomer==='false'?"DB-IT":"NON DB-IT");
					
						var r = confirm(message);
							if (r == true) {
									resetpasswordserviceCall.getData(attrs.serviceurl).then(function (response) {
									
									if(response.data.success == true){
										attrs.$$element.val("Switch To "+ (attrs.dbitcustomer==='false'?"NON DB-IT":"DB-IT"));
										attrs.dbitcustomer=(attrs.dbitcustomer==='false'?"true":"false");                      
									}else{
										alert(response.data.error);
									}
								});
							
							} 
						  
					  });
				  }
			  };
		});
})();(function() {
	'use strict';
	angular.module('canceluser', [])
		.controller('canceluserCtrl', ['$scope','resetpasswordserviceCall',
			function($scope,resetpasswordserviceCall) {
				$scope.showCancelConfirmation = false;
				$scope.cancelUser=function(ajaxUrl){
					console.log(ajaxUrl);
					resetpasswordserviceCall.getData(ajaxUrl).then(function (response) {
						console.log(response);
						if(response.status == 200){
							alert("The user has been successfully cancelled");            
						}else{
							alert("Unable to cancel the user");
						}
					});
				};			
			}]);
})();(function() {
	'use strict';
	angular.module('helpcenter', [])
	
		.controller('helpcenterCtrl',[ '$scope' , function($scope) {
			
					
			
			$scope.sectionId = getParameterByName('sectionId') || 0;
			$scope.itemId = getParameterByName('itemId') || 0;
			$scope.accordionChoice = $scope.sectionId || 0;
			console.log($scope.accordionChoice, $scope.itemId);

			function getParameterByName(name) {
			    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
			    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
			        results = regex.exec(location.search);
			    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
			}


			$scope.setItemId = function(item) {

				if($scope.itemId == item){
					$scope.itemId = '';
				}else {
					$scope.itemId = item;
				}
			}
           
		}]);

//return loaded


})();( function() {
	'use strict';
	angular.module( 'shoppingcart', [ 'ngAnimate' ] )

	.factory('shoppingcartFtry', function ($http) {
		return {
			getCart: function(callback) {
				var restUrl = SaaS.restlocation.split( '/en/' );
				$http.get( restUrl[ 0 ] + 'rest/managecart/items' ).success(callback);
			}
		}
	})
	.controller( 'shoppingcartCtrl', [ '$scope', '$rootScope', '$window', '$timeout', '$http', 'shoppingcartFtry',
		function( $scope, $rootScope, $window, $timeout, $http, shoppingcartFtry ) {

			$scope.scroll = 0;
			$scope.cartOpen = false;
			$scope.lastRemovedItem = '';
			$scope.currentUrl;
			$scope.totalProducts = 0;
			$scope.restUrl = SaaS.restlocation.split( '/en/' );

			//Manages opening / closing the cart
			$scope.toggleCart = function() {
				$scope.cartOpen = !( $scope.cartOpen );
				//When the cart closes we want the login form to close too
				if($scope.cartOpen == false) {
					$scope.loginActive = false;
				}
			}
			$scope.toggleOverlay = function() {
				$rootScope.mobileMenu = !$rootScope.mobileMenu;
			}
			$scope.toggleCartOverlay = function() {
				$rootScope.cartMenu = !$rootScope.cartMenu;
			}

			//Retrieves the current state of the cart
			$scope.getCart = function() {
				shoppingcartFtry.getCart(function(data) {
					$rootScope.cartData = data;
					$scope.totalPrice = $rootScope.cartData.unitPrice * $rootScope.cartData.quantity;
					$scope.calcProducts();
				})
			}
			$scope.getCart();
			//Handles remove from cart CTA + REST
			$scope.removeFromCart = function( id, opt1, opt2 ) {
				var productToRemove = id;
				var productToRemoveStr = productToRemove.toString();
				var options = {};
				options.token = opt1;
				options.header = opt2;
				var opts = angular.extend( {
					token: '',
					header: ''
				}, options );
				var headers = {};
				headers[ opts.header ] = opts.token;

				$http( {
						url: $scope.restUrl[ 0 ] + 'rest/managecart/items',
						traditional: true,
						method: "DELETE",
						data: productToRemoveStr,
						contentType: "application/json",
						headers: headers
					} )
					.success( function( data, status, headers, config ) {
						$rootScope.cartData = data;
						$scope.calcProducts();
					} )
					.error( function( data, status, headers, config ) {
						console.log( "Ajax failed - Remove from cart" );
					} );
			}			

			//Tells you how many products are in the cart
			$scope.calcProducts = function() {
				$scope.totalProducts = $window.document.getElementsByClassName( "cartProduct" ).length;
				if (window.innerWidth < 450) {
					if ( $scope.totalProducts > 6 ) {
						$scope.extraCheckoutButton = true;
					}
					else {
						$scope.extraCheckoutButton = false;
					}
				}
				else {
					if ( $scope.totalProducts > 9 ) {
						$scope.extraCheckoutButton = true;
					}
					else {
						$scope.extraCheckoutButton = false;
					}
				}
			}

			//Tells you if the cart is empty or not
			$scope.isEmpty = function() {
				if ( $scope.totalProducts == 0 ) {
					return true;
				}
				else {
					return false;
				}
			}

			$scope.cartDataRemoveFromCart = function( item ) {
				$scope.lastRemovedItem = item.name;
				$scope.lastRemovedItemLink = item.path;
			}

			$(document).mouseup(function (e) {
			
			    var container = $('.shopping-cart');

			    if (!container.is(e.target) // if the target of the click isn't the container...
			        && container.has(e.target).length === 0) // ... nor a descendant of the container
			    {
			    	var scope = angular.element($(".shopping-cart")).scope();
			        scope.$apply(function(){
				        $scope.cartOpen = false;
				        $scope.loginActive = false;
				        if($rootScope.cartMenu == true) {
				        	$scope.toggleCartOverlay();
				        }
				        if(e.target.className == 'active') {
			        		$scope.toggleCart();
							if($rootScope.cartMenu == true) {
								$rootScope.cartMenu == false;
							}
							else {
								$rootScope.cartMenu = true;
							}
			        	}				        
				    });
			    }
			});
	} ] )

	//Click on the closing links will remove the whole product.
	.directive( 'closer', function() {
		return {
			restrict: 'E',
			link: function( $scope, element, attrs, $timeout ) {
				var closeLinks = angular.element( element[ 0 ].querySelectorAll( '.closeLink' ) );

				closeLinks.bind( "click", function() {
					element.remove();
				} )
			}
		}
	});
} )();
( function() {
	'use strict';
	angular.module( 'subscription_summary', [] )

	.controller( 'subscriptionSummaryCtrl', [ '$scope', '$http', function( $scope, $http ) {

		$scope.printPage = function() {

			window.print();
		}
		
		// TELESALES AGENT

		if ( typeof( telesalesAgent ) == 'undefined' ) $scope.telesales = false;
		else $scope.telesales = telesalesAgent;

		if ( $scope.telesales ) $scope.staffAgentCollapsed = true;
		else $scope.staffAgentCollapsed = false;

		$scope.isTelesalesAgent = function() {
			return $scope.telesales;
		};

		$scope.isStaffAgentCollapsed = function() {
			return $scope.staffAgentCollapsed;
		};

		$scope.collapseStaffAgent = function() {
			$scope.staffAgentCollapsed = !$scope.staffAgentCollapsed;
		};


		// COUPON CODE HERE
		// this should really be refractored for ease of use
		if ( typeof( couponCode ) != 'undefined' ) $scope.couponCode = couponCode;

		$scope.couponValid = false; // boolean flag whether last submitted coupon is valid
		$scope.couponSubmitted = false;
		$scope.couponLoading = false;
		$scope.couponDiscount = false;
		$scope.couponAmount = 0;

		$scope.couponIsDiscount = function() {
			return $scope.couponDiscount;
		}

		$scope.couponIsLoading = function() {
			return $scope.couponLoading;
		}

		$scope.getValidCoupon = function() {
			if($scope.couponValid && $scope.couponSubmitted) return $scope.couponCode;
			else return false;
		};


		$scope.couponError = function() {
			if($scope.couponSubmitted && $scope.couponValid) return false;
			if($scope.couponSubmitted && !$scope.couponValid) return true;
			if(!$scope.couponSubmitted) return false;
			//else return true;
		};

		$scope.couponSuccess = function() {
			if($scope.couponSubmitted && $scope.couponValid) return true;
			else return false;
		};


		$scope.couponMessage = '';

		$scope.getCouponMessage = function() {
			return $scope.couponMessage;
		};

		$scope.couponDiscount = false;

		$scope.couponName = '';

		$scope.getCouponName = function () {
			return $scope.couponName;
		};

		$scope.getCouponDiscount = function () {
			if($scope.couponDiscount == true) return $scope.couponAmount;
			else return false;
		};

		$scope.getCouponAmount = function() {
			return $scope.couponAmount;
		};

		$scope.totalAmount = 0;

		$scope.getTotalAmount = function() {
			if(!$scope.getCouponDiscount()) return $scope.totalAmount;
			else return $scope.totalAmount-$scope.getCouponAmount();
		};

		$scope.getTotalAmountWithTaxes = function() {
			return $scope.getTotalAmount();
		};


		$scope.submitCoupon = function( ctxPath ) {
			if(!$scope.couponSuccess()) { // disable functionality after successful coupon
				$scope.couponSubmitted = false;
				$scope.couponLoading = true;

				if(typeof(ctxPath)=='undefined') ctxPath = '';
				if($scope.couponCode!="undefined") {

				$http( {
						url: ctxPath + '/rest/coupon/validate/' + $scope.couponCode,
						method: "GET"
					} )
					.then( function( response ) {
							if(response.data.success) {
								$scope.couponLoading = false;
								$scope.couponSubmitted = true;
								$scope.couponValid = true;
								$scope.couponAmount = response.data.amount;
								$scope.validCoupon = $scope.couponCode;
								$scope.couponMessage = response.data.message;
								$scope.couponName = response.data.discountName;
								$scope.couponDiscount = response.data.discount;
							}
							else {
								$scope.couponSubmitted = true;
								$scope.couponLoading = false;
								$scope.couponValid = false;
								$scope.couponMessage = response.data.message;
							}

							return true;
						},
						function( response ) { // optional

							
							return false;
						}
					);
				}

			};
		}

	} ] );

	//return loaded


} )();
(function() {
	'use strict';
	angular.module('mozyproComponent', [])
		.controller('mozyLicenseKeyCtrl', ['$scope',
			function($scope) {

				$scope.licenseObj = obj;

				$scope.currentOS = $scope.licenseObj.os;

				$scope.setCurrentOS = function(currentOS) {

					alert(currentOS);
				};

			}
		]);
})();(function() {
	'use strict';
	angular.module('dashboard', [])
		
		.controller('dashboardCtrl', ['$scope', 'postService',
			function($scope, postService) {

			
				$scope.currentItem = null;
				$scope.allNotifications = true;
				$scope.welcome = true;

				$scope.setCurrentItem = function(item) {
					
					if ( $scope.currentItem == item ) {

						console.log('here');
						$scope.currentItem = null;
					} else {
						$scope.currentItem = item;
					}
					
				}

				$scope.closeAllNotifications = function(){
					
					$scope.allNotifications = false;

				}


				$scope.closeWelcomeMessage = function(path) {

			        var data = {};

			        //data.userID = userID;

			        //alert(productID); 

			        var ajaxURL = $(event.currentTarget).attr('data-path');
			        var callback = $scope.removeWelcome;
			        $scope.makeAjaxCall(ajaxURL, callback);

			        //console.log(data);
			        //console.log(ajaxURL);
			    }

			    $scope.makeAjaxCall = function(ajaxURL, callback){

         			var options = {};

         			// Options can include _csrf.token & headerName
         			options.token = $scope.serverToken;
         			options.header = $scope.serverHeader;
         			postService.postData(ajaxURL,'', options).then(function (response) {
          				$scope.removeWelcome();  
        			});
     			}

     			$scope.removeWelcome = function(){
         			//var myid = data.productID;
         			$scope['welcome'] = false;
         			$scope['showWelcome'] = false;
         			//$scope['class'] = "animate-if";
     			}

     			$scope.expandFreeTrial = function(id) {
     				$scope['isActive_' + id] = !+$scope['isActive_' + id]
     			}


			}

		]);

		

})();(function() {
	'use strict';
	angular.module('eoi', [])
		
		.controller('eoiCtrl', ['$scope', '$http',
			function($scope, $http) {
				
				$scope.showAlert = false;
				$scope.loading = false;

				$scope.sendMoreInfoEmail = function(opt1, opt2, productId) {
					
					var postData = {
						'staffAgentID' : $scope.sendMoreInfoForm['user.staffAgentID'].$modelValue,
						'staffAgentEmail' : $scope.sendMoreInfoForm['user.staffAgentEmail'].$modelValue,
						'customerFirstName' : $scope.sendMoreInfoForm['user.customerFirstName'].$modelValue,
						'customerLastName' : $scope.sendMoreInfoForm['user.customerLastName'].$modelValue,
						'customerEmail' : $scope.sendMoreInfoForm['user.customerEmail'].$modelValue,
						'customerPhoneNumber' : $scope.sendMoreInfoForm['user.customerPhoneNumber'].$modelValue,
						'reasonNotPurchasing' : $scope.sendMoreInfoForm['user.reasonNotPurchasing'].$modelValue,
						'customerLanguage' : "null"
					};

					var options = {};
					options.token = opt1;
		            options.header = opt2;
		          	var opts = angular.extend({
		                        token: '',
		                        header: ''
		                    }, options);
					var headers = {};
		            headers[opts.header] = opts.token;

		            $scope.restUrl = SaaS.restlocation.split('/en/');
		            $scope.loading = true;

					$http({
						url: $scope.restUrl[0] + 'rest/expressionOfInterest/' + productId ,
						traditional: true,
						method: "POST",
						data: postData,
						contentType: "application/json",
						headers: headers

					})

					
					.success(function (data, status, headers, config) {
						//console.log('success', data);
						
						$scope.loading = false;
						$('#modal-eoi').modal('hide');
						$('#modal-eoiSuccess').modal('show');

					})
					.error(function (data, status, headers, config) {
						//console.log('error', data);
						$scope.loading = false;
						$scope.showAlert = true;
					});

				};

			}
		])
		.controller('captchaCtrl', ['$scope',
			function($scope) {
              
				$scope.locale = locale;
				$scope.captcha = {
                    "21" : {
                        "en" : "Lock",
                        "fr" : "Cadenas"},
                    "1" : {
                        "en" : "Cat",
                        "fr" : "Chat"},
                    "2" : {
                        "en" : "Car",
                        "fr" : "Voiture"},
                    "3" : {
                        "en" : "Van",
                        "fr" : "Camion"},
                    "4" : {
                        "en" : "T-shirt",
                        "fr" : "T-shirt"},
                    "5" : {
                        "en" : "Graph",
                        "fr" : "Graphique"},
                    "6" : {
                        "en" : "Laptop",
                        "fr" : "PC portable"},
                    "7" : {
                        "en" : "Clock",
                        "fr" : "Horloge"},
                    "8" : {
                        "en" : "Sun glasses",
                        "fr" : "Lunettes de soleil"},
                    "9" : {
                        "en" : "Balloons",
                        "fr" : "Ballons"},
                    "10" : {
                        "en" : "Magnifier",
                        "fr" : "Loupe"},
                    "11" : {
                        "en" : "Umbrella",
                        "fr" : "Parapluie"},
                    "12" : {
                        "en" : "Paper clip",
                        "fr" : "Trombone"},
                    "13" : {
                        "en" : "Folder",
                        "fr" : "Dossier"},
                    "14" : {
                        "en" : "Globe",
                        "fr" : "Mondo"},
                    "15" : {
                        "en" : "Chair",
                        "fr" : "Chaise"},
                    "16" : {
                        "en" : "Cloud",
                        "fr" : "Nuage"},
                    "17" : {
                        "en" : "Musical note",
                        "fr" : "Note de musique"},
                    "18" : {
                        "en" : "House",
                        "fr" : "Maison"},
                    "19" : {
                        "en" : "Pencil",
                        "fr" : "Crayon"},
                    "20" : {
                        "en" : "Plane",
                        "fr" : "Avion"}
                }
                
                $scope.captchaOption_1 = {
                    img: "20",
                    name: "Plane"};
                $scope.captchaOption_2 = {
                    img: "19",
                    name : "Pencil"};
                $scope.captchaOption_3 = {
                    img: "18",
                    name : "House"};
                $scope.captchaOption_4 = {
                    img: "17",
                    name : "Musical note"};
                $scope.captchaOption_5 = {
                    img: "16",
                    name : "Cloud"};

                $scope.setCaptcha = function() {
                   
                    $scope.captchaOptions = randomCaptcha();
                    var rand = $scope.captchaOptions[Math.floor(Math.random() * $scope.captchaOptions.length)];
                    var i = 0;
                    angular.forEach($scope.captchaOptions, function(count){
                        i = i + 1;
                    
                        $scope['captchaOption_'+ i ].name =  $scope.captcha[count][$scope.locale] ;
                        $scope['captchaOption_'+ i ].img =  count;
                        if(count == rand){
                            $scope.captchaAnswer = $scope.captcha[count][$scope.locale];
                        }
                    });

                    return true;
                };
             
                function randomCaptcha() {
                    var arr = []
                    while(arr.length < 5){
                      var randomnumber=Math.ceil(Math.random()*21)
                      var found=false;
                      for(var i=0;i<arr.length;i++){
                        if(arr[i]==randomnumber){found=true;break}
                      }
                      if(!found)arr[arr.length]=randomnumber;
                    }
                    
                    return arr;
                };

                $scope.answerCaptcha = function(answer) {
                
                    if( $scope.captchaAnswer == answer) {
                        $scope.captchaStatus = true;
                    }else {
                        $scope.setCaptcha();
                    }
                  
                }

			}
		])
		
})();(function() {
	'use strict';
	angular.module('terms', [])
	
		.controller('termsCtrl',[ '$scope', '$location', '$anchorScroll', function($scope, $location, $anchorScroll) {
			
			console.log('whoop', getURLParameters('scroll'));

		  	$scope.scrollTo = function(id) {
		    	$location.hash(id);
		    	console.log($location.hash());
		    	$anchorScroll();
		  	};

		    $scope.scrollTo(getURLParameters('scroll'));
		
			function getURLParameters(paramName)
			{
			    var sURL = window.document.URL.toString();
			    if (sURL.indexOf("?") > 0)
			    {
			        var arrParams = sURL.split("?");
			        var arrURLParams = arrParams[1].split("&");
			        var arrParamNames = new Array(arrURLParams.length);
			        var arrParamValues = new Array(arrURLParams.length);

			        var i = 0;
			        for (i = 0; i<arrURLParams.length; i++)
			        {
			            var sParam =  arrURLParams[i].split("=");
			            arrParamNames[i] = sParam[0];
			            if (sParam[1] != "")
			                arrParamValues[i] = unescape(sParam[1]);
			            else
			                arrParamValues[i] = "No Value";
			        }

			        for (i=0; i<arrURLParams.length; i++)
			        {
			            if (arrParamNames[i] == paramName)
			            {
			                //alert("Parameter:" + arrParamValues[i]);
			                return arrParamValues[i];
			            }
			        }
			        return "No Parameters Found";
			    }
			}
           
		}]);

//return loaded


})();
/* global angular */
"use strict";
/**
 * @ngdoc module
 * @name Darwin-SaaS
 * @requires ui.bootstrap
 * @requires [predefined]
 * @description Main application module and namespace for Darwin application.
 * It uses Bootstrap UI and all modules which are defined in `package.json`'s application dependencies' branch
 * @author BCSG Frontend Team
 * @version 1.0
 */
angular.module('Darwin-SaaS', ['ui.bootstrap', "payment","filters","marketplace","myprofile","pricing","inviteusers","manageapps","manageusers","navigation","product","products","service","resetpassword","resetpasswordservice","manageusertype","canceluser","helpcenter","shoppingcart","subscription_summary","mozyproComponent","dashboard","eoi","terms"])
	.constant("Modernizr", Modernizr)
	.config(function($sceDelegateProvider, $locationProvider) {
		/**
		 * @description Set up URL whitelist
		 * @memberOf Darwin-SaaS
		 * @requires $sceDelegateProvider
		 * @function config
		 */
		$sceDelegateProvider.resourceUrlWhitelist([
			'self',
			'https://mbotc-cdn.global.ssl.fastly.net/**',
			'https://mbotc-stage-cloudsaasportal.global.ssl.fastly.net/**'
		]);
	})
	.controller('MainCtrl', ['$scope', '$rootScope', '$timeout', '$location', '$anchorScroll', function($scope, $rootScope, $timeout, $location, $anchorScroll) {

		$rootScope.cartData = {};
		$rootScope.mobileMenu = false;
		$rootScope.cartMenu = false;

		$scope.scrollToLocation = function(path, anchor) {
			$location.path(path);
			$timeout(function() {
				$anchorScroll(anchor);
			},500);
		}
	}]);
$(document).ready(function(){

	/***country phone number dropdown***/
	if($("#moMobileNumber").length){

		$("#moMobileNumber").intlTelInput({
			defaultCountry: OpCo,
		    //allowExtensions: true,
		    //autoFormat: false,
		    //autoHideDialCode: false,
		    //autoPlaceholder: false,
		    //defaultCountry: "auto",
		    //geoIpLookup: function(callback) {
		    //   $.get('http://ipinfo.io', function() {}, "jsonp").always(function(resp) {
		    //     var countryCode = (resp && resp.country) ? resp.country : "";
		   //      callback(countryCode);
		    //   });
		   // },
		    //nationalMode: false,
		    numberType: "MOBILE",
		    onlyCountries: ['cm', 'ci', 'gn', 'za', 'ug', 'ng', 'sz', 'zm', 'gh', 'rw'],
		    //preferredCountries: ['cn', 'jp'],
		    utilsScript: SaaS.location + "js/base/utils.js"
		});

		$("#moMobileNumber").keyup(function(){

			if($(this).val().length < 5) {
				$('#errorMoMobileNumber').show();
				$(this).addClass('error');
				$('#moMobileNumberContainer').addClass('error');
			}
			else
			{
				$('#errorMoMobileNumber').hide();
				$(this).removeClass('error');
				$('#moMobileNumberContainer').removeClass('error');
			}

		});

	}

});
