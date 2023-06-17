const path = require('path');
const dotenv = require("dotenv");
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
// dotenv.config();
const mongoose = require ('mongoose');
let mongoURL = process.env.mongoDBurl;

const ConnnectToMongo = async ()=>{
      await  mongoose.connect(mongoURL)
            .then(() => {
                console.log(typeof(mongoURL));
                console.log(mongoURL);
                console.log(__dirname);


                console.log('Connected to Mongo Successfully');
            })
            .catch(err => {
                console.error('Failed to connect to Mongo: ' + err);
            });
    

}

module.exports =ConnnectToMongo;

