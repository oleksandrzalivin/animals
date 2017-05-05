define(['jquery', 'underscore', 'backbone',
       'app/wrapper',
       'app/wrapperEdit'], function($, _, Backbone) {

	App.Routes.Router = Backbone.Router.extend({
        
		initialize: function () {
			// adding start point
			Backbone.history.start();
		},

		routes: {
            'edit': 'edit',
			'edit/:collection': 'edit',
            'edit/:collection/:id': 'edit',
	    	'*collection/:id': 'defaultRoute',
	    	'*actions': 'defaultRoute'
		},

		edit: function (collection, id) {
            console.log('//// Started "edit" route');
            
			// if page is loading for the first time
            this._wrapper('edit');
            
            App.Views.rightSideEdit ? App.Views.rightSideEdit.remove() : null;
            $('#right-side').html('<h1 class="loader">Loading...</h1>');
            
            // checking for exist such element
            var res = this._checkElement(this.edit, collection, id) ? true : false;
            if (!res) return;
            
            // empty url
			if (!collection) {
				App.Views.rightSideEdit = new App.Views.RightSideEdit();
				App.Views.rightSideEdit.render();
                return;
			}
            
            return;
            // collection only
			if (collection && !id) {

				// find a model (collection)
				var model = _.find(App.Collections.collectionsInfo.toJSON(), function (el) {
					return el.name == collection;
				});
				var id = model._id;
    
				App.Views.rightSide = new App.Views.RightSide_c({model: App.Collections.collectionsInfo.get(id)});
				App.Views.rightSide.render();
                return;
			}
			
			// item of a collection
			if (collection && id) {

				// find a model
				var theCollection = App.Collections[collection];
				App.Views.rightSide = new App.Views.RightSide_i({model: theCollection.get(id)});
				App.Views.rightSide.render();
			}
		},

		defaultRoute: function(collection, id) {
            console.log('//// Started "defaultRoute"');
            
            // if page is loading for the first time
            this._wrapper(); 
            App.Views.rightSide ? App.Views.rightSide.remove() : null;
            $('#right-side').html('<h1 class="loader">Loading...</h1>');
            
            // checking for exist such element
            var res = this._checkElement(this.defaultRoute, collection, id) ? true : false;
            if (!res) return;
            
            // empty url
			if (!collection) {
				App.Views.rightSide = new App.Views.RightSide();
				App.Views.rightSide.render();
                return;
			}
            
            // collection only
			if (collection && !id) {

				// find a model (collection)
				var model = _.find(App.Collections.collectionsInfo.toJSON(), function (el) {
					return el.name == collection;
				});
				var id = model._id;
    
				App.Views.rightSide = new App.Views.RightSide_c({model: App.Collections.collectionsInfo.get(id)});
				App.Views.rightSide.render();
                return;
			}
			
			// item of a collection
			if (collection && id) {

				// find a model
				var theCollection = App.Collections[collection];
				App.Views.rightSide = new App.Views.RightSide_i({model: theCollection.get(id)});
				App.Views.rightSide.render();
			}
		},
		_onEmptyCollections: function (collection, caller, colName, id) {
			$('#right-side').html('<p>Page is loading...</p>');
			var self = this,
				retry = function() {
				    caller(colName, id);
					console.log('Restart with updated data');
				};
            collection.once("update", retry);
		},
		_wrapper: function (caller) {
            if (caller == 'edit') {
                typeof App.Views.wrapper !== 'undefined' && $('#wrapper').length ? App.Views.wrapper.remove_() : null;
                
                App.Helpers.ifIsNot((typeof App.Views.wrapperEdit), function () {
                    App.Views.wrapperEdit = new App.Views.WrapperEdit();
                });
                $('#wrapper-edit').length ? null : App.Views.wrapperEdit.render();
                
            } else {
                
                typeof App.Views.wrapperEdit !== 'undefined' && $('#wrapper-edit').length ? App.Views.wrapperEdit.remove_() : null;
                /*
                // create an instance and render it
                if (typeof App.Views.wrapper === 'undefined') {
                    require(['app/wrapper'], function() {
                        App.Views.wrapper = new App.Views.Wrapper();
                        App.Views.wrapper.render();
                    });
                } else {
                    App.Views.wrapper.render();
                }*/
                App.Helpers.ifIsNot((typeof App.Views.wrapper), function () {
                    App.Views.wrapper = new App.Views.Wrapper();
                });
                $('#wrapper').length ? null : App.Views.wrapper.render();
            }
		},
		_checkElement: function (caller, collection, model) {
            // make sure that collectionsInfo fetched data
            if (!App.Collections.collectionsInfo.length) {
                this._onEmptyCollections(App.Collections.collectionsInfo, caller, collection, model);
                return;
            }
            
            // empty path, home page
            if (!collection ) return true;
            
            // checking for exist a collection
			var isCollection = _.find(App.Collections.collectionsInfo.toJSON(), function(el) { 
				return collection == el.name; 
			});
            
            if (isCollection && !model) {
                return true;
			}
            if (!isCollection) {
                this._noPath();
                return;
            }
            
            // checking for exist a model
			var theModel;
			if (isCollection && model) {
                if (!App.Collections[collection].length) {
					this._onEmptyCollections(App.Collections[collection], caller, collection, model);
					return;
				}
                
				theModel = App.Collections[collection].get(model);
                if (!theModel) {
				    this._noPath();
                    return;
			     } else {
                    return true;
                }
			}
            
		},
		_noPath: function () {
            $('#right-side').length ? 
                $('#right-side').html('<h1>No such page.</h1>') : 
                $('body').html('<h1>No such page.</h1>');
		}
	});

	// initialize page bulding
	$(document).ready(function(){
		App.Routes.app = new App.Routes.Router();
	});
});