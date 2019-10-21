"use strict";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const db = require('./mongoose')();
const mongoose = require('mongoose');
const express = require('./config');
const jwt = require('jsonwebtoken');

const app = express();

const SECRET = "asdastjke3p523=gisd-jqk2plrfjmkxv-e2i5421-ekdsp";

const User = mongoose.model('User');
const Car = mongoose.model('Car');

app.route('/api')
    .get((req, res, next) => {
        res.json({
            name : "Hello"
        });
    })
    .post(async (req, res, next) => {
        
        const { username, password } = req.body;

        await User.findOne({
            username
        }, (err, user) => {
            if(err) res.sendStatus(404);
            if(!user || !user.authPassword(password)){
                res.json({success : false});
            }else{
                
                const token = jwt.sign({ ...user }, SECRET);
                res.json({
                    token,
                    success : true
                });
            }
        });
    });

app.route('/api/list-product')
    .get( async (req, res, next) => {
        await Car.find({}).exec()
            .then(result => {
                res.json({
                    success : true,
                    result
                })
            })
            .catch(err => {
                res.sendStatus(404).send(err);
            })
    });

app.listen(4000, () => {
    console.log("Server is running.. at port 4000");
});