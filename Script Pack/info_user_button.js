//*://id.skyeng.ru/admin/users/*

window.onload = function () {
    chrome.storage.local.get(['info_user_button'], function(result) {
        if (result['info_user_button'] === undefined) { chrome.storage.local.set({info_user_button: true}, function() {}); }
        if (result['info_user_button'] === true) {
            let id = '', name = '', mail = '', phone = '', phoneD = '', skype = '';
            let th = document.querySelectorAll('th[scope="row"]');
            let td = document.querySelectorAll('td');

            th.forEach((item, count) => {
                let value = td[count].innerText;
                item = item.innerText;

                if (value !== '') {
                    if (item == 'Id') id = 'ID: ' + value;
                    if (item == 'Имя' || item == 'Name') name = '\nName: ' + value;
                    if (item == 'Фамилия' || item == 'Surname') name = name + ' ' + value;
                    if (item == 'Почта' || item == 'Email') mail = '\neMail: ' + value;
                    if (item == 'Телефон' || item == 'Phone') phone = '\nPhone: ' + value;
                    if (item == 'Домашний телефон' || item == 'Home phone') phoneD = '\nPhone2: ' + value;
                    if (item == 'Skype') skype = '\nSkype: ' + value;
                }
            })

            let area = document.createElement('textarea');
            document.body.appendChild(area);
            area.setAttribute('id','textareacomment');
            area.setAttribute('style','width: 0px; height: 0px;');
            area.innerHTML = id + name + mail + phone + phoneD + skype;
        
            let btn = document.createElement('a');
            let btnMenu = document.getElementsByClassName('container')[0].children[1].children[1];
            btnMenu.insertBefore(btn, btnMenu.children[0]);
            btn.classList = 'btn btn-sm btn-secondary mr-1 mb-1';
            btn.id = 'btnCopy';
            btn.style = 'color: white; background-color: dimgrey;';
            btn.innerText = 'Копировать';
            btn.setAttribute('onClick','document.getElementById(\'textareacomment\').select(); document.execCommand(\'copy\'); (this.style.backgroundColor = `green`); setTimeout(() => { document.querySelector(`#btnCopy`).style.backgroundColor = `dimgrey` }, 5000);');        
        }
    });
}