//*://crm.skyeng.ru/admin/orderPriority/search?*

chrome.storage.local.get(['crm_teacher_info'], function(result) {
    if (result['crm_teacher_info'] === undefined) { chrome.storage.local.set({crm_teacher_info: true}, function() {}); }
    if (result['crm_teacher_info'] === true) {
        if ( document.getElementsByClassName('teacher_select')[0].value !== '' ) {
            var teacher_id_str = document.getElementsByClassName('teacher_select')[0].value;
            var teacher_id_lnk = 'https://id.skyeng.ru/admin/users/' + teacher_id_str;
        } else if ( document.querySelector('table > tbody > tr[data-order] > td > div[class="top-buffer"] > strong') !== null ) {
            var teacher_id_str = document.querySelector('table > tbody > tr[data-order] > td > div[class="top-buffer"] > strong').innerText;
            var teacher_id_lnk = 'https://crm.skyeng.ru/admin/group/edit?id=' + teacher_id_str;
        }
        
        var menu = document.querySelector('table[class="table table-condensed table-striped b-order-table"] > thead > tr');
        menu.lastElementChild.innerHTML = '<span>Teacher: </span><span onClick="window.open(\'' + teacher_id_lnk + '\',\'' + teacher_id_lnk + '\')" style="color: red; cursor: pointer;">  ' + teacher_id_str + '</span>';
    }
});
