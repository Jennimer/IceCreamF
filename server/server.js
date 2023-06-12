const express = require('express');
const bodyParser = require('body-parser')
const cors = require("cors")
const routes = require("./routes")

const dotenv = require('dotenv')

dotenv.config();
const app = express()


app.use(bodyParser.json({ extended: true , limit : '20mb' }))
app.use(bodyParser.urlencoded({ extended: true , limit : '20mb' }))
app.use(cors())

app.get('/', (req, res)=>{
    res.send('Welcome to IceCream Factory employees register!')
})

 
//MongoDB connection
const PORT = process.env.PORT || 5001
const mongoose = require('mongoose');
const mongoURL = $MONGO_ACCESS_URL_ICECREAM;
mongoose.connect(mongoURL, { useNewUrlParser: true , useUnifiedTopology: true})
.then(() => {
    console.log('connected to MongoDB')
    app.listen(PORT, ()=> {
        console.log(`Node API app is running on port ${PORT}`)
    });
}).catch((error) => {
    console.log(error)
    process.exit(1)
})
app.use("/employees", routes);
