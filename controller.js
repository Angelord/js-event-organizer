
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

