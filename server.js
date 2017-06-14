const https = require("https")
const http = require("http")
const { readFileSync } = require("fs")

const cookie = process.argv[2]

if (!cookie) {
    throw new Error("du manger at give cookie som argument")
}

const getTree = (id, req, res) => {
    https.request({
        hostname: "fronter.com",
        path: "/eaaa/links" + (req.url == "/" ? "/structureprops.phtml?treeid=" + id : req.url),
        headers: {
            "Cookie": cookie
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
}

http.createServer((req, res) => {
    // getTree("210320", req, res)
    getTree("210474", req, res)
}).on("error", console.log).listen(3000, () => {
    console.log("gå til http://localhost:3000/")
})