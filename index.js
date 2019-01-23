
var idGenerator = {
    lastId : 0,
    next : function() { return ++this.lastId; }
};


main();

function main() {
   
    controller.createEvent("New year party", true);
    controller.createEvent("Wedding", false);

    displayEvents(events);
}
