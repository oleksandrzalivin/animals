define(['jquery', 'underscore', 'backbone', 
	'app/container/c_collections',
	'app/container/e_rightSide_c', 'app/container/e_rightSide_i'], function ($, _, Backbone) {

	App.Helpers.ifIsNot((typeof App.Views.RightSide), function () {
		App.Views.RightSide = Backbone.View.extend({
			tagName: 'div',
			collection: App.Collections.collectionsInfo,
			initialize: function () {
				this.listenTo(this.collection, "update", this.render);
			},
			template: _.template('\
				<table class="tab-collection">\
					<thead>\
						<tr>\
							<td><a href="#<%= name %>"> <%= name %> </a></td>\
						</tr>\
					</thead>\
					<tbody>\
						<tr>\
							<td><img src=<%= img %> /></td>\
						</tr>\
					</tbody>\
				</table>'),
			render: function () {
				var self = this;
				// cleare the el
				this.$el.html('');
				_.each(this.collection.toJSON(), function (model, index, list) {
					self.$el.append(self.template(model));
				});
				$('#right-side').html(this.$el);
				return this;
			}
		});
	});
});