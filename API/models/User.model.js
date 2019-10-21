const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');

const userSchema = new Schema({
    username : {
        type : String,
        trim : true,
        required : "Username is required",
        unique : true
    },
    password : {
        type : String,
        trim : true,
        required : "Password is required"
    },
    firstName : {
        type : String,
        trim : true,
        required : "First name is required "
    },
    lastName : {
        type : String,
        trim : true,
        required : "Last name is required "
    },
    email : {
        type : String,
        trim : true,
        required : "Email is required",
        unique : true,
        max : 255
    },
    phone : {
        type : Number,
        trim : true,
        required : "Number phone is required"
    },
    date : {
        type : Date,
        default : Date.now
    },
    profileImg : {
        type : String,
        default : '/img/system/user.png'
    },
    status : {
        type : String,
        default : 'u'
    },
    salt : String,
    provider : String,
});

userSchema.pre('save',function(next){
    if(this.password){
        this.salt = new Buffer(crypto.randomBytes(16).toString('hex'), 'utf-8');
        this.password = this.hashPassword(this.password, this.salt);
    }
    next();
});


userSchema.methods.hashPassword = function(password, salt){
    return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
}

userSchema.methods.authPassword = function(password){
    return this.password === this.hashPassword(password, this.salt);
}

mongoose.model('User', userSchema);