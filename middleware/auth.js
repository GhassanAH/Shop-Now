const jwt = require("jsonwebtoken")
const User = require("../models/User")
const keys = require("../config/keys")

exports.protect = async (req, res, next) => {
    let token;
  
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    
    if (!token) {
        return res.status(401).send({message:"Not authorized to access this route", success:false})

    }
  
    try {
      const decoded = jwt.verify(token, keys.JWTSECRET);
  
      const user = await User.findById(decoded.id);
  
      if (!user) {
        return res.status(404).send({message:"No user found with this id", success:false})

      }
  
      req.user = user;
      next();
    } catch (err) {
        return res.status(401).send({message:"Not authorized to access this router", success:false})
    }
  };
  
  exports.isAdmin = async (req, res, next) => {
    let token;
  
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    try {
      const decoded = jwt.verify(token, keys.JWTSECRET);
  
      const admin = await User.findOne({email:"gassanalhttali@gmail.com"})
      if(admin._id == decoded.id){
         next();
      }else{
        return res.status(404).send({message:"Sorry this service is not avaliable", success:false})
      }
    } catch (err) {
        return res.status(401).send({message:"Sorry this service is not avaliable", success:false})
    }

  }
