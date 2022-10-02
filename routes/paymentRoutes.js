const paymentSteps = require("../services/payment")
const getToken = paymentSteps.createToken
const charge = paymentSteps.chargeCustomer
const payPal = paymentSteps.createPayPalObject
const getPaymentDetails = paymentSteps.createPayPalFinalPayment
var paypal = require('paypal-rest-sdk');
const keys = require("../config/keys")
const Order =  require("../models/Order")
const paymentEmail = require("../utils/paymentEmail")





var t = "0"
var products1;
var seller1;
var discountApplied1;
var amount1;
var size1;
var quantity11;

paypal.configure({
    'mode': 'sandbox',
    'client_id': keys.PAYPAL_CLIENT_ID,
    'client_secret': keys.PAYPAL_SECRET_ID,
});


module.exports = paymentRoutes = (app) => {

    app.post('/api/payment', async (req, res) => {
        const {number, cardName, month, year, cvc, amount, description, products, seller, discountApplied, size, quantity} = req.body
        const token = await getToken(number, month, year, cvc)
        if(token.message === "successfully created"){
            const payment = await charge(token.token.id, amount, description)
            if(payment.message === "successfully paid"){
                try {
                  const order = new Order({
                    _products:products,
                    shipped:false,
                    payment_method:"Credit Card",
                    totalPaid:amount,
                    discountApplied:discountApplied,
                    email:seller.email,
                    phone:seller.phone,
                    size:size,
                    quantity:quantity,
                    country:seller.country,
                    address:seller.address,
                    details:seller.details,
                    city:seller.city,
                    postalCode:seller.postal,
                    creditCardNumber:number,
                    cardName:cardName,
                  })
                  await order.save();
                  await paymentEmail({
                    to: seller.email,
                    subject: "Sending Template",
                    
                  })
                  res.status(200).send({message:payment.message, success:true})
                } catch (error) {
                   res.status(200).send({message:error.message, success:false})
                }
            }else{
                res.status(200).send({message:payment.message, success:false})
            }
        }else{
            res.status(200).send({message:token.error.raw.code, success:false})
        }

    })


    app.post('/api/paypal', (req, res) => {
        const {name, price, quantity, description, products, seller, discountApplied, size} = req.body
        t = String(price)
        products1 = products;
        seller1 = seller;
        discountApplied1 = discountApplied;
        amount1 = price;
        size1 = size;
        quantity1 = quantity;

        const create_payment_json = payPal(name, price, description, keys.RETURN_URL, keys.CANCEL_URL)
        try {
            paypal.payment.create(create_payment_json, function (error, payment) {
              if (error) {
                  return res.status(200).send({message:error.message, success:false})
              } else {
                  for(let i = 0;i < payment.links.length;i++){
                    if(payment.links[i].rel === 'approval_url'){
                      return res.status(200).send({message:"redirect url", url:payment.links[i].href, success:true});
                    }
                  }
              }
          });
        } catch (error) {
          return res.status(200).send({message:error.message, success:false})

        }

    })

    app.get('/successPayment',  async (req, res) => {
        const payerId = req.query.PayerID;
        const paymentId = req.query.paymentId;
        const execute_payment_json = getPaymentDetails(payerId, t)
       try {
        const order = new Order({
          _products:products1,
          shipped:false,
          payment_method:"PayPal",
          totalPaid:amount1,
          discountApplied:discountApplied1,
          email:seller1.email,
          phone:seller1.phone,
          size:size1,
          quantity:quantity1,
          country:seller1.country,
          address:seller1.address,
          details:seller1.details,
          city:seller1.city,
          postalCode:seller1.postal,
        })
        await order.save();

        await paymentEmail({
          to: seller1.email,
          subject: "Sending Template",
          
        })

       } catch (error) {
          return res.redirect(keys.CANCEL_URL_CLIENT)
       }
        paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
          if (error) {
              return res.redirect(keys.CANCEL_URL_CLIENT)
          } else {
              return res.redirect(keys.RETURN_URL_CLIENT)
          }
        });
      });

      app.get('/cancelPayment', (req, res) => res.status(200).send({message:"unsuccessfully paid by paypal", success:false}));

      app.get("/sendEmail", async (req,res) => {
          try {
          
          res.status(200).send({message:"email sent"})
            
          } catch (error) {
            res.status(500).send({message:error.message})
          }

      })    
}
