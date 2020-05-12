chrome.storage.local.get(['ticket_help_notify'], function(result) {
    if (result['ticket_help_notify'] === undefined) { chrome.storage.local.set({ticket_help_notify: true}, function() {}); }
    if (result['ticket_help_notify'] === true) {
        window.onload = function (e) {
            setTimeout(() => {
                document.getElementById('add_note').onclick = () => {
                    if (document.querySelector('.info_fields > div').innerText.indexOf('operator') !== -1) {
                        alert('Обращения от оператора обрабатываются реплаями 😉');
                    }
                }
            }, 1000);
        };       
    }
});