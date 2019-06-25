//*://id.skyeng.ru/admin/users/*

window.onload = function () {
    chrome.storage.local.get(['info_user_button'], function(result) {
        if (result['info_user_button'] === undefined) { chrome.storage.local.set({info_user_button: true}, function() {}); }
        if (result['info_user_button'] === true) {
            for (var i = 0; i < document.getElementsByTagName('tbody')[0].children.length; i++) {
                if (document.getElementsByTagName('tbody')[0].children[i].firstElementChild.innerText == 'Id') {
                    var id = 'ID: ' + document.getElementsByTagName('tbody')[0].children[i].lastElementChild.innerText;
                }
                if (document.getElementsByTagName('tbody')[0].children[i].firstElementChild.innerText == 'Имя' || document.getElementsByTagName('tbody')[0].children[i].firstElementChild.innerText == 'Name') {
                    var name = '&#13;&#10;Name: ' + document.getElementsByTagName('tbody')[0].children[i].lastElementChild.innerText;
                }
                if (document.getElementsByTagName('tbody')[0].children[i].firstElementChild.innerText == 'Почта' || document.getElementsByTagName('tbody')[0].children[i].firstElementChild.innerText == 'Email') {
                    var mail = '&#13;&#10;eMail: ' + document.getElementsByTagName('tbody')[0].children[i].lastElementChild.innerText;
                }
                if (document.getElementsByTagName('tbody')[0].children[i].firstElementChild.innerText == 'Телефон' || document.getElementsByTagName('tbody')[0].children[i].firstElementChild.innerText == 'Phone') {
                    var phone = '&#13;&#10;Phone: ' + document.getElementsByTagName('tbody')[0].children[i].lastElementChild.innerText;
                }
                if (document.getElementsByTagName('tbody')[0].children[i].firstElementChild.innerText == 'Skype') {
                    var skype = '&#13;&#10;Skype: ' + document.getElementsByTagName('tbody')[0].children[i].lastElementChild.innerText;
                }
                if (document.getElementsByTagName('tbody')[0].children[i].firstElementChild.innerText == 'Identity') {
                    var identity = '&#13;&#10;Identity: ' + document.getElementsByTagName('tbody')[0].children[i].lastElementChild.innerText;
                }
            }
        
            var copyf = "";
        
            var area = document.createElement('textarea');
            document.body.appendChild(area);
            area.setAttribute('id','textareacomment');
            area.setAttribute('style','width: 0px; height: 0px;');
            area.innerHTML = id + name + mail + phone + skype + identity;
        
            var btn = document.createElement('a');
            var btnMenu = document.getElementsByClassName('container')[0].children[1].children[1];
            btnMenu.insertBefore(btn, btnMenu.children[0]);
            btn.classList = 'btn btn-sm btn-secondary mr-1 mb-1';
            btn.id = 'btnCopy';
            btn.style = 'color: white; background-color: green;';
            btn.innerText = 'Копировать';
            btn.setAttribute('onClick','document.getElementById(\'textareacomment\').select(); document.execCommand(\'copy\');');        
        }
    });
}