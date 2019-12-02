var win_html = `<div style="display: flex;">
    <span style="cursor: -webkit-grab;">
        <input id="id_type_for_chat" type="text" style="text-align: center; width: 72px; display: none;">
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
    <span style="border-left: solid black 1px;">
        <div id="info_block" style="display: none;">
            <div style="text-align: center; font-weight: bold; border-block-end: 1px black solid; padding: 6px;" id="info_status" title="">
                <span>
                    <button class="win_btn" style="float: left;" id="student_copy">Copy</button>
                    <button class="win_btn" style="float: left;" id="student_crm">CRM</button>
                    <span style="margin: 0px 10px; cursor: pointer;">User:</span>
                    <button class="win_btn" style="float: right;" id="student_login">Login</button>
                    <button class="win_btn" style="float: right;" id="student_edit">Edit</button>
                </span>
            </div>
            <div style="text-align: center; border-bottom: 1px black solid; cursor: help; display: none;" id="info_student_status">
                <span style="float: left; padding-left: 4px; padding-right: 8px; border-right: solid black 1px;" title="">schedule</span>
                <span title="">order notes</span>
                <span style="float: right; padding-right: 4px; padding-left: 6px; cursor: pointer;">📝</span>
                <span style="float: right; padding-left: 4px; padding-right: 8px; padding-left: 8px; border-right: solid black 1px; border-left: solid black 1px;" title="Loading...">marks</span>
            </div>
            <div style="text-align: center; padding: 5px;" id="info_student_block"></div>
            <div style="font-weight: bold; text-align: center; padding: 5px; border-top: 1px black solid; border-bottom: 1px solid black; display: none; cursor: pointer;" id="teacher_status">
                <span>
                    <button class="win_btn" style="float: left;" id="teacher_copy">Copy</button>
                    <button class="win_btn" style="float: left;" id="teacher_trm">TRM</button>
                    <span style="margin: 0px 10px;">Teacher:</span>
                    <button class="win_btn" style="float: right;" id="teacher_login">Login</button>
                    <button class="win_btn" style="float: right;" id="teacher_edit">Edit</button>
                </span>
            </div>
            <div style="text-align: center; cursor: help; display: none;" id="info_teacher_status">
                <span style="float: left; padding-left: 4px; padding-right: 8px; border-right: solid black 1px; visibility: hidden;" title="">schedule</span>
                <span style="visibility: hidden;" title="">order notes</span>
                <span style="float: right; padding-right: 4px; padding-left: 6px; cursor: pointer; border-bottom: 1px black solid;">📝</span>
                <span style="float: right; padding-left: 4px; padding-right: 8px; padding-left: 8px; border-right: solid black 1px; border-left: solid black 1px; border-bottom: 1px black solid;" title="Loading...">marks</span>
            </div>
            <div style="text-align: center; padding: 5px; margin-top: -20px; display: none;" id="info_teacher_block"></div>
            <div style="text-align: center; display: none;" id="table_time">
                <table style="border-top: 1px solid black;">
                    <tbody>
                        <tr>
                            <td style="cursor: pointer;">⬅</td>
                            <td style="border-left: 1px solid black; cursor: pointer;">00</td>
                            <td style="border-left: 1px solid black; cursor: pointer;">01</td>
                            <td style="border-left: 1px solid black; cursor: pointer;">02</td>
                            <td style="border-left: 1px solid black; cursor: pointer;">03</td>
                            <td style="border-left: 1px solid black; cursor: pointer;">04</td>
                            <td style="border-left: 1px solid black; cursor: pointer;">05</td>
                            <td style="border-left: 1px solid black; cursor: pointer;">06</td>
                            <td style="border-left: 1px solid black; cursor: pointer;">➡</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </span>
</div>`;

if (localStorage.getItem('winTop') == null) {
    localStorage.setItem('winTop', '120');
    localStorage.setItem('winLeft', '295');
}

let wint = document.createElement('div');
document.body.append(wint);
wint.style = 'min-height: 73px; max-height: 450px; min-width: 76px; max-width: 370px; background: wheat; top: ' + localStorage.getItem('winTop') + 'px; left: ' + localStorage.getItem('winLeft') + 'px; font-size: 14px; z-index: 20; position: fixed; border: 1px solid rgb(56, 56, 56);';
wint.innerHTML = win_html;

let mscr = document.createElement('script');
document.body.append(mscr);
let send_comment_js = `let my_name = document.getElementById('top_avatar').setAttribute('my_name', window.intercomSettings.name);
document.getElementById('info_student_status').children[2].addEventListener( "click" , () => {
    let id = document.getElementById('info_status').getAttribute('user_id');
    let msg = prompt('Введите заметку о пользователе: ' + id + '\\nДля новой строки введите: "~"');
    if (msg !== '' && msg !== null) {
        let person_name = document.getElementById('top_avatar').getAttribute('my_name');
        let ticket_id = window.location.pathname.match(/\\/[0-9-]+\\//g);

        var body = 'entry.1187522179=' + id + '&entry.540704615=' + ticket_id + '&entry.988274120=' + encodeURI(person_name) + '&entry.1693454835=' + encodeURI(msg);
        fetch('https://docs.google.com/forms/u/0/d/e/1FAIpQLScInTRTD5AZLEcufsz6SQkMHYu_jCqGUZZ-G2MrsmJbnOSDZQ/formResponse', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            body: body
        });
    }
});
document.getElementById('info_teacher_status').children[2].addEventListener( "click" , () => {
    let id = document.getElementById('teacher_status').getAttribute('user_id');
    let msg = prompt('Введите заметку о пользователе: ' + id + '\\nДля новой строки введите: "~"');
    if (msg !== '' && msg !== null) {
        let person_name = document.getElementById('top_avatar').getAttribute('my_name');
        let ticket_id = window.location.pathname.match(/\\/[0-9-]+\\//g);

        var body = 'entry.1187522179=' + id + '&entry.540704615=' + ticket_id + '&entry.988274120=' + encodeURI(person_name) + '&entry.1693454835=' + encodeURI(msg);
        fetch('https://docs.google.com/forms/u/0/d/e/1FAIpQLScInTRTD5AZLEcufsz6SQkMHYu_jCqGUZZ-G2MrsmJbnOSDZQ/formResponse', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            body: body
        });
    }
});`;
mscr.innerHTML = send_comment_js;

let mstl = document.createElement('style');
document.body.append(mstl);
var style = `.win_btn {
	background-color: #768d87;
    border-radius: 10px;
    border: 1px solid #566963;
    color: #ffffff;
    font-size: 12px;
    padding: 3px 2px;
    margin: -2px 1px;
}`
mstl.innerHTML = style;

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
    let stdnt = document.getElementById('info_student_block').innerText;
    copyToClipboard(stdnt) //.replace(/<br>/g,'\n')
};
document.getElementById('teacher_copy').onclick = function () {
    let tcher = document.getElementById('info_teacher_block').innerText;
    copyToClipboard(tcher) //.replace(/<br>/g,'\n')
};
document.getElementById('info_status').firstElementChild.children[2].onclick = function () {
    let id = document.querySelectorAll('label > input[class="form-custom-field"]')[1].value.replace(/[^0-9]/g, "");
    copyToClipboard('https://profile.skyeng.ru/profile/' + id + '/showcase');
};

document.getElementById('btn_hide').onclick = function () {
	document.getElementById('btn_hide').style.display = 'none';
	document.getElementById('info_block').style.display = 'none';
	document.getElementById('info_status').style.display = 'none';
	document.getElementById('info_student_block').innerHTML = '';
    document.getElementById('info_student_status').style.display = 'none';
    document.getElementById('teacher_status').style.display = 'none';
    document.getElementById('info_teacher_block').style.display = 'none';
    document.getElementById('info_teacher_block').innerHTML = '';
    document.getElementById('info_teacher_status').style.display = 'none';
    document.getElementById('table_time').style.display = 'none';
}

//Время П
var dat = new Date()
var tab = document.getElementById('table_time').firstElementChild.firstElementChild.firstElementChild;

if (dat.getHours() >= 20) {
	tab.children[1].innerText = 20 - 3;
	tab.children[2].innerText = 20 - 2;
	tab.children[3].innerText = 20 - 1;
	tab.children[4].innerText = 20;
	tab.children[5].innerText = 20 + 1;
	tab.children[6].innerText = 20 + 2;
	tab.children[7].innerText = 20 + 3;
} else if (dat.getHours() <= 3) {
	tab.children[1].innerText = 3 - 3;
	tab.children[2].innerText = 3 - 2;
	tab.children[3].innerText = 3 - 1;
	tab.children[4].innerText = 3;
	tab.children[5].innerText = 3 + 1;
	tab.children[6].innerText = 3 + 2;
	tab.children[7].innerText = 3 + 3;
} else {
	tab.children[1].innerText = dat.getHours() - 3
	tab.children[2].innerText = dat.getHours() - 2
	tab.children[3].innerText = dat.getHours() - 1
	tab.children[4].innerText = dat.getHours()
	tab.children[5].innerText = dat.getHours() + 1
	tab.children[6].innerText = dat.getHours() + 2
	tab.children[7].innerText = dat.getHours() + 3
};

var asd = document.querySelector('div[id=table_time] > table > tbody > tr');
asd.children[8].onclick = function () {
	if (asd.children[7].innerText < 23) {
		for (var i = 1; i < 8; i++) {
            asd.children[i].style.backgroundColor = '';
			asd.children[i].innerText = Number(asd.children[i].innerText) + 1
        }
        
        var busy_time = document.getElementById('table_time').getAttribute('busy_time').split(';')
        var tab = document.getElementById('table_time').firstElementChild.firstElementChild.firstElementChild;
        for (var i = 0; i < busy_time.length; i++) {
            for (var ii = 1; ii < 8; ii++) {
                if ( busy_time[i] == tab.children[ii].innerText || busy_time[i] == '0' + tab.children[ii].innerText ) {  tab.children[ii].style.backgroundColor = 'lightblue';}
            }
        }
    }	
}
asd.children[0].onclick = function () {
	if (asd.children[1].innerText > 0) {
		for (var i = 1; i < 8; i++) {
            asd.children[i].style.backgroundColor = '';
			asd.children[i].innerText = Number(asd.children[i].innerText) - 1
        }
        
        var busy_time = document.getElementById('table_time').getAttribute('busy_time').split(';')
        var tab = document.getElementById('table_time').firstElementChild.firstElementChild.firstElementChild;
        for (var i = 0; i < busy_time.length; i++) {
            for (var ii = 1; ii < 8; ii++) {
                if ( busy_time[i] == tab.children[ii].innerText || busy_time[i] == '0' + tab.children[ii].innerText ) {  tab.children[ii].style.backgroundColor = 'lightblue';}
            }
        }
    }	
}
//End Время П

if (window.location.href.indexOf('chat') !== -1) {
	document.getElementById('id_type_for_chat').style.display = '';
} else {
	document.getElementById('id_type_for_chat').style.display = 'none';
}

const copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};

async function get_info(type) { //v.2
    let id;
    if (window.location.href.indexOf('chat') !== -1) {
        id = document.getElementById('id_type_for_chat').value;
    } else if (type == 'student') {
        id = document.querySelectorAll('label > input[class="form-custom-field"]')[1].value.replace(/[^0-9]/g, "");
    } else if (type == 'teacher') {
        id = document.querySelectorAll('label > input[class="form-custom-field"]')[0].value.replace(/[^0-9]/g, "");
    }

    if (id) {
        var get_person_info = new Promise( (resolve) => {
            chrome.runtime.sendMessage({name: "script_pack", question: 'get_person_info', id: id}, function(response) {
                resolve(response);
            })
        });
        
        get_person_info.then( (value) => {
            var role = value.role;

            if (role == 'operator') {
                document.getElementById('info_status').setAttribute('user_id', id);
                document.getElementById('btn_hide').style.display = '';
                document.getElementById('info_student_block').innerHTML = value.answer;
                document.getElementById('info_status').lastElementChild.children[2].innerText = role;
                document.getElementById('info_block').style.display = 'block';
                document.getElementById('student_crm').style.visibility = 'hidden';
                document.getElementById('info_student_status').style.display = '';

                document.getElementById('student_edit').onclick = function () {
                    window.open('https://id.skyeng.ru/admin/users/' + id, '_blank');
                }

                chrome.runtime.sendMessage({name: "script_pack", question: 'get_user_comment', id: id}, function(response) {
                    if (response.answer.length == 0) {
                        document.getElementById('info_student_status').children[3].setAttribute('title','Нет заметок')
                    } else {
                        document.getElementById('info_student_status').children[3].setAttribute('title', 'from: ' + response.answer[0].name + '\n' + response.answer[0].comment.replace('~','\n'))
                    }
                });
            } else {
                if (role == 'student') {
                    document.getElementById('info_status').setAttribute('user_id', id);
                    document.getElementById('btn_hide').style.display = '';
                    document.getElementById('info_student_block').style.display = '';
                    document.getElementById('info_status').style.display = '';
                    document.getElementById('info_student_block').innerHTML = value.status + value.answer; 
                    document.getElementById('info_block').style.display = 'block';
                    document.getElementById('info_student_status').style.display = '';
                    document.getElementById('info_status').lastElementChild.children[2].innerText = role;
                    document.getElementById('student_edit').onclick = function () {
                        window.open('https://id.skyeng.ru/admin/users/' + id + '/update', '_blank');
                    }

                    document.getElementById('student_login').onclick = function () {
                        chrome.runtime.sendMessage({name: "script_pack", question: 'get_login_link', id: id}, function(response) {
                            copyToClipboard(response.answer.data.link);
                        });
                    };

                    chrome.runtime.sendMessage({name: "script_pack", question: 'get_user_comment', id: id}, function(response) {
                        if (response.answer.length == 0) {
                            document.getElementById('info_student_status').children[3].setAttribute('title','Нет заметок');
                        } else if (response.answer.length !== 0) {
                            document.getElementById('info_student_status').children[3].setAttribute('title', 'from: ' + response.answer[0].name + '\n' + response.answer[0].comment.replace('~','\n'));
                        }
                    });

                    chrome.runtime.sendMessage({name: "script_pack", question: 'info_user_status', id: id}, function(response) {
                        if (response.type == 'crm1_normal') { //CRM1 only
                            document.getElementById('student_crm').onclick = function () {
                                window.open('https://crm.skyeng.ru/admin/orderPriority/search?page=1&user=' + id, '_blank');
                            }
                            document.getElementById('info_student_block').innerHTML += '<br>Time: ' + response.time; 
                            document.getElementById('info_status').style.backgroundColor = response.status;
                            document.getElementById('info_status').setAttribute('order_id', response.order);
        
                            if (response.comment !== '') {
                                document.getElementById('info_student_status').children[1].setAttribute('title', response.comment);
                            } else {
                                document.getElementById('info_student_status').children[1].setAttribute('title', 'Нет комментария'); 
                            };
                            
                            chrome.runtime.sendMessage({name: "script_pack", question: 'get_Lazzy_TimeTable', id: response.order}, function(response) {
                                let str_search = response.answer.indexOf('Разовые');
                                let str_cut_left = response.answer.substring(0, str_search);
                                let str_cut_right = response.answer.substring(str_search);
                                document.getElementById('info_student_status').children[0].setAttribute('title', str_cut_left + '\n' + str_cut_right);
                            });

                            if (response.teacher == '') {
                                if (response.group !== '') {
                                    document.getElementById('info_teacher_block').innerHTML = '<span><span style="margin-right: 3px;">Группа:</span><a href="https://crm.skyeng.ru/admin/group/edit?id=' + response.group + '">' + response.group + '</a><a style="margin-left: 10px; margin-right: 10px;" href="https://api.olympiad.skyeng.ru/crm/cards/' + id + '">Семья</a><a href="https://grouplessons-api.skyeng.ru/admin/student/view/' + id + '">Подписка</a></span>';
                                    chrome.runtime.sendMessage({name: "script_pack", question: 'get_group_student_info', id: id}, function(response) {
                                        let windt = document.createElement('div');
                                        document.getElementById('info_teacher_block').append(windt);
                                        windt.innerHTML = response.info;
                                    });
                                    document.getElementById('info_teacher_block').style.display = '';
                                    document.getElementById('info_teacher_block').style.marginTop = '';
                                } else {
                                    document.getElementById('info_teacher_block').innerHTML = '';
                                    document.getElementById('teacher_status').style.display = 'none';
                                }
                            } else {
                                var get_person_info2 = new Promise( (resolve) => {
                                    chrome.runtime.sendMessage({name: "script_pack", question: 'get_person_info', id: response.teacher}, function(response) {
                                        resolve(response);
                                    })
                                });
                                get_person_info2.then( (value2) => {
                                    document.getElementById('info_teacher_block').innerHTML = value2.status + value2.answer;
                                    teacher_draw(response.teacher);
                                });
                            }
                        } else if (response.type == 'crm1_user_not_found') {
                            document.getElementById('student_crm').onclick = function () {
                                window.open('https://crm2.skyeng.ru/persons/' + id, '_blank');
                            }
                            //document.querySelectorAll('crm-education-service-item > div > div > div > crm-row > main > crm-user-info > span') //Teachers
                            //document.querySelectorAll('crm-education-service-item > div > div > div')[0].firstElementChild.lastElementChild //order_id
                        }
                    });
                }
                if (role == 'teacher') {
                    document.getElementById('info_teacher_block').innerHTML = value.status + value.answer;
                    document.getElementById('info_status').style.display = 'none';
                    document.getElementById('info_student_block').style.display = 'none';
                    document.getElementById('info_student_status').style.display = 'none';
                    teacher_draw(id);
                }
            }
        });
    }
}

function teacher_draw(id) {
    document.getElementById('teacher_status').setAttribute('user_id', id);
    document.getElementById('btn_hide').style.display = '';
    document.getElementById('info_teacher_block').style.display = '';
    document.getElementById('info_block').style.display = 'block';
    document.getElementById('teacher_status').style.display = '';
    document.getElementById('info_teacher_status').style.display = '';    

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
    
    chrome.runtime.sendMessage({name: "script_pack", question: 'get_user_comment', id: id}, function(response) {
        if (response.answer.length == 0) {
            document.getElementById('info_teacher_status').children[3].setAttribute('title','Нет заметок')
        } else {
            document.getElementById('info_teacher_status').children[3].setAttribute('title', 'from: ' + response.answer[0].name + '\n' + response.answer[0].comment.replace('~','\n'))
        }
    });
    
    //Easy timetable start
    chrome.runtime.sendMessage({name: "script_pack", question: 'get_lessons_today', id: id}, function(response) {
        if (response.answer !== 0 && response.answer !== null) {
            let lessons = '';
            for (let i = 0; i < response.answer.length; i++) {
                lessons += response.answer[i].startAt + ';';
            }
            document.getElementById('table_time').setAttribute('busy_time', lessons);
            document.getElementById('table_time').style.display = 'grid';
        } else { document.getElementById('table_time').style.display = 'none';}
    });
    
    setTimeout( function () {
        if (document.getElementById('table_time').getAttribute('busy_time') !== undefined && document.getElementById('table_time').getAttribute('busy_time') !== null) {
            var busy_time = document.getElementById('table_time').getAttribute('busy_time').split(';')
            var tab = document.getElementById('table_time').firstElementChild.firstElementChild.firstElementChild;
            for (var i = 0; i < busy_time.length; i++) {
                for (var ii = 1; ii < 8; ii++) {
                    if ( busy_time[i] == tab.children[ii].innerText || busy_time[i] == '0' + tab.children[ii].innerText ) {  tab.children[ii].style.backgroundColor = 'lightblue';}
                }
            }
        } else {
            console.log('у П нет уроков на сегодня');
        }
    }, 2000);
    //Easy timetable end            
}