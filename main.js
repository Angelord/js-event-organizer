
var idGenerator = {
    lastId : 0,
    next : function() { return ++this.lastId; }
};


main();

function main() {
   
    var event = new Event("New year party", true);
    var event2 = new Event("Wedding", false);

    console.log(event.id);
    console.log(event2.id);

    var client = new Client("Ivan", "Georgiev", "male", 25);
    console.log(client.firstName);
    console.log(client.getFullName());
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