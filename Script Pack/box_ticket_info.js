//*://help.skyeng.ru/staff/cases/list/*
//*://skyeng.omnidesk.ru/staff/cases/list/*

function comment_my_box () {
    
    var box = document.getElementsByClassName('req-data-row');
    var time = document.querySelectorAll('.req-data-row > div[class="req-case-date"]');
    var text = document.querySelectorAll('.req-data-row > div[class="req-case-content"]');

    for (var i = 0; i < box.length; i++) {
        if (document.getElementsByClassName('req-td req-inf')[i + 1].lastElementChild.getAttribute('name') !== 'comment') {
            if (text[i].innerText !== '') {
                const tex = document.createElement('span');
                document.getElementsByClassName('req-inf-cont')[i].parentElement.append(tex);
                tex.setAttribute('name','comment');
                tex.style = 'color: darkslategrey;text-align: center;border-bottom: 1px solid grey;padding: 2px 2000px 2px 5px;margin-left: -77px;';
                tex.innerText = time[i].innerText.replace(/(\r\n|\n|\r)/gm,"").slice(12, 24) + ' ~~~ ' + text[i].innerText.replace(/(\r\n|\n|\r)/gm,"");
                box[i].children[0].style.height = '36px';
                box[i].children[1].style.height = '36px';
                box[i].children[2].style.height = '61px';
            }
        }
    }
}

chrome.storage.local.get(['box_ticket_info'], function(result) {
    if (result['box_ticket_info'] === undefined) { chrome.storage.local.set({box_ticket_info: true}, function() {}); }
    if (result['box_ticket_info'] === true) {
        setInterval( function () {
            if (document.getElementsByName('comment').length == 0 || document.getElementsByName('comment').length < document.getElementsByClassName('req-data-row').length) {
                comment_my_box();
            }
        } , 1000)
    }
});



//req-td req-inf height: 61px;