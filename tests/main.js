/*
 * rjasmine Copyright (c) 2014 Miguel Castillo.
 * Licensed under MIT
 */


define(["tests/libs/js/rjasmine", "tests/libs/js/jquery-1.11.0.min"], function(rjasmine) {

  // Configure requirejs globably to make spromise src available
  // in all unit tests
  requirejs.config({
    paths: {
      "koFactory": "dist/ko.factory-debug",
      "ko": "tests/libs/js/knockout-3.0.0",
      "text": "tests/libs/js/text"
    }
  });


  var _rjasmine = new rjasmine({
    reporters: {
      html_reporter: true,
      console_reporter: true
    }
  });

  // Make the api available globally...
  rjasmine.extend(this, _rjasmine._api);
  this.rjasmine = rjasmine;

  // rjasmine needs to wait for reporters to be loaded...
  _rjasmine.ready(function() {
    require([
      "tests/specs/array",
      "tests/specs/object",
      "tests/specs/mixed"
    ], _rjasmine.execute);
  });
});

