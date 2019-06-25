//*://qie.glitch.me/*

function date_for_calendar () {
    if (document.querySelectorAll('summary')[0].firstElementChild.innerText.split('-').length == 2) {
        var date = document.getElementsByName('date')[0].value.split('-');
        document.querySelectorAll('summary').forEach( function(a,b,c) {
            a.firstElementChild.innerText = a.firstElementChild.innerText + ' - ' + date[2] + '/' + date[1] + ' - ';
        });
    }
}

window.onload = function () {
    chrome.storage.local.get(['calc_date_text'], function(result) {
        if (result['calc_date_text'] === undefined) { chrome.storage.local.set({calc_date_text: true}, function() {}); }
        if (result['calc_date_text'] === true) { setInterval(date_for_calendar,100); }
    });
}