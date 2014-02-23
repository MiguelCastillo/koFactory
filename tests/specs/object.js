define([
  "koFactory",
  "text!tests/json/object.json",
  "text!tests/json/objectExt.json"
], function(koFactory, data, dataExt) {

  var ko = koFactory.ko;

  describe("Object Serialization", function() {
    it("isObservable", function() {
      var viewModel = koFactory(JSON.parse(data));
      expect(ko.isObservable(viewModel.author)).toBe(true);
      expect(ko.isObservable(viewModel.version)).toBe(true);
      expect(ko.isObservable(viewModel.name)).toBe(true);
    });

    it("Property updates", function() {
      var viewModel = koFactory(JSON.parse(data));
      expect(viewModel.author()).toBe("Unknown");

      viewModel.author("For Fun");
      expect(viewModel.author()).not.toBe("Unknown");
      expect(viewModel.author()).toBe("For Fun");

      expect(viewModel.version()).toBe("0.0.1");
      viewModel.version("0.0.2");
      expect(viewModel.version()).not.toBe("0.0.1");
      expect(viewModel.version()).toBe("0.0.2");
    });

    it("Object merge/updates", function() {
      var viewModel = koFactory(JSON.parse(data));
      expect(viewModel.author()).toBe("Unknown");
      expect(viewModel.version()).toBe("0.0.1");
      expect(viewModel.name()).toBe("Awesome JS");
      expect(viewModel.dependency).toBeUndefined();

      koFactory(JSON.parse(dataExt), viewModel);
      expect(viewModel.author()).toBe("Unknown");
      expect(viewModel.version()).toBe("0.1.0");
      expect(viewModel.name()).toBe("koFactory");
      expect(ko.isObservable(viewModel.dependency)).toBe(true);
      expect(viewModel.dependency()).toBe("ko");
    });
  });


  describe("Object Deserialization", function() {
    it("isObservable", function() {
      var viewModel = koFactory(JSON.parse(data));
      expect(ko.isObservable(viewModel.author)).toBe(true);
      expect(ko.isObservable(viewModel.version)).toBe(true);
      expect(ko.isObservable(viewModel.name)).toBe(true);

      var model1 = koFactory.deserialize(viewModel);
      expect(ko.isObservable(model1.author)).toBe(false);
      expect(ko.isObservable(model1.version)).toBe(false);
      expect(ko.isObservable(model1.name)).toBe(false);
    });

    it("Property updates", function() {
      var viewModel = koFactory(JSON.parse(data));
      expect(viewModel.author()).toBe("Unknown");

      viewModel.author("For Fun");
      expect(viewModel.author()).not.toBe("Unknown");
      expect(viewModel.author()).toBe("For Fun");

      var model1 = koFactory.deserialize(viewModel);
      expect(model1.author).not.toBe("Unknown");
      expect(model1.author).toBe("For Fun");

      expect(viewModel.version()).toBe("0.0.1");
      viewModel.version("0.0.2");
      expect(viewModel.version()).not.toBe("0.0.1");
      expect(viewModel.version()).toBe("0.0.2");

      var model2 = koFactory.deserialize(viewModel);
      expect(model2.version).not.toBe("0.0.1");
      expect(model2.version).toBe("0.0.2");
    });

    it("Object merge/updates", function() {
      var viewModel = koFactory(JSON.parse(data));
      expect(viewModel.author()).toBe("Unknown");
      expect(viewModel.version()).toBe("0.0.1");
      expect(viewModel.name()).toBe("Awesome JS");
      expect(viewModel.dependency).toBeUndefined();

      var model1 = koFactory.deserialize(viewModel);
      expect(model1.author).toBe("Unknown");
      expect(model1.version).toBe("0.0.1");
      expect(model1.name).toBe("Awesome JS");
      expect(model1.dependency).toBeUndefined();

      koFactory(JSON.parse(dataExt), viewModel);
      expect(viewModel.author()).toBe("Unknown");
      expect(viewModel.version()).toBe("0.1.0");
      expect(viewModel.name()).toBe("koFactory");
      expect(ko.isObservable(viewModel.dependency)).toBe(true);
      expect(viewModel.dependency()).toBe("ko");

      var model2 = koFactory.deserialize(viewModel);
      expect(model2.author).toBe("Unknown");
      expect(model2.version).toBe("0.1.0");
      expect(model2.name).toBe("koFactory");
      expect(ko.isObservable(model2.dependency)).toBe(false);
      expect(model2.dependency).toBe("ko");
    });
  });

});
