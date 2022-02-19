const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"

const connectToMongo = ()=> {
    console.log('Test')
    mongoose.connect(mongoURI, ()=>{
        console.log('Mongodb connected successfully..')
    })
}

module.exports = connectToMongo;