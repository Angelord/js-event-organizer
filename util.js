
var strings = {
    isBlank : function(str) {
        return (!str || /^\s*$/.test(str));
    }
}

var idGenerator = {
    lastId : 0,
    next : function() { return ++this.lastId; }
};
