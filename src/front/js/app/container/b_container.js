define(['jquery', 'underscore', 'backbone',
	'app/container/b_leftSide',
	'app/container/b_rightSide'], function ($, _, Backbone) {

	App.Helpers.ifIsNot((typeof App.Views.Container), function () {
		App.Views.Container = Backbone.View.extend({
			tagName: 'div',
			className: 'center',
			id: 'container',
			initialize: function () {
				App.Views.leftSide = new App.Views.LeftSide();
			},
			render: function() {
				this.$el.html('');
				this.$el.append(
					App.Views.leftSide.render().el,
					'<div id="right-side"></div>');
				return this;
			},
			// remove all childs and itself
			remove_: function () {
				App.Views.leftSide.remove();
				App.Views.rightSide ? App.Views.rightSide.remove() : null;
				this.remove();
			}
		});
	});
});