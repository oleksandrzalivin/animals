define(['jquery', 'underscore', 'backbone',
	'app/header/c_menu'], function ($, _, Backbone) {

	// view of menu block
	App.Helpers.ifIsNot((typeof App.Views.Menu), function () {
		App.Views.Menu = Backbone.View.extend({
			collection: App.Collections.menu,
			initialize: function () {
				this.listenTo(this.collection, "update", this.render);
			},
			tagName: 'ul',
			template: _.template('<li><a href=" <%= href %> "> <%= name %> </a></li>'),
			render: function() {
				var self = this;
				this.$el.html('');
				_.each(this.collection.toJSON(), function (item, index, list) {
					var compiled = self.template(item);
					self.$el.append(compiled);
				});
				return this;
			}
		});
	});
});