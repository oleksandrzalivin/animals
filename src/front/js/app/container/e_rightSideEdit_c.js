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
                "click a.delete": 'onDelete',
                "click a.addMember": 'onAddMember',
                "submit": 'onSubmit'
            },
			template: _.template('\
                <p><a  class="edit plane btn btn-warning" href="#">Edit</a></p>\
                <p><a  class="delete plane btn btn-danger" href="#">Delete</a></p>\
                <p><a  class="addMember plane btn btn-primary" href="#">Add a member</a></p>\
				<table class="tab-collection plane">\
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
                if (val.length) {\
                    for (var i in val) {\
                        childrens += "<tr><td><a href=\'#edit/" + this.model.get("name") + "/" + val[i]._id + "\'>" +\
                        val[i].name + "</a></td><td>" + val[i].years + " years old</td></tr>";\
                    }\
				    childrens += "</table>";\
                } else {childrens="<p>No members.</p>"}\
				%>\
                <%= childrens %>\
				'),
            templateEdit: _.template('\
                <form>\
                    <table class="tab-collection">\
                        <thead>\
                            <tr>\
                                <td><input class="form-control" type="text" name="name" placeholder="<%= name %>"></input></td>\
                            </tr>\
                        </thead>\
                        <tbody>\
                            <tr>\
                                <td>\
                                    <input class="form-control" type="file" name="img">Change the image</input>\
                                    <img src=<%= img %> />\
                                </td>\
                            </tr>\
                            <tr>\
                                <td>\
                                    <% var text="";\
                                    for(var i in description) {\
                                        text += description[i] + "\\n";\
                                    } %>\
                                    <textarea class="form-control" name="description"> <%= text %> </textarea>\
                                </td>\
                            </tr>\
                        </tbody>\
                    </table>\
                    <button class="btn btn-primary" type="submit">Save</button>\
                    <% var childrens = "<table class=\'tab-collection\'><thead><tr><td colspan=\'2\'>Members</td></tr></thead>",\
                            val = this.collection.toJSON();\
                    for (var i in val) {\
                        childrens += "<tr><td><a href=\'#" + this.model.get("name") + "/" + val[i]._id + "\'>" +\
                        val[i].name + "</a></td><td>" + val[i].years + " years old</td></tr>";\
                    }\
                    childrens += "</table>"\
                    %>\
                    <%= childrens %>\
                </form>\
				'),
            templateMember: '\
                <form class="member">\
                    <table class="tab-collection">\
                        <thead>\
                            <tr>\
                                <td colspan="2"><input class="form-control" type="text" name="name">Enter a name</input></td>\
                            </tr>\
                        </thead>\
                        <tbody>\
                            <tr>\
                                <td><input class="form-control" type="file" name="img">Point an image</input></td>\
                                <td>\
                                    <table>\
                                        <tr><td>Gender: <input class="form-control" type="text" name="gender">male or female</input></td></tr>\
                                        <tr><td>Age(years): <input class="form-control" type="text" name="age">3.1</input></td></tr>\
                                        <tr><td>Weight(kg): <input class="form-control" type="text" name="weight">2</input></td></tr>\
                                        <tr><td>Favorite food: <input class="form-control" type="text" name="food">fish</input></td></tr>\
                                    </table>\
                                </td>\
                            </tr>\
                            <tr>\
                                <td colspan="2">\
                                    <textarea class="form-control" name="description">Use Enter to make a paragraf</textarea>\
                                </td>\
                            </tr>\
                        </tbody>\
                    </table>\
                    <button class="btn btn-primary" type="submit">Save</button>\
                <form>',
			render: function () {
				var self = this;
				this.$el.html(this.template(self.model.toJSON()));
				$('#right-side').html(this.$el);
				return this;
			}, 
            onDelete: function(e) {
                e.preventDefault();
                this.model.destroy();
            },
            onEdit: function (e) {
                e.preventDefault();
                var self = this;
                $('.plane').css('display', 'none');
                this.$el.html(this.templateEdit(self.model.toJSON()));
            },
            onAddMember: function (e) {
                e.preventDefault();
                var self = this;
                $('.plane').css('display', 'none');
                
                this.$el.html(self.templateMember);
            },
            addMember: function (e) {
                //this.model - its a molel with info about a collection
                //selecting this collection
                var theCollection = App.Collections[this.model.get('name')],
                    newModel = Object.create(null);
                
                var file = $('input[name="img"]').prop('files');
                if (file.length) {
                    var fileName = $('form input[type="file"]').val();
                    newModel.img = './front/images/' + fileName.split(/\\/)[fileName.split(/\\/).length - 1];
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
                
                newModel.name = $('form input[name="name"]').val();
                newModel.description = $('textarea[name="description"]').val().split(/\n/);
                newModel.gender = $('form input[name="gender"]').val();;
                newModel.years = $('form input[name="age"]').val();;
                newModel.weight_kg = $('form input[name="weight"]').val();;
                newModel.favorite_food = $('form input[name="food"]').val();;
                    
                theCollection.create(newModel);
            },
            onSubmit: function (e) {
                e.preventDefault();
                if (e.target.className == 'member') {
                    this.addMember(e);
                } else {
                    this.onSubmitEdit(e);
                }
            },
            onSubmitEdit: function (e) {                
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
                    description: $('textarea[name="description"]').val().split(/\n/)
                });
                this.model.save();
            }
		});
	});
});