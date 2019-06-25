//*://calendar.google.com/calendar/r/*

function asd() {
    var settings = 6;

    var button = document.querySelectorAll('div[role="presentation"] > div[role="button"]');
    for (i = 0; i < button.length; i++) {
        if (button[i].style.left == '0%') {
            button[i].style.width = settings + '%';
        } else {
            var isnum = (Number(button[i].style.top.slice(0, -2)) - Number(button[0].style.top.slice(0, -2))) / (Number(button[0].style.height.slice(0, -2)) + 2);
            var num = Number(button[i - 1].style.left.slice(0,-1)) + settings;
            if (String(isnum).indexOf('.') !== -1) {
                button[i].style.width = settings + '%';
                button[i].style.left = '';
                button[i].style.right = '0%'
                if (button[i - 1].style.right) {
                    var temp1337 = Number(button[i - 1].style.right.slice(0,-1)) + settings;
                    button[i].style.right = temp1337 + '%';
                }
            } else {
                button[i].style.left = String(num) + '%'
                button[i].style.width = settings + '%';
            }
        }
    }
}

window.onload = function() {
    chrome.storage.local.get(['calc_google'], function(result) {
        if (result['calc_google'] === undefined) { chrome.storage.local.set({calc_google: false}, function() {}); }
        if (result['calc_google'] === true) { setInterval(asd, 500); }
    });
}