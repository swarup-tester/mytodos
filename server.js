const path = require("path");
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

// Database
//const db = "mongodb+srv://newtechswarup:ZjGsAWigX8fG0jRv@cluster0.g6lll.mongodb.net/payroll?retryWrites=true&w=majority";
const db = "mongodb+srv://swarupnode:ju6xysfOTUTwvRVy@cluster0.tfzh6.mongodb.net/account_db?retryWrites=true&w=majority";

//const db = "mongodb+srv://techswarup:qwerty@1@cluster0.g6lll.mongodb.net/payroll?retryWrites=true&w=majority";

mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    function(err) {
        if (err) {
            console.error(err)
        } else {
            console.log('Connect Live MongoDB')
        }
    });

const postRoutes = require('./routes/app');
//This middleware will allow file to be read/GET when performed select Query
// app.use("/images", express.static(path.join("images")));

app.use(express.json());
app.use(postRoutes);

app.get('/',(req,res)=>{
    res.send('API has been successfully Connected');
})


app.listen(port);