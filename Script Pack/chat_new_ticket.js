//*://skyeng.omnidesk.ru/staff/cases/chat/*
//*://help.skyeng.ru/staff/cases/chat/*

function create_ticket () {
    const data = window.location.href.split('?')[1];
    const name = data.split('&')[0].split('=')[1].replace('%20', ' '), email = data.split('&')[1].split('=')[1], text = data.split('&')[2].split('=')[1].replace('%20', ' ');

    document.querySelector('.nav_item.indx-0 > a').addEventListener( "click" , () => {
        document.getElementsByName('full_name')[0].value = decodeURI(name);
        document.getElementsByName('emailaddress')[0].value = email;
        document.getElementsByName('field_10')[0].value = 'Техническая проблема — ' + decodeURI(name);
        document.getElementsByName('field_11')[0].value = decodeURI(text);
        document.getElementsByName('field_2246')[0].value = '—'; //teacher
        document.getElementsByName('field_2247')[0].value = '—'; //student

        document.getElementsByName('field_2169')[0].value = '34'; //Тема
        document.getElementsByName('field_2169')[0].parentElement.querySelector('div > a > span').innerText = 'Общая техническая помощь';

        document.getElementsByName('field_2385')[0].value = '2'; //Корп
        document.getElementsByName('field_2385')[0].parentElement.querySelector('div > a > span').innerText = 'Нет';
        
        let form = document.getElementById('index-upload-form-email');
        form.insertBefore(form.lastElementChild, form.children[1]);
        form.children[1].style = 'margin-bottom: 15px;';
    });

    document.getElementById('submit_email_case').addEventListener( "click" , () => {
        setTimeout(() => {
            var asd = setInterval(() => {
                if (document.querySelector('#popup_captcha[class="hidden"]') !== null && document.querySelector('.unansweredContent > strong') !== null) {
                    let ticket_id = document.querySelector('.unansweredContent > strong').innerText.slice(1);
                    document.querySelector('.unansweredContent > strong').innerHTML = '<a href="https://' + window.location.hostname + '/staff/cases/record/' + ticket_id + '/#last_response" target="_blank" rel="noopener noreferrer">#' + ticket_id + '</a>';
                    clearInterval(asd);
                }
            },200, asd);
        }, 1000);
    });
}

chrome.storage.local.get(['chat_create'], function(result) {
    if (result['chat_create'] === undefined) { chrome.storage.local.set({chat_create: true}, function() {}); }
    if (result['chat_create'] === true) {
        if (window.location.href.indexOf('chat') !== -1) {
            var script = document.createElement("script");
            script.setAttribute("type", "text/javascript");
            script.innerHTML = `( function () {
                const menu = document.getElementsByClassName('footer-toolbar-inner')[0];
                const cr_btn = document.createElement('span');
                menu.insertBefore(cr_btn, menu.getElementsByClassName('chat_reopen active')[0]);
                cr_btn.id = 'chat_create';
                cr_btn.innerHTML = '<a style="float: left; margin-right: 15px; margin-top: 10px; color: darkviolet; cursor: pointer;" onclick="ticket_btn();">Ticket</a>';
            })();
            function ticket_btn () {
                const name = document.querySelector('#info_user_info_panel > .info_fields > p').innerText;
                const email = document.querySelector('#info_user_info_panel > .info_fields > p > a[href][target]').innerText;
                const text = document.querySelector('#current_subject > span').innerText.replace(/[ ]/g, '%20');
                window.open('/l_rus/?name=' + name + '&email=' + email + '&text=' + text,'_blank');
            }`
            document.getElementsByTagName("head")[0].appendChild(script);
        } else if (window.location.href.indexOf('l_rus/?') !== -1) {
            var script = document.createElement("script");
            script.setAttribute("type", "text/javascript");
            script.innerHTML = '(' + create_ticket.toString() + ")();"
            document.getElementsByTagName("head")[0].appendChild(script);
        } else if (window.location.href.indexOf('l_rus') !== -1) {
            var script = document.createElement("script");
            script.setAttribute("type", "text/javascript");
            script.innerHTML = `( function () {
                document.querySelector('.nav_item.indx-0 > a').addEventListener( "click" , () => {
                    document.getElementsByName('field_10')[0].value = 'Техническая проблема — ';
                    document.getElementsByName('field_2246')[0].value = '—'; //teacher
                    document.getElementsByName('field_2247')[0].value = '—'; //student
            
                    document.getElementsByName('field_2169')[0].value = '34'; //Тема
                    document.getElementsByName('field_2169')[0].parentElement.querySelector('div > a > span').innerText = 'Общая техническая помощь';
            
                    document.getElementsByName('field_2385')[0].value = '2'; //Корп
                    document.getElementsByName('field_2385')[0].parentElement.querySelector('div > a > span').innerText = 'Нет';

                    let form = document.getElementById('index-upload-form-email');
                    form.insertBefore(form.lastElementChild, form.children[1]);
                    form.children[1].style = 'margin-bottom: 15px;';
                });

                document.getElementById('submit_email_case').addEventListener( "click" , () => {
                    setTimeout(() => {
                        var asd = setInterval(() => {
                            if (document.querySelector('#popup_captcha[class="hidden"]') !== null && document.querySelector('.unansweredContent > strong') !== null) {
                                let ticket_id = document.querySelector('.unansweredContent > strong').innerText.slice(1);
                                document.querySelector('.unansweredContent > strong').innerHTML = '<a href="https://' + window.location.hostname + '/staff/cases/record/' + ticket_id + '/#last_response" target="_blank" rel="noopener noreferrer">#' + ticket_id + '</a>';
                                clearInterval(asd);
                            }
                        },200, asd);
                    }, 1000);
                });
            })();`
            document.getElementsByTagName("head")[0].appendChild(script);
        }
    }
});