
var idGenerator = {
    lastId : 0,
    next : function() { return ++this.lastId; }
};

var events = {};

main();

function main() {
   
    var event = new Event("New year party", true);
    var event2 = new Event("Wedding", false);

    events[event2.id] = event2;

    displayEvents(events);
}

function Event(name, adultOnly) {

    this.id = idGenerator.next();
    this.name = name;
    this.adultOnly = adultOnly;
    
    events[this.id] = this;
}

function Client(firstName, lastName, gender, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.getFullName = function() { return this.firstName + " " + this.lastName; };
    this.gender = gender;
    this.age = age;
}