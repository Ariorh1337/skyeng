//*://skyeng.omnidesk.ru/staff/cases/chat/*
//*://help.skyeng.ru/staff/cases/chat/*

function create_ctit_btn() {
    const menu = document.getElementsByClassName('footer-toolbar-inner')[0];
    const btn1 = document.createElement('span');
    menu.insertBefore(btn1, menu.children[0]);
    btn1.id = 'chat_edit';
    btn1.innerHTML = '<a style="float: left; margin-right: 15px; margin-top: 10px; color: green; cursor: pointer;">Крит чат</a>';
    btn1.setAttribute('onClick', 'document.getElementById(\'priority-select\').value = 4; UpdateCaseParams();')
};

chrome.storage.local.get(['chat_crit'], function(result) {
    if (result['chat_crit'] === undefined) { chrome.storage.local.set({chat_crit: true}, function() {}); }
    if (result['chat_crit'] === true) {
        var script = document.createElement("script");
        script.setAttribute("type", "text/javascript");
        script.innerHTML = '(' + create_ctit_btn.toString() + ")();"
        document.getElementsByTagName("head")[0].appendChild(script);
    }
});