'use strict';

Template.roomList.helpers({
    hasRooms: function() {
        return !!Rooms.find().count();
    }
});
