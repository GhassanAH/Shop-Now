const Product = require("../models/Product")

exports.isPaymentValid = async (req, res, next) => {
    const {amount, products, discountApplied, discountCode, quantity} = req.body;
    var total = 0;
    var discountCounted = false;
    try {
      for(var i = 0; i < products.length; i++){
          const prod = await Product.findOne({_id:products[i]})
          total = total + (prod.price * quantity[i]);
          total = total + (prod.shipping * quantity[i]);

          if(discountApplied){
            for(let x in discountCode){
              if(discountCode[x] === prod.discountCode){
                  d = (prod.price *  prod.discountPercentage) / 100;
                  total = total - d;
                  break;
              }
            }
          }
      }

      if(total === amount){
        next();
      }else{      
        return res.status(401).send({message:`Sorry this service is not avaliable`, success:false})
      }
    } catch (err) {
        return res.status(401).send({message:err.message, success:false})
    }

  }