const keys = require("../config/keys")
const User =  require("../models/User")
const { protect } = require("../middleware/auth");
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto");

module.exports = authRoutes = (app) => {
    
    app.get("/api/private", protect, (req,res) => {
        return res.status(200).send({success: true,message: "You got access to the private data in this route", user:req.user});
    })

    app.post("/api/login", async(req, res) => {
        const {email, password} = req.body
        try {
            if(!email || !password){
                return res.status(400).send({success:false, message:"Please provide a valid information"})
            }
            const user = await User.findOne({email}).select("+password")
            if(!user){
                return res.status(400).send({success:false, message:"invalid email address"})
            }
            const isMatch = await user.matchPassword(password);
            if(!isMatch){
                return res.status(400).send({success:false, message:"invalid password"})

            }
            const token = user.createWebToken();
            return res.status(200).send({success:true, message:"successfully loged in", token:token})

        } catch (error) {
            return res.status(500).send({success:false, message:"unsuccessfully loged in", error:error.message})
            
        }

    })

    app.post("/api/sign_up", async(req, res) => {
        const {email, password} = req.body
        try {
            const user = await User.create({
                email:email,
                password:password
            })
            const token = user.createWebToken();
            return res.status(200).send({success:true, message:"successfully signed up", token:token})
        } catch (error) {
            return res.status(500).send({success:false, message:"unsuccessfully signed up", error:error.message})
        }

    })

    app.post("/api/forgot_password", async (req,res) => {
        const {email} = req.body

        try {
            const user = await User.findOne({email})
            if(!user){
                return res.status(401).send({message:"The email could not be sent"})
            }

            const restToken = user.getRestPasswordToken()
            await user.save()

            const redirectedUrl = `http://localhost:3000/resetPassword/${restToken}`
            const message = `
            <h1>You have requested a password reset</h1>
            <p>Please make a put request to the following link:</p>
            <a href=${redirectedUrl} clicktracking=off>${redirectedUrl}</a>
            `;
            try {
                await sendEmail({
                    to: user.email,
                    subject: "Password Reset Request",
                    text: message,
                })
                return res.status(200).send({ success: true, message: "Email Sent" });
            } catch (error) {
                user.resetPasswordToken = undefined;
                user.resetPasswordExpire = undefined;
                await user.save();
                return res.status(500).send({success: false, message:"The email could not be sent"})

            }
        } catch (error) {
            return res.status(500).send({success:false, message:"unsuccessfully password resetting", error:error.message})
            
        }
    })

    app.get("/api/logout", (req,res) => {
        req.user = null
        return res.status(200).send({success: true, message:"You successfully logout"})
    })

    app.put("/api/reset_password/:resetToken", async (req,res) => {
     const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");
    
      try {
        const user = await User.findOne({resetPasswordToken,resetPasswordExpire: { $gt: Date.now() },});
    
        if (!user) {
            return res.status(400).send({success:false, message:"Invalid Token"})
        }
    
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
    
        await user.save();
    
        return res.status(200).send({success: true, message: "Password Updated Success"});
      } catch (error) {
        return res.status(500).send({success:false, message:"unsuccessfully password resetting", error:error.message})
      }
    })
}