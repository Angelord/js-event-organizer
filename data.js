
var data = new Data();

function Data() {

    var events = {};
    // var clients = {};

    this.addEvent = function(event) {
        events[event.id] = event;
    };

    this.deleteEvent = function(id) {
        delete events[id];
    };

    this.getEvents = function() {
        return events;
    };

    this.getEvent = function(eventId) {
        return events[eventId];
    };

    this.addClientToEvent = function(eventId, client) {
        events[eventId].addClient(client);
    };

    this.removeClientFromEvent = function(eventId, clientIndex) {
        events[eventId].removeClient(clientIndex);
    };
}

function Event(name, date, adultOnly, price) {

    this.id = idGenerator.next();
    this.name = name;
    this.adultOnly = adultOnly;  
    this.price = (price ? price : 0); 
    this.clients = [];

    this.addClient = function (client) {
        this.clients.push(client);
    };

    this.removeClient = function(clientIndex) {
        this.clients.splice(clientIndex, 1);
    };

    this.numClients = function() {
        return this.clients.length;
    }

    this.getDate = function() { 
        return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
    } 
}

function Client(firstName, lastName, gender, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.age = age;
    this.getFullName = function() { return this.firstName + " " + this.lastName; };
}

function Filterer() {
    
    var FILTER_TYPE = {
        None : 0,
        Male_Only : 1,
        Female_Only : 2,
        Most_Clients : 3,
        Children_Allowed : 4
    };
    
    var curFilter = FILTER_TYPE.None;

    var filterClient = function(client) {
        if(curFilter == FILTER_TYPE.Male_Only && client.gender != "male") { return false; }
        if(curFilter == FILTER_TYPE.Female_Only && client.gender != "female") { return false; }

        return true;
    };

    var getEventsWithMostClients = function(events) {
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
    };

    var getChildFriendlyEvents = function(events) {
        return ObjectUtil.filter( events, function(event) {
            return !event.adultOnly;
        });
    };

    this.filterClients = function(clients) {
        return CollectionUtil.filter(clients, filterClient);
    };

    this.filterEvents = function(events) {
        if(Object.keys(events).length == 0) { 
            alert("No events exist!");
            return events;
        }

        if(curFilter == FILTER_TYPE.Most_Clients) {
            return getEventsWithMostClients(events);
        }
        else if(curFilter == FILTER_TYPE.Children_Allowed) {
            return getChildFriendlyEvents(events);
        }

        return events;
    };

    this.changeFilter = function() {
        curFilter = document.getElementById("filterSelect").selectedIndex;
        redrawEvents();
    };
}