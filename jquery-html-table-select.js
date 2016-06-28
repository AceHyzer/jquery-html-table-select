import $ from 'jquery'

const elements = {
    $rows: null,
    $table: null
}

const fireClickEventOnRow = (index) => {
    elements.$rows.eq(index).click();
}

const focusFirstRow = () => {
    elements.$rows.eq(0).focus();
}

const getRowSelectedIndex = () => {
    return rowSelectedIndex;
}

let rowSelectedIndex = 0; //default 0 to show top row.

const selectRow = (index) => {
    elements.$rows.eq(rowSelectedIndex).addClass('html-table-select-highlighted');
}

const deselectRow = (index) => {
    elements.$rows.eq(rowSelectedIndex).removeClass('html-table-select-highlighted');
}

const setupKeyEvents = () => {
    elements.$table.keydown((e) => {
        switch (e.which) {
            case 13: //enter
                fireClickEventOnRow(rowSelectedIndex);
                break;

            case 38: // up
                if (rowSelectedIndex > 0) {
                    elements.$rows.eq(rowSelectedIndex - 1).focus();
                }
                break;

            case 40: // down
                if (rowSelectedIndex < elements.$rows.length - 1) {
                    elements.$rows.eq(rowSelectedIndex + 1).focus();
                }
                break;

            case 37: // left
                break;

            case 39: // right
                break;

            default: return; // exit this handler for other keys
        }
        e.preventDefault(); // prevent the default action (scroll / move caret)
    });
}

const setupNumPadKeyEvents = () => {
    elements.$table.keydown((e) => {
        switch (e.which) {
            case 104: //numpad 8 (up)
                if (rowSelectedIndex > 0) {
                    elements.$rows.eq(rowSelectedIndex - 1).focus();
                }
                break;
            
            case 98: //numpad 2 (down)
                if (rowSelectedIndex < elements.$rows.length - 1) {
                    elements.$rows.eq(rowSelectedIndex + 1).focus();
                }
                break;
            
            default: return; // exit this handler for other keys
        }
        e.preventDefault();
    })
}

const setupOnClickEvent = (callback) => {
    elements.$rows.click(function (e) {
        callback(this, rowSelectedIndex);
    });
}

const setupOnFocusEvent = (newIndex) => {
    elements.$rows.focus(function (e) {
        deselectRow(rowSelectedIndex);
        rowSelectedIndex = e.currentTarget.rowIndex - 1;
        selectRow(rowSelectedIndex);
    });
}

const setRowIndex = (index) => {
    rowSelectedIndex = index;
}

const setupTableForSelection = ($tableElement, options = {}) => {
    elements.$table = $tableElement;
    elements.$rows = elements.$table.find('tbody').children('tr');
    elements.$rows.attr("tabindex", "0");
    elements.$rows.addClass('cursor-pointer');
    
    elements.$rows.off('focus'); //detach focus event in case it has already been set.
    setupOnFocusEvent();
    
    elements.$table.off('keydown'); //detach keydown event in case it has already been set.
    setupKeyEvents();
    if(options.numPadNavigation) {
        setupNumPadKeyEvents();
    }
    
    if(typeof(options.onSelect) === "function"){
        elements.$rows.off('click'); //detach click event in case it has already been set.
        setupOnClickEvent(options.onSelect);
    }
    
    if(options.focusFirstRow) {
        focusFirstRow();
    }
    
    return {
        getRowSelectedIndex,
        selectRow,
    }
}

export default {
    setupTableForSelection,
}