// App's namespace
window.App 				= Object.create(null);
	App.Helpers 		= Object.create(null);
	App.Models 			= Object.create(null);
	App.Collections 	= Object.create(null);
	App.Views 			= Object.create(null);
	App.Routes 			= Object.create(null);

// console.log form for fetch() method
App.Helpers.fetchAnswer = function (self) {
	return {
		success: function (collection, response, options) {
			console.log('Fetch data from', self.url, 'SUCCESS:', '\n\tcollection:', 
						collection, '\n\tresponse:', response, '\n\toptions:', options);
		},
		error: function (collection, response, options) {
			console.log('Fetch data from', self.url, 'ERROR:', '\n\tcollection:', 
						collection, '\n\tresponse:', response, '\n\toptions:', options);
		}
	}
};

// create object if it isn't exist
App.Helpers.ifIsNot = function (status, callback) {
	status === 'undefined' ? callback() : null;
};

// відкривання-закривання вузлів дерева
App.Helpers.tree_toggle = function(event) {
	// || for IE
    event = event || window.event;
    var clickedElem = event.target || event.srcElement;

    if (!hasClass(clickedElem, 'Expand')) {
        return; // клик не там
    }

    // Node, на который кликнули
    var node = clickedElem.parentNode;
    if (hasClass(node, 'ExpandLeaf')) {
        return; // клик на листе
    }

    // определить новый класс для узла
    var newClass = hasClass(node, 'ExpandOpen') ? 'ExpandClosed' : 'ExpandOpen';
    // заменить текущий класс на newClass
    // регексп находит отдельно стоящий open|close и меняет на newClass
    var re =  /(^|\s)(ExpandOpen|ExpandClosed)(\s|$)/;
    node.className = node.className.replace(re, '$1' + newClass + '$3');

    function hasClass(elem, className) {
    return new RegExp("(^|\\s)" + className + "(\\s|$)").test(elem.className);
    }
};

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

requirejs(['./app/router']);