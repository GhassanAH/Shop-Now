const paymentSteps = require("../services/payment")
const getToken = paymentSteps.createToken
const charge = paymentSteps.chargeCustomer
const payPal = paymentSteps.createPayPalObject
const getPaymentDetails = paymentSteps.createPayPalFinalPayment
var paypal = require('paypal-rest-sdk');
const keys = require("../config/keys")


paypal.configure({
    'mode': 'sandbox',
    'client_id': keys.PAYPAL_CLIENT_ID,
    'client_secret': keys.PAYPAL_SECRET_ID,
});

var t = "0"

module.exports = paymentRoutes = (app) => {

    app.post('/api/payment', async (req, res) => {
        const {number, month, year, cvc, amount, description} = req.body

        const token = await getToken(number, month, year, cvc)
        if(token.message === "successfully created"){
            const payment = await charge(token.token.id, amount, description)
            if(payment.message === "successfully paid"){
                res.status(200).send({message:payment.message, success:true})
            }else{
                res.status(200).send({message:payment.message, success:false})
            }
        }else{
            res.status(200).send({message:token.error.raw.code, success:false})
        }

    })

    app.post('/api/paypal', (req, res) => {
        const {name, price, quantity, description} = req.body
        t = String(price)
        const create_payment_json = payPal(name, price, quantity, description, keys.RETURN_URL, keys.CANCEL_URL)
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

    app.get('/success', (req, res) => {
        const payerId = req.query.PayerID;
        const paymentId = req.query.paymentId;
        const execute_payment_json = getPaymentDetails(payerId, t)
       
        paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
          if (error) {
            return res.redirect(keys.CANCEL_URL_CLIENT)
          } else {
            return res.redirect(keys.RETURN_URL_CLIENT)

          }
        });
      });

      app.get('/cancel', (req, res) => res.status(200).send({message:"unsuccessfully paid by paypal", success:false}));

    
}