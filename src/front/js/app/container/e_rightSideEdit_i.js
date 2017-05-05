define(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {

	App.Helpers.ifIsNot((typeof App.Views.RightSideEdit_i), function () {
		App.Views.RightSideEdit_i = Backbone.View.extend({
			/*tagName: 'div',
			initialize: function () {
				this.listenTo(this.model, "change", this.render);
			},
			template: _.template('\
				<table class="tab-collection">\
					<thead>\
						<tr>\
							<td colspan="2"> <%= name %> </td>\
						</tr>\
					</thead>\
					<tbody>\
						<tr>\
							<td class="person"><img src=<%= img %> /></td>\
							<td>\
								<table>\
									<tr><td>Gender: <%= gender %> </td></tr>\
									<tr><td>Age: <%= years %> </td></tr>\
									<tr><td>Weight(kg): <%= weight_kg %> </td></tr>\
									<tr><td>Favorite food: <%= favorite_food %> </td></tr>\
								</table>\
							</td>\
						</tr>\
						<tr>\
							<td colspan="2">\
								<% var text="";\
								for(var i in description) {\
									text += "<p>" + description[i] + "</p>";\
								} %>\
								<%= text %>\
							</td>\
						</tr>\
					</tbody>\
				</table>'),
			render: function () {
				var self = this;
				this.$el.html(this.template(self.model.toJSON()));
				$('#right-side').html(this.$el);
				return this;
			}*/
		});
	});
});