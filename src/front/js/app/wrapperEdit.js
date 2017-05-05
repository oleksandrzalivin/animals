define([
	'jquery', 'underscore', 'backbone',
	'app/header/b_header', 'app/container/b_containerEdit', 'app/footer/b_footer'], function($, _, Backbone) {
	
	App.Helpers.ifIsNot((typeof App.Views.WrapperEdit), function () {
		App.Views.WrapperEdit = Backbone.View.extend({
			tagName: 'div',
			id: 'wrapper-edit',
			initialize: function () {
				App.Views.header = new App.Views.Header();
				App.Views.containerEdit = new App.Views.ContainerEdit();
				App.Views.footer = new App.Views.Footer();
			},
			render: function() {
				this.$el.append(
					App.Views.header.render().el,
					App.Views.containerEdit.render().el,
					App.Views.footer.render().el
					);
				$('body').html(this.$el);
				return this;
			},
			// remove all childs and itself
			remove_: function () {
				App.Views.header.remove_();
				App.Views.containerEdit.remove_();
				App.Views.footer.remove();
				this.remove();
			}
		});
	});
});