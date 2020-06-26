chrome.storage.local.get(['ticket_help_ids'], function(result) {
    if (result['ticket_help_ids'] === undefined) { chrome.storage.local.set({ ticket_help_ids: true }, function() {}); }
    if (result['ticket_help_ids'] === true) {
        window.addEventListener('load', () => {
            let fields = document.querySelectorAll('input[name="field_2246"], input[name="field_2247"]');
            if (fields) {
                let needToCheck = true;
                fields.forEach((elm) => {
                    if (elm.value !== '') needToCheck = false;
                    elm.addEventListener('change', function () {
                        check.apply(elm);
                    });
                    elm.addEventListener('mouseout', function () {
                        check.apply(elm);
                    });
                });

                if (needToCheck === true) {
                    fields.forEach((elm) => {
                        check.apply(elm);
                    })
                }
            }
        });
    }
});

function check() {
    if (this.value === '') {
        this.style.backgroundColor = 'red';

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
        this.style.backgroundColor = '';

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