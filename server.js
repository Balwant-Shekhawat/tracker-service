const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(
    express.urlencoded({
        extended: false,
    }),
);
app.use(express.json());

app.use(helmet());
app.use(compression());

const {closeMongoDBConnection} = require('./app/services/db/connection');

app.use('/api/driver', require('./app/routes/driver.routes'));
app.use('/api/passenger', require('./app/routes/passenger.routes'));


const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log('Server up and listening at port ' + port);
});
