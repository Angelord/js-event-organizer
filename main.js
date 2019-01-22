
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

    displayEvents();
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