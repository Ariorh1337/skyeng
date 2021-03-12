function get_id (email) {
    return new Promise(resolve => {
        chrome.runtime.sendMessage({name: "script_pack", question: 'info_user_search', id: email}, function(response) {
            resolve(response.answer[0].id);
        });
    });
}

function get_roles(id) {
    return new Promise(resolve => {
        chrome.runtime.sendMessage({ name: "script_pack", question: 'get_person_info_v3', id: id }, function (response) {
            resolve({
                type: response.role,
                isSkySmart: response.isSkySmart
            });
        })
    });
}

async function who_was_send_this() {
    let email = document.querySelector('.info_fields > p > a[href][target]').innerText; //email
    let id = await get_id(email);
    let roles = await get_roles(id);
    
    let item = document.createElement('div');
    item.innerHTML = `Role: ${roles.type}  <br>ID: <span><a href="https://id.skyeng.ru/admin/users/${id}" target="blank">${id}</a></span>`;
    let before = document.querySelector('.info_fields > h6');
    document.querySelector('.info_fields').insertBefore(item,before);
    window.$link = window.location.href;
}

async function check_send_mail(email, type) {
    let id = await get_id(email);
    let roles = await get_roles(id);

    let ticket_group = document.querySelector('#case_group_id').value;
    if (ticket_group === "35949" || ticket_group === "35950" || ticket_group === "35951") {
        // 35949 - Техподдержка: 2-я линия, 35950 - Техподдержка: 1-я линия, 35951 - Техподдержка: ВУ
        if (roles.isSkySmart === true) {
            if (ticket_group === "35949" || ticket_group === "35950") replace_send_mail(type, 'tech@skysmart.ru', '17999');
            if (ticket_group === "35951") replace_send_mail(type, 'il_tech@skysmart.ru', '18043');
        } else {
            if (ticket_group === "35949" || ticket_group === "35950") replace_send_mail(type, 'tech@skyeng.ru', '11469');
            if (ticket_group === "35951") replace_send_mail(type, 'il_tech@skyeng.ru', '16559');
        }
    }
    window.$sendMail = email;
    window.$mail = email;
}

function replace_send_mail(type, mail, value) {
    let mail_id, value_id;
    if (type === 'ticket') {
        mail_id = '#case_email_id_chosen';
        value_id = '#case_email_id';
    } else {
        mail_id = '#new_case_sender_chosen';
        value_id = '#new_case_sender';
    }
    document.querySelector(`${mail_id} > a > span`).innerText = mail;
    document.querySelector(value_id).value = value;
    
    document.getElementsByClassName('a17_bcc add_mail_copy')[0].click();
    document.getElementsByClassName('a17_delete')[1].click();
}

function get_type(link) {
    if (link.indexOf('/parent') !== -1) return 'child';
    if (link.indexOf('chat') !== -1) return 'chat';
    return 'ticket';
}

window.addEventListener("load", () => {
    window.$link = window.location.href;
    window.$mail = '';
    let type = get_type($link);

    if (type !== 'child') {
        who_was_send_this();
    } /*else {
        setInterval(() => {
            let elm = document.querySelector('ul[class="select2-choices"] > li[class="select2-search-choice"] > div');
            if (elm) {
                let mail = elm.innerText.match(/<(.*)>/);
                if (mail) {
                    if (window.$mail !== mail[1]) check_send_mail(mail[1], type);
                }
            }
        }, 5000)
    }

    if (type === 'ticket') {
        window.$sendMail = document.querySelector('#copyMail').value;
        check_send_mail(window.$sendMail, type);
        setInterval(() => {
            let mail = document.querySelector('#copyMail').value;
            if (mail !== $sendMail) check_send_mail(mail, type);
        }, 5000, $sendMail);
    }*/

    if (type === 'chat') {
        setInterval( () => {	
            if ($link !== window.location.href) who_was_send_this();
        }, 2000, $link);
    }
})