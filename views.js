
var PAGE_ID = "page";

function displayEvents() {
    clearElement(PAGE_ID);

    var page = document.getElementById(PAGE_ID);

    var optionsGroup = document.createElement("div");
    optionsGroup.className = "options";
    var addUI = createAddUI();
    var removalUI = createRemovalUI();
    var evTable = createEventTable();

    optionsGroup.appendChild(addUI);
    optionsGroup.appendChild(removalUI);
    page.appendChild(optionsGroup);
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
    <h4>Remove Event:</h4>\
    <label for='input_remove_id'>ID</label>     <input type='text' name='id' id='input_remove_id'/>\
    <input type='submit' value='Remove' class='submit_btn'/>\
    </form>";
    
    div.innerHTML = form;

    return div;
}

function createAddUI() {
    var div = document.createElement("div");

    var form = "\
    <form action='JavaScript:addEvent()' onsubmit='return validateAdd()'>\
    <h4> Add New Event:</h4>\
    <label for='input_add_name'>Name</label>            <input type='text' name='name' id='input_add_name'/>\
    <label for='input_add_adult'>Adult Only</label>     <input type='checkbox' name='adultOnly' id='input_add_adult'/>\
    <input type='submit' value='Add' class='submit_btn'/>\
    </form>";
    
    div.innerHTML = form;

    return div;
}

function validateAdd() {
    var nameField = document.getElementById("input_add_name");
    var adultField = document.getElementById("input_add_adult");

    return (!isBlank(nameField.value));
}

function validateRemoval() {
    var removeField = document.getElementById("input_remove_id");
    return (removeField.value in events);
}


//TODO : Move to controller.js
function addEvent() {
    var nameField = document.getElementById("input_add_name");
    var adultField = document.getElementById("input_add_adult");

    new Event(nameField.value, adultField.checked);

    displayEvents();
}

function removeEvent() {
    var removeField = document.getElementById("input_remove_id");
    delete events[removeField.value];
    displayEvents();
}

