module.exports = {
    SECRET_STRIPE_KEY:process.env.SECRET_STRIPE_KEY,
    PAYPAL_CLIENT_ID:process.env.PAYPAL_CLIENT_ID,
    PAYPAL_SECRET_ID:process.env.PAYPAL_SECRET_ID,
    RETURN_URL:process.env.RETURN_URL,
    CANCEL_URL:process.env.CANCEL_URL,    
    RETURN_URL_CLIENT:process.env.RETURN_URL_CLIENT,
    CANCEL_URL_CLIENT:process.env.CANCEL_URL_CLIENT,
    MONGO_URL:process.env.MONGO_URL,
    JWTSECRET:process.env.JWTSECRET,
    JWTEXPIRESIN:process.env.JWTEXPIRESIN,
    EMAIL_SERVICE:process.env.EMAIL_SERVICE,
    EMAIL_USERNAME:process.env.EMAIL_USERNAME,
    EMAIL_PASSWORD:process.env.EMAIL_PASSWORD,
    EMAIL_FROM:process.env.EMAIL_FROM,
    accessKeyAws:process.env.accessKeyAws,
    secretKeyAws:process.env.secretKeyAws
}