//*://skyeng.omnidesk.ru/staff/cases/chat/*
//*://help.skyeng.ru/staff/cases/chat/*

function new_chat() {
    var messages = document.querySelectorAll('img[data-external-user-id]');
    if (messages.length !== 1) {
        var last_message_id = Number(messages[messages.length - 1].parentElement.lastElementChild.lastElementChild.getAttribute('rel'));
        xajax_CreateNewChat(ChatId,last_message_id);
        xajax_CloseMyChat(ChatId, 'close');
    }
}

chrome.storage.local.get(['chat_separate'], function(result) {
    if (result['chat_separate'] === undefined) { chrome.storage.local.set({chat_separate: true}, function() {}); }
    if (result['chat_separate'] === true) {
        (function () {
            const menu = document.getElementsByClassName('footer-toolbar-inner')[0];
            const btn3 = document.createElement('span');
            menu.insertBefore(btn3, menu.children[0]);
            btn3.id = 'chat_new';
            btn3.innerHTML = '<a style="float: left; margin-right: 15px; margin-top: 10px; color: blue; cursor: pointer;">Отделить</a>';
            btn3.setAttribute('onClick', 'new_chat();')
        })();
        
        var script = document.createElement("script");
        script.setAttribute("type", "text/javascript");
        script.innerHTML = new_chat.toString();
        document.getElementsByTagName("head")[0].appendChild(script);
    }
});