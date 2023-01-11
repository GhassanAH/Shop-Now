const keys = require("../config/keys")
const stripe = require("stripe")(keys.SECRET_STRIPE_KEY)





module.exports = {
    chargeCustomer: async (id, amount, description) => {
        try{
            const charge = await stripe.charges.create({
                amount: amount * 100,
                currency: 'usd',
                source: id,
                description: description,
                });
            return {message:"successfully paid", charge:charge}
        }catch(error){
            return {message:"unsuccessfully paid", error:error}
    
        }
    
    },
    createToken: async (number, month, year, cvc) => {
        try{
            const token = await stripe.tokens.create({
                card: {
                  number: number,
                  exp_month: month,
                  exp_year: year,
                  cvc: cvc,
                },
              });
            return {message:"successfully created", token:token}
        }catch(error){
            return {message:"unsuccessfully created", error:error}
    
        }
    
    },
    createPayPalObject: (name, price, description, returnUrl, cancelUrl) => {
        var payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": returnUrl,
                "cancel_url": cancelUrl
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": name,
                        "sku": "item",
                        "price": String(price),
                        "currency": "USD",
                        "quantity": 1
                    }]
                },
                "amount": {
                    "currency": "USD",
                    "total": String(price)
                },
                "description": description
            }]
        };
        
        return payment_json;
    },
    createPayPalFinalPayment: (payer_id, total) => {
        return {
            "payer_id": payer_id,
            "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total": String(total)
                }
            }]
          };
    }

}
