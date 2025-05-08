let allH_= await Promise.all (allN.filter(a => `aweme,history`.split(',').every(b => a.request.url.includes(b))).map(a => new Promise(r => a.getContent(c => r(c)))))
let allVD = allH_.map(a => JSON.parse(a).aweme_list).flat()
let allVd = allH_.map(a => JSON.parse(a).aweme_date).reduce((acc, currVal) => {
    Object.keys(currVal).map(k => {
        acc[k] = currVal[k]
    })
    return acc
}, {})
