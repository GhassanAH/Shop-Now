const mongoose = require('mongoose')


const productSchema = new  mongoose.Schema({
    name:{
        type:String,
        required: [true, "Please provide a product name"],
    },
    type:{
        type:String,
        required: [true, "Please provide a product type"],
    },
    price:{
        type:Number,
        required: [true, "Please provide a product price"],
    },
    shipping:{
        type:Number,
        required: [true, "Please provide a product shipping"],
    },
    quantity:{
        type:Number,
        required: [true, "Please provide a product quantity"],
    },
    sizes:{
        type:[String],
        required: [true, "Please provide products sizes"],
    },
    cover:{
        type:String,
        required: [true, "Please provide a cover image"],
    },
    extraImages:[String],
    description:{
        type:String,
        required: [true, "Please provide a product description"],
    },
    discountPercentage:{
        type:Number,

    },
    discountCode:{
        type:String,
    }

})

const Product = mongoose.model("Product", productSchema);
module.exports = Product;