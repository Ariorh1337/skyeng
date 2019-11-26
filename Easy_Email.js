// ==UserScript==
// @name         Easy Email
// @version      0.1
// @description  Email from message
// @author       Ariorh
// @match        https://help.skyeng.ru/staff/cases/record/*
// ==/UserScript==

(function() {
    let move_mail = document.createElement('script');
    document.body.append(move_mail);
    var asd = new RegExp('\\([a-z\\.@]+');
    move_mail.append(`
setTimeout(() => {
    var msg = document.querySelector('#anchor-scroll > div > div[class="text-area-box "] > div[class="text-area"]').innerText.toLowerCase();
    var mail = (msg.match(${asd})) ? msg.match(${asd})[0].slice(1) : false;
    if (mail) {
        SaveDefaultRecipients();
        original_recipients = [{id : mail, text: mail}];
        RestoreDefaultRecipients();
    }
}, 1000);
    `);
})();
