allS = await Promise.all(allN.filter(a => `aweme,search`.split(',').every(b => a.request.url.includes(b))).map(a => new Promise(async (r) => {
    let req = a.request, res = a.response
    let query = a.request.url.match(/keyword=(\S+?)&/)
    !!query && (query = decodeURIComponent(query[1]))
    let con = await new Promise(r =>  a.getContent(c => {
        let j
        if(!c) {
            r(null)
            return
        }
        if(c[0] == '{'){
            r(JSON.parse(c))
        }
        if(c.match(/\n/g)?.length > 0){
            r(c.split('\n').filter(a => a.includes('aweme_id')).map(a => JSON.parse(a.slice(a.indexOf('{'), a.lastIndexOf('}') + 1))))
        }
        else{
            r(null)
        }
        
    }))

    r({req, res, query, con})
})))

allSVD = allS.filter(a => JSON.stringify(a.con)?.includes('aweme_info'))
allSugList = allS.filter(a => JSON.stringify(a.con)?.includes('sug_list'))

allSVD_ = allSVD.reduce((acc, a) => {
    if(!a.con.data || !Array.isArray(a.con.data)) return acc
    let query = a.query
    console.log(a.con)
    let VD = a.con.data.map(a => a.aweme_info)

    !acc[query] ? (acc[query] = [VD]) : acc[query].push(VD)
    return acc
}, {})

AllSVD = {}
Object.keys(allSVD_).map(k=> AllSVD[k] = allSVD_[k].flat(10))

AllSugList = allSugList.map(a => ({query: a.query, sug_list: a.con.sug_list.map(a => a.content)}))

console.log(AllSVD)
console.log(AllSugList)

copy(JSON.stringify(AllSVD, null, 1))
copy(JSON.stringify(AllSugList, null, 1))