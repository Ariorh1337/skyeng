//*://help.skyeng.ru/staff/cases/list/*
//*://skyeng.omnidesk.ru/staff/cases/list/*

function show_all_box () {
    total = document.querySelectorAll('#filter_list_chosen > a[class="chosen-single"]')[0].innerText.slice(-3, -1)
    if (document.querySelectorAll('.req-data-row > div[class="req-case-date"]').length !== Number(total)) {
        ShowRecordsList(0);
    } else {
        document.getElementById('show_more_records').style.display = 'none';
    }
}

chrome.storage.local.get(['box_show_all'], function(result) {
    if (result['box_show_all'] === undefined) { chrome.storage.local.set({box_show_all: true}, function() {}); }
    if (result['box_show_all'] === true) {
        var script = document.createElement("script");
        script.setAttribute("type", "text/javascript");
        script.innerHTML = show_all_box.toString();
        document.getElementsByTagName("head")[0].appendChild(script);

        (function show_all_box_btn () {
            /*<span style="display: inline-block;margin-top: 5px;">
                <input type="checkbox" id="full_box" name="full_box">
                <label for="full_box" style="margin-left: 5px;">Весь бокс</label>
            </span>*/
            localStorage.setItem('full_box', '0');
            let chkbtn = document.createElement('span')
            let menu = document.getElementById('alpha1_panel')
            menu.insertBefore(chkbtn , menu.children[3]);
            chkbtn.style = 'display: inline-block;margin-top: 5px;'
            chkbtn.innerHTML = '<input type="checkbox" id="full_box" name="full_box"><label for="full_box" style="margin-left: 5px;">Весь бокс</label>'

            let chkbx = document.getElementById('full_box')
            chkbx.onchange = function () {
                if (this.checked == true) {
                    let intrv = setInterval(show_all_box, 7000);
                    localStorage.setItem('full_box', intrv);
                } else {
                    clearInterval(Number(localStorage.getItem('full_box')));
                    localStorage.setItem('full_box', '0');
                }
            }
        })();
    }
});

