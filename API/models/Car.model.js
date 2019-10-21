const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({
    name : {
        type : String,
        unique : true,
        required : "Name car is required"
    },
    price : {
        type : String,
        required : "Price is required"
    },
    image : {
        type : String,
        default : '/img/system/car.jpg'
    }
});

mongoose.model("Car", carSchema);