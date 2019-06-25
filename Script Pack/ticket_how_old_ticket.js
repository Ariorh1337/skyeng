//*://help.skyeng.ru/staff/cases/record/*
//*://skyeng.omnidesk.ru/staff/cases/record/*

function check_time () {
    let now = new Date();
    let tTicket = document.querySelectorAll('.request-info-right > div[class="request-date-time"]')[0].innerText;
    let qdate = tTicket.split(',');
    let qdate1 = qdate[0].split(':');
    let qdate2 = qdate[1].split('.');
    let next = new Date(Number(qdate2[2]),Number(qdate2[1] - 1),Number(qdate2[0]),Number(qdate1[0]),Number(qdate1[1]));
    let dif = new Date(0,1,-10,0,0,0,now - next);
    return dif;
}

function change_time () {
    let time = check_time();
    var Year = '', Month = '', Day = '', Hours = '', Minutes = '', width = '';
    if (time.getMinutes() !== 0) { Minutes = time.getMinutes() + 'мин '; width = '50px';}
    if (time.getHours() !== 0) { Hours = time.getHours() + 'ч '; width = '80px';}
    if (time.getDay() !== 0) { Day = time.getDay() + 'д '; width = '100px';}
    if (time.getMonth() !== 0) { Month = time.getMonth() + 'м '; width = '130px';}
    if (time.getYear() !== 0) { Year = time.getYear() + 'г '; width = '150px';}

    document.getElementById('time_to_explode').innerText = Year + Month + Day + Hours + Minutes;
    if (time.getMinutes() < 10 && time.getHours() == 0 && time.getDay() == 0 && time.getMonth() == 0 && time.getYear() == 0) {
        document.getElementById('time_to_explode').style.backgroundColor = 'red'
    } else if (time.getMinutes() < 40 && time.getHours() == 0 && time.getDay() == 0 && time.getMonth() == 0 && time.getYear() == 0) {
        document.getElementById('time_to_explode').style.backgroundColor = 'orange'
    } else if (time.getHours() < 4 && time.getDay() == 0 && time.getMonth() == 0 && time.getYear() == 0) {
        document.getElementById('time_to_explode').style.backgroundColor = 'yellow'
    }

    document.getElementById('time_to_explode').style.width = width;
}

chrome.storage.local.get(['ticket_how_old_ticket'], function(result) {
    if (result['ticket_how_old_ticket'] === undefined) { chrome.storage.local.set({ticket_how_old_ticket: true}, function() {}); }
    if (result['ticket_how_old_ticket'] === true) {
        var div = document.createElement('div')
        document.getElementsByClassName('request-content-title-act')[0].appendChild(div);
        div.outerHTML = '<div id="time_to_explode" class="request-status-open fl-right" style="color: black; background-color: silver; width: 60px; text-align: center;"></div>';

        change_time ();
        setInterval(change_time,20000);
    }
});