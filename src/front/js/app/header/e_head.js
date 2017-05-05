define(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {
	
	App.Helpers.ifIsNot((typeof App.Views.Head), function () {
		App.Views.Head = Backbone.View.extend({
			tagName: 'h1',			
			render: function() {
				this.$el.html('Table of animals');
				return this;
			}
		});
	});
});