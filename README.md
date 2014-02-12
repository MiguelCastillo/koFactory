koFactory
=========

Lightweight factory that will create a KnckoutJS ViewModel with all the corresponding koObservables and koObservableArrays.  You can pass in an Array, a String, or a JSON object, and you will get a ViewModel ready to be consumed!

Highlights:

* The purpose for koFactory is to be simple and unobtrusive.  There is no extra annotation or properties added to the created ViewModels, so that you can use koFactory to supplement the code you already have in place.

* koFactory is AMD compliant.  It will also run just fine if you have the more traditional script tag approach.

* koFactory will also update and merge new data into a ViewModel; either created by koFactory or your handcrafted ones.  So, if you new data you want to push into your ViewModel, you can use koFactory to do the job.


API
=========

<code>koFactory</code> is the starting point.  It's a function that takes in a <code>data</code> as its first argument, and returns a ViewModel.  You can then call koFactory again with new <code>data</code> and the ViewModel as the second parameter, and new values will be updated and new properties will be merged in.  <code>koFactory</code> is internally calling <code>koFactory.serailize</code>, so feel free to just call <code>koFactory.serialize</code>.  The data type you can pass in are Strings, Arrays, JSON, or any other type of object that can be converted to an observable.

<code>koFactory.deserialize</code> will convert a ViewModel and strip out all the koObservable/koObservableArray notations. Data that's ready for a stream (ajax, file system)...

<code>koFactory.bind</code> will take in a jQuery object or a DOM element as the first parameter and a ViewModel as the second parameter, and it will do the applyBinding for you.  The one real good reason for this is that it gracefully iterates through jQuery objects with multiple DOM elements in it, and binds them to the ViewModel.

<code>koFactory.unbind</code> will take in a jQuery object or a DOM element as its first parameter, and it will call cleanNode for you.  Again, the only good reason for this interface is that it gracefully iterates through jQuery objects with elements.


Licensing
=========

Licensed under MIT
