define(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {
	
	App.Helpers.ifIsNot((typeof App.Collections.menu), function () {

		// prototype model
		App.Models.One = Backbone.Model.extend({
				idAttribute: "_id"
			});

		// collection with data for menu
		App.Collections.Menu = Backbone.Collection.extend({
			url: '/api/collection/menu',
			model: App.Models.One,
			initialize: function () {
				this.fetch(App.Helpers.fetchAnswer(this) );
			}
		});

		// instance
		App.Collections.menu = new App.Collections.Menu();
	});
});