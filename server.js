const https = require("https")
const http = require("http")
const { readFileSync } = require("fs")
http.createServer((req, res) => {
    https.request({
        hostname: "fronter.com",
        path: "/eaaa/links" + (req.url == "/" ? "/structureprops.phtml?treeid=210474" : req.url),
        headers: {
            "Cookie": "wcid=42b0e15ba81ca75e; session_userkey=27e6cfc2158df5f075564e85c1afdb3c; __cfduid=d97be9357fd64e627f00538f8bd2b96b214937"
        }
    }, r => {
        let body = ""
        r.on("data", chunk => body += chunk.toString())
            .on("end", () => {
                const script = `<script>${readFileSync(__dirname + "/script.js").toString()}</script>`

                if (req.url.startsWith("/structureprops.phtml?treeid=") || req.url == "/")
                    body += script

                res.end(body)
            })
    }).end()
}).on("error", console.log).listen(3000)