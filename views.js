
var PAGE_ID = "page";

var clearElement = function(id) {
    var element = document.getElementById(id);
    element.innerHTML = "";
}

var createElementWithText = function(elType, text) {
    var element = document.createElement(elType);
    var idText = document.createTextNode(text);
    element.appendChild(idText);
    return element;
}

function displayEvents() {
    clearElement(PAGE_ID);

    var page = document.getElementById(PAGE_ID);
    var table = document.createElement("table");
    for(i = 0; i < events.length; i++) {
        var row = document.createElement("tr");
        
        var idEl = createElementWithText("th", events[i].id);
        var nameEl = createElementWithText("th", events[i].name);
        var adultOnly = createElementWithText("th", events[i].adultOnly ? "+18" : "");

        row.appendChild(idEl);
        row.appendChild(nameEl);
        row.appendChild(adultOnly);

        table.appendChild(row);
    }
    page.appendChild(table);
}