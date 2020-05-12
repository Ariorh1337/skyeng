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

    chrome.storage.local.get('JWT_token', (r) => {
        document.querySelector('input#JWT_token').setAttribute('value',  r['JWT_token']);
    })
    document.querySelector('input#JWT_token').onchange = function () { 
        if (this.getAttribute('value') !== this.value) {
            document.querySelector('button#apply_btn').removeAttribute('disabled');
        } else {
            document.querySelector('button#apply_btn').setAttribute('disabled', '');
        }
    }

    document.querySelector('button#apply_btn').onclick = () => { 
        let token = document.querySelector('input#JWT_token');
        if (token.getAttribute('value') !== token.value) {
            chrome.storage.local.get('JWT_token', (r) => {
                if (r['JWT_token'] !== token.value) chrome.storage.local.set('JWT_token', token.value);
            })
        }

        let id = document.querySelector('input#test-teacher_id');
        if (id.getAttribute('value') !== id.value) {
            chrome.storage.local.get('test-teacher_id', (r) => {
                if (r['test-teacher_id'] !== token.value) chrome.storage.local.set('test-teacher_id', id.value);
            })
        }
    }
}