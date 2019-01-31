
var LOCKED_MSG = "System locked. Unable to perform aciton";

var defaultController = {

    createEvent : function() {
        var name = document.forms["createEvent"]["name"].value;
        var adultOnly = document.forms["createEvent"]["adultOnly"].checked;
        var price = document.forms["createEvent"]["price"].value;

        if(strings.isBlank(name)) { return; }
        if(strings.isBlank(price) || isNaN(price)) { price = 0; }

        var event = new Event(name, new Date(), adultOnly, price);

        data.addEvent(event);

        redrawEvents();
    },

    modifyEvent : function() {
        var id = document.forms["modifyEvent"]["id"].value;
        var name = document.forms["modifyEvent"]["name"].value;
        var adultOnly = document.forms["modifyEvent"]["adultOnly"].checked;
        var price = document.forms["modifyEvent"]["price"].value;

        if(!(id in data.getEvents())) { return; }

        var event = data.getEvent(id);

        if(!strings.isBlank(name)) { event.name = name; }
        event.adultOnly = adultOnly;
        if(!isNaN(price)) { event.price = price; }

        redrawEvents();
    }, 

    removeEvent : function() {
        var id = document.forms["removeEvent"]["id"].value;

        if(id in data.getEvents()) {

            var event = data.getEvents()[id];
            
            data.deleteEvent(id);
            
            alert("Removed event with name " + event.name);
            
            redrawEvents();
        }
    },

    addClient : function(eventId, fname, lname, gender, age) {
        if(!(eventId in data.getEvents())) { return; }
        if(strings.isBlank(fname) || strings.isBlank(lname) || strings.isBlank(gender)) { return; }
        if(isNaN(age)) { return; }
        if(data.getEvents()[eventId].adultOnly && age < 18) {
            alert("The client is too young to attend."); 
            return; 
        }

        data.addClientToEvent(eventId, new Client(fname, lname, gender, age));
    },

    removeClient : function(eventId, clientIndex) {

        data.removeClientFromEvent(eventId, clientIndex);

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

