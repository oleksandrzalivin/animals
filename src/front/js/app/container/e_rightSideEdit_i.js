define(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {

	App.Helpers.ifIsNot((typeof App.Views.RightSideEdit_i), function () {
		App.Views.RightSideEdit_i = Backbone.View.extend({
			tagName: 'div',
			initialize: function () {
				this.listenTo(this.model, "change", this.render);
			},
            events: {
                'click .edit': 'onEdit',
                'click .delete': 'onDelete',
                'submit .submit': 'onSubmit'
            },
			template: _.template('\
                <a href="#" class="edit plane btn btn-warning">Edit</a><br />\
                <a href="#" class="delete plane btn btn-danger">Delete</a><br />\
				<table class="tab-collection plane">\
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
            templateEdit: _.template('\
                <form class="submit">\
                    <table class="tab-collection">\
                        <thead>\
                            <tr>\
                                <td colspan="2"><input class="form-control" type="text" name="name" placeholder=<%= name %>>Enter a name</input></td>\
                            </tr>\
                        </thead>\
                        <tbody>\
                            <tr>\
                                <td class="person"><img src=<%= img %> /><input class="form-control" type="file" name="img">Point an image</input></td>\
                                <td>\
                                    <table>\
                                        <tr><td>Gender: <input class="form-control" type="text" name="gender" placeholder=<%= gender %>></input></td></tr>\
                                        <tr><td>Age: <input class="form-control" type="text" name="age" placeholder=<%= years %>></input></td></tr>\
                                        <tr><td>Weight(kg): <input class="form-control" type="text" name="weight" placeholder=<%= weight_kg %>></input></td></tr>\
                                        <tr><td>Favorite food: <input class="form-control" type="text" name="food" placeholder=<%= favorite_food %>></input></td></tr>\
                                    </table>\
                                </td>\
                            </tr>\
                            <tr>\
                                <td colspan="2">\
                                    <% var text="";\
                                    for(var i in description) {\
                                        text += description[i] + "\\n";\
                                    } %>\
                                    <textarea class="form-control" name="description"><%= text %></textarea>\
                                </td>\
                            </tr>\
                        </tbody>\
                    </table>\
                    <button class="submit btn btn-primary" type="submit">Save</button>\
                </form>'),
			render: function () {
				var self = this;
				this.$el.html(this.template(self.model.toJSON()));
				$('#right-side').html(this.$el);
				return this;
			},
            onDelete: function (e) {
                e.preventDefault();
                this.model.destroy();
            },
            onEdit: function (e) {
                e.preventDefault();
                
                var self = this;
                $('.plane').css('display', 'none');
                this.$el.html(this.templateEdit(self.model.toJSON()));
            },
            onSubmit: function (e) {
                e.preventDefault();
                
                var file = $('input[name="img"]').prop('files');
                if (file.length) {
                    this.model.set({img: './front/images/' + $('form input[type="file"]').val()
                        .split(/\\/)[$('form input[type="file"]').val().split(/\\/).length - 1]});
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
                }
                this.model.set({
                    name: $('form input[name="name"]').val(),
                    description: $('textarea[name="description"]').val().split(/\n/),
                    gender: $('form input[name="gender"]').val(),
                    years: $('form input[name="age"]').val(),
                    weight_kg: $('form input[name="weight"]').val(),
                    favorite_food: $('form input[name="food"]').val()
                });
                this.model.save();
            }
		});
	});
});