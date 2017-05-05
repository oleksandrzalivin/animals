define(['jquery', 'underscore', 'backbone',
	'app/header/e_head',
	'app/header/e_menu'], function ($, _, Backbone) {

	App.Helpers.ifIsNot((typeof App.Views.Header), function () {
		App.Views.Header = Backbone.View.extend({
			tagName: 'div',
			id: 'header',
			className: 'center',
			initialize: function () {
				App.Views.head = new App.Views.Head();
				App.Views.menu = new App.Views.Menu();
			},
			render: function() {
				this.$el.append(
					App.Views.head.render().el,
					App.Views.menu.render().el
					);
				return this;
			},
			// remove all childs and itself
			remove_: function () {
				App.Views.head.remove();
				App.Views.menu.remove();
				this.remove();
			}
		});
	});
});