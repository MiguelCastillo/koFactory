/*
 * rjasmine Copyright (c) 2014 Miguel Castillo.
 * Licensed under MIT
 */


define(["tests/lib/rjasmine/dist/rjasmine", "tests/lib/jquery/dist/jquery.min"], function(RJasmine) {

  // Configure requirejs globably to make spromise src available
  // in all unit tests
  requirejs.config({
    paths: {
      "koFactory": "dist/ko.factory-debug",
      "ko": "tests/lib/knockout.js/knockout",
      "text": "tests/lib/js/text"
    }
  });


  var rjasmine = new RJasmine({
    reporters: {
      html: true,
      console: true
    }
  });

  // Make the api available globally...
  RJasmine.extend(this, rjasmine._api);
  this.rjasmine = RJasmine;

  // rjasmine needs to wait for reporters to be loaded...
  rjasmine.ready(function() {
    require([
      "tests/specs/array",
      "tests/specs/object",
      "tests/specs/mixed"
    ], rjasmine.execute);
  });
});

