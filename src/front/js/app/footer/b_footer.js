define(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {
	
	App.Helpers.ifIsNot((typeof App.Views.Footer), function () {
		App.Views.Footer = Backbone.View.extend({
			tagName: 'div',
			id: 'footer',
			template: '<div class="center"><p>&copy; Table of animals</p></div>',			
			render: function() {
				this.$el.html(this.template);
				return this;
			}
		});
	});
});