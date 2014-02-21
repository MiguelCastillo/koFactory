koFactory
=========

Lightweight factory that will create a KnckoutJS ViewModel with all the corresponding koObservables and koObservableArrays.  You can pass in an Array, a String, or a JSON object, and you will get a ViewModel ready to be consumed!

Highlights:

* The purpose for koFactory is to be simple and unobtrusive.  There is no extra annotation or properties added to the created ViewModels, so that you can use koFactory to supplement the code you already have in place.

* koFactory is AMD compliant.  It will also run just fine if you have the more traditional script tag approach.

* koFactory will also update and merge new data into a ViewModel; either created by koFactory or your handcrafted ones.  So, if you new data you want to push into your ViewModel, you can use koFactory to do the job.


API
=========

<code>koFactory</code> is the starting point.  It's a function that takes in a <code>data</code> as its first argument, and returns a ViewModel.  You can then call koFactory again with new <code>data</code> and the ViewModel as the second parameter. Changed properties will be updated and new properties will be merged in.  <code>koFactory</code> is internally calling <code>koFactory.serailize</code>, so feel free to just call <code>koFactory.serialize</code>.  The data types you can pass in are Strings, Arrays, JSON, or any other type of object that can be converted to an observable.

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


Installation
=========

Find it on bower as koFactory or directly download it from git in the dist folder, and happy ViewModel making!
``` javascript
> bower install koFactory
```


Licensing
=========

Licensed under MIT
