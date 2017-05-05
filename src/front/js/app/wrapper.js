define([
	'jquery', 'underscore', 'backbone',
	'app/header/b_header', 'app/container/b_container', 'app/footer/b_footer'], function($, _, Backbone) {
	
	App.Helpers.ifIsNot((typeof App.Views.Wrapper), function () {
		App.Views.Wrapper = Backbone.View.extend({
			tagName: 'div',
			id: 'wrapper',
			initialize: function () {
				App.Views.header = new App.Views.Header();
				App.Views.container = new App.Views.Container();
				App.Views.footer = new App.Views.Footer();
			},
			render: function() {
				this.$el.append(
					App.Views.header.render().el,
					App.Views.container.render().el,
					App.Views.footer.render().el
					);
				$('body').html(this.$el);
				return this;
			},
			// remove all childs and itself
			remove_: function () {
				App.Views.header.remove_();
				App.Views.container.remove_();
				App.Views.footer.remove();
				this.remove();
			}
		});
	});
});