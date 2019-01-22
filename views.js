
var PAGE_ID = "page";

function displayEvents() {
    clearElement(PAGE_ID);

    var page = document.getElementById(PAGE_ID);

    var removalUI = createRemovalUI();
    var evTable = createEventTable();
    
    page.appendChild(removalUI)
    page.appendChild(evTable);
}

function createEventTable() {
    var table = document.createElement("table");

    for(var key in events) {
        var event = events[key];

        var row = document.createElement("tr");
        
        var idEl = createElementWithText("th", event.id);
        var nameEl = createElementWithText("th", event.name);
        var adultOnly = createElementWithText("th", event.adultOnly ? "+18" : "");

        row.appendChild(idEl);
        row.appendChild(nameEl);
        row.appendChild(adultOnly);

        table.appendChild(row);
    }
    return table;
}

function clearElement(id) {
    var element = document.getElementById(id);
    element.innerHTML = "";
}

function createElementWithText(elType, text) {
    var element = document.createElement(elType);
    element.innerHTML = text;
    return element;
}

function createRemovalUI() {
    var div = document.createElement("div");

    var form = "\
    <form action='JavaScript:removeEvent()' onsubmit='return validateRemoval()'>\
    Remove:\
    <input type='text' name='id' id='remove_input'/>\
    <input type='submit' value='Remove'/>\
    </form>";
    
    div.innerHTML = form;

    return div;
}

function validateRemoval() {
    var removeField = document.getElementById("remove_input");
    return (removeField.value in events);
}

function removeEvent() {
    var removeField = document.getElementById("remove_input");
    delete events[removeField.value];
    displayEvents();
}

