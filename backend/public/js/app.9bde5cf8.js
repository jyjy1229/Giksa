(function(t){function e(e){for(var r,i,c=e[0],s=e[1],u=e[2],p=0,f=[];p<c.length;p++)i=c[p],Object.prototype.hasOwnProperty.call(a,i)&&a[i]&&f.push(a[i][0]),a[i]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(t[r]=s[r]);l&&l(e);while(f.length)f.shift()();return o.push.apply(o,u||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],r=!0,c=1;c<n.length;c++){var s=n[c];0!==a[s]&&(r=!1)}r&&(o.splice(e--,1),t=i(i.s=n[0]))}return t}var r={},a={app:0},o=[];function i(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=r,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(n,r,function(e){return t[e]}.bind(null,r));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],s=c.push.bind(c);c.push=e,c=c.slice();for(var u=0;u<c.length;u++)e(c[u]);var l=s;o.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";var r=n("85ec"),a=n.n(r);a.a},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"main page"},[n("b-navbar",{staticClass:"nav",attrs:{type:"dark",variant:"dark"}},[n("b-navbar-nav",[n("b-nav-item",{attrs:{href:"#"}},[t._v("Home")])],1),t.user?n("b-navbar-nav",{staticClass:"ml-auto"},[n("b-nav-item-dropdown",{attrs:{text:"User",left:""}},[n("b-dropdown-item",{attrs:{href:"#"}},[t._v("Account")]),n("b-dropdown-item",{attrs:{href:"#"}},[t._v("Settings")])],1)],1):n("b-navbar-nav",{staticClass:"ml-auto"},[n("b-nav-item",{attrs:{href:"/login"}},[t._v("Login")])],1)],1),n("div",{staticClass:"position main"},[t._v(" Dorm exchange service "),n("b-card",{staticClass:"card",attrs:{overlay:"","img-src":"https://cdn.pixabay.com/photo/2015/05/06/16/31/andromeda-galaxy-755442_960_720.jpg"}})],1)],1)},o=[],i=n("bc3a"),c=n.n(i),s={data:function(){return{user:""}},created:function(){var t=this;c.a.get("http://localhost:3000/main").then((function(e){console.log(e),t.user=e.data}))}},u=s,l=(n("034f"),n("2877")),p=Object(l["a"])(u,a,o,!1,null,null,null),f=p.exports,d=n("7e05");n("5b3d"),n("7db1");r["a"].config.productionTip=!1,r["a"].use(d["a"]),new r["a"]({render:function(t){return t(f)}}).$mount("#app")},"85ec":function(t,e,n){}});
//# sourceMappingURL=app.9bde5cf8.js.map