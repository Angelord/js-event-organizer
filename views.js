
var PAGE_ID = "page";

function displayEvents() {
    clearElement(PAGE_ID);

    var page = document.getElementById(PAGE_ID);

    var optionsGroup = document.createElement("div");
    optionsGroup.className = "options";
    var addUI = getCreationUI();
    var modUI = getModifyUI();
    var removalUI = getRemovalUI();
    var evTable = createEventTable();

    optionsGroup.appendChild(addUI);
    optionsGroup.appendChild(modUI);
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

function getRemovalUI() {
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

function getModifyUI() {
    var div = document.createElement("div");

    var form = "\
    <form action='JavaScript:modifyEvent()' onsubmit='return validateModify()'>\
    <h4> Modify Event:</h4>\
    <label for='input_mod_id'>ID</label>                <input type='text' name='id' id='input_mod_id'/>\
    <label for='input_mod_name'>Name</label>            <input type='text' name='name' id='input_mod_name'/>\
    <label for='input_mod_adult'>Adult Only</label>     <input type='checkbox' name='adultOnly' id='input_mod_adult'/>\
    <input type='submit' value='Modify' class='submit_btn'/>\
    </form>";
    
    div.innerHTML = form;

    return div;
}

function getCreationUI() {
    var div = document.createElement("div");

    var form = "\
    <form action='JavaScript:createEvent()' onsubmit='return validateCreation()'>\
    <h4> Add New Event:</h4>\
    <label for='input_add_name'>Name</label>            <input type='text' name='name' id='input_add_name'/>\
    <label for='input_add_adult'>Adult Only</label>     <input type='checkbox' name='adultOnly' id='input_add_adult'/>\
    <input type='submit' value='Add' class='submit_btn'/>\
    </form>";
    
    div.innerHTML = form;

    return div;
}

function validateCreation() {
    var nameField = document.getElementById("input_add_name");
    var adultField = document.getElementById("input_add_adult");

    return controller.validateCreation(nameField.value, adultField.value);
}

function validateModify() {
    var idField = document.getElementById("input_mod_id");
    var nameField = document.getElementById("input_mod_name");
    var adultField = document.getElementById("input_mod_adult");

    return controller.validateModify(idField.value, nameField.value, adultField.checked);
}

function validateRemoval() {
    var removeField = document.getElementById("input_remove_id");
    
    return controller.validateRemoval(removeField.value);
}

function createEvent() {
    var nameField = document.getElementById("input_add_name");
    var adultField = document.getElementById("input_add_adult");

    controller.createEvent(nameField.value, adultField.checked);
    displayEvents();
}

function modifyEvent() {
    var idField = document.getElementById("input_mod_id");
    var nameField = document.getElementById("input_mod_name");
    var adultField = document.getElementById("input_mod_adult");

    controller.modifyEvent(idField.value, nameField.value, adultField.checked);
    displayEvents();
}

function removeEvent() {
    var removeField = document.getElementById("input_remove_id");

    controller.removeEvent(removeField.value);
    displayEvents();
}

