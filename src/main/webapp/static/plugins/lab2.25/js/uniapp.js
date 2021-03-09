let lab_head = $("#lab_head").height();//头部背景高度1026
let lab_shop = $("#lab_shop").height();//uni-app商城;
/*let interval1 = lab_head + 40;
let intervals = interval1;
let drawn_compare = lab_head;*/
let head_shop = lab_head+lab_shop; //头部 + uni-app商城


function labDrawn(){
    const h2 = document.querySelector('#lab_drawn h2');
    const rows = document.querySelectorAll('#ui ul li');
    let scrollTop = 0;

    document.addEventListener('scroll', (e) => {
        const htmlElement = document.documentElement;
        const bodyElement = document.body;
        let scrollHeight = 0;
        let clientHeight = 0;
        if (bodyElement && bodyElement.scrollTop)
        {
            scrollTop = bodyElement.scrollTop;
            scrollHeight = bodyElement.scrollHeight;
            clientHeight = bodyElement.clientHeight;
        }
        if (htmlElement && htmlElement.scrollTop && htmlElement.scrollHeight && htmlElement.clientHeight)
        {
            scrollTop = htmlElement.scrollTop;
            scrollHeight = htmlElement.scrollHeight;
            clientHeight = htmlElement.clientHeight;
        }
        let scrolled = (scrollTop) / ((scrollHeight-head_shop) - clientHeight);
        h2.style.setProperty('--percentage', scrolled*100+'%');
        if(scrollTop >= lab_head){
            let scrolled = (scrollTop-lab_head) / ((scrollHeight-head_shop) - clientHeight);
            let total =  1 / rows.length;
            for (let [index, row] of rows.entries()) {
                let start = total * index;
                let end = total * (index + 1);
                let progress = (scrolled - start) / (end - start);
                //console.log("index:"+index+">>>scrolled:"+scrolled+">>>start:"+start+">>>end:"+end+">>>progress0:"+progress);
                if (progress >= 1) progress = 1;
                if (progress <= 0) progress = 0;
                row.style.setProperty('--progress', progress);
            }
        }

    })
}