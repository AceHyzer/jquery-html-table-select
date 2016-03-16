#jQuery HTML Table Select
This is a simple table row selector written in ES6/ES2015 and has an import dependency on jQuery.

##Usage
To use the table selector, you must pass in the jquery table element and options. 

**Important**: Your table must have a <tbody> tag for the selector to work. It will only select rows inside the <tbody> element.

###Options
onSelect: callback function that binds to click event or enter.

focusFirstRow: boolean, defaults to false, if set to true the first row will autoselect as soon as the table is passed into the selector for setup.

```javascript

import HtmlTableSelect from 'jquery-html-table-select'

HtmlTableSelect.setupTableForSelection(
    $('#my-table'), 
    {
            onSelect: function(element, index){
                console.log(element);
                console.log("selected: " + index);
            },
            focusFirstRow: true
    }
);

```