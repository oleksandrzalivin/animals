define(['jquery', 'underscore', 'backbone',
        'app/container/c_collections',
	'app/container/e_rightSideEdit_c', 'app/container/e_rightSideEdit_i'], function ($, _, Backbone) {

	App.Helpers.ifIsNot((typeof App.Views.RightSideEdit), function () {
		App.Views.RightSideEdit = Backbone.View.extend({
			tagName: 'div',
			initialize: function () {
                this.collection = App.Collections.collectionsInfo;
				this.listenTo(this.collection, "update", this.render);
			},
            events: {
                "click a.add-new-collection": 'addNewCollection',
                "submit form.submit": 'onForm'
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
            template_form: function(self) {
                return '\
                    <form class="submit" autocomplete="on">\
                        <table class="tab-collection">\
                            <thead>\
                                <tr>\
                                    <td><input type="text" name="name" placeholder="Name"></input>\</td>\
                                </tr>\
                            </thead>\
                            <tbody>\
                                <tr>\
                                    <td>Choose an image. <input type="file" name="file"></input>\</td>\
                                </tr>\
                                <tr>\
                                    <td><textarea name="description" placeholder="Description. Use \'enter\' to make a paragraf."></textarea></td>\
                                </tr>\
                            </tbody>\
                        </table>\
                        <button type="submit">Save</button>\
                    </form>'
            },
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
                this.$el.prepend(this.template_form);
                $(e.target).css('display', 'none');
            },
            onForm: function(e) {
                e.preventDefault();
                
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
                }
                this.collection.create({
                    name: $('form input[name="name"]').val(),
                    img: './front/images/' + $('form input[type="file"]').val()
                        .split(/\\/)[$('form input[type="file"]').val().split(/\\/).length - 1],
                    description: $('form textarea[name="description"]').val().split(/\n/)
                });
            }
		});
	});
});