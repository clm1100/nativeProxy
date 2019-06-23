const http = require("http");
const server = http.createServer();
const url = require("url");

// 代理网站URL
// 测试网站 找了一个http网站
// const URL = "http://www.nanjingmb.com";


// 测试网站 好了一个https网站
const URL = "https://www.baidu.com";

const Protocol = url.parse(URL).protocol;
const Host = url.parse(URL).host;

server.on("request",(req,res)=>{
    var headers = {};
    if(req.method=="POST"){
        headers = {
            "Content-Type":"application/x-www-form-urlencoded"
        }
    }

    var method = req.method;
    var port = 80;
    var host = Host;
    var path = req.url;
    var opt = {
        host,
        port,
        method,
        path,
        headers
    }
    var body=[];
    var request = http.request(opt,(response)=>{
        response.on('data',(chunk)=>{
            body.push(chunk)
        }).on("end",()=>{
            res.end(Buffer.concat(body));
        })
    })
    request.end();
});
server.listen(3000,()=>{
    console.log("runnng");
})