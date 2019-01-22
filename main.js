
var EVENT_TABLE_ID = "event_table";

var idGenerator = {
    lastId : 0,
    next : function() { return ++this.lastId; }
};

var events = [];

main();

function main() {
   
    var event = new Event("New year party", true);
    var event2 = new Event("Wedding", false);

    events.push(event);
    events.push(event2);

    clearElement(EVENT_TABLE_ID);
    displayEvents();
}

function clearElement(id) {
    var table = document.getElementById(id);
    table.innerHTML = "";
}

function displayEvents() {
    var table = document.getElementById(EVENT_TABLE_ID);
    for(i = 0; i < events.length; i++) {
        var row = document.createElement("tr");
        
        var idEl = createElementWithText("th", events[i].id);
        var nameEl = createElementWithText("th", events[i].name);
        var adultOnly = createElementWithText("th", events[i].adultOnly ? "+18" : "");

        row.appendChild(idEl);
        row.appendChild(nameEl);
        row.appendChild(adultOnly);

        table.appendChild(row);
    }
}

function createElementWithText(elType, text) {
    var element = document.createElement(elType);
    var idText = document.createTextNode(text);
    element.appendChild(idText);
    return element;
}

function Event(name, adultOnly) {
    this.id = idGenerator.next();
    this.name = name;
    this.adultOnly = adultOnly;
}

function Client(firstName, lastName, gender, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.getFullName = function() { return this.firstName + " " + this.lastName; };
    this.gender = gender;
    this.age = age;
}