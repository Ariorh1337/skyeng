//*://id.skyeng.ru/admin/users/*

window.onload = function () {
    chrome.storage.local.get(['info_user_status'], function(result) {
        if (result['info_user_status'] === undefined) { chrome.storage.local.set({info_user_status: true}, function() {}); }
        if (result['info_user_status'] === true) {
            for (var i = 0; i < document.getElementsByTagName('tbody')[0].children.length; i++) {
                if (document.getElementsByTagName('tbody')[0].children[i].lastElementChild.innerText.indexOf('student[main]') > 0) {
                    var status_student = '', id = location.href.replace(/[^0-9]/gim,'');
                    var xhr = new XMLHttpRequest();
                    xhr.open('POST', 'https://cabinet.skyeng.ru/admin/orderPriority/search?user=' + id , true)
                    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    xhr.withCredentials = true;
                    xhr.send();
                    xhr.onload = function () {
                        var answer = xhr.response;
                        var num = answer.indexOf('<td class="b-order-table__status-status status_group_');
                        num = answer.substr(num,56);
                        num = num.replace(/[^0-9]/gim,'')
                        if (num == "6") {
                            status_student = 'purple';
                        } else if (num == "5") {
                            status_student = 'green';
                        } else if (num == "4") {
                            status_student = 'lightblue';
                        } else if (num == "3") {
                            status_student = 'orange';
                        } else if (num == "2") {
                            status_student = 'pink';
                        } else if (num == "1") {
                            status_student = 'grey';
                        }
        
                        document.getElementsByTagName('tbody')[0].children[0].setAttribute('style','background: ' + status_student);
                        document.getElementById('textareacomment').innerHTML = document.getElementById('textareacomment').innerHTML + '&#13;&#10;Time: ' + answer.substr(answer.indexOf('UTC+'),6);
                    }
                }
            }        
        }
    });
}