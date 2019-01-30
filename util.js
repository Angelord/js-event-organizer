
var strings = {
    isBlank : function(str) {
        return (!str || /^\s*$/.test(str));
    }
}

var idGenerator = {
    lastId : 0,
    next : function() { return ++this.lastId; }
};

var CollectionUtil = { };

CollectionUtil.forEach = function(collection, callback) {
    for(var i = 0; i < collection.length; i++) {
        callback(collection[i], i);
    }
};

CollectionUtil.filter = function(collection, predicate) {
    var filteredColl = [];
    for(var i = 0; i < collection.length; i++) {
        if(predicate(collection[i])) {
            filteredColl.push(collection[i], i);
        }
    }
}

CollectionUtil.map = function(collection, mapper) {
    var mappedColl = [];

    for(var i = 0; i < collection.length; i++) {
        mappedColl.push(mapper(collection[i], i));
    }

    return mappedColl;
};