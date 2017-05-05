define(['jquery', 'underscore', 'backbone',
	'app/container/c_collections'], function ($, _, Backbone) {
	
	App.Helpers.ifIsNot((typeof App.Models.treeData), function () {
		App.Models.TreeData = Backbone.Model.extend({
			initialize: function () {
				var self = this;
				this.listenTo(App.Collections.collectionsInfo, "update", self.initialize);
				App.Models.ARRAY = [];
				_.each(App.Collections.collectionsInfo.toJSON(), function (element, index, list) {
					element.childrens = App.Collections[element.name].toJSON();
					App.Models.ARRAY.push(element);
					self.listenTo(App.Collections[element.name], "update", self.initialize);
				});

				/*App.Models.ARRAY.length !== 0 ? 
				(App.Models.ARRAY[0].childrens.length !== 0 ? 
					App.Models.ARRAY[0].childrens[0].childrens = App.Collections.cats.toJSON() : null) 
				: null;*/
				
				this.trigger('update');
			}
		});

		App.Models.treeData = new App.Models.TreeData();
	});

});