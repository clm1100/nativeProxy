const http = require("http");
let body = [];
let  opt = {
    host:"127.0.0.1",
    port:80,
    method:"get",
    path:"/",
    headers:{}
}
const req = http.request(opt,(res)=>{
    res.on("data",chunk=>{
        body.push(chunk)
    })
    res.on('end',()=>{
        let data = Buffer.concat(body);
        console.log(data);
    })
});

req.end();