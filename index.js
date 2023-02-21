const express= require('express');
const urlRoutes = require("./routes/url");
const { connectToMOngoDb } = require("./connection");
const URL = require("./models/url");

const app= express();
const PORT=8000;

connectToMOngoDb("mongodb://localhost:27017/urlShortDB")
.then(()=> console.log("MONGODB connected"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/url" , urlRoutes);
app.get("/:shortid" , async (req,res)=>{
    const shortId = req.params.shortid; 
    const event = await URL.findOneAndUpdate({
        shortId
    },{
        $push:{
            visitHistory : {timestamp: Date.now()}
        }
    });
    res.redirect(event.redirectUrl);
});
app.listen(PORT, ()=>{
    console.log(`Server started at port ${PORT}`);
})