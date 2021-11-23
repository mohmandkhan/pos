const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path')

const routes = require('./routes');

const app = express();

const PORT = process.env.PORT || 9000;

//choose env configuration if not on production
if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

//For sending request from different devices
app.use(cors());

//For sending responses in JSON format
app.use(express.json());


//DATABASE CONNECTION
try {
    mongoose.connect(process.env.MONGO_DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    //REMOVE THIS INCASE OF PRODUCTION
    console.log('MONGODB CONNECTED');

}catch(error) {
    //REMOVE THIS INCASE OF PRODUCTION
    console.log(error);
}


app.use("/files", express.static(path.resolve(__dirname, "../files")));

//App to use routes
app.use(routes);

//Start the app
app.listen(PORT, ()=>{
    console.log('App listening on port 9000');
})