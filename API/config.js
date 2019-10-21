
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const compression = require('compression');
const cors = require('cors');
const { mkdirSync, existsSync } = require('fs');
const path = require('path');

module.exports = () => {
    
    existsSync("./API/img") || mkdirSync("./API/img");
    existsSync("./API/img/car") || mkdirSync("./API/img/car");
    existsSync("./API/img/user") || mkdirSync("./API/img/user");

    const app = express();

    app.use(cors());

    if(process.env.NODE_ENV === "development"){
        app.use(morgan('dev'));
    }else{
        app.use(compression());
    }

    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());

    app.use('/img', express.static('./API/img'));

    return app;
}