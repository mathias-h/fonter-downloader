const folders = []
const files = []

for (const link of document.querySelectorAll("label[for^=folder_urls_] a"))
    folders.push(link.href.match(/treeid=(\d+)/)[1])

for (const link of document.querySelectorAll("label[for^=file_urls_] a"))
    files.push(link.href)

folders.map(id => "/structureprops.phtml?treeid=" + id).forEach(link => window.open(link))

const a = document.createElement("a")

a.href.replace(/\/eaaa\/links/)

files.forEach(href => {
    a.download = href.match(/\$\d+\$(.+?)$/)[1].replace(/\//g, "¿")
    a.href = href
    a.click()
})