rjasmine
========

AMD and promises natively supported in your <a href="http://jasmine.github.io/">Jasmine</a> tests.<p>

rjasmine is not a replacement for the fastastic tool Jasmine, it is just adding some tooling around it to make it easier to consume in an AMD ecosystem.  It also has native support for promises, so your async tests can simply return a promise object, and rjasmine will simply take care of syncing up with Jasmine.<p>

Boilterplate rjasmine for AMD and Browser, checkout <a href="https://github.com/MiguelCastillo/rjasmine/tree/master/tests">unit tests</a>.  For a more complex setup, checkout the <a href="https://github.com/MiguelCastillo/MortarJs/blob/master/tests/main.js">unit tests</a> for MortarJs.<p>

Currently, rjasmine ships with Jasmine 2.0.0.  It is all bundled together, so all you need to do is include rjasmine and you are ready to start wrting and running unit tests.<p>


## Installation

Via bower
``` bash
> bower install rjasmine
```

Or get it from the dist folder.
