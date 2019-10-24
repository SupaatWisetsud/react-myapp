"use strict";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const db = require('./mongoose')();
const mongoose = require('mongoose');
const express = require('./config');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();

const SECRET = "asdastjke3p523=gisd-jqk2plrfjmkxv-e2i5421-ekdsp";

const User = mongoose.model('User');
const Car = mongoose.model('Car');
const Order = mongoose.model('Order');

app.route('/api')
    .post(async (req, res) => {
        
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

app.route('/api/product')
    .get(async (req, res) => {
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
    })
    .post(async (req, res) => {

    let car = new Car(req.body);
    
    if(req.files !== null){
        const upload = req.files.file;
        await upload.mv("./API/img/car/"+upload.name, err => {
            if(err){
                res.json({
                    success : false,
                    data : err
                })
            }
        });
        car.image = "/img/car/"+upload.name;
    }

    await car.save();

    res.json({
        success : true
    });
    })
    .delete(async (req, res) => {
        await Car.findOneAndRemove({ _id : req.body.id}).exec()
            .then( car => {
                res.json({
                    success : true,
                    data : car
                })
            })
            .catch(err =>{
                res.json({
                    success : false,
                    data : err
                })
            });
    });

app.route('/api/emp')
    .get(async (req, res) => {
        User.find({}, "-password -salt").exec()
            .then(user => {
                res.json({
                    success : true,
                    data : user
                });
            })
            .catch(err => {
                res.json({
                    success : false,
                    data : err
                });
            });
    })
    .post(async (req, res) => {

        await User.findOne({
            username : req.body.username
        }).exec()
        .then(async user => {
            if(user){
                res.json({
                    success : false,
                    data : "Username นี่มีผู้ใช้แล้ว!"
                });
            }else{
                await User.findOne({
                    email : req.body.email
                }).then(async user => {
                    if(user){
                        res.json({
                            success : false,
                            data : "Email นี่มีผู้ใช้แล้ว!"
                        });
                    }else{
                        //ผ่านทุกขั้นตอน
                        let user = new User(req.body);

                        if(req.files !== null){
                            const upload = req.files.file;
                            await upload.mv("./API/img/user/"+upload.name, err => {
                                if(err){
                                    res.json({
                                        success : false,
                                        data : err
                                    })
                                }
                            });
                            user.profileImg = "/img/user/"+upload.name;
                        }

                        await user.save();

                        res.json({
                            success : true
                        });
                    }
                })
            }
        })
        
    })
    .delete(async (req, res) => {
        await User.findByIdAndRemove({_id : req.body.id}, (err, user) => {
            if(err){
                res.json({
                    success : false,
                    data : err
                });
            }else{
                res.json({
                    success : true,
                    data : user
                });
            }
        });
    })
    .put(async (req, res) => {
        
        await User.updateOne({ _id : req.body.id}, { status : req.body.status}, (err, user) =>{
            if(err){
                res.json({
                    success : false,
                    data : err
                });
            }else{
                res.json({
                    success : true,
                    data : user
                });
            }
        })
    });

app.route('/api/order')
    .get(async (req, res) => {
        Order.find({}, (err, order) => {
            if(err){
                res.json({
                    success : false,
                    data : err
                });
            }else{
                res.json({
                    success : true,
                    data : order
                });
            }
        });
    })
    .post(async (req, res) => {
        
        let total = 0;
        let order = new Order();

        order.data = req.body.data

        req.body.data.forEach( n => {
            let x = Number.parseInt(n.count) * Number.parseInt(n.price);
            total += x;
        });

        order.price = total;
        order.status = "q";

        await order.save(err => {
            if(err){
                res.json({
                    success : false,
                    data : err
                })
            }else{
                res.json({
                    success : true,
                    data : order
                });
            }
        })
    })
    .put(async (req, res) => {
        await Order.updateOne({
            _id : req.body.id
        },{
            status : req.body.status,
            dateTime : new Date()
        },
        (err, order) => {
            if(err){
                res.json({
                    success : false,
                    data : err
                }); 
            }else{
                res.json({
                    success : true,
                    data : order
                });
            }
        });
    })

app.post('/api/list-order', async (req, res) => {
    //เดือนต้องลบออก 1 จะได้เดือนที่ถูกต้อง (ไม่รู้ทำไหม)
    let dateStart = req.body.dateStart;
    let dateEnd = req.body.dateEnd;

    await Order.find({
        dateTime : { 
            "$gte" : new Date(dateStart.y, dateStart.m, dateStart.d), 
            "$lt" : new Date(dateEnd.y, dateEnd.m, dateEnd.d)
        }
        }, (err, car) => {
        res.json({
            data : car
        });
    });
});

app.listen(4000, () => {
    console.log("Server is running.. at port 4000");
});