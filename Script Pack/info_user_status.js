//*://id.skyeng.ru/admin/users/*

chrome.storage.local.get(['info_user_status'], function(result) {
    if (result['info_user_status'] === undefined) { chrome.storage.local.set({info_user_status: true}, function() {}); }
    if (result['info_user_status'] === true) {
        for (var i = 0; i < document.getElementsByTagName('tbody')[0].children.length; i++) {
            if (document.getElementsByTagName('tbody')[0].children[i].lastElementChild.innerText.indexOf('student[main]') > 0) {
                var id = location.href.replace(/[^0-9]/gim,'');
                chrome.runtime.sendMessage({name: "script_pack", question: 'info_user_status', id: id}, function(response) {
                    document.getElementsByTagName('tbody')[0].children[0].setAttribute('style','background: ' + response.status);
                    document.getElementById('textareacomment').innerHTML = document.getElementById('textareacomment').innerHTML + '&#13;&#10;Time: ' + response.time;
                });
            }
        }        
    }
});