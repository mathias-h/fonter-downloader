const { readdir, writeFile, mkdir, rename } = require("mz/fs")
const { join } = require("path")

;(async () => {
    const dataDir = join(__dirname, "data")

    mkdir(dataDir).catch(e => {})

    const files = await readdir(dataDir)

    files.map(f => {
        let base = dataDir

        f = f.replace(/^¿/, "").split("¿")

        const path = f.slice(0, f.length-1)
        const filename = f[f.length-1]

        for (const piece of path) {
            base = join(base, piece)

            mkdir(base).catch(e => {})
        }

        rename(dataDir + "/¿" + f.join("¿"), join(dataDir, join(...path), filename))
    })
})().catch(e => { throw e })