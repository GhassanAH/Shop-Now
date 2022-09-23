const mongoose = require('mongoose')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const keys = require('../config/keys');
const crypto = require("crypto");

const UserSchema = new  mongoose.Schema({
    email:{
        type:String,
        required: [true, "Please provide an email address"],
        unique:true,
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email address"
        ]
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        minlength: 6,
        select: false,
    },
    phone:String,
    country:String,
    address:String,
    details:String,
    city:String,
    postalCode:Number,
    creditCardNumber:String,
    cardName:String,
    exp:String,
    cvc:Number,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
})


UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

UserSchema.methods.createWebToken = function(){
    return jwt.sign({id: this._id}, keys.JWTSECRET, {expiresIn: keys.JWTEXPIRESIN})
}
UserSchema.methods.getRestPasswordToken = function(){
    const restToken = crypto.randomBytes(20).toString("hex")
    this.resetPasswordToken = crypto.createHash("sha256").update(restToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);
    return restToken;
}
const User = mongoose.model("User", UserSchema);
module.exports = User;