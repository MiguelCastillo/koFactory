(function (root, factory) {
  if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
    // CommonJS support
    module.exports = factory(require("ko"));
  } else if (typeof define === "function" && define.amd) {
    // Do AMD support
    define(["ko"], factory);
  } else {
    // Do browser support
    root.koFactory = factory(root.ko);
  }
}(this, function(ko) {

return false ||  // This is to allow the return to properly execute the factory function
/////////////////////////////////////////////////////////////////////////////////////////////
