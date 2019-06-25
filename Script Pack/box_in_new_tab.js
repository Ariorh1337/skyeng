//*://help.skyeng.ru/staff/cases/list/*
//*://skyeng.omnidesk.ru/staff/cases/list/*

function nice_links () {
    var messages = document.querySelectorAll('.req-inf-txt > a[href]:not([target])');
    if (messages.length !== 0) {
		messages.forEach(function( v){
            v.setAttribute('target', v.getAttribute('href'));
        })
    }
}

chrome.storage.local.get(['box_in_new_tab'], function(result) {
    if (result['box_in_new_tab'] === undefined) { chrome.storage.local.set({box_in_new_tab: true}, function() {}); }
    if (result['box_in_new_tab'] === true) { setInterval(nice_links,3000); }
});