let content1 = 1026;
let labcontent = 1710;
let contents = content1+labcontent;
let interval1 = 1066;
let interval3 = 2798;//5768-3000

function f1(){
    const h2 = document.querySelector('#lab-content h2');
    const rows = document.querySelectorAll('#ui ul li');
    const htmlElement = document.documentElement;
    const bodyElement = document.body;
    let scrollTop = 0;
    let scrollHeight = 0;
    let clientHeight = 0;

    document.addEventListener('scroll', (e) => {

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
        let scrolled = (scrollTop) / ((scrollHeight-interval1-3000) - clientHeight);
        //console.log("scrollTop:"+scrollTop+";scrollHeight:"+scrollHeight+";clientHeight:"+clientHeight+";scrolled:"+scrolled);
        h2.style.setProperty('--percentage', scrolled*100+'%');
        if(scrollTop >= content1){
            let scrolled = (scrollTop-content1) / ((scrollHeight-interval1-3000) - clientHeight);
            //console.log("scrollTop:"+scrollTop+";scrollHeight:"+scrollHeight+";clientHeight:"+clientHeight+";scrolled:"+scrolled);
            h2.style.setProperty('--percentage', scrolled*100+'%');
            let total =  1 / rows.length;
            //console.log("total:"+total);
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

function f2(){
    window.addEventListener('scroll', (e) => {
        const htmlElement = document.documentElement;
        const bodyElement = document.body;
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
        let scrolled = (scrollTop-contents) / ((scrollHeight-interval3) - clientHeight);
        //let scrolled = document.documentElement.scrollTop / (document.documentElement.scrollHeight - document.documentElement.clientHeight)
        //console.log("scrollTop:"+scrollTop+";scrollHeight:"+scrollHeight+";clientHeight:"+clientHeight+";scrolled:"+scrolled);
        let $h1 = document.querySelector('#the-h1')
        let $theChip = document.querySelector('#the-chip')
        let $A13 = document.querySelector('#A13')
        let $A13TextBg = document.querySelector('#the-chip .text-bg')

        $theChip.style.width = $theChip.style.height = clientHeight * 20 * (scrolled * scrolled * scrolled) + 'px'

        if (scrolled <= 0.1) {
            $h1.style.opacity = (0.1 - scrolled) / 0.1
            $h1.style.marginTop = scrolled * 1000 * -1 + 'px'
        } else {
            $h1.style.opacity = 0
        }

        if (scrolled <= 0.2) {
            $A13.style.opacity = (scrolled - 0.1) / 0.1
        } else {
            $A13.style.opacity = 1
        }

        if (scrolled >= 0.5) {
            $A13TextBg.style.opacity = (1 - scrolled) / 0.5
            $theChip.classList.add('transparent')
        } else {
            $A13TextBg.style.opacity = 1
            $theChip.classList.remove('transparent')
        }

        if (scrolled >= 0.95) {
            $theChip.style.opacity = (1 - scrolled) / 0.05
        } else {
            $theChip.style.opacity = 1
        }

    })
}