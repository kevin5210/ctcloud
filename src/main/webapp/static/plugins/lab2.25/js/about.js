let lab_head = $("#lab_head").height();//头部背景高度1026
let lab_effect = $("#lab_effect").height();//flutter1高度
let lab_show = $("#lab_show").height();//;flutter2高度
let lab_drawn = $("#lab_drawn").height();//uni-app渐入特效高度
let lab_chip = $("#lab_chip").height();//vue透视;


/*加入flutter2特效调整参数*/
let head_effect = lab_head+lab_effect; //头部和flutter1动画特效高度
let head_effect_show = lab_head+lab_effect+lab_show; //头部、flutter1动画特效高度和flutter2插件高度
let head_effect_show_drawn = lab_head+lab_effect+lab_show+lab_drawn;//头部、flutter1动画特效高度、flutter2插件高度和uni-app渐入特效高度
let head_effect_show_chip = lab_head+lab_effect+lab_show+lab_chip;//头部、flutter1动画特效高度、flutter2插件高度和vue透视高度

/**
 * uni-app渐入特效
 */
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
        let scrolled = (scrollTop-lab_head) / ((scrollHeight-head_effect_show_chip) - clientHeight);
        //console.log("scrollTop:"+scrollTop+";scrollHeight:"+scrollHeight+";clientHeight:"+clientHeight+";scrolled:"+scrolled);
        h2.style.setProperty('--percentage', scrolled*100+'%');
        if(scrollTop >= head_effect_show){
            let scrolled = (scrollTop-head_effect_show) / ((scrollHeight-head_effect_show_chip) - clientHeight);
            /* h2.style.setProperty('--percentage', scrolled*100+'%');*/
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

function labChip(){
    window.addEventListener('scroll', (e) => {
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
        let scrolled = (scrollTop-head_effect_show_drawn) / (lab_chip - clientHeight);
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