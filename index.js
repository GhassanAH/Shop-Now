const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const keys = require("./config/keys")

mongoose.connect(process.env.MONGOURI || keys.MONGO_URL,{
  useNewUrlParser: true
  
})



app.use(cors());
app.use(express.json({limit:"500mb"}))



require("./routes/paymentRoutes")(app)
require("./routes/authRoutes")(app)
require("./routes/profileRoutes")(app)


if(process.env.NODE_ENV === "production"){
    app.disable('x-powered-by')
    const path = require('path')
  
    app.use(express.static(path.join(__dirname, 'client', 'build')));
  
    app.get('*', (req,res) => {
  
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  
    })
}


const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log('server is running')
})