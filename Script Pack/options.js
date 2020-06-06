window.onload = function () {
    document.querySelectorAll('input[name=Settings][type=checkbox]').forEach( function(elem) {
        var name = elem.id;
        chrome.storage.local.get(name, function(result) {elem.checked = result[name];});
        elem.onclick = function () {
            let name = elem.id, type = elem.checked, setting = new Object();
            setting[name] = type;
            chrome.storage.local.set(setting, function() {});
        };
    });

    chrome.storage.local.get('test-teacher_id', (r) => {
        document.querySelector('input#test-teacher_id').setAttribute('value', r['test-teacher_id']);
    })
    document.querySelector('input#test-teacher_id').onchange = function () { 
        if (this.getAttribute('value') !== this.value) {
            document.querySelector('button#apply_btn').removeAttribute('disabled');
        } else {
            document.querySelector('button#apply_btn').setAttribute('disabled', '');
        }
    }
    document.querySelector('button#apply_btn').onclick = () => {
        let id = document.querySelector('input#test-teacher_id');
        if (id.getAttribute('value') !== id.value) {
            chrome.storage.local.get('test-teacher_id', (r) => {
                if (r['test-teacher_id'] !== id.value) chrome.storage.local.set({ 'test-teacher_id': id.value });
            })
        }
    }

    //ticket_notify ---START---

    chrome.storage.local.get(['ticket_notify_id'], function (id) {
        if (id['ticket_notify_id'] !== undefined && id['ticket_notify_id'] !== '' && Number(id['ticket_notify_id']) !== NaN) {
            document.querySelector('#ticket_notify_id').value = id['ticket_notify_id'];
        }
    });

    document.querySelector('#apply_ticket_notify_id').onclick = () => {
        chrome.storage.local.set({ 'ticket_notify_id': document.querySelector('#ticket_notify_id').value });
    }
    
    //ticket_notify ----END----
}