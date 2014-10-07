/**
 * koFactory Copyright (c) 2014 Miguel Castillo.
 * Licensed under MIT
 *
 * https://github.com/MiguelCastillo/koFactory
 */

(function(e,t){typeof require=="function"&&typeof exports=="object"&&typeof module=="object"?module.exports=t(require("ko")):typeof define=="function"&&define.amd?define(["ko"],t):e.koFactory=t(e.ko)})(this,function(e){return function(e,t){function n(e,t,r){return n.serialize(e,t,r)}return n.ko=e,n.$=t,n.primitiveTypes={"undefined":!0,"boolean":!0,number:!0,string:!0},n.getType=function(e){if(e instanceof Array)return"array";var t=typeof e;if(n.primitiveTypes.hasOwnProperty(t))return"primitive";if(t==="object")return"object";throw"Invalid data type"},n.array=function(e,t,r){var i=0,s=e.length,o=!1,u=n.ko.isObservable(t);r=r||{},s&&(o=n.getType(e[0]));for(;i<s;i++)e[i]=n[o](e[i]);return u===!0?(t(e),t):n.ko.observableArray(e)},n.primitive=function(e,t){var r=n.ko.isObservable(t);return r===!0?(t(e),t):n.ko.observable(e)},n.object=function(e,t,r){t=t||{},r=r||{};var i,s,o,u=!1;for(var a in e){if(e.hasOwnProperty(a)===!1)continue;u=t.hasOwnProperty(a),s=e[a],i=n.getType(s),o=n[i](s,t[a],r[a]),u===!1&&(t[a]=o)}return t},n.serialize=function(e,t,r){var i=n.getType(e);return n[i](e,t,r)},n.deserialize=function(e){return n.ko.toJS(e)},n.bind=function(e,t){n.$?n.$(e).each(function(e,r){n.ko.applyBindings(t,r)}):n.ko.applyBindings(t,e)},n.unbind=function(e){n.$?n.$(e).each(function(e,t){n.ko.cleanNode(t)}):n.ko.cleanNode(e)},n}.apply(this,[e,$])}.bind(this));