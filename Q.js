import fs from 'fs'

let SVDJ = JSON.parse(fs.readFileSync('AllSVD.json').toString())
Object.keys(SVDJ).map(k => {
    let v = SVDJ[k]
    fs.writeFileSync(k + '.json', JSON.stringify(v, null, 1))
})