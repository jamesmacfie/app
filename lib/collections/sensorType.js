SensorTypes = new Mongo.Collection('sensorTypes');

Schemas.sensorType = new SimpleSchema({
    name: {
        type: String,
        label: 'Name',
        max: 200
    },
    character: {
        type: String,
        label: 'Character',
        max: 1
    }
});

SensorTypes.attachSchema(Schemas.sensorType);

//SensorType.permit(['insert', 'update', 'remove']).never().apply();
