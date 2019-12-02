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

//Получаю request со страницы скрипта
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    //Проверяем что это наш запрос:
    if (request.name === "script_pack") {
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
                    
                    var id = '',    names = '',    mail = '',    phone = '',    phoneD = '',    skype = '',    identity = '', roles = false, roles_text = '', role = '';
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

                    let stat = id + names + mail + phone + phoneD + skype + identity;
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
                .then(json => { sendResponse({answer: json[0].id}) });
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
            fetch('https://crm.skyeng.ru/order/lazyTimetable', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'x-requested-with': 'XMLHttpRequest'
                },
                body: 'order_id=' + '2310091'
            })
            .then(response => response.text())
            .then(html => {
                var page = document.createElement('html');
                page.innerHTML = html;
                var asd = page.getElementsByClassName('col-md-6')[0].children[0].innerText.trim().replace(/\n/g, "");
                asd = asd + '\n' + page.getElementsByClassName('col-md-6')[0].children[1].innerText.trim();
                sendResponse({
                    answer: asd.replace(/\s+/g,' ').trim()
                });
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

                    sendResponse({
                        from: from,
                        to: to,
                        subscribe: subscribe,
                        sub: sub,
                        info: result
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
