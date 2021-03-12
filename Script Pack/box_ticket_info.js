//*://help.skyeng.ru/staff/cases/list/*
//*://skyeng.omnidesk.ru/staff/cases/list/*

importFrom('/libs/element.js').then(element => {
    window.Element = element.Element;

    chrome.storage.local.get(['box_ticket_info'], function(result) {
        if (result['box_ticket_info'] === undefined) { chrome.storage.local.set({box_ticket_info: true}, function() {}); }
        if (result['box_ticket_info'] === true) {
            setInterval( function () {
                comment_my_box();
            } , 1000)
        }
    });
})

function comment_my_box () {
    const time = document.querySelectorAll('.req-tr-line > div[class="req-case-date"]');
    const commentBox = document.querySelectorAll('.req-td-answer > span:not(#time)'); //— 

    commentBox.forEach((item, index) => {
        if (!item.previousElementSibling && !item.nextElementSibling) {
            new Element({
                html: `<span name="time" style="display: inline;">${time[index].innerText.trim()} —> </span>`,        
                parentDOM: item.parentElement,
                possition: 'before'
            });
        }
        if (item.style.getPropertyValue('display') === '') {
            item.style.setProperty('display', 'inline');
        }
    })
}

async function importFrom(PATH, MODE = 0) {
    let textFunc = await fetch(chrome.runtime.getURL(PATH)).then(r => r.text());
    let func = new Function(
        (MODE === 0) ? textFunc
            : 'return ' + textFunc
    );
    return func();
}
//req-td req-inf height: 61px;