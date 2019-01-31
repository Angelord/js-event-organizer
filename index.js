
var TABLE_ID = "table_events";

var ev = controller.createEvent("Wedding", false);
ev.addClient(new Client("Ivan", "Georgiev", "male", 18));
ev.addClient(new Client("Georgi", "Ivanov", "male", 22));

controller.createEvent("New Year's Party", true);
redrawEvents();

function redrawEvents() {

    var evTable = document.getElementById(TABLE_ID);
    evTable.innerHTML = "";
    fillEventTable(evTable);
}

function fillEventTable(table) {

    for(var key in events) {
        var event = events[key];

        var row = document.createElement("div");
        row.className = "row";

        var idEl = createElementWithText("div", event.id);
        var nameEl = createElementWithText("div", event.name);
        var adultOnly = createElementWithText("div", event.adultOnly ? "+18" : "");

        idEl.className = nameEl.className = adultOnly.className = "col";
        
        row.appendChild(idEl);
        row.appendChild(nameEl);
        row.appendChild(adultOnly);
        
        CollectionUtil.forEach(event.clients, function (client, index) {

            var innerRow = document.createElement("div");
            innerRow.className = "inner_row";
            var cIdEl = createElementWithText("div", index);
            var clNameEl = createElementWithText("div", client.getFullName());
            var deleteBtn = document.createElement("div");
            deleteBtn.innerHTML = ("<button onclick=\"controller.removeClient('" + key + "','" + index + "')\">Delete</button>");

            cIdEl.className = clNameEl.className = deleteBtn.className = "col";

            innerRow.appendChild(cIdEl);
            innerRow.appendChild(clNameEl);
            innerRow.appendChild(deleteBtn);
            row.appendChild(innerRow);
        } );

        table.appendChild(row);
    }

}

function createElementWithText(elType, text) {
    var element = document.createElement(elType);
    element.innerHTML = text;
    return element;
}

function validateCreation() {
    var name = document.forms["createEvent"]["name"].value;
    var adultOnly = document.forms["createEvent"]["adultOnly"].value;

    return controller.validateCreation(name, adultOnly);
}

function createEvent() {
    var name = document.forms["createEvent"]["name"].value;
    var adultOnly = document.forms["createEvent"]["adultOnly"].value;

    controller.createEvent(name, adultOnly);
    redrawEvents();
}

function validateModify() {
    var id = document.forms["modifyEvent"]["id"].value;
    var name = document.forms["modifyEvent"]["name"].value;
    var adultOnly = document.forms["modifyEvent"]["adultOnly"].value;

    return controller.validateModify(id, name, adultOnly);
}

function modifyEvent() {
    var id = document.forms["modifyEvent"]["id"].value;
    var name = document.forms["modifyEvent"]["name"].value;
    var adultOnly = document.forms["modifyEvent"]["adultOnly"].value;

    controller.modifyEvent(id, name, adultOnly);
    redrawEvents();
}

function validateRemoval() {
    var id = document.forms["removeEvent"]["id"].value;
    
    return controller.validateRemoval(id);
}

function removeEvent() {
    var id = document.forms["removeEvent"]["id"].value;

    var removedEv = controller.removeEvent(id);
    redrawEvents();
    alert("Removed event with name " + removedEv.name);
}

function validateAddClient() {
    var evId = document.forms["addClient"]["eventId"].value;
    var firstName = document.forms["addClient"]["firstName"].value;
    var lastName = document.forms["addClient"]["lastName"].value;
    var gender = document.forms["addClient"]["gender"].value;
    var age = document.forms["addClient"]["age"].value;
   
    return controller.validateAddClient(evId, firstName, lastName, gender, age);
}

function addClient() {
    var evId = document.forms["addClient"]["eventId"].value;
    var firstName = document.forms["addClient"]["firstName"].value;
    var lastName = document.forms["addClient"]["lastName"].value;
    var gender = document.forms["addClient"]["gender"].value;
    var age = document.forms["addClient"]["age"].value;

    controller.addClient(evId, new Client(firstName, lastName, gender, age));

    redrawEvents();
}



