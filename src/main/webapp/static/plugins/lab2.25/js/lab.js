const rows = document.querySelectorAll('#ui ul li')
const html = document.documentElement

document.addEventListener('scroll', (e) => {
    let scrolled = html.scrollTop / (html.scrollHeight - html.clientHeight)
    console.log("html.scrollTop:"+html.scrollTop+";html.scrollHeight:"+html.scrollHeight+";html.clientHeight:"+html.clientHeight+";scrolled:"+scrolled);
    console.log("rows.length======="+rows.length);
    let total =  1 / rows.length
    console.log("total:"+total);
    for (let [index, row] of rows.entries()) {
        let start = total * index
        let end = total * (index + 1)

        let progress = (scrolled - start) / (end - start)
        console.log("index:"+index+">>>scrolled:"+scrolled+">>>start:"+start+">>>end:"+end+">>>progress0:"+progress);
        if (progress >= 1) progress = 1
        if (progress <= 0) progress = 0
        //console.log("progress======="+progress);
        row.style.setProperty('--progress', progress)
    }
})