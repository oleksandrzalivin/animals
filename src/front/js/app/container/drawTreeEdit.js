
define(['app/container/treeData'], function() {

    function draw() {
        var ARRAY = App.Models.ARRAY;
        // create a tree from JSON
        // головний кореневий вузол
        var containerStr = 	'<ul onclick="App.Helpers.tree_toggle(arguments[0])" class="Container">' +
                            '<li class="IsRoot ExpandClosed">' +
                            '<div class="Expand"></div>' +
                            '<div class="Content"><span><a href="#edit">Home</a></span></div>';
        // генерація вкладених елементів
        function drawTree(ARRAY, p) {
            var str = "";
            // батьківський елемент
            str += "<ul class='Container'>";
            // дочірні елементи
            for (var key in ARRAY) {
                var parent = ARRAY[key].name;
                // якщо останній елемент - записати необхідні стилі
                if (key == ARRAY.length - 1) {
                    // якщо є вкладені елементи - розпакувати
                    if (ARRAY[key].childrens) {
                        str += "<li class='Node ExpandClosed IsLast'><div class='Expand'></div>" + 
                        "<div class='Content'><a data-id='" + ARRAY[key]._id + "' " +
                        "href='#edit/" + ((p||"") == p ? p + "/" : "") + (p ? ARRAY[key]._id : ARRAY[key].name) + "'>" + ARRAY[key].name + "</a></div>";
                        str += drawTree(ARRAY[key].childrens, parent);
                        str += "</li>";
                    // якщо останній елемент - записати відповідні стилі
                    } else {
                        str += "<li class='Node ExpandLeaf IsLast'><div class='Expand'></div>" + 
                        "<div class='Content'><a data-id='" + ARRAY[key]._id + "' " + 
                        "href='#edit/" + ((p||"") == p ? p + "/" : "") + (p ? ARRAY[key]._id : ARRAY[key].name) + "'>" + ARRAY[key].name + "</a></div></li>";
                    }
                // якщо не останній елемент
                } else {
                    // якщо є вкладені елементи - розпакувати
                    if (ARRAY[key].childrens) {
                        str += "<li class='Node ExpandClosed'><div class='Expand'></div>" + 
                        "<div class='Content'><a data-id='" + ARRAY[key]._id + "' " + 
                        "href='#edit/" + ((p||"") == p ? p + "/" : "") + (p ? ARRAY[key]._id : ARRAY[key].name) + "'>" + ARRAY[key].name + "</a></div>";
                        str += drawTree(ARRAY[key].childrens, parent);
                        str += "</li>";
                    // якщо останній елемент - записати відповідні стилі
                    } else {
                        str += "<li class='Node ExpandOne'><div class='Expand'></div>" + 
                        "<div class='Content'><a data-id='" + ARRAY[key]._id + "' " + 
                        "href='#edit/" + ((p||"") == p ? p + "/" : "") + (p ? ARRAY[key]._id : ARRAY[key].name) + "'>" + ARRAY[key].name + "</a></div></li>";
                    }
                }
            }
            return str + "</ul>";
        }
        return containerStr + drawTree(ARRAY) + "</li></ul>";
    }
    return draw;
});
