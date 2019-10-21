const mongoose = require('mongoose');

const url = "mongodb://localhost:27017/myapp";

module.exports = () => {
    
    const db = mongoose.connect(url);

    require('./models/Car.model');
    require('./models/User.model');
    require('./models/Order.mode');

    return db;
}