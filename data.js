
var data = new Data();

function Data() {

    var events = {};
    var clients = {};

    this.getEvents = function() { return events; };

    this.getEvent = function(eventId) { return events[eventId]; };

    this.addEvent = function(event) { events[event.id] = event; };

    this.deleteEvent = function(id) { delete events[id]; };

    this.getClients = function() { return clients; }

    this.getClient = function(clientId) { return clients[clientId]; }

    this.addClient = function(client) { clients[client.id] = client; }

    this.deleteClient = function(clientId) {
        ObjectUtil.forEach(events, function(event) {
            event.removeClient(clientId);
        });

        delete clients[clientId];
    }

    this.addClientToEvent = function(clientId, eventId) { events[eventId].addClient(clients[clientId]); };

    this.removeClientFromEvent = function(clientId, eventId) { events[eventId].removeClient(clientId); };
}

function Event(name, date, adultOnly, price) {

    this.id = idGenerator.next();
    this.archived = false;
    this.name = name;
    this.adultOnly = adultOnly;  
    this.clients = [];
    var price = (price ? parseInt(price) : 0); 
    var ratings = {};

    this.getRating = function() { 
        var totalRating = 0;
        for(var key in ratings) {
            totalRating += ratings[key];
        }
        return totalRating / Object.keys(ratings).length; 
    };

    this.rate = function(clientId, value) { 
        if(value > 6) { value = 6; }
        if(value < 0) { value = 0; }

        ratings[clientId] = value;
     };

    this.getProfits = function() { return (this.clients.length * price); };

    this.getPrice = function() { return price; };

    this.setPrice = function(newPrice) { 
        price = newPrice;
        this.clients = [];
    };

    this.addClient = function (client) {
        if(!client.isVIP()) {
            client.wallet -= price;
        }
        else {
            client.vipAttendance = this;
        }
        client.numEventsAttended++;
        this.clients.push(client);
    };

    this.removeClient = function(clientId) {
        for(var i = this.clients.length - 1; i >= 0; i--) {
            if(this.clients[i].id == clientId) {
                var client = this.clients[i];
                if(client.vipAttendance != this) {
                    client.wallet += price;
                }
                else {
                    client.vipAttendance = null;
                }
                client.numEventsAttended--;
                this.clients.splice(i, 1);
                return;
            }
        }
    };

    this.containsClient = function(client) {
        for(var i = 0; i < this.clients.length; i++) {
            if(this.clients[i].id == client.id) {
                return true;
            }
        }
        return false;
    };

    this.numClients = function() {
        return this.clients.length;
    };

    this.getDate = function() { 
        return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
    };
}

function Client(firstName, lastName, gender, age, wallet) {

    this.id = idGenerator.next();
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.age = age;
    this.wallet = parseInt(wallet);
    this.numEventsAttended = 0;
    this.vipAttendance = -1;
    this.isVIP = function() { return (this.vipAttendance == -1 && this.numEventsAttended == 5); }
    this.getFullName = function() { return this.firstName + " " + this.lastName; };
}

function Filterer() {
    
    var FILTER_TYPE = {
        None : 0,
        Male_Only : 1,
        Female_Only : 2,
        Most_Clients : 3,
        Children_Allowed : 4,
        Arhived_Only : 5,
        Opened_Only : 6
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

    var getArchivedEvents = function(events) {
        return ObjectUtil.filter(events, function(event) {
            return event.archived;
        });
    };

    var getOpenEvents = function(events) {
        return ObjectUtil.filter(events, function(event) {
            return !event.archived;
        });
    };

    this.filterClients = function(clients) {
        if(Array.isArray(clients)) {
            return CollectionUtil.filter(clients, filterClient);
        }
        else {
            return ObjectUtil.filter(clients, filterClient);
        }
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
        else if(curFilter == FILTER_TYPE.Arhived_Only) {
            return getArchivedEvents(events);
        }
        else if(curFilter == FILTER_TYPE.Opened_Only) {
            return getOpenEvents(events);
        }

        return events;
    };

    this.changeFilter = function() {
        curFilter = document.getElementById("filterSelect").selectedIndex;
        redraw();
    };
}