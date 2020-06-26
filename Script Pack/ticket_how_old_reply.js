//*://help.skyeng.ru/staff/cases/record/*
//*://skyeng.omnidesk.ru/staff/cases/record/*

function text_to_date(text) {
    let date = new Date(text);
    if (isNaN(Number(date))) {
        date = text.split(', ').reverse();
        date[0] = date[0].split('.').reverse().join('.');
        date = new Date(date.join(' '));
    }
    return date;
}

function check_time_to_time (one, two) {
    let now = new Date(text_to_date(one));
    let next = new Date(text_to_date(two));
    
    let dif = new Date(1990,0,1,0,0,0,now - next);
    let result = {
        'years': dif.getFullYear() - 1990,
        'months': dif.getMonth(),
        'days': dif.getDate() - 1,
        'hours': dif.getHours(),
        'minutes': dif.getMinutes()
    }
    return result;
}

function useful_text () {
    let time = document.querySelectorAll('.request-info-right > div[class=request-date-time]');
    let msg = document.getElementsByClassName('all-added-answer-area');
    time.forEach((elm, counter, parent) => {
        if (counter > 0) {
            let time = new Proxy(check_time_to_time(elm.innerText, parent[counter - 1].innerText), {
                get(target, prop) {
                    if (target[prop] === 0) return '';
                    else return `${target[prop]}${prop.slice(0, 1)} `;
                }
            });
            elm.outerHTML += `<span id="later_text${counter}" style="color: darkorchid; display: inline; font-size: 14px; font-weight: 700; margin-right: 10px; position: relative; top: 10px; display: none;">${time.years + time.months + time.days + time.hours + time.minutes}later</span>`;
            msg[counter].setAttribute('onmouseover', `document.getElementById('later_text${counter}').style.display = '';`);
            msg[counter].setAttribute('onmouseout', `document.getElementById('later_text${counter}').style.display = 'none';`);
        }
    });
}

window.onload = function () {
    chrome.storage.local.get(['ticket_how_old_reply'], function(result) {
        if (result['ticket_how_old_reply'] === undefined) { chrome.storage.local.set({ticket_how_old_reply: true}, function() {}); }
        if (result['ticket_how_old_reply'] === true) { setTimeout(useful_text, 5000); }
    });
} 