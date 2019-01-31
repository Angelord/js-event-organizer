
var events = {};

var controller = {

    validateCreation : function(name, adultOnly) {
        return (!strings.isBlank(name));
    },

    validateModify : function(id, name, adultOnly) {
        return ((id in events) && this.validateCreation(name, adultOnly));
    },

    validateRemoval : function(id) {
        return (id in events);
    },

    validateAddClient : function(id, fName, lName, gender, age) {
        if(!(id in events)) { return false; }
        if(strings.isBlank(fName) || strings.isBlank(lName) || strings.isBlank(gender)) { return false; }
        if(isNaN(age)) { return false; }
        if(events[id].adultOnly && age < 18) {
            alert("The client is too young to attend."); 
            return false; 
        }

        return true;
    },

    createEvent : function(name, adultOnly) {
        var event = new Event(name, adultOnly);
        events[event.id] = event;
        return event;
    },

    modifyEvent : function(id, name, adultOnly) {
        events[id].name = name;
        events[id].adultOnly = adultOnly;
        return events[id];
    }, 

    removeEvent : function(id) {
        var event = events[id];
        delete events[id];
        return event;
    },

    addClient : function(eventId, client) {
        events[eventId].addClient(client);
    },

    removeClient : function(eventId, clientIndex) {
        delete events[eventId].clients.splice(clientIndex, 1);
        redrawEvents();
    }
}

function Event(name, adultOnly) {

    this.id = idGenerator.next();
    this.name = name;
    this.adultOnly = adultOnly;  
    this.clients = [];
    this.addClient = function (client) {
        this.clients.push(client);
    };
}

function Client(firstName, lastName, gender, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.age = age;
    this.getFullName = function() { return this.firstName + " " + this.lastName; };
}

