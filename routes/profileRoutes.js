const User = require("../models/User")
const Product = require("../models/Product")
const Order = require("../models/Order")
const isLogin = require("../middleware/auth").protect
const isAdmin = require("../middleware/auth").isAdmin
const keys = require("../config/keys")
const AWS = require('aws-sdk')
const { v4: uuidv4 } = require('uuid');

const s3 = new AWS.S3({
    accessKeyId:keys.accessKeyAws,
    secretAccessKey:keys.secretKeyAws
})


module.exports = profileRoutes = (app) => {

    app.post("/api/addInfo", isLogin, async (req,res) => {
        try {
            const {information} = req.body
            const user = await User.findById({_id:information.id})
            user.phone = information.phone
            user.name = information.name
            user.country = information.country
            user.address = information.address
            user.details = information.details
            user.city = information.city
            user.postalCode = information.postalCode
            user.creditCardNumber = information.creditCardNumber
            user.cardName = information.cardName
            user.exp = information.exp
            user.cvc = information.cvc
            await user.save()
            return res.status(200).send({success:true, message:"information successfully added"})
        } catch (error) {
            return res.status(400).send({success:false, message:"information unsuccessfully added"}) 
        }
    })

    app.post("/api/addProduct",isLogin,isAdmin, async (req,res) => {
        try {
            const {information} = req.body
            const product = new Product({
                name:information.name,
                type:information.type,
                price:information.price,
                shipping:information.shipping,
                quantity:information.quantity,
                sizes:information.sizes,
                cover:information.cover,
                extraImages:information.extraImages,
                description:information.description,
                discountPercentage:information.discountPercentage,
                discountCode:information.discountCode
            })
            product.save()
            return res.status(200).send({success:true, message:"Product Unsuccessfully Added"})
        } catch (error) {
            return res.status(400).send({success:false, message:"Product Unsuccessfully Added"}) 
            
        }
    })

    app.post("/api/editProduct",isLogin, isAdmin, async (req,res) => {
        try {
            const {information} = req.body
            const product = await Product.findById({_id: information.id})
            if(product){
                product.name = information.name
                product.type = information.type
                product.price = information.price
                product.shipping = information.shipping
                product.quantity = information.quantity
                product.sizes = information.sizes
                product.cover = information.cover
                product.extraImages = information.extraImages
                product.description = information.description
                product.discountPercentage = new Number(information.discountPercentage)
                product.discountCode = information.discountCode
                product.save()
                return res.status(200).send({success:true, message:"Product Successfully Eidted"})
            }else{
                 return res.status(400).send({success:false, message:"Product Unsuccessfully Eidted: Server Error Try Again"}) 

            }
        } catch (error) {
            return res.status(400).send({success:false, message:"Product Unsuccessfully Eidted: Unexpected Error Try Again"}) 
            
        }
    })

    app.get("/api/getProductByType/:type", async (req,res) => {
        try {
            const type = req.params.type
            if(type === "Shop All"){
                const products = await Product.find()
                return res.status(200).send({success:true, message:"product successfully fetched", products:products})
            }else{
                const products = await Product.find({type:type})
                return res.status(200).send({success:true, message:"product successfully fetched", products:products})

            }

        } catch (error) {
            return res.status(400).send({success:false, message:"product unsuccessfully fetched"}) 
            
        }
    })

    app.get('/api/uploadimage/:type',isLogin,isAdmin, (req,res) => {
        const type = req.params.type
        const key = `${req.user.id}/${uuidv4()}.${type}`
        s3.getSignedUrl(
            'putObject',
            {
                Bucket:'shop-now',
                ContentType:`image/${type}`,
                Key: key
            },
            (err, url) => {
                if(err){
                    return res.send({message:err, success:false})
                }else{
                    return res.send({message:{Url: url, Key:key}, success:true})
                }
            }
        )
    })

    app.post('/api/deleteImage',isLogin,isAdmin, (req,res) => {
        const {imageUrl} = req.body;
        s3.deleteObject(
            {
                Bucket:'shop-now',
                Key:imageUrl
            },
            (err) => {
                if(err){
                    return res.status(400).send({message:err, success:false})
                }else{
                    return res.status(200).send({message:"Successfully deleted", success:true})
                }
            }
        )
    })

    app.get('/api/getOrders',isLogin,isAdmin, async (req,res) => {
        try {

            const orders = await Order.find();
            var list_of_orders = []
            if(orders){
                for(var i = 0; i < orders.length; i++){
                    const products = orders[i]._products
                    
                    var list_of_products = []
                    for(var j = 0; j < products.length; j++){
                        const product = await Product.findById({_id:products[j]})
                        if(product){
                            list_of_products = [...list_of_products, product]
                        }
                    }
                    const finalOrder = {
                        id:orders[i]._id,
                        products:list_of_products,
                        shipped:orders[i].shipped,
                        payment_method:orders[i].payment_method,
                        totalPaid:orders[i].totalPaid,
                        discountApplied:orders[i].discountApplied,
                        discountCode:orders[i].discountCode,
                        discountPercentage:orders[i].discountPercentage,
                        orderedAt: orders[i].orderedAt,
                        email:orders[i].email,
                        phone:orders[i].phone,
                        size:orders[i].size,
                        quantity:orders[i].quantity,
                        country:orders[i].country,
                        address:orders[i].address,
                        details:orders[i].details,
                        city:orders[i].city,
                        postalCode:orders[i].postalCode,
                        creditCardNumber:orders[i].creditCardNumber,
                        cardName:orders[i].cardName,
                    }
                    list_of_orders = [...list_of_orders, finalOrder]

                }
               
            }
            return res.status(200).send({success:true, message:"orders successfully fetched", orders:list_of_orders})
        } catch (error) {
            return res.status(400).send({success:false, message:"orders unsuccessfully fetched"})
        }
    })

    app.post("/api/setShipped",isLogin,isAdmin, async (req,res) => {
        const {id} = req.body;
        try {
            const order = await Order.findById({_id:id});
            if(order){
                order.shipped = true;
                await order.save();
                return res.status(200).send({success:true, message:"shipping has been added"})
            }else{
                return res.status(400).send({success:false, message:"Order has been not shipped"})
            }
        } catch (error) {
            return res.status(500).send({success:false, message:"Order has been not shipped"})
            
        }

    })

    app.get('/api/getMyOrders',isLogin, async (req,res) => {

        try {
            const orders = await Order.find({email:req.user.email});
            var list_of_orders = []
            if(orders){
                for(var i = 0; i < orders.length; i++){
                    const products = orders[i]._products
                    
                    var list_of_products = []
                    for(var j = 0; j < products.length; j++){
                        const product = await Product.findById({_id:products[j]})
                        if(product){
                            list_of_products = [...list_of_products, product]
                        }
                    }
                    const finalOrder = {
                        id:orders[i]._id,
                        products:list_of_products,
                        shipped:orders[i].shipped,
                        payment_method:orders[i].payment_method,
                        totalPaid:orders[i].totalPaid,
                        discountApplied:orders[i].discountApplied,
                        discountCode:orders[i].discountCode,
                        discountPercentage:orders[i].discountPercentage,
                        orderedAt: orders[i].orderedAt,
                        email:orders[i].email,
                        phone:orders[i].phone,
                        size:orders[i].size,
                        quantity:orders[i].quantity,
                        country:orders[i].country,
                        address:orders[i].address,
                        details:orders[i].details,
                        city:orders[i].city,
                        postalCode:orders[i].postalCode,
                        creditCardNumber:orders[i].creditCardNumber,
                        cardName:orders[i].cardName,
                    }
                    list_of_orders = [...list_of_orders, finalOrder]

                }
               
            }
            return res.status(200).send({success:true, message:"orders successfully fetched", orders:list_of_orders})
        } catch (error) {
            return res.status(400).send({success:false, message:error.message})
        }
    })

    app.post("/api/reduceAmount", async (req,res) => {
        const { id , amount } = req.body;
        try {
            const product = await Product.findById({_id:id});
            if(product && product.quantity > 0 && product.quantity - amount >= 0){
                await Product.updateOne({_id: id},{$inc:{quantity: -amount}});
                return res.status(200).send({message:"The product amount is updated", success:true})
            }else{
                return res.status(400).send({message:"The product amount is not updated", success:false})
            }
        } catch (error) {
            return res.status(500).send({message:"The product amount is not updated", success:false})
            
        }
    });


}