const express = require('express');
const mongo = require('mongoose');
const parser = require('body-parser');
const cors = require('cors');
const app = express();

//parse all values in the request body from any api tester.
app.use(parser.urlencoded({
    extended: false
}));
app.use(parser.json());

//use express with cors for any request of any application (desktop, web, mobile, other else).
app.use(cors());

//use api/v1 for any routes
const userRoute = require('./routes/user.routes.js');
const productRoute = require('./routes/product.routes');
app.use('/api/v1', [userRoute, productRoute]);

//connecting with mongodb
const url = process.env.MONGO_DB || "mongodb://localhost:27017/db_ecommerce";
const port = process.env.PORT || 4000;
mongo.connect(`${url}`, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
}).then(connected => {

    if (connected) console.log('MongoDB connected');

    app.listen(port, () => {
        console.log(`http://localhost:${port}/api/v1`);
    });

}).catch(err => console.log(err));
