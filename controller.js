
var LOCKED_MSG = "System locked. Unable to perform aciton";

var events = {};

var defaultController = {

    createEvent : function(name, adultOnly, price) {
        if(strings.isBlank(name)) { return; }

        var priceRef = price;
        if(strings.isBlank(price) || isNaN(price)) { priceRef = 0; }

        var event = new Event(name, new Date(), adultOnly, priceRef);
        events[event.id] = event;
        return event;
    },

    modifyEvent : function(id, name, adultOnly, price) {
        if(!(id in events)) { return; }

        if(!strings.isBlank(name)) {
            events[id].name = name;
        }

        events[id].adultOnly = adultOnly;
        
        if(!isNaN(price)) { 
            events[id].price = price;
        }

        return events[id];
    }, 

    removeEvent : function(id) {
        if(id in events) {
            var event = events[id];
            delete events[id];
            alert("Removed event with name " + event.name);
        }
    },

    addClient : function(eventId, fname, lname, gender, age) {
        if(!(eventId in events)) { return; }
        if(strings.isBlank(fname) || strings.isBlank(lname) || strings.isBlank(gender)) { return; }
        if(isNaN(age)) { return; }
        if(events[eventId].adultOnly && age < 18) {
            alert("The client is too young to attend."); 
            return; 
        }

        events[eventId].addClient(new Client(fname, lname, gender, age));
    },

    removeClient : function(eventId, clientIndex) {
        delete events[eventId].clients.splice(clientIndex, 1);
        redrawEvents();
    },

    lock : function() { controller = lockedController; },
    unlock : function() { }
}

var lockedController = {

    createEvent : function() {
        alert(LOCKED_MSG);
        return false; 
    },

    modifyEvent : function() {
        alert(LOCKED_MSG);
        return false; 
    },

    removeEvent : function() {
        alert(LOCKED_MSG);
        return false; 
    },

    addClient : function() {
        alert(LOCKED_MSG);
        return false
    },
    removeClient : function() {
        alert(LOCKED_MSG);
        return false
    },

    lock : function() { },
    unlock : function() { controller = defaultController; }
}

var controller = defaultController;


function Event(name, date, adultOnly, price) {

    this.id = idGenerator.next();
    this.name = name;
    this.adultOnly = adultOnly;  
    this.price = (price ? price : 0); 
    this.clients = [];

    this.addClient = function (client) {
        this.clients.push(client);
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

