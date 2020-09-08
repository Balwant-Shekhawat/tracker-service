# Avialability Tracker

API's:

1. Update Driver Location

I am assuming frontend will hit an api after certain duration(5 sec) for currect location of the driver.

PUT http://localhost:3001/api/driver/:id

Payload:
{
    "lat" : <Float>,
    "long": <Float>
}

Sample: PUT http://localhost:3001/api/driver/5f5759c603c266bdbc1a8f11

Payload:
{
    "lat" : -73.9371,
    "long": 40.8303
}

Success Response (200 OK):
{
    "statusCode": 200,
    "data": {
        "geolocation": {
            "coordinates": [
                -73.9371,
                40.8303
            ],
            "type": "Point"
        },
        "\_id": "5f577e9d72e0971dec3ca398",
        "driver": "5f5759c603c266bdbc1a8f11",
        "createdAt": "2020-09-08T12:52:45.816Z",
        "updatedAt": "2020-09-08T13:09:39.178Z",
    },
    "message": "OK",
    "error": null
}

Error Response (500) :
{
    "statusCode": 500,
    "data": {},
    "message": "Error Message",
    "error": {
        "name": "Error"
    }
}

2. Find drivers in 200m radius:

It will take PassengerId and Passengers location coordinates (lat, long)

GET http://localhost:3001/api/passenger/id?lat=<Float>&long=<Float>

Sample: GET http://localhost:3001/api/passenger/5f5759c603c266bdbc1a8f13?lat=-73.937&long=40.83

Success Response (200 OK):

{
"statusCode": 200,
"data": [
    {
        "_id": "5f577e7f72e0971dec3ca397",
        "geolocation": {
            "coordinates": [
                -73.9371,
                40.8303
            ],
            "type": "Point"
        },
        "driver": "5f5759c603c266bdbc1a8f11",
        "createdAt": "2020-09-08T12:52:15.668Z",
        "updatedAt": "2020-09-08T13:46:25.208Z",
    }
],
"message": "OK",
"error": null
}

Error Response (500) :
{
    "statusCode": 500,
    "data": {},
    "message": "Invalid Coordinates",
    "error": {
        "name": "Error"
    }
}

Schema:

1. Drivers Schema

{
    _id : ObjectID, // Unique Id for every driver
    name: String,
    active: Boolean // For Soft delete purpose
    createdAt: <TimeStamp>
    updatedAt: <TimeStamp>
}

2. Drivers Location Schema
{
    driver: {type: mongoose.Schema.Types.ObjectId, ref: 'Driver'},
    geolocation: {type: { type: String }, coordinates: [Number]},
    createdAt: <TimeStamp>
    updatedAt: <TimeStamp>
}

 ===>  Indexing (For Location Coordinates) : 

db.driverlocations.createIndex( { geolocation: "2dsphere" } )

/* Assumptions */

1. Driver and Passenger are is already authorised.
2. I am assuming if a drivers location didn't get updated within last 15 minutes, i am neglecting those drivers in searching



========= Steps to Deploy ==========

1. Run NPM install => npm install
2. Install PM2

    Run a service using PM2

    pm2 start ecosystem.config.js --env production


