const express = require('express');
const config = require('./config');
const bodyParser = require('body-parser');
const cors = require('cors');

const logger = require('morgan');
const mongoose = require("mongoose");
const connection = config.dbConfig.connection;


const roleModule = config.routeSlug.roles;

const app = express();

/*  Mongoose Connect */
mongoose.connect(connection, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());

app.use(logger('dev'));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


/*  Routes  */
const roleRoutes = require('./api/routes/role');


app.use("/" + roleModule, roleRoutes);




/*  Handling 404  */
app.use((request, response, next) => {
    const error = new Error("Not Found");
    error.status = "404";
    next(error);
})

/*  Handling Error or 500  */
app.use((error, request, response, next) => {

    const status = error.status || 500;

    return response.status(status)
        .json({
            error: {
                message: error.message
            }
        });
});

module.exports = app;