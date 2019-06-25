//*://skyeng.omnidesk.ru/staff/cases/chat/*
//*://help.skyeng.ru/staff/cases/chat/*

function create_close_btn () {
    const menu = document.getElementsByClassName('footer-toolbar-inner')[0];
    const btn2 = document.createElement('span');
    menu.insertBefore(btn2, menu.children[0]);
    btn2.id = 'chat_close';
    btn2.innerHTML = '<a style="float: left; margin-right: 15px; margin-top: 10px; color: red; cursor: pointer;">Закрыть</a>';
    btn2.setAttribute('onClick', 'xajax_CloseMyChat(ChatId, \'close\');')
}

chrome.storage.local.get(['chat_close'], function(result) {
    if (result['chat_close'] === undefined) { chrome.storage.local.set({chat_close: true}, function() {}); }
    if (result['chat_close'] === true) {
        var script = document.createElement("script");
        script.setAttribute("type", "text/javascript");
        script.innerHTML = '(' + create_close_btn.toString() + ")();"
        document.getElementsByTagName("head")[0].appendChild(script);
    }
});