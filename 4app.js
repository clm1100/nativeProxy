const express = require('express');
const app = express()
app.get("/",(req,res)=>{
    res.send("ok");
})

app.post("/",(req,res)=>{
    let body = [];
    req.on("data",chunk=>{
        body.push(chunk)
    })
    req.on("end",()=>{
        let dta = Buffer.concat(body);
        res.send(dta)
    })


})

app.listen(80,()=>{
    console.log("ok");
})