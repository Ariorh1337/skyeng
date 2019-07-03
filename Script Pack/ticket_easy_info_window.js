if (localStorage.getItem('winTop') == null) {
    localStorage.setItem('winTop', '120');
    localStorage.setItem('winLeft', '295');
}

let wint = document.createElement('div');
document.body.append(wint);
wint.style = 'min-height: 73px; max-height: 450px; min-width: 76px; max-width: 340px; background: wheat; top: ' + localStorage.getItem('winTop') + 'px; left: ' + localStorage.getItem('winLeft') + 'px; font-size: 14px; z-index: 20; position: fixed; border: 1px solid rgb(56, 56, 56);';
let html_inner = inner_html.toString().slice(27);
html_inner = html_inner.toString().slice('',-5)
wint.innerHTML = html_inner;

var listener = function(e , a) {
    wint.style.left = Number(e.clientX - myX) + "px";
    wint.style.top = Number(e.clientY - myY) + "px";
    localStorage.setItem('winTop', String(Number(e.clientY - myY)));
    localStorage.setItem('winLeft', String(Number(e.clientX - myX)));
};
wint.firstElementChild.firstElementChild.onmousedown = function (a) {
    window.myX = a.layerX; 
    window.myY = a.layerY; 
    document.addEventListener('mousemove', listener);
}
wint.onmouseup = function () {document.removeEventListener('mousemove', listener);}
document.getElementById('btn1_student').onclick = function () {get_info ("student");};
document.getElementById('btn1_teacher').onclick = function () {get_info ("teacher");};
document.getElementById('student_copy').onclick = function () {
    let stdnt = document.getElementById('info_student_block').innerHTML;
    copyToClipboard(stdnt.replace(/<br>/g,'\n'))
}
document.getElementById('teacher_copy').onclick = function () {
    let tcher = document.getElementById('info_teacher_block').innerHTML;
    copyToClipboard(tcher.replace(/<br>/g,'\n'))
}
document.getElementById('info_status').firstElementChild.children[2].onclick = function () {
    copyToClipboard('https://profile.skyeng.ru/profile/' + document.querySelectorAll('label > input[class="form-custom-field"]')[1].value + '/showcase');
}
document.getElementById('btn_hide').onclick = function () {
	document.getElementById('btn_hide').style.display = 'none';
	document.getElementById('info_block').style.display = 'none';
	document.getElementById('info_block').children[0].style.display = 'none';
	document.getElementById('info_block').children[1].innerHTML = '';
	document.getElementById('info_block').children[2].style.display = 'none';
	document.getElementById('info_block').children[3].innerHTML = '';
	document.getElementById('info_block').parentElement.children[1].style.display = 'none';
	document.getElementById('info_block').parentElement.children[1].children[2].style.display = 'none';
	document.getElementById('info_block').parentElement.children[1].children[3].style.display = 'none';
}

const copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};

function inner_html() {
/*<div style="display: flex;">
    <span style="cursor: -webkit-grab;">
        <div style="margin: 10px;">
            <button style="width: 55px; background-color:#768d87; border-radius:5px; border:1px solid #566963; color:#ffffff; padding:4px 4px;" id="btn1_student">Info У</button>
        </div>
        <div style="margin: 10px;">
            <button style="width: 55px; background-color:#768d87; border-radius:5px; border:1px solid #566963; color:#ffffff; padding:4px 4px;" id="btn1_teacher">Info П</button>
        </div>
        <div style="margin: 10px;">
            <button style="padding-left: 1px; width: 55px; height: 22px; background-color: rgb(118, 141, 135); border-radius: 5px; border: 1px solid rgb(86, 105, 99); color: rgb(255, 255, 255); display: none;" id="btn_hide">Скрыть</button>
        </div>
    </span>
    <span>
        <div id="info_block" style="display: none; border-left: 1px black solid;">
            <div style="text-align: center; font-weight: bold; border-block-end: 1px black solid; padding: 3px;" id="info_status" title="тест комментарий">
                <span>
                    <button style="background-color:#768d87; border-radius:10px; border:1px solid #566963; color:#ffffff; font-size:12px; padding:4px 2px;" id="student_copy">Copy</button>
                    <button style="background-color:#768d87; border-radius:10px; border:1px solid #566963; color:#ffffff; font-size:12px; padding:4px 2px;" id="student_crm">CRM</button>
                    <span style="margin: 0px 10px; cursor: pointer;">Student:</span>
                    <button style="background-color:#768d87; border-radius:10px; border:1px solid #566963; color:#ffffff; font-size: 12px; padding: 4px 5px;" id="student_edit">Edit</button>
                    <button style="background-color:#768d87; border-radius:10px; border:1px solid #566963; color:#ffffff; font-size:12px; padding:4px 2px;" id="student_login">Login</button>
                </span>
            </div>
            <div style="text-align: center; padding: 5px;" id="info_student_block"></div>
            <div style="font-weight: bold; text-align: center; padding: 5px; border-top: 1px black solid; border-bottom: 1px solid black; display: none; cursor: pointer;" id="teacher_status">
                <span>
                    <button style="background-color:#768d87; border-radius:10px; border:1px solid #566963; color:#ffffff; font-size:12px; padding:4px 2px;" id="teacher_copy">Copy</button>
                    <button style="background-color:#768d87; border-radius:10px; border:1px solid #566963; color:#ffffff; font-size:12px; padding:4px 2px;" id="teacher_trm">TRM</button>
                    <span style="margin: 0px 10px;">Teacher:</span>
                    <button style="background-color:#768d87; border-radius:10px; border:1px solid #566963; color:#ffffff; font-size: 12px; padding: 4px 5px;" id="teacher_edit">Edit</button>
                    <button style="background-color:#768d87; border-radius:10px; border:1px solid #566963; color:#ffffff; font-size:12px; padding:4px 2px;" id="teacher_login">Login</button>
                </span>
            </div>
            <div style="text-align: center; padding: 5px;" id="info_teacher_block"></div>
        </div>
        <div style="display: none; margin: 7px 8px 7px 8px; display: none;">
            <button id="btn_copy">Copy</button>
            <button id="btn_lesson">Lesson</button>
            <button id="btn_login_student" style="display: none;">Login У</button>
            <button id="btn_login_teacher" style="display: none;">Login П</button>
        </div>
    </span>
</div>*/
}

function get_info (type) {  
    if (type == 'student') {
        var id = document.querySelectorAll('label > input[class="form-custom-field"]')[1].value.replace(/[^0-9]/g, "");
        if (id !== '') {
            document.getElementById('btn_hide').style.display = '';

            chrome.runtime.sendMessage({name: "script_pack", question: 'get_person_info', id: id}, function(response) { 
                document.getElementById('info_status').style.display = ''; 
                document.getElementById('info_student_block').innerHTML = response.answer; 
                document.getElementById('info_block').style.display = 'block';
                document.getElementById('student_crm').onclick = function () {
                    window.open('https://crm.skyeng.ru/admin/orderPriority/search?page=1&user=' + id, '_blank');
                }
                document.getElementById('student_edit').onclick = function () {
                    window.open('https://id.skyeng.ru/admin/users/' + id + '/update', '_blank');
                }

                document.getElementById('btn_login_teacher').style.display = 'none';
                document.getElementById('btn_login_student').style.display = '';
            });
            chrome.runtime.sendMessage({name: "script_pack", question: 'info_user_status', id: id}, function(response) {
                document.getElementById('info_student_block').innerHTML = document.getElementById('info_student_block').innerHTML + '<br>Time: ' + response.time; 
                document.getElementById('info_status').style.backgroundColor = response.status;
                if (response.comment !== '') {
                    document.getElementById('info_status').title = response.comment;
                } else { document.getElementById('info_status').title = 'Нет комментария'; };
                document.getElementById('info_status').setAttribute('order_id', response.order);
                if (response.teacher !== '') {
                    document.getElementById('info_teacher_block').innerHTML = '';
                    document.getElementById('btn_login_teacher').style.display = '';
                    document.getElementById('teacher_status').style.display = ''; 
                    document.getElementById('info_status').setAttribute('teacher_id', response.teacher);
                    document.getElementById('teacher_edit').onclick = function () { 
                        window.open('https://id.skyeng.ru/admin/users/' + response.teacher + '/update', '_blank');
                    }
                    chrome.runtime.sendMessage({name: "script_pack", question: 'get_person_info', id: response.teacher}, function(response) {
                        document.getElementById('info_teacher_block').innerHTML = response.answer;
                    });
                    chrome.runtime.sendMessage({name: "script_pack", question: 'get_trm_id', id: response.teacher}, function(response) {
                        document.getElementById('teacher_trm').onclick = function () {
                            window.open('https://tramway.skyeng.ru/teacher/' + response.answer + '/show', '_blank');
                        }
                    });
                    document.getElementById('teacher_login').onclick = function () {
                        chrome.runtime.sendMessage({name: "script_pack", question: 'get_login_link', id: response.teacher}, function(response) {
                            copyToClipboard(response.answer.data.link);
                        });
                    }
                } else {
                    document.getElementById('info_teacher_block').innerHTML = '';
                    document.getElementById('teacher_status').style.display = 'none';
                }
            });
            document.getElementById('student_login').onclick = function () {
                chrome.runtime.sendMessage({name: "script_pack", question: 'get_login_link', id: id}, function(response) {
                    copyToClipboard(response.answer.data.link);
                });
            }
        }     
    } else if (type == 'teacher') {
        var id = document.querySelectorAll('label > input[class="form-custom-field"]')[0].value.replace(/[^0-9]/g, "");
        if (id !== '') {
            document.getElementById('btn_hide').style.display = '';
            document.getElementById('btn_login_teacher').style.display = '';
            document.getElementById('btn_login_student').style.display = 'none';
            chrome.runtime.sendMessage({name: "script_pack", question: 'get_person_info', id: id}, function(response) {
                document.getElementById('info_teacher_block').innerHTML = response.answer;
                document.getElementById('info_block').style.display = '';
                document.getElementById('teacher_status').style.display = '';
                document.getElementById('info_status').style.display = 'none';
                document.getElementById('info_student_block').innerHTML = '';
            });
            chrome.runtime.sendMessage({name: "script_pack", question: 'get_trm_id', id: id}, function(response) {
                document.getElementById('teacher_trm').onclick = function () {
                    window.open('https://tramway.skyeng.ru/teacher/' + response.answer + '/show', '_blank'); 
                }
            });
            document.getElementById('teacher_login').onclick = function () {
                chrome.runtime.sendMessage({name: "script_pack", question: 'get_login_link', id: id}, function(response) {
                    copyToClipboard(response.answer.data.link);
                });
            }
            document.getElementById('teacher_edit').onclick = function () {
                window.open('https://id.skyeng.ru/admin/users/' + id + '/update', '_blank');
            }
        }
    }
}