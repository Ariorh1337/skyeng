//*://help.skyeng.ru/staff/cases/record/*
//*://skyeng.omnidesk.ru/staff/cases/record/*

function repare_left_side() {
    document.getElementsByClassName('form-custom-field')[0].setAttribute('style', 'height: 200px');
    document.getElementsByClassName('a17_bcc add_mail_copy')[0].click();
    document.getElementsByClassName('a17_delete')[1].click();
}

chrome.storage.local.get(['ticket_big_notes'], function(result) {
    if (result['ticket_big_notes'] === undefined) { chrome.storage.local.set({ticket_big_notes: true}, function() {}); }
    if (result['ticket_big_notes'] === true) { setTimeout(repare_left_side, 1000); }
});