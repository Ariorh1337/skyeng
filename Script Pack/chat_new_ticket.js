//*://skyeng.omnidesk.ru/staff/cases/chat/*
//*://help.skyeng.ru/staff/cases/chat/*
//https://omnidesk.ru/client_widgets/widget/7704-ybpput2p?lang=ru - тут

function show_tiket_id() { 
    if (document.querySelector('#widget_modal_form_id')) { 
        const data = window.location.href.split('?')[1];
        const name = data.split('&')[0].split('=')[1].replace('%20', ' '), email = data.split('&')[1].split('=')[1], text = data.split('&')[2].split('=')[1].replace('%20', ' ');
    
        document.getElementsByName('field_user_full_name')[0].value = decodeURI(name);
        document.getElementsByName('field_user_email')[0].value = email;
        document.getElementsByName('field_subject')[0].value = 'Техническая проблема — ' + decodeURI(name);
        document.getElementsByName('field_message')[0].value = decodeURI(text);
        document.getElementsByName('field_cf_2246')[0].value = '—'; //teacher
        document.getElementsByName('field_cf_2247')[0].value = '—'; //student
        document.getElementsByName('field_cf_2169')[0].value = '34'; //Тема
        document.getElementsByName('field_cf_2385')[0].value = '2'; //Корп
    } else {
        var block = document.querySelector('.win_success > p');
        var ticket = block.innerText.match('[0-9-]+')[0];
        block.innerHTML = block.innerHTML.replace(ticket, `<a href="https://help.skyeng.ru/staff/cases/record/${ticket}/" target="_blank" rel="noopener noreferrer">${ticket}</a>`);        
    }
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
                window.open('https://omnidesk.ru/client_widgets/widget/7704-ybpput2p?name=' + name + '&email=' + email + '&text=' + text,'_blank');
            }`
            document.getElementsByTagName("head")[0].appendChild(script);
        } else if (window.location.href.indexOf('client_widgets/widget') !== -1) {
            var script = document.createElement("script");
            script.setAttribute("type", "text/javascript");
            script.innerHTML = '(' + show_tiket_id.toString() + ")();"
            document.getElementsByTagName("head")[0].appendChild(script);
        }
    }
}); //https://omnidesk.ru/client_widgets/widget/7704-ybpput2p?name=Dmitry%20Omelchenko&email=omd1337@gmail.com&text=%D0%A2%D0%B5%D1%81%D1%82%20%D1%82%D0%B8%D0%BA%D0%B5%D1%82%D0%B0%20%D0%B8%D0%B7%20%D1%87%D0%B0%D1%82%D0%B0