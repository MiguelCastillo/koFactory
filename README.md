koFactory
=========

Lightweight factory that will create a KnckoutJS ViewModel with all the corresponding koObservables and koObservableArrays.  You can pass in an Array, a String, or a JSON object, and you will get a ViewModel ready to be consumed!

Highlights:

* The purpose for koFactory is to be simple and unobtrusive.  There is no extra annotation or properties added to the created ViewModels, so that you can use koFactory to supplement the code you already have in place.

* koFactory is AMD compliant.  It will also run just fine if you have the more traditional script tag approach.

* koFactory will also update and merge new data into a ViewModel; either created by koFactory or your handcrafted ones.  So, if you have new data you want to push into your ViewModel, you can use koFactory to do the job.


API
=========

<code>koFactory</code> function takes in <code>data</code> as its first argument and returns a ViewModel.  The data types you can pass in are Strings, Arrays, JSON, or any other type of object that can be ko observable.  You can subsequently call koFactory with new <code>data</code> and a previously created ViewModel as the second parameter, at which point koFactory will update and merge new values into ViewModel.

<code>koFactory.serailize</code> function that creates and updates ViewMdels. Calling <code>koFactory</code> is exactly the same as calling <codey>koFactory.serialize</code>.

<code>koFactory.deserialize</code> will take a ViewModel and will strip out all the koObservable/koObservableArray notations, returning data that's ready for a stream (ajax, file system)...  * More to come on this interface. I am planning on adding the ability to filter out properties/functions that should not be included in the final object.

<code>koFactory.bind</code> will take in a jQuery object or a DOM element as the first parameter and a ViewModel as the second parameter, and it will do the applyBinding for you.  The one real good reason for this is that it gracefully iterates through jQuery objects with multiple DOM elements in it, and binds them to the ViewModel.

<code>koFactory.unbind</code> will take in a jQuery object or a DOM element as its first parameter, and it will call cleanNode for you.  Again, the only good reason for this interface is that it gracefully iterates through jQuery objects with elements.


Examples
=========

* Create an observable string
``` javascript
var viewModel = koFactory("Hello world");
console.log(viewModel()); //=> Will print "Hello world"

viewModel("I say, " + viewModel());
console.log(viewModel()); //=> Will print "I say, Hello world"
```

* Create an observable object
``` javascript
var data = {
  "simple": "property"
};

var viewModel = koFactory(data);
console.log(viewModel.simple()); //=> Will print "property"
```

* Update a ViewModel
``` javascript 
var data1 = {
  "simple1": "Yes, simple string"
};

var viewModel = koFactory(data1);
console.log(viewModel.simple1()); //=> Will print "Yes, simple string"

var data2 = {
  "simple1": "Yes, new data",
  "simple2": "New property"
};

koFactory(data2, viewModel);
console.log(viewModel.simple1()); //=> Will print "Yes, new data"
console.log(viewModel.simple2()); //=> Will print "New property"
```

* Bind ViewModel to jQuery object.  This example shows a very simple jQuery object with a single element, but if there were multiple elements, koFactory would iterate through them and will do the appropriate binding.
``` javascript
var data = {
  "simple": "property"
};

var viewModel = koFactory(data);
var $el = $("<div data-bind='text: simple'></div>");
koFactory.bind($el, viewModel);
```

* A small sample of a more real use case with server data.
``` javascript

// Interface to get a model. In real life, this would be its own module, but let's just play along
function getViewModel() {
  // Convert the default properties to a view model that gets returned.
  var viewmodel = koFactory({
    greeting: "",
    name: ""
  });

  // Let's expose a function in the view model the UI can call
  viewmodel.sayGreeting = function() {
    // This...
    var data = koFactory.deserialize(viewmodel);
    console.log(data.greeting, data.name);
    
    // Or this...
    console.log(viewmodel.greeting(), viewmodel.name());
  };

  return viewmodel;
}

// Create me a view model
var viewmodel = getViewModel();

// Bind a view model to the body, but it can just be any element in the DOM.
koFactory.bind( $("body"), viewmodel );

// Update view model with server data
$.ajax("http://myservice").done(function(data) {
  // Push any changes to the view model
  koFactory(data, viewmodel);
});

// Update server with view model data
$.ajax({
  "url": "http://myservice",
  "method": "PUT",
  "data": koFactory.deserialize(viewmodel)
});
```


Installation
=========

``` javascript
> bower install koFactory
```
Or download it from the dist folder.<br>
And happy ViewModel making!


Licensing
=========

Licensed under MIT
