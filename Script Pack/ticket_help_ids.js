let fieldsID = new Array(2);

chrome.storage.local.get(['ticket_help_ids'], function (result) {
    if (result['ticket_help_ids'] === undefined) { chrome.storage.local.set({ ticket_help_ids: true }, function() {}); }
    if (result['ticket_help_ids'] === true) {
        window.addEventListener('load', () => {
            let fields = document.querySelectorAll('input[name="field_2246"], input[name="field_2247"]');
            if (fields) {
                fields.forEach((elm) => {
                    elm.addEventListener('keydown', function () {
                        check(fields);
                    });
                    elm.addEventListener('keyup', function () {
                        check(fields);
                    });
                    elm.addEventListener('mouseout', function () {
                        check(fields);
                    });
                });

                fields.forEach((elm, index) => {
                    fieldsID[index] = elm.value;
                    check(fields);
                })
            }
        });
    }
});

function check(fields) {
    if (fields[0].value === '' && fields[1].value === '') {
        fields[0].style.backgroundColor = 'red';
        fields[1].style.backgroundColor = 'red';

        let send_btn = document.querySelector('.btn[value="Отправить"]');
        if (send_btn) {
            send_btn.style.backgroundColor = 'red';
            send_btn.disabled = 'true';
        }

        let save_btn = document.querySelector('.btn[value="Сохранить"]');
        if (save_btn) {
            save_btn.style.backgroundColor = 'red';
            save_btn.disabled = 'true';
        }
    } else {
        if (fields[0].value !== fieldsID[0] || fields[1].value !== fieldsID[1]) {
            fields[0].style.backgroundColor = '';
            fields[1].style.backgroundColor = '';
    
            let send_btn = document.querySelector('.btn[value="Отправить"]');
            if (send_btn) {
                send_btn.style.backgroundColor = '';
                send_btn.removeAttribute('disabled')
            }
    
            let save_btn = document.querySelector('.btn[value="Сохранить"]');
            if (save_btn) {
                save_btn.style.backgroundColor = '';
                save_btn.removeAttribute('disabled')
            }
        }
    }

} 