
var TABLE_EVENTS_ID = "table_events";
var TABLE_CLIENTS_ID = "table_clients";

var filterer = new Filterer();

populate();

redraw();

function populate() {
    var ev1 = new Event("Wedding", new Date(), false, 0);
    data.addEvent(ev1);

    var ev2 = new Event("New Year's Party", new Date(), true, 100);
    data.addEvent(ev2);

    var client1 = new Client("Ivan", "Georgiev", "male", 18); 
    var client2 = new Client("Mariq", "Mariq", "female", 22); 
    var client3 = new Client("Georgi", "Gechev", "male", 12);

    data.addClient(client1);
    data.addClient(client2);
    data.addClient(client3);

    data.addClientToEvent(client1.id, ev1.id);
    data.addClientToEvent(client2.id, ev1.id);
    data.addClientToEvent(client3.id, ev1.id);

    data.addClientToEvent(client1.id, ev2.id);
}

function redraw() {

    var clientTable = document.getElementById(TABLE_CLIENTS_ID);
    clientTable.innerHTML = "";
    fillClientTable(clientTable);

    var evTable = document.getElementById(TABLE_EVENTS_ID);
    evTable.innerHTML = "";
    fillEventTable(evTable);
}

function fillClientTable(table) {
    var clients = filterer.filterClients(data.getClients());
    for(var key in clients) {

        var client = clients[key];

        var row = createClientRow(client, false);

        table.appendChild(row);
    }
}

function fillEventTable(table) {
    
    var filteredEvents = filterer.filterEvents(data.getEvents());
    for(var key in filteredEvents) {
        var event = filteredEvents[key];

        var row = document.createElement("div");
        row.className = "row";

        var idEl = HtmlUtil.createElementWithText("div", event.id, "col");
        var nameDisplay = (event.price > 0 ? "$" : "!") + " " + (event.adultOnly ? "*" : "#") + " " + event.name;
        var nameEl = HtmlUtil.createElementWithText("div", nameDisplay, "col");
        var dateEl = HtmlUtil.createElementWithText("div", event.getDate(), "col");
        var adultOnly = HtmlUtil.createElementWithText("div", event.adultOnly ? "+18" : "", "col");
        var price = HtmlUtil.createElementWithText("div", event.price, "col");
        
        row.appendChild(idEl);
        row.appendChild(nameEl);
        row.appendChild(dateEl);
        row.appendChild(adultOnly);
        row.appendChild(price);

        var filteredClients = filterer.filterClients(event.clients);

        if(filteredClients.length > 0) {
            row.appendChild(createClientHeader());
        }

        CollectionUtil.forEach(filteredClients, function (client) {

            var innerRow = createClientRow(client, true, event.id);

            row.appendChild(innerRow);
        } );

        table.appendChild(row);
    }
}

function createClientRow(client, innerRow, eventId) {
    var row = document.createElement("div");
    row.className = innerRow ? "inner_row" : "row";
    var idEl = HtmlUtil.createElementWithText("div", client.id, "col");
    var nameEl = HtmlUtil.createElementWithText("div", client.getFullName(), "col");
    var genderEl = HtmlUtil.createElementWithText("div", client.gender, "col");
    var ageEl = HtmlUtil.createElementWithText("div", client.age, "col");
    var deleteBtn = HtmlUtil.createElementWithClass("div", "col");

    if(innerRow) {
        deleteBtn.innerHTML = ("<button onclick=\"controller.removeClientFromEvent('" + client.id  + "','" + eventId+ "')\">Delete</button>");
    }
    else {
        deleteBtn.innerHTML = ("<button onclick=\"controller.deleteClient('" + client.id + "')\">Delete</button>");       
    }

    row.appendChild(idEl);
    row.appendChild(nameEl);
    row.appendChild(genderEl);
    row.appendChild(ageEl);
    row.appendChild(deleteBtn);
    
    return row;
}

function createClientHeader() {
    var headerRow = HtmlUtil.createElementWithClass("div", "inner_row");
    var id = HtmlUtil.createElementWithText("div", "ID", "col");
    var name = HtmlUtil.createElementWithText("div", "Name", "col");
    var gender = HtmlUtil.createElementWithText("div", "Gender", "col");
    var age = HtmlUtil.createElementWithText("div", "Age", "col");
    var deleteBtn = HtmlUtil.createElementWithClass("div", "col");

    headerRow.appendChild(id);
    headerRow.appendChild(name);
    headerRow.appendChild(gender);
    headerRow.appendChild(age);
    headerRow.appendChild(deleteBtn);

    return headerRow;
}

function addClient() {
    var evId = document.forms["addClient"]["eventId"].value;
    var firstName = document.forms["addClient"]["firstName"].value;
    var lastName = document.forms["addClient"]["lastName"].value;
    var gender = document.forms["addClient"]["gender"].value;
    var age = document.forms["addClient"]["age"].value;

    controller.addClient(evId, firstName, lastName, gender, age);
    redraw();
}



