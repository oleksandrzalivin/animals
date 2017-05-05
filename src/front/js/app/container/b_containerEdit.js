define(['jquery', 'underscore', 'backbone',
	'app/container/b_leftSideEdit',
	'app/container/b_rightSideEdit'], function ($, _, Backbone) {

	App.Helpers.ifIsNot((typeof App.Views.ContainerEdit), function () {
		App.Views.ContainerEdit = Backbone.View.extend({
			tagName: 'div',
			className: 'center',
			id: 'container',
			initialize: function () {
				App.Views.leftSideEdit = new App.Views.LeftSideEdit();
			},
			render: function() {
				this.$el.html('');
				this.$el.append(
					App.Views.leftSideEdit.render().el,
					'<div id="right-side"></div>');
				return this;
			},
			// remove all childs and itself
			remove_: function () {
				App.Views.leftSideEdit.remove();
				App.Views.rightSideEdit ? App.Views.rightSideEdit.remove() : null;
				this.remove();
			}
		});
	});
});