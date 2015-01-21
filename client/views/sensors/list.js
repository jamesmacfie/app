'use strict';

Template.sensorList.helpers({
    hasSensors: function() {
        return !!Sensors.find().count();
    }
});
