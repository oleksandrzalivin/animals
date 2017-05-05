define(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {

	// constructors and instances of each collections of animals
	App.Helpers.ifIsNot((typeof App.Collections.collectionsInfo), function () {
		// info about collections with animals
		App.Collections.CollectionsInfo = Backbone.Collection.extend({
			url: 'api/collection/collectionsInfo',
			model: App.Models.One,
			initialize: function () {
				this.fetch(App.Helpers.fetchAnswer(this) );
				this.on("update", this.buildOther);
			},
			buildOther: function () {
				var self = this;
				_.each(self.toJSON(), function (value, key, list) {
					// create a new constructor
					App.Collections[value.name.capitalize()] = Backbone.Collection.extend({
						url: 'api/collection/' + value.name,
						model: App.Models.One,
						initialize: function () {
							this.fetch(App.Helpers.fetchAnswer(this) );
						}
					});
					// create an instance
					App.Collections[value.name] = new App.Collections[value.name.capitalize()];
				});
			}
		});
		// instance
		App.Collections.collectionsInfo = new App.Collections.CollectionsInfo();
	});


});