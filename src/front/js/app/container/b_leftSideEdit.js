define(['jquery', 'underscore', 'backbone', 
	'app/container/drawTreeEdit'], function ($, _, Backbone, Tree) {

	App.Helpers.ifIsNot((typeof App.Views.LeftSideEdit), function () {
		App.Views.LeftSideEdit = Backbone.View.extend({
			tagName: 'div',
			id: 'left-side',
			template: _.template('<h2>Navigation</h2>'),
			initialize: function () {
				this.listenTo(App.Models.treeData, "update", this.render);
			},
			render: function () {
				this.$el.html('');
				this.$el.append(
					this.template,
					Tree()
				);
				return this;
			}
		});
	});
});