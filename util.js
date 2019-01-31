
var strings = {
    isBlank : function(str) {
        return (!str || /^\s*$/.test(str));
    }
}

var idGenerator = {
    lastId : 0,
    next : function() { return ++this.lastId; }
};

var CollectionUtil = { 

    forEach : function(collection, callback) {
        for(var i = 0; i < collection.length; i++) {
            callback(collection[i], i);
        }
    },

    filter : function(collection, predicate) {
        var filteredColl = [];
        for(var i = 0; i < collection.length; i++) {
            if(predicate(collection[i], i)) {
                filteredColl.push(collection[i]);
            }
        }

        return filteredColl;
    },

    map : function(collection, mapper) {
        var mappedColl = [];
    
        for(var i = 0; i < collection.length; i++) {
            mappedColl.push(mapper(collection[i], i));
        }
    
        return mappedColl;
    }
};