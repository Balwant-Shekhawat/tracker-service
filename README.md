# Avialability Tracker

## Endpoints that require Authentication :

**Update Driver Location**
---- 

I am assuming frontend will hit an api after certain duration(5 sec) for currect location of the driver.

* **URL**

    http://localhost:3001/api/driver/:id

* **Method:**

    PUT

*  **URL Params**

    **Required:**
 
   `id=[ObjectID]`
   
*  **Payload**

    ```
    {
        "lat" [Float],
        "long": [Float]
    }
    ```

* **Sample Request:**
 `PUT http://localhost:3001/api/driver/5f5759c603c266bdbc1a8f11`


* **Sample Payload:**
```
    {
        "lat" : -73.9371,
        "long": 40.8303
    }
```
* **Success Response:**
```
{
    "statusCode": 200,
    "data": {
        "geolocation": {
            "coordinates": [
                40.8303,
                -73.9371
            ],
            "type": "Point"
        },
        "_id": "5f577e9d72e0971dec3ca398",
        "driver": "5f5759c603c266bdbc1a8f11",
        "createdAt": "2020-09-08T12:52:45.816Z",
        "updatedAt": "2020-09-08T13:09:39.178Z",
    },
    "message": "OK",
    "error": null
}
```

* **Error Response:**
```
{
    "statusCode": 500,
    "data": {},
    "message": "Error Message",
    "error": {
        "name": "Error"
    }
}
```

**Find drivers in 200m radius**
---- 
 

It will take PassengerId and Passengers location coordinates (lat, long)

* **URL**

    `http://localhost:3001/api/passenger/id?lat=[Float]&long=[Float]`

* **Method:**

    GET

*  **URL Params**

    **Required:**
 
   `id=[ObjectId]`


*  **Query Params**

    **Required:**

    `lat=[Float]`
    `long=[Float]`



* **Sample Request:**

    `GET http://localhost:3001/api/passenger/5f5759c603c266bdbc1a8f13?lat=-73.937&long=40.83`


* **Success Response:**
```
{
    "statusCode": 200,
    "data": [
        {
            "_id": "5f577e9d72e0971dec3ca398",
            "geolocation": {
                "coordinates": [
                    40.8303,
                    -73.937
                    
                ],
                "type": "Point"
            },
            "driver": {
                "_id": "5f5759c603c266bdbc1a8f11",
                "name": "Driver1"
            },
            "createdAt": "2020-09-08T12:52:45.816Z",
            "updatedAt": "2020-09-08T15:05:01.803Z",
            "__v": 2
        },
        {
            "_id": "5f577e6272e0971dec3ca396",
            "geolocation": {
                "coordinates": [
                    40.8303,
                    -73.9371
                    
                ],
                "type": "Point"
            },
            "driver": {
                "_id": "5f5759c603c266bdbc1a8f13",
                "name": "Driver3"
            },
            "createdAt": "2020-09-08T12:51:46.931Z",
            "updatedAt": "2020-09-08T14:58:53.793Z",
            "__v": 1
        }
    ],
    "message": "OK",
    "error": null
}
```

* **Error Response:**
```
{
    "statusCode": 500,
    "data": {},
    "message": "Invalid Coordinates",
    "error": {
        "name": "Error"
    }
}
```
---------------------------------------------
**MongoDB Schema**
---- 

* **Drivers Schema**

```
{
    _id : ObjectID, // Unique Id for every driver
    name: String,
    active: Boolean // For Soft delete purpose
    createdAt: <TimeStamp>
    updatedAt: <TimeStamp>
}
```

* **Drivers Location Schema**
```
{
    driver: {type: mongoose.Schema.Types.ObjectId, ref: 'Driver'},
    geolocation: {type: { type: String }, coordinates: [Number]},
    createdAt: <TimeStamp>
    updatedAt: <TimeStamp>
}
```


**Indexing (For Location Coordinates)**
---- 
```db.driverlocations.createIndex( { geolocation: "2dsphere" } )```

**Assumptions**
----

1. Driver and Passenger are is already authorised.
2. I am assuming if a drivers location didn't get updated within last 15 minutes, i am neglecting those drivers in searching



**Steps to Run the Code**
----

1. Run NPM install => npm install
2. Install PM2

    Run a service using PM2

    pm2 start ecosystem.config.js --env production


