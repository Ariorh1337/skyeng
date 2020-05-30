document.onreadystatechange = () => {
    function get_id (email) {
        return new Promise(resolve => {
            chrome.runtime.sendMessage({name: "script_pack", question: 'info_user_search', id: email}, function(response) {
                resolve(response.answer[0].id);
            });
        });
    }

    function get_info(id) {
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
        let roles = await get_info(id);
        let item = document.createElement('div');
        item.innerHTML = `Role: ${roles.type}  <br>ID: <span><a href="https://id.skyeng.ru/admin/users/${id}" target="blank">${id}</a></span>`;
        let before = document.querySelector('.info_fields > h6');
        document.querySelector('.info_fields').insertBefore(item,before);
        window.$link = window.location.href;
    }

    async function check_for_skysmart() {
        let email = document.querySelector('#copyMail').value; //email
        let id = await get_id(email);
        let roles = await get_info(id);

        let ticket_group = document.querySelector('#case_group_id').value;
        if (ticket_group === "35949" || ticket_group === "35950" || ticket_group === "35951") {
            // 35949 - Техподдержка: 2-я линия, 35950 - Техподдержка: 1-я линия, 35951 - Техподдержка: ВУ
            if (roles.isSkySmart === true) {
                console.log('isSkySmart');
                document.querySelector('#case_email_id_chosen > a > span').innerText = 'tech@skysmart.ru';
                document.querySelector('#case_email_id_chosen > .chosen-drop > div > ul').tabIndex = 37;
                document.querySelector('#case_email_id').value = '17999';
                document.getElementsByClassName('a17_bcc add_mail_copy')[0].click();
                document.getElementsByClassName('a17_delete')[1].click();
            } else {
                if (ticket_group === "35949" || ticket_group === "35950") {
                    document.querySelector('#case_email_id_chosen > a > span').innerText = 'tech@skyeng.ru';
                    document.querySelector('#case_email_id').value = '11469';
                }
                if (ticket_group === "35951") {
                    document.querySelector('#case_email_id_chosen > a > span').innerText = 'il_tech@skyeng.ru';
                    document.querySelector('#case_email_id').value = '16559';
                }
                document.getElementsByClassName('a17_bcc add_mail_copy')[0].click();
                document.getElementsByClassName('a17_delete')[1].click();
            }
        }
        window.$sendMail = document.querySelector('#copyMail').value;
    }

    window.$link = window.location.href;
    who_was_send_this();
    
    //Если в чатах
    if (window.location.href.indexOf('chat') !== -1) {
        
        setInterval( () => {	
            if ($link !== window.location.href) who_was_send_this();
        }, 2000, $link);
    } else {
        window.$sendMail = document.querySelector('#copyMail').value;
        check_for_skysmart();
        setInterval( () => {	
            if (document.querySelector('#copyMail').value !== $sendMail) check_for_skysmart();
        }, 5000, $sendMail);
    }
}