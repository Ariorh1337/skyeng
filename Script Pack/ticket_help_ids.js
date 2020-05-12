chrome.storage.local.get(['ticket_help_ids'], function(result) {
    if (result['ticket_help_ids'] === undefined) { chrome.storage.local.set({ ticket_help_ids: true }, function() {}); }
    if (result['ticket_help_ids'] === true) {
        document.body.onload = () => { 
            ID_check();

            setInterval(() => {
                if (window.check == false) {
                    document.querySelector('.btn[value="Отправить"]').disabled = 'true';
                }
            }, 100);
        }
        document.body.onkeyup = (event) => {
            ID_check();
        }
    }
});

function ID_check() { 
    let fields = document.querySelectorAll('input[name="field_2246"], input[name="field_2247"]');
    window.check = false;
    fields.forEach((elm) => { 
        if (elm.value !== '') { 
            window.check = true; 
            elm.style = ''; 
        } else { 
            elm.style = 'background-color: red;'; 
        } 
    });
    if (!window.check) {
        document.querySelector('.btn[value="Отправить"]').style.backgroundColor = 'red';
    } else {
        document.querySelector('.btn[value="Отправить"]').style.backgroundColor = '';
    }
}

/*


text.innerHTML = localStorage.getItem('save_text');
*/