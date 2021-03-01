let lab_head = $("#lab_head").height();//1026
let lab_chip = $("#lab_chip").height();//3000;
let lab_previous = lab_head;
let lab_scrollHeight = 0;//div增加，高度随之增加
if (document.body && document.body.scrollHeight)
{
    lab_scrollHeight = document.body.scrollHeight;
}
if (document.documentElement && document.documentElement.scrollHeight)
{
    lab_scrollHeight = document.documentElement.scrollHeight;
}
let interval3 = lab_scrollHeight-lab_chip;//



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
        let scrolled = (scrollTop-lab_previous) / ((scrollHeight-interval3) - clientHeight);
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