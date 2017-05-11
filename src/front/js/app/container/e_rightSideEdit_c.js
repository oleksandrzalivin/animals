define(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {

	App.Helpers.ifIsNot((typeof App.Views.RightSideEdit_c), function () {
		App.Views.RightSideEdit_c = Backbone.View.extend({
			tagName: 'div',
			initialize: function () {
				this.listenTo(this.model, "change", this.render);
				var name = this.model.get('name');
				this.collection = App.Collections[name];
				this.listenTo(this.collection, "update", this.render);
			},
            events: {
                "click a.edit": 'onEdit',
                "click a.delete": 'onDelete'
            },
			template: _.template('\
                <p><a  class="edit" href="#">Edit</a></p>\
                <p><a  class="delete" href="#">Delete</a></p>\
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
			}, 
            onDelete: function(e) {
                e.preventDefault();
                /*
                var file = $('input[name="file"]').prop('files');
                if (file.length) {
                    // Создаем новый объект FormData
                    var fd = new FormData();
                    fd.append('file', file[0]);
                    // Загружаем файл
                    $.ajax({
                        url: 'api/file',
                        data: fd,
                        contentType:false,
                        processData:false,
                        type:'POST',
                        success: function() {
                            console.log("file sent");
                        }
                    });
                }*/
                
               /* this.collection.create({
                    name: $('form input[name="name"]').val(),
                    img: './front/images/' + $('form input[name="file-name"]').val(),
                    description: $('form textarea[name="description"]').val().split(/\n/)
                });*/
                this.model.destroy();
            }
		});
	});
});