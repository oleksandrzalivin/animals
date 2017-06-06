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
            template_form: function() {
                return '\
                    <form class="submit" autocomplete="on">\
                        <table class="tab-collection">\
                            <thead>\
                                <tr>\
                                    <td><input class="form-control" type="text" name="name" placeholder="Name"></input>\</td>\
                                </tr>\
                            </thead>\
                            <tbody>\
                                <tr>\
                                    <td>Choose an image. <input class="form-control" type="file" name="file"></input>\
                                        <img id="image" src="./front/images/loader.gif" /></td>\
                                </tr>\
                                <tr>\
                                    <td><textarea class="form-control" name="description" placeholder="Description. Use \'enter\' to make a paragraf."></textarea></td>\
                                </tr>\
                            </tbody>\
                        </table>\
                        <button class="btn btn-primary" type="submit">Save</button>\
                    </form>'
            },
			render: function () {
				var self = this;
				// cleare the el
				this.$el.html('<p><a href="#" class="add-new-collection btn btn-primary">Add new collection</a></p>');
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
                $('input[name="file"]').change(function () {
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
                                $('#image').attr('src', './front/images/' + $('form input[type="file"]').val()
                                                        .split(/\\/)[$('form input[type="file"]').val().split(/\\/).length - 1]);
                            }
                        });
                    }
                });
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
                this.$el.html('<h1>Successfull</h1>');
            }
		});
	});
});