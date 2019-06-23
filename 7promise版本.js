const http = require("http");
const server = http.createServer();

server.on("request", (req, res) => {
    var { connection, host, ...originHeaders } = req.headers;
    var options = {
        "method": req.method,
        // 随表找了一个网站做测试，被代理网站修改这里
        "hostname": "www.nanjingmb.com",
        "port": "80",
        "path": req.url,
        "headers": { originHeaders }
    }

    var p = new Promise((resolve,reject)=>{
        let postbody = [];
        req.on("data", chunk => {
            postbody.push(chunk);
        })
        req.on('end', () => {
            let postbodyBuffer = Buffer.concat(postbody);
            resolve(postbodyBuffer)
        })
    });

    p.then((postbodyBuffer)=>{
        let responsebody=[]
        var request = http.request(options, (response) => {
            response.on('data', (chunk) => {
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