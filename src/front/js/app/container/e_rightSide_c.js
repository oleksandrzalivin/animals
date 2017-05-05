define(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {

	App.Helpers.ifIsNot((typeof App.Views.RightSide_c), function () {
		App.Views.RightSide_c = Backbone.View.extend({
			tagName: 'div',
			initialize: function () {
				this.listenTo(this.model, "change", this.render);
				var name = this.model.get('name');
				this.collection = App.Collections[name];
				this.listenTo(this.collection, "update", this.render);
			},
			template: _.template('\
				<table class="tab-collection">\
					<thead>\
						<tr>\
							<td> <%= name %> </td>\
						</tr>\
					</thead>\
					<tbody>\
						<tr>\
							<td><img src=<%= img %> /></td>\
						</tr>\
						<tr>\
							<td>\
								<% var text="";\
								for(var i in description) {\
									text += "<p>" + description[i] + "</p>";\
								} %>\
								<%= text %>\
							</td>\
						</tr>\
					</tbody>\
				</table>\
				<% var childrens = "<table class=\'tab-collection\'><thead><tr><td colspan=\'2\'>Members</td></tr></thead>",\
						val = this.collection.toJSON();\
				for (var i in val) {\
					childrens += "<tr><td><a href=\'#" + this.model.get("name") + "/" + val[i]._id + "\'>" +\
					val[i].name + "</a></td><td>" + val[i].years + " years old</td></tr>";\
				}\
				childrens += "</table>"\
				%>\
				<%= childrens %>\
				'),
			render: function () {
				var self = this;
				this.$el.html(this.template(self.model.toJSON()));
				$('#right-side').html(this.$el);
				return this;
			}
		});
	});
});