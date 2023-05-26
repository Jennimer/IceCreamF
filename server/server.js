const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors")
const routes = require("./routes")
const app = express()

app.use(bodyParser.json({ extended: false }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())


 
//MongoDB connection
const PORT = process.env.PORT || 5001
const mongoose = require('mongoose');
const mongoURL = 'mongodb+srv://jennimerisalo2:nqbyb9TErC1Inal0@orderdatabase.jt3vaxt.mongodb.net/employeesdb?retryWrites=true&w=majority';
mongoose.connect(mongoURL, { useNewUrlParser: true , useUnifiedTopology: true})
.then(() => {
    console.log('connected to MongoDB')
    app.listen(PORT, ()=> {
        console.log(`Node API app is running on port ${PORT}`)
    });
}).catch((error) => {
    console.log(error)
})
app.use("/employees", routes);