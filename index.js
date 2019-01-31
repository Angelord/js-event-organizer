
var TABLE_ID = "table_events";

var filterer = new Filterer();

function Filterer() {
    
    var FILTER_TYPE = {
        None : 0,
        Male_Only : 1,
        Female_Only : 2,
        Most_Clients : 3
    };
    
    var curFilter = FILTER_TYPE.None;

    var filterClient = function(client) {
        if(curFilter == FILTER_TYPE.Male_Only && client.gender != "male") { return false; }
        if(curFilter == FILTER_TYPE.Female_Only && client.gender != "female") { return false; }

        return true;
    };

    var filterByMostClients = function(events) {
        var mostClients = [];

        for(var key in events) {
            if(mostClients.length == 0 || events[key].numClients() > mostClients[0].numClients()) {
                mostClients = [];
                mostClients.push(events[key]);
            }
            else if(events[key].numClients() == mostClients[0].numClients()) {
                mostClients.push(events[key]);
            }
        }

        if(mostClients[0].numClients() == 0) {
            alert("No event has any clients");
            return events;
        } 

        return mostClients;
    } 

    this.filterClients = function(clients) {
        return CollectionUtil.filter(clients, filterClient);
    };

    this.filterEvents = function(events) {
        if(curFilter == FILTER_TYPE.Most_Clients) {
            return filterByMostClients(events);
        }

        return events;
    };

    this.changeFilter = function() {
        curFilter = document.getElementById("filterSelect").selectedIndex;
        redrawEvents();
    };
}

var ev = controller.createEvent("Wedding", false);
if(ev) {
    ev.addClient(new Client("Ivan", "Georgiev", "male", 18));
    ev.addClient(new Client("Mariq", "Ivanova", "female", 22));
}

controller.createEvent("New Year's Party", true);


redrawEvents();

function redrawEvents() {

    var evTable = document.getElementById(TABLE_ID);
    evTable.innerHTML = "";
    fillEventTable(evTable);
}

function fillEventTable(table) {

    var filteredEvents = filterer.filterEvents(events);
    for(var key in filteredEvents) {
        var event = filteredEvents[key];

        var row = document.createElement("div");
        row.className = "row";

        var idEl = createElementWithText("div", event.id, "col");
        var nameEl = createElementWithText("div", event.name, "col");
        var dateEl = createElementWithText("div", event.getDate(), "col");
        var adultOnly = createElementWithText("div", event.adultOnly ? "+18" : "", "col");
        
        row.appendChild(idEl);
        row.appendChild(nameEl);
        row.appendChild(dateEl);
        row.appendChild(adultOnly);

        if(event.clients.length > 0) {
            row.appendChild(createClientHeader());
        }
        
        var filteredClients = filterer.filterClients(event.clients);
        CollectionUtil.forEach(filteredClients, function (client, index) {

            var innerRow = document.createElement("div");
            innerRow.className = "inner_row";
            var cIdEl = createElementWithText("div", index, "col");
            var clNameEl = createElementWithText("div", client.getFullName(), "col");
            var clGenderEl = createElementWithText("div", client.gender, "col");
            var clAgeEl = createElementWithText("div", client.age, "col");
            var deleteBtn = createElementWithClass("div", "col");
            deleteBtn.innerHTML = ("<button onclick=\"controller.removeClient('" + key + "','" + index + "')\">Delete</button>");

            innerRow.appendChild(cIdEl);
            innerRow.appendChild(clNameEl);
            innerRow.appendChild(clGenderEl);
            innerRow.appendChild(clAgeEl);
            innerRow.appendChild(deleteBtn);
            row.appendChild(innerRow);
        } );

        table.appendChild(row);
    }
}

function createClientHeader() {
    var headerRow = createElementWithClass("div", "inner_row");
    var id = createElementWithText("div", "ID", "col");
    var name = createElementWithText("div", "Name", "col");
    var gender = createElementWithText("div", "Gender", "col");
    var age = createElementWithText("div", "Age", "col");
    var deleteBtn = createElementWithClass("div", "col");

    headerRow.appendChild(id);
    headerRow.appendChild(name);
    headerRow.appendChild(gender);
    headerRow.appendChild(age);
    headerRow.appendChild(deleteBtn);

    return headerRow;
}

function createElementWithClass(elType, elClass) {
    var element = document.createElement(elType);
    element.className = elClass;
    return element;
}

function createElementWithText(elType, text, elClass) {
    
    var element = document.createElement(elType);
    element.innerHTML = text;
    if(elClass) { element.className = elClass; }
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



