//*://help.skyeng.ru/staff/cases/list/*
//*://skyeng.omnidesk.ru/staff/cases/list/*

chrome.storage.local.get(['box_in_new_tab_checkbox'], function(result) {
    if (result['box_in_new_tab_checkbox'] === undefined) { chrome.storage.local.set({box_in_new_tab_checkbox: true}, function() {}); };
    if (result['box_in_new_tab_checkbox'] === true) {
        var menu = document.getElementById('alpha1_toolbox');
        var btn1 = document.createElement('a');
        menu.append(btn1);
        var code = "document.querySelectorAll('div.req-data-row input:checked').forEach(function (a,b,c) { window.open(a.getAttribute('rel'), '_blank');})";
        btn1.outerHTML = '<a href="#" class="alpha1_toolbox_open" id="open_records" onClick="' + code + '">In new Tab</a>';
    };
});

