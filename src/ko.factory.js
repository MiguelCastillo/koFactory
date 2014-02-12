  var jQuery = this.jQuery;

  function koFactory(data, target, settings) {
    return koFactory.serialize( data, target, settings );
  }


  koFactory.primitiveTypes = {
    "undefined": true,
    "boolean": true,
    "number": true,
    "string": true
  };


  koFactory.getType = function(data) {
    if (data instanceof Array) {
      return "array";
    }

    var typeOf = typeof data;
    if ( koFactory.primitiveTypes.hasOwnProperty(typeOf) ) {
      return "primitive";
    }
    else if (typeOf === "object") {
      return "object";
    }

    throw "Invalid data type";
  };


  koFactory.array = function (data, target, settings) {
    var i = 0,
        length = data.length,
        type = false,
        update = ko.isObservable(target);

    settings = settings || {};

    if ( length ) {
      // We only need to get the type once; items in an
      // arrays are of the same data type.
      type = koFactory.getType(data[0]);
    }

    for ( ; i < length; i++ ) {
      data[i] = koFactory[type](data[i], target, settings);
    }

    if ( update === true ) {
      target(data);
      return target;
    }

    return ko.observableArray(data);
  };


  koFactory.primitive = function(data, target, settings) {
    var update = ko.isObservable(target);
    if ( update === true ) {
      target(data);
      return target;
    }

    return ko.observable(data);
  };


  koFactory.object = function(data, target, settings) {
    var type, item, value, update = false;
    target = target || {};
    settings = settings || {};

    for ( var i in data ) {
      // If i isn't a property of data, then we will continue on to the next property
      if (data.hasOwnProperty(i) === false) {
        continue;
      }

      update = target.hasOwnProperty(i);
      item   = data[i];
      type   = koFactory.getType(item);
      value  = koFactory[type](item, target[i], settings[i]);

      if (update === false) {
        target[i] = value;
      }
    }

    return target;
  };


  /**
  * @param <Object> data - is the new data that will either generate a new view model
  *                 or will be merged into target.
  * @param <Object> target - optional object where data will be copied into.
  */
  koFactory.serialize = function(data, target, settings) {
    var type = koFactory.getType(data);
    return koFactory[type](data, target, settings);
  };


  koFactory.deserialize = function(data) {
    return ko.toJS(data);
  };


  koFactory.bind = function( el, viewModel ) {
    if ( jQuery ) {
      jQuery(el).each(function(index, iel) {
        ko.applyBindings(viewModel, iel);
      });
    }
    else {
      ko.applyBindings(viewModel, el);
    }
  };


  koFactory.unbind = function( el ) {
    if ( jQuery ) {
      jQuery(el).each(function(index, iel) {
        ko.cleanNode(iel);
      });
    }
    else {
      ko.cleanNode(el);
    }
  };


  koFactory.ko = ko;
