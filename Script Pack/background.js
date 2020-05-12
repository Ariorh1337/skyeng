//Отправляя request со страницы скрипта
/*
chrome.runtime.sendMessage({name: "script_pack", question: 'get_lesson_info', id: '2314498', hour: '17', day:'18'}, function(response) {
    console.log(response.answer);
});

chrome.runtime.sendMessage({name: "script_pack", question: 'get_lessons_info', id: '2314498', day: '18', count:'1'}, function(response) {
    console.log(response.answer);
});

// Инфа из CRM о статусе + часовом поясе
chrome.runtime.sendMessage({name: "script_pack", question: 'info_user_status', id: '2310091'}, function(response) {
    console.log(response.status + ' ' + response.time);
});

// Инфа о пользователе
chrome.runtime.sendMessage({name: "script_pack", question: 'get_person_info', id: '2310091'}, function(response) {
    console.log(response.answer);
});
*/
var JWT_token = '', test_teacher_id = '';
checkJWT()

//Получаю request со страницы скрипта
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    //Проверяем что это наш запрос:
    if (request.name === "script_pack") {
        checkJWT()
        let answer;
        if (request.question == 'get_lesson_info') {
            answer = get_lesson_info(request.id, request.hour, request.day, request.month, request.year);
            sendResponse({
                answer: answer
            });
        }
        if (request.question == 'get_lessons_info') {
            answer = get_lessons_info(request.id, request.day, request.count, request.month, request.year);
            sendResponse({
                answer: answer
            });
        }
        if (request.question == 'info_user_status') {
            (async () => {
                let response = await fetch('https://cabinet.skyeng.ru/admin/orderPriority/search?user=' + request.id, {
                    method: 'POST',	headers: {'content-type': 'application/x-www-form-urlencoded'}, async: true
                });
                let text = await response.text(); // прочитать тело ответа как текст
                if (response.status == 200) {
                    let page = document.createElement('html');
                    page.innerHTML = text;

                    if (page.querySelector('.order_container > span') !== null && page.querySelector('.order_container > span').innerText == "Нет подходящих заявок") {
                        sendResponse({status: '', time: '', teacher: '', order: '', comment: '', group: '', type: 'crm1_user_not_found'});
                        console.log('Status = Not Found')
                    } else {
                        let answer = {'6': 'purple', '5': 'green', '4': 'lightblue', '3': 'orange', '2': 'pink', '1': 'grey', '0': 'grey'};
                        let group = (page.querySelector('table > tbody > tr[data-order] > td > div[class="top-buffer"] > strong') == null) ? '' : page.querySelector('table > tbody > tr[data-order] > td > div[class="top-buffer"] > strong').innerText;

                        let responce = {
                            status: answer[page.querySelector('div[class=short_comment] > table[class=b-order-table__status-cell] > tbody > tr').children[1].className.slice(-1)],
                            time: page.querySelector('td > div > small').innerText,
                            teacher: page.querySelector('.teacher_select > option').value,
                            order: page.querySelector('tbody > tr[data-order]').getAttribute('data-order'),
                            comment: page.querySelector('.order_extra_input > pre').innerText,
                            group: group,
                            type: 'crm1_normal'
                        };
                        sendResponse(responce);
                    }
                } else {
                    console.log('Status != 200')
                    sendResponse({status: '', time: '', teacher: '', order: '', comment: '', group: '', type: 'responce_status_error'});
                }
            })();
            return true;
        }
        if (request.question == 'get_person_info') {
            (async () => {
                let response = await fetch('https://id.skyeng.ru/admin/users/' + request.id, {
                    method: 'GET',	headers: {'content-type': 'application/x-www-form-urlencoded'}, async: true
                });
                let text = await response.text(); // прочитать тело ответа как текст
                if (response.status == 200) {
                    var page = document.createElement('a');
                    page.innerHTML = text.toString();
                    
                    var id = '',    names = '',    mail = '',    phone = '',    phoneD = '',    skype = '',    identity = '', roles = false, roles_text = '', role = '', time = '';
                    var sname = page.querySelectorAll('main > div > table > tbody > tr > th');
                    var result = page.querySelectorAll('main > div > table > tbody > tr > td');

                    for (var i = 0; i < sname.length; i++) {
                        if (result[i].innerText !== '') {
                            (sname[i].innerText == 'Id') ? id = 'ID: ' + result[i].innerText : false;
                            (sname[i].innerText == 'Имя' || sname[i].innerText == 'Name') ? names = '<br>Name: ' + result[i].innerText : false;
                            (sname[i].innerText == 'Фамилия' || sname[i].innerText == 'Surname') ? names = names + ' ' + result[i].innerText : false;
                            (sname[i].innerText == 'Почта' || sname[i].innerText == 'Email') ? mail = '<br>eMail: ' + result[i].innerText : false;
                            (sname[i].innerText == 'Телефон' || sname[i].innerText == 'Phone') ? phone = '<br><a href="tel:' + result[i].innerText + '">Phone</a>: ' + result[i].innerText : false;
                            (sname[i].innerText == 'Домашний телефон' || sname[i].innerText == 'Home phone') ? phoneD = '<br><a href="tel:' + result[i].innerText + '">Phone2</a>: ' + result[i].innerText : false;
                            (sname[i].innerText == 'Skype') ? skype = '<br><a href="skype:' + result[i].innerText + '?chat">Skype</a>: ' + result[i].innerText : false;
                            (sname[i].innerText == 'Legacy identity') ? identity = '<br>Identity: ' + result[i].innerText : false;
                            (sname[i].innerText == 'Смещение UTC') ? time = `<br>Время: ${makeUTCGreatAgain(result[i].innerText)}` : false;
							(sname[i].innerText == 'Все новые роли' || sname[i].innerText == 'All new roles') ? roles = result[i].innerText.trim() : false;
                        }
                    }

                    if (roles) {
						if (roles.indexOf('ROLE_OPERATOR') !== -1) { 
                            role = 'operator';
                            roles_text += 'Operator<br>';
                        } else if (roles.indexOf('ROLE_TEACHER') !== -1) {
                            role = 'teacher';
                            (roles.indexOf('ROLE_MATH_TEACHER') !== -1) ? roles_text += 'Teacher - <a style="color: darkblue; font-weight: 700;">Math</a><br>' : false;
                        } else if (roles.indexOf('ROLE_VIMBOX_STUDENT') !== -1) {
                            role = 'student';
                            if (roles.indexOf('ROLE_GROUP_STUDENT') !== -1) {
                                roles_text += 'Student - <a style="color: purple; font-weight: 700;">Group</a><br>';
                            } else if (roles.indexOf('ROLE_MATH_STUDENT') !== -1) {
                                roles_text += 'Student - <a style="color: darkblue; font-weight: 700;">Math</a><br>';
                            };
                        }
                    }

                    let stat = id + names + mail + phone + phoneD + skype + identity + time;
                    sendResponse({
                        status: roles_text,
                        answer: stat,
                        role: role
                    });
                };
            })();
            return true;
        }
        if (request.question == 'get_login_link') {
            fetch('https://crm.skyeng.ru/order/generateLoginLink?userId=' + request.id, {headers: {'x-requested-with': 'XMLHttpRequest'}})
                .then(response => response.json())
                .then(json => { sendResponse({answer: json}) });
            return true;
        }
        if (request.question == 'get_trm_id') {
            fetch('https://tramway.skyeng.ru/teacher/autocomplete/search?stage=all&term=' + request.id, {headers: {'content-type': 'application/x-www-form-urlencoded'}})
                .then(response => response.json())
                .then(json => {
                    if (request.type = 'trm_id') {
                        sendResponse({answer: json[0].id})
                    } else {
                        sendResponse({answer: json[0].label})
                    }
                });
            return true;
        }
        if (request.question == 'get_lessons_today') {
            let data = new Date()
            let body = 'from=' + String(data.getDate() - 1) + '-' + String(data.getMonth() + 1) + '-' + String(data.getFullYear()) + ' 20:00:00&to=' + String(data.getDate()) + '-' + String(data.getMonth() + 1) + '-' + String(data.getFullYear()) + ' 20:00:00&offset=0&filters[teacherIds][]=' + String(request.id);
            fetch('https://timetable.skyeng.ru/api/teachers/search', { method: 'POST', headers: {'content-type': 'application/x-www-form-urlencoded'}, body: body })
                .then(response => response.json())
                    .then(obj => {
                        if (obj[0].result[0].classes !== undefined) {
                            var classes = obj[0].result[0].classes;
                            for (var i = 0; i < classes.length; i++) {
                                if (classes[i].createdAt !== undefined) {
                                    let str = classes[i].createdAt;
                                    classes[i].createdAt = classes[i].createdAt.replace(str.slice(10, 13), 'T' + String(Number(str.slice(11, 13)) + 3));
                                }
                                if (classes[i].endAt !== undefined) {
                                    let str = classes[i].endAt;
                                    classes[i].endAt = classes[i].endAt.replace(str.slice(10, 13), 'T' + String(Number(str.slice(11, 13)) + 3));
                                }
                                if (classes[i].startAt !== undefined) {
                                    classes[i].startAt = String(Number(classes[i].startAt.slice(11, 13)) + 3);
                                }
                                if (classes[i].updatedAt !== undefined) {
                                    let str = classes[i].updatedAt;
                                    classes[i].updatedAt = classes[i].updatedAt.replace(str.slice(10, 13), 'T' + String(Number(str.slice(11, 13)) + 3));
                                }
                                if (classes[i].classStatus !== undefined && classes[i].classStatus.createdAt !== undefined) {
                                    let str = classes[i].classStatus.createdAt;
                                    classes[i].classStatus.createdAt = classes[i].classStatus.createdAt.replace(str.slice(10, 13), 'T' + String(Number(str.slice(11, 13)) + 3));
                                }
                            }
                        }
    
                        if (obj[0].result[0].classesRegular !== undefined) {
                            let classes = obj[0].result[0].classesRegular;
                            var classes_regular = [];
                            if (data.getDay() == 0) { 
                                var date_day = 6; 
                            } else { 
                                var date_day = data.getDay() - 1; 
                            }
                            for (var i = 0; i < classes.length; i++) {
                                classes[i].startAt = classes[i].startAt.split(':')[0].slice(1)
                                classes[i].startAtDays = Math.floor( classes[i].startAt / 24);
                                classes[i].startAt = classes[i].startAt - classes[i].startAtDays * 24 + 3;
                            }
                            for (var i = 0; i < classes.length; i++) {
                                if (classes[i].startAtDays == date_day) { 
                                    classes_regular.push(classes[i]); 
                                }
                            }
                        }
    
                        if (classes && classes_regular) {
                            for (var i = 0; i < classes.length; i++) {
                                if (classes[i].classStatus !== undefined && classes[i].classStatus.createdAt !== undefined) {
                                    if (classes[i].classRegularId !== undefined && classes[i].classRegularId !== '') {
                                        for (let c = 0; c < classes_regular.length; c++) {
                                            if (classes_regular[c].id == classes[i].classRegularId) {
                                                classes_regular.splice(c,1);
                                                c--;
                                            }
                                        }
                                    }
                                    classes.splice(i,1);
                                    i--;
                                }
                            }
                        }
    
                        (classes) ? true : classes = '';
                        (classes_regular) ? true : classes_regular = '';
                        if (classes.length !== 0 && classes_regular.length !== 0) {
                            classes = classes.concat(classes_regular);
                            sendResponse({
                                answer: classes
                            });
                        } else if (classes.length !== 0 && classes_regular.length == 0) {
                            sendResponse({
                                answer: classes
                            });
                        } else if (classes.length == 0 && classes_regular.length !== 0) {
                            sendResponse({
                                answer: classes_regular
                            });
                        } else {
                            sendResponse({
                                answer: null
                            });
                        }
                    });
            return true;
        }
        if (request.question == 'get_Lazzy_TimeTable') {
            
            fetch('https://crm.skyeng.ru/orderV2/ajaxLessonsHistoryTab/id/' + request.id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'x-requested-with': 'XMLHttpRequest'
                }
            })
            .then(response => response.text())
            .then(html => {
                var page = document.createElement('html');
                page.innerHTML = html;
                if (page.querySelector('#lesson-planned-container').lastElementChild.innerText.trim() !== "Запланированных уроков нет") {
                    document.body.prepend(page);
					let str = Array(), str2 = Array();
                    page.querySelector('#lesson-planned-container').innerText.split('\n').forEach((elm) => {
                        if (elm.trim() !== '') {
                            str.push(elm);
                        }
                    });
                    str.splice(0,3);

                    str.forEach((elm) => {
                        let cut = elm.split('	');

						(cut[0].indexOf("Mon") !== -1) ? cut[0] = cut[0].replace('Mon','ПН') : false;
                        (cut[0].indexOf("Tue") !== -1) ? cut[0] = cut[0].replace('Tue','ВТ') : false;
                        (cut[0].indexOf("Wed") !== -1) ? cut[0] = cut[0].replace('Wed','СР') : false;
                        (cut[0].indexOf("Thu") !== -1) ? cut[0] = cut[0].replace('Thu','ЧТ') : false;
                        (cut[0].indexOf("Fri") !== -1) ? cut[0] = cut[0].replace('Fri','ПТ') : false;
                        (cut[0].indexOf("Sat") !== -1) ? cut[0] = cut[0].replace('Sat','СБ') : false;
                        (cut[0].indexOf("Sun") !== -1) ? cut[0] = cut[0].replace('Sun','ВС') : false;

                        str2.push(`${cut[0]} | ${cut[1].match(/#[0-9]*/i)[0]} | ${cut[3] == "Английский язык" ? "Англ" : "Math"} | ${cut[4] == "Регулярный" ? "reg" : "one"}`);
                    });
                    str2 = str2.join('\n');
					page.remove();

                    sendResponse({ answer: str2 });
                } else {
                    sendResponse({ answer: 'Нет уроков' });
                }
            });
            return true;
        }
        if (request.question == 'get_group_student_info') {
            console.log(request.id)
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.status == 200) {
                    var page = document.createElement('html');
                    page.innerHTML = xhr.response;
        
                    //Заморозка
                    var table = page.querySelector('ul[class="list-group list-group-flush"] > table > tbody > tr');
                    if (table !== null) {
                        var from = table.children[1].innerText;
                        from = from.split(' ')[0].split('-')[2] + '-' + from.split(' ')[0].split('-')[1] + '-' + from.split(' ')[0].split('-')[0] + ' ' + from.split(' ')[1]
                        var to = table.children[2].innerText;
                        to = to.split(' ')[0].split('-')[2] + '-' + to.split(' ')[0].split('-')[1] + '-' + to.split(' ')[0].split('-')[0] + ' ' + to.split(' ')[1]
                    } else {
                        var from = null;
                        var to = null;
                    }
                    //Подписка
                    var subscribe = page.querySelector('div[class="row"] > div > div[class="app-content"] > h6').innerText.split('›')[1].replace(/[^0-9-: ]/gi,'').replace(/[:]/,'').trim();
                    var sub = subscribe.split(' ')[0].split('-')[2] + '-' + subscribe.split(' ')[0].split('-')[1] + '-' + subscribe.split(' ')[0].split('-')[0] + ' ' + subscribe.split(' ')[1]
                    subscribe = subscribe.split(' ')[0].split('-')[0] + '/' + subscribe.split(' ')[0].split('-')[1] + ' ' + subscribe.split(' ')[1]

                    //Семья
                    var info = page.querySelector('div[id="student-family-list"] > div > ul[class="list-group list-group-flush"]').innerText.trim().replace(/[\s+][\s+]/g, ''), result = '<div>';
                    for (var o = 1; o < info.split('#').length; o++) {
                        let int = info.split('#')[o].indexOf('Имя:')
                        let int2 = info.split('#')[o].indexOf('Почта:')
                        result += info.split('#')[o -1].slice(0, -5).slice(-8) + ' ' + info.split('#')[o].slice(int, int2) + '</div><div>';
                    }

                    //Группа
                    var group = page.querySelector("h6 > a:nth-child(2)");

                    sendResponse({
                        from: from,
                        to: to,
                        subscribe: subscribe,
                        sub: sub,
                        info: result,
                        group: group
                    });
                    console.log(result);
                }
            }
            xhr.open('GET', 'https://grouplessons-api.skyeng.ru/admin/student/view/' + request.id, false)
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.withCredentials = true;
            xhr.send();
        }
        if (request.question == 'get_user_comment') {
            fetch('https://spreadsheets.google.com/feeds/list/1W_Ay8Mv3aOhcB4JT-6EOg1uqCTIKjEROzD1PvXacVuA/default/public/values?alt=json')
                .then( response => response.json())
                .then( json => {
                        for (let i = json.feed.entry.length -1; i > 0; i--) {
                            if (json.feed.entry[i]['gsx$id']['$t'] == request.id) {
                                let test = [{
                                    'id': json.feed.entry[i]['gsx$id']['$t'],
                                    'ticket': json.feed.entry[i]['gsx$ticketid']['$t'],
                                    'name': json.feed.entry[i]['gsx$name']['$t'],
                                    'comment': json.feed.entry[i]['gsx$comment']['$t']
                                }]
                                sendResponse({answer: test});
                                break;
                            }
                        }
                        sendResponse({answer: []});
                })
            return true;
        }
        if (request.question == 'info_user_search') {
            fetch('https://id.skyeng.ru/admin/users?user_list_form%5Bidentity%5D=' + encodeURI(request.id))
            .then(response => response.text())
            .then(text => {
                let html = document.createElement('html')
                html.innerHTML = text;
                var table = html.querySelector('tbody'), responce = [];

                if (table && table !== null) {
                    for (var i = 0; i < table.children.length; i++) {
                        let c = {'id': table.children[i].children[0].innerText, 'identity': table.children[i].children[1].innerText, 'name': table.children[i].children[2].innerText, 'mail': table.children[i].children[3].innerText}
                        responce.push(c)
                    }
                }

                sendResponse({answer: responce});
            });
            return true;
        }
        if (request.question == 'info_users_search') {
            fetch('https://id.skyeng.ru/admin/users?user_list_form%5Bemail%5D=' + encodeURI(request.id))
            .then(response => response.text())
            .then(text => {
                let html = document.createElement('html')
                html.innerHTML = text;
                var table = html.querySelector('tbody'), responce = [];

                if (table && table !== null) {
                    for (var i = 0; i < table.children.length; i++) {
                        let c = {'id': table.children[i].children[0].innerText, 'identity': table.children[i].children[1].innerText, 'name': table.children[i].children[2].innerText, 'mail': table.children[i].children[3].innerText}
                        responce.push(c)
                    }
                }

                sendResponse({answer: responce});
            });
            return true;
        }
        if (request.question == 'get_ticket_history') {
            fetch(`https://datsy.ru/api/tickets-list/?id=${request.id}`, {
                method: 'GET',
                headers: { 'content-type': 'application/x-www-form-urlencoded' }
            })
            .then(response => response.text())
            .then( text => {
                text = JSON.parse(text.replace(/\(/g,'{').replace(/\)/g,'}').replace(/\'/g,'"'))
                sendResponse({answer: text});
            })
            return true;
        }
        if (request.question == 'put_ticket_history') {
            fetch(`https://datsy.ru/api/tickets-list/?id=${request.id}&ticket=${request.ticket}`, {
                method: 'GET',
                headers: { 'content-type': 'application/x-www-form-urlencoded' }
            });
        }
        if (request.question == 'get_teacher_by_name') {
            fetch(`https://tramway.skyeng.ru/teacher/autocomplete/search?stage=all&term=${request.fullname}`, { 
                method: 'GET', headers: { 'content-type': 'application/x-www-form-urlencoded' }
            })
            .then(response => response.json())
            .then(json => { 
                json.forEach((a) => {
                    var logic = true;
                    request.fullname.split(' ').forEach((b) => {
                        if (a.name.indexOf(b) == -1) {
                            logic = false;
                        }
                    })
            
                    if (logic == true) {
                        sendResponse({answer: { trm: a.id, name: a.name, full_name: a.label}});
                    }
                })
            });
            return true;
        }
        if (request.question == 'is_crm1') {
            fetch('https://backend.skyeng.ru/api/call-center/persons/?id=' + request.id, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'x-requested-with': 'XMLHttpRequest'
                }	
            }).then(text => text.json()).then(json => {
                sendResponse({answer: json.data[0].isFromCrm1});
            })
            return true;
        }
        if (request.question == 'crm2_status') {
            fetch(`https://backend.skyeng.ru/api/persons/${request.id}/education-services/`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'x-requested-with': 'XMLHttpRequest'
                }	
            }).then(text => text.json()).then(json => {
                let result = [];

                for (let i = 0; i < json.data.length; i++) {
                    let color = '', balance = json.data[i].balance, subject = '', teacher = '', payment = { "id": '', "name": ''};

                    if (json.data[i].stage == "lost") {
                        color = "purple";
                    } else if (json.data[i].stage == "before_call") {
                        color = "pink";
                    } else if (json.data[i].stage == "after_call") {
                        color = "pink";
                    } else if (json.data[i].stage == "after_trial") {
                        color = "lightblue";
                    } else if (json.data[i].stage == "regular_lessons") {
                        color = "green";
                    }

                    if (json.data[i].subject == "english") {
                        subject = "ENG"
                    } else if (json.data[i].subject == "mathematics") {
                        subject = "MATH"
                    }

                    if (json.data[i].teacher == null) {
                        teacher = null;
                    } else {
                        teacher = json.data[i].teacher.general.id;
                    }

                    (json.data[i].paymentAgreement.person.general.id) ? payment['id'] = json.data[i].paymentAgreement.person.general.id : false;
                    (json.data[i].paymentAgreement.person.general.name) ? payment['name'] = json.data[i].paymentAgreement.person.general.name : false;
                    (balance == null) ? balance = 0 : false;
                    
                    result.push({"color": color, "balance": balance, "subject": subject, "teacher": teacher, "payment": payment})
                }

                sendResponse({answer: result});
            })

            return true;
        }
        if (request.question == 'crm2_no_responce') {
            var body = `log=Тикет ТП omnidesk: ${request.ticket_id} ~ не удалось связаться`;
            fetch(`https://backend.skyeng.ru/api/persons/${request.id}/log-any-interaction/`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'x-requested-with': 'XMLHttpRequest'
                },
                body: body	
            }).then( responce => {
                if (responce.status == 204) {
                    sendResponse({answer: 'done'});
                } else {
                    sendResponse({answer: 'error'});
                }
            })
            return true;
        }
        if (request.question == 'get_person_info_v2') {
            chrome.storage.local.get(['JWT_token'], (r) => {
                fetch("https://api.profile.skyeng.ru/api/v1/students/" + request.id + "/base-data", {
                    "headers": {
                        "Authorization": 'Bearer ' + r['JWT_token']
                    },
                    "credentials": "omit"
                })
                    .then(re => {
                        if (re.status == 200) {
                            return re.json();
                        } else {
                            getJWT(test_teacher_id);
                        }
                    })
                    .then(response => {
                        if (response.data.success == true) {
                            let info = response.data.result;
                            let id = `ID: ${info.id}`;
                            let names = (info.name !== null || info.surname !== null) ? `<br>Name: ${(info.name !== null) ? info.name : ''} ${(info.surname !== null) ? info.surname : ''}`: '';
                            let mail = (info.email !== null) ? `<br>eMail: ${info.email}` : '';
                            let phone = (info.phone !== null) ? `<br><a href="tel:${info.phone}">Phone</a>: ${info.phone}` : '';
                            let phoneD = (info.homePhone !== null) ? `<br><a href="tel:${info.homePhone}">Phone2</a>: ${info.homePhone}` : '';
                            let skype = (info.skype !== null) ? `<br><a href="skype:${info.skype}?chat">Skype</a>: ${info.skype}` : '';
                            let identity = (info.identity !== null) ? `<br>Identity: ${info.identity}` : '';
                            let roles_text = '', role = '';
                            let roles = (info.roles) ? info.roles.join(' ').trim() : false;
                            let time = (info.utcOffset) ? `<br>Время: ${makeUTCGreatAgain(info.utcOffset)}` : ``; 
                            
                            if (roles) {
                                if (roles.indexOf('ROLE_OPERATOR') !== -1) { 
                                    role = 'operator';
                                    roles_text += 'Operator<br>';
                                } else if (roles.indexOf('ROLE_TEACHER') !== -1) {
                                    role = 'teacher';
                                    (roles.indexOf('ROLE_MATH_TEACHER') !== -1) ? roles_text += 'Teacher - <a style="color: darkblue; font-weight: 700;">Math</a><br>' : false;
                                } else if (roles.indexOf('ROLE_VIMBOX_STUDENT') !== -1) {
                                    role = 'student';
                                    if (roles.indexOf('ROLE_GROUP_STUDENT') !== -1) {
                                        roles_text += 'Student - <a style="color: purple; font-weight: 700;">Group</a><br>';
                                    } else if (roles.indexOf('ROLE_MATH_STUDENT') !== -1) {
                                        roles_text += 'Student - <a style="color: darkblue; font-weight: 700;">Math</a><br>';
                                    };
                                }
                            }
                            
                            let stat = id + names + mail + phone + phoneD + skype + identity + time;
                            sendResponse({
                                status: roles_text,
                                answer: stat,
                                role: role
                            });
                        }
                    });
            });            
            return true;
        }
    }
});

function get_lesson_info(ID, Hour, Day, Month, Year) {
    if (ID !== '' && ID !== undefined && ID !== null) {
        var info0 = {
            search: 0,
            result: 0
        };
        ID = String(ID).trim();

        let t = new Date();
        if (Hour == undefined) {
            Hour = t.getHours();
        } else if (String(Hour).length < 2) {
            Hour = String('0' + Hour)
        }
        if (Day == undefined) {
            Day = t.getDate();
        } else if (String(Day).length < 2) {
            Day = String('0' + Day)
        }
        if (Month == undefined) {
            Month = t.getMonth() + 1;
        } else if (String(Month).length < 2) {
            Month = String('0' + Month)
        }
        if (Year == undefined) {
            Year = t.getFullYear();
        } else if (String(Year).length < 3 && String(Year).length > 0) {
            Year = String('20' + Year)
        }

        var once = 0;
        var xhr = new XMLHttpRequest();
        let from = Number(Day) + '-' + Number(Month) + '-' + Number(Year) + ' ' + (Number(Hour) - 3),
            to = from;
        var body = 'from=' + from + ':00:00&to=' + to + ':00:00&offset=0&filters[teacherIds][]=' + ID + '&callback=getJSONP';
        XMLHttpRequest.responseType = "arraybuffer";
        xhr.onreadystatechange = function () {
            if (once == 0 && xhr.status == 200 && xhr.responseText !== '') {
                once = 1
                var obj = JSON.parse(xhr.responseText);
                if (obj[0].count !== '0') {
                    if (obj[0].result[0].classes !== undefined) {
                        info0.result = 2;
                        info0.search = obj[0].result[0].classes;
                    } else {
                        info0.result = 1;
                    }
                } else {
                    info0.result = 0;
                }
            }
        }
        xhr.open('POST', 'https://timetable.skyeng.ru/api/teachers/search', false)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.withCredentials = true;
        xhr.send(body);
        if (info0.search !== 0) {
            if (info0.search[0].classStatus.status !== undefined) {
                if (info0.search[0].classStatus.status == 'moved') {
                    var asd = get_lessons_info(ID, Number(Day), 30, Month - 1);
                    for (var i = 0; i < asd.search.length; i++) {
                        if (asd.search[i].createdAt == info0.search[0].classStatus.createdAt && asd.search[i].id !== info0.search[0].id) {
                            info0.movedTo = asd.search[i];
                        }
                    }
                }
            }
        }
        return info0
    }
}

function get_lessons_info(ID, Day, Count, Month, Year) {
    if (ID !== '' && ID !== undefined && ID !== null) {
        var info1 = {
            search: 0,
            result: 0
        };
        ID = String(ID).trim();

        let t = new Date();
        if (Day == undefined || Day == '') {
            Day = t.getDate();
        } else if (String(Day).length < 2) {
            Day = String('0' + Day)
        };
        if (Month == undefined) {
            Month = t.getMonth() + 1;
        } else if (String(Month).length < 2) {
            Month = String('0' + Month)
        };
        if (Year == undefined) {
            Year = t.getFullYear();
        } else if (String(Year).length < 3) {
            Year = String('20' + Year)
        };
        if (Count == undefined || Count == '') {
            t.setDate(Number(Day) + (7 - t.getDay()))
            Count = t.getDate();
            var Month2 = t.getMonth() + 1;
            var Year2 = t.getFullYear();
        } else {
            t.setDate(Number(Day) + Number(Count))
            Count = t.getDate();
            var Month2 = t.getMonth() + 1;
            var Year2 = t.getFullYear();
        }

        var once = 0
        var xhr = new XMLHttpRequest();
        let from = Number(Day) + '-' + Number(Month) + '-' + Number(Year);
        let to = Number(Count) + '-' + Number(Month2) + '-' + Number(Year2)
        var body = 'from=' + from + ' ' + '00:00:00&to=' + to + ' ' + '00:00:00&offset=0&filters[teacherIds][]=' + ID + '&callback=getJSONP';
        XMLHttpRequest.responseType = "arraybuffer";
        xhr.onreadystatechange = function () {
            if (once == 0 && xhr.status == 200 && xhr.responseText !== '') {
                once = 1
                var obj = JSON.parse(xhr.responseText);
                if (obj[0].count !== '0') {
                    if (obj[0].result[0].classes !== undefined) {

                        //console.log(obj[0].result[0].classes);
                        info1.result = 2;
                        info1.search = obj[0].result[0].classes;
                    } else {
                        info1.result = 1;
                    }
                } else {
                    info1.result = 0;
                }
            }
        }
        xhr.open('POST', 'https://timetable.skyeng.ru/api/teachers/search', false)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.withCredentials = true;
        xhr.send(body);
        return info1
    }
}

function makeUTCGreatAgain(time) {
    time = (Number(time) / 3600);
    (String(time).indexOf('-') == -1) ? time = '+' + time : false;
    (time !== '+3') ? time = `<b style="color: #FF5733;">${time}UTC</b>` : time = `<b>${time}UTC</b>`;
    return time;
}

function getJWT(teacher = '2314498') {
    fetch('https://crm.skyeng.ru/order/generateLoginLink?userId=' + teacher, { headers: { 'x-requested-with': 'XMLHttpRequest' } })
        .then(response => response.text())
        .then((response) => {
            if (response !== 'Login required') {
                return JSON.parse(response);
            } else {
                window.open('https://id.skyeng.ru/login');
            }
        })
        .then(link => {
            if (link) {
                //Сохраняем текущие куки
                var save = new Array();
                chrome.cookies.getAll({ domain: ".skyeng.ru" }, (e) => {
                    e.forEach((c) => {
                        if (c.domain == ".skyeng.ru") save.push(c);
                    });
                });
                chrome.cookies.remove({
                    "url": "https://crm.skyeng.ru",
                    "name": "session_global"
                });
                    
                //Логинимся по ссылке логинеру в аккаунт П
                fetch(link.data.link, { "credentials": "include"})
                    .then(r => r.text)
                    .then(r => {
                        //Запрашиваем генерацию JWT токена
                        fetch("https://id.skyeng.ru/user-api/v1/auth/jwt", {
                            "body": null,
                            "method": "POST",
                            "credentials": "include"
                        })
                            .then(a => {
                                //Сохраняем полученый токен из cookie
                                chrome.cookies.getAll({ domain: ".skyeng.ru", name: "token_global" }, (e) => {
                                    e.forEach((c) => {
                                        if (c.domain == ".skyeng.ru") {
                                            chrome.storage.local.set({ 'JWT_token': c.value });
                                        }
                                    });
                                });

                                //Возвращаем куки обратно на место
                                save.forEach((c) => {
                                    c.url = "https://id.skyeng.ru";
                                    delete c.hostOnly;
                                    delete c.session;
                                    chrome.cookies.set(c);
                                });
                            })
                            .then(() => {
                                chrome.storage.local.get(['JWT_token'], (r) => {
                                    JWT_token = r['JWT_token'];
                                })
                            });
                    });
            }
        });
}

function checkJWT() {
    chrome.storage.local.get('test-teacher_id', (r) => {
        if (r['test-teacher_id'] == undefined) {
            chrome.storage.local.set({ 'test-teacher_id': '2314498' });
            test_teacher_id = '2314498';
        } else {
            if (r['test-teacher_id'] !== test_teacher_id) {
                test_teacher_id = r['test-teacher_id'];
                getJWT(test_teacher_id);
            }
        }
    })

    chrome.storage.local.get('JWT_token', (r) => {
        if (r['JWT_token'] == undefined) {
            getJWT(test_teacher_id);
        } else {
            JWT_token = r['JWT_token'];
        }
    })
}