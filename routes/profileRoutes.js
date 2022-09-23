const User = require("../models/User")
const Product = require("../models/Product")
const isLogin = require("../middleware/auth").protect
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
            return res.status(400).send({success:false, message:error.message}) 
        }
    })

    app.post("/api/addProduct",isLogin, async (req,res) => {
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
            return res.status(200).send({success:true, message:"product successfully added"})
        } catch (error) {
            return res.status(400).send({success:false, message:error.message}) 
            
        }
    })

    app.post("/api/editProduct",isLogin, async (req,res) => {
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
                product.discountPercentage = information.discountPercentage
                product.discountCode = information.discountCode
                product.save()
                return res.status(200).send({success:true, message:"Product Successfully Eidted"})
            }else{
                 return res.status(400).send({success:false, message:"Server Error try again"}) 

            }
        } catch (error) {
            return res.status(400).send({success:false, message:error.message}) 
            
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
            return res.status(400).send({success:false, message:error.message}) 
            
        }
    })

    app.get('/api/uploadimage/:type',isLogin, (req,res) => {
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

    app.post('/api/deleteImage',isLogin, (req,res) => {
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





}