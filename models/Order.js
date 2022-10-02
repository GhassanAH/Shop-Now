const mongoose = require('mongoose');
const {Schema} = mongoose
const orderSchema = new  mongoose.Schema({
    _products:{ type: [Schema.Types.ObjectId], ref: 'Product'},
    shipped:Boolean,
    payment_method:String,
    totalPaid:Number,
    discountApplied:Boolean,
    orderedAt: { type: Date, default: Date.now },
    email:{
        type:String,
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email address"
        ]
    },
    phone:String,
    size:[String],
    quantity:[Number],
    country:String,
    address:String,
    details:String,
    city:String,
    postalCode:Number,
    creditCardNumber:String,
    cardName:String,
    exp:String,
    cvc:Number,

})

const Order = mongoose.model("Orders", orderSchema);
module.exports = Order;