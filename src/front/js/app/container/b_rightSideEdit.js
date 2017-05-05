define(['jquery', 'underscore', 'backbone',
        'app/container/c_collections'/*,
	'app/container/e_rightSideEdit_c', 'app/container/e_rightSideEdit_i'*/], function ($, _, Backbone) {

	App.Helpers.ifIsNot((typeof App.Views.RightSideEdit), function () {
		App.Views.RightSideEdit = Backbone.View.extend({
			tagName: 'div',
			initialize: function () {
                this.collection = App.Collections.collectionsInfo;
				this.listenTo(this.collection, "update", this.render);
			},
            events: {
                "click a.add-new-collection": 'addNewCollection'
            },
			template: _.template('\
				<table class="tab-collection">\
					<thead>\
						<tr>\
							<td><a href="#edit/<%= name %>"> <%= name %> </a></td>\
						</tr>\
					</thead>\
					<tbody>\
						<tr>\
							<td><img src=<%= img %> /></td>\
						</tr>\
					</tbody>\
				</table>'),
            template_new: '\
				<table class="tab-collection">\
					<thead>\
						<tr>\
							<td><a href="#edit">new</a></td>\
						</tr>\
					</thead>\
					<tbody>\
						<tr>\
							<td><img src="" /></td>\
						</tr>\
					</tbody>\
				</table>',
			render: function () {
				var self = this;
				// cleare the el
				this.$el.html('<p><a href="#" class="add-new-collection">Add new collection.</a></p>');
				_.each(this.collection.toJSON(), function (model, index, list) {
					self.$el.append(self.template(model));
				});
				$('#right-side').html(this.$el);
				return this;
			},
            addNewCollection: function (e) {
                e.preventDefault();
                this.$el.prepend(this.template_new);
                $(e.target).css('display', 'none');
            }
		});
	});
});