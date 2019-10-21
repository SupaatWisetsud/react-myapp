const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const orderSchema = Schema({
    data : {},
    price : Number,
    dateTime : {
        type : Date,
        default : Date.now()
    },
    status : String
});

mongoose.model("Order", orderSchema);