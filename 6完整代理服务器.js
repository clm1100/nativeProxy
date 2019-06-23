const http = require("http");
const server = http.createServer();
const url = require("url");

// 代理网站URL
// 测试网站 找了一个http网站
// const URL = "http://www.nanjingmb.com";

// 测试网站 好了一个https网站
// const URL = "https://www.baidu.com";

// const Protocol = url.parse(URL).protocol;
// const Host = url.parse(URL).host;

server.on("request", (req, res) => {
    var { connection, host, ...originHeaders } = req.headers;


    var options = {
        "method": req.method,
        "hostname": "127.0.0.1",
        "port": "80",
        "path": req.url,
        "headers": { originHeaders }
    }

    let postbody = [];
    req.on("data", chunk => {
        postbody.push(chunk);
        console.log(chunk.length)
        console.log(123);
    })
    req.on('end', () => {
        let postbodyBuffer = Buffer.concat(postbody);
        let responsebody=[]
        var request = http.request(options, (response) => {
            response.on('data', (chunk) => {
                console.log(234);
                console.log(chunk.length);
                responsebody.push(chunk)
            })
            response.on("end", () => {
                responsebodyBuffer = Buffer.concat(responsebody)
                res.end(responsebodyBuffer);
            })
        })
        request.write(postbodyBuffer)
        request.end();
        
    })


});
server.listen(3000, () => {
    console.log("runnng");
})