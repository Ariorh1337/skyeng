//*://help.skyeng.ru/staff/cases/record/*
//*://skyeng.omnidesk.ru/staff/cases/record/*

function check_time_to_time (one, two) {
    let q1date = one.split(',');
    let q1date1 = q1date[0].split(':');
    let q1date2 = q1date[1].split('.');
    let now = new Date(Number(q1date2[2]),Number(q1date2[1] - 1),Number(q1date2[0]),Number(q1date1[0]),Number(q1date1[1]));

    let qdate = two.split(',');
    let qdate1 = qdate[0].split(':');
    let qdate2 = qdate[1].split('.');
    let next = new Date(Number(qdate2[2]),Number(qdate2[1] - 1),Number(qdate2[0]),Number(qdate1[0]),Number(qdate1[1]));
    let dif = new Date(1990,0,1,0,0,0,now - next);
	let Year = dif.getFullYear() - 1990, Month = dif.getMonth(), Day = dif.getDate() - 1, Hours = dif.getHours(), Minutes = dif.getMinutes();
    return result = [Year, Month, Day, Hours, Minutes]
}

function useful_text () {
    var time = document.querySelectorAll('.request-info-right > div[class=request-date-time]');
    for (var i = time.length - 1; i > 0; i--) {
        if (time[i].parentElement.firstElementChild.className !== 'history-area-content') {
            var times = check_time_to_time (time[i].innerText, time[i - 1].innerText);
            var Year = '', Month = '', Day = '', Hours = '', Minutes = '';
            if (times[4] !== 0) { Minutes = times[4] + 'm ';}
            if (times[3] !== 0) { Hours = times[3] + 'h ';}
            if (times[2] !== 0) { Day = times[2] + 'd ';}
            if (times[1] !== 0) { Month = times[1] + 'm ';}
            if (times[0] !== 0) { Year = times[0] + 'y ';}
            if ((Minutes + Hours + Day + Month + Year) !== '') {
                time[i].outerHTML = time[i].outerHTML + '<span id="later_text' + i + '" style="color: darkorchid;display: inline;font-size: 14px;font-weight: 700;margin-right: 10px; display: none;">' + Year + Month + Day + Hours + Minutes + 'later</span>';
                document.getElementsByClassName('all-added-answer-area')[i].setAttribute('onmouseover', "document.getElementById('later_text" + i + "').style.display = '';");
                document.getElementsByClassName('all-added-answer-area')[i].setAttribute('onmouseout', "document.getElementById('later_text" + i + "').style.display = 'none';");
            }
        }
    }
}

window.onload = function () {
    chrome.storage.local.get(['ticket_how_old_reply'], function(result) {
        if (result['ticket_how_old_reply'] === undefined) { chrome.storage.local.set({ticket_how_old_reply: true}, function() {}); }
        if (result['ticket_how_old_reply'] === true) { setTimeout(useful_text, 1000); }
    });
}