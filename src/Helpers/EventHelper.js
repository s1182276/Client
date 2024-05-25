const createEvent = () => {
    var invokeList = [];

    var event = function() {
        for (var i = 0; i < invokeList.length; i++) {
            invokeList[i].apply(arguments);
        }
    }

    event.add = function(value) {
        invokeList[invokeList.length] = value;
    }

    return event;
}

export { createEvent }