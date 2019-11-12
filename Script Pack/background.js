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
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                var page = document.createElement('html');
                page.innerHTML = xhr.response;
                var num = page.querySelector('div[class=short_comment] > table[class=b-order-table__status-cell] > tbody > tr').children[1].className.slice(-1);
                if (num == "6") {
                    answer = 'purple';
                } else if (num == "5") {
                    answer = 'green';
                } else if (num == "4") {
                    answer = 'lightblue';
                } else if (num == "3") {
                    answer = 'orange';
                } else if (num == "2") {
                    answer = 'pink';
                } else {
                    answer = 'grey';
                };
                var time = page.querySelector('td > div > small').innerText;
                var teacher = page.querySelector('.teacher_select > option').value;
                var order = page.querySelector('tbody > tr[data-order]').getAttribute('data-order');
                var comment = page.querySelector('.order_extra_input > pre').innerText;
                var group = '';
                if ( page.querySelector('table > tbody > tr[data-order] > td > div[class="top-buffer"] > strong') !== null ) {
                    group = page.querySelector('table > tbody > tr[data-order] > td > div[class="top-buffer"] > strong').innerText;
                }

                sendResponse({
                    status: answer,
                    time: time,
                    teacher: teacher,
                    order: order,
                    comment: comment,
                    group: group
                });
            }
            xhr.open('POST', 'https://cabinet.skyeng.ru/admin/orderPriority/search?user=' + request.id, false)
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.withCredentials = true;
            xhr.send();
        }
        if (request.question == 'get_person_info') {
            var xhr = new XMLHttpRequest();
            xhr.onloadend = function () {
                var page = document.createElement('html');
                page.innerHTML = xhr.response;
                var id = '',
                    name = '',
                    mail = '',
                    phone = '',
                    phoneD = '',
                    skype = '',
                    identity = '';
                for (var i = 0; i < page.getElementsByTagName('tbody')[0].children.length; i++) {
                    if (page.getElementsByTagName('tbody')[0].children[i].firstElementChild.innerText == 'Id') {
                        if (page.getElementsByTagName('tbody')[0].children[i].lastElementChild.innerText !== '') {
                            id = 'ID: ' + page.getElementsByTagName('tbody')[0].children[i].lastElementChild.innerText;
                        }
                    }
                    if (page.getElementsByTagName('tbody')[0].children[i].firstElementChild.innerText == 'Имя' || page.getElementsByTagName('tbody')[0].children[i].firstElementChild.innerText == 'Name') {
                        if (page.getElementsByTagName('tbody')[0].children[i].lastElementChild.innerText !== '') {
                            name = '<br>Name: ' + page.getElementsByTagName('tbody')[0].children[i].lastElementChild.innerText;
                        }
                    }
                    if (page.getElementsByTagName('tbody')[0].children[i].firstElementChild.innerText == 'Фамилия' || page.getElementsByTagName('tbody')[0].children[i].firstElementChild.innerText == 'Surname') {
                        if (page.getElementsByTagName('tbody')[0].children[i].lastElementChild.innerText !== '') {
                            name = name + ' ' + page.getElementsByTagName('tbody')[0].children[i].lastElementChild.innerText;
                        }
                    }
                    if (page.getElementsByTagName('tbody')[0].children[i].firstElementChild.innerText == 'Почта' || page.getElementsByTagName('tbody')[0].children[i].firstElementChild.innerText == 'Email') {
                        if (page.getElementsByTagName('tbody')[0].children[i].lastElementChild.innerText !== '') {
                            mail = '<br>eMail: ' + page.getElementsByTagName('tbody')[0].children[i].lastElementChild.innerText;
                        }
                    }
                    if (page.getElementsByTagName('tbody')[0].children[i].firstElementChild.innerText == 'Телефон' || page.getElementsByTagName('tbody')[0].children[i].firstElementChild.innerText == 'Phone') {
                        if (page.getElementsByTagName('tbody')[0].children[i].lastElementChild.innerText !== '') {
                            phone = '<br><a href="tel:' + page.getElementsByTagName('tbody')[0].children[i].lastElementChild.innerText + '">Phone</a>: ' + page.getElementsByTagName('tbody')[0].children[i].lastElementChild.innerText;
                        }
                    }
                    if (page.getElementsByTagName('tbody')[0].children[i].firstElementChild.innerText == 'Домашний телефон' || page.getElementsByTagName('tbody')[0].children[i].firstElementChild.innerText == 'Home phone') {
                        if (page.getElementsByTagName('tbody')[0].children[i].lastElementChild.innerText !== '') {
                            phoneD = '<br><a href="tel:' + page.getElementsByTagName('tbody')[0].children[i].lastElementChild.innerText + '">Phone2</a>: ' + page.getElementsByTagName('tbody')[0].children[i].lastElementChild.innerText;
                        }
                    }
                    if (page.getElementsByTagName('tbody')[0].children[i].firstElementChild.innerText == 'Skype') {
                        if (page.getElementsByTagName('tbody')[0].children[i].lastElementChild.innerText !== '') {
                            skype = '<br><a href="skype:' + page.getElementsByTagName('tbody')[0].children[i].lastElementChild.innerText + '?chat">Skype</a>: ' + page.getElementsByTagName('tbody')[0].children[i].lastElementChild.innerText;
                        }
                    }
                    if (page.getElementsByTagName('tbody')[0].children[i].firstElementChild.innerText == 'Legacy identity') {
                        if (page.getElementsByTagName('tbody')[0].children[i].lastElementChild.innerText !== '') {
                            identity = '<br>Identity: ' + page.getElementsByTagName('tbody')[0].children[i].lastElementChild.innerText;
                        }
                    }
                }
                let info = id + name + mail + phone + phoneD + skype + identity;
                sendResponse({
                    status: answer,
                    answer: info
                });
            }
            xhr.open('GET', 'https://id.skyeng.ru/admin/users/' + request.id, false)
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.withCredentials = true;
            xhr.send();
        }
        if (request.question == 'get_login_link') {
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                var obj = JSON.parse(xhr.responseText);
                sendResponse({
                    answer: obj
                });
            };
            xhr.open('GET', 'https://crm.skyeng.ru/order/generateLoginLink?userId=' + request.id, false)
            xhr.setRequestHeader('x-requested-with', 'XMLHttpRequest');
            xhr.withCredentials = true;
            xhr.send();
        }
        if (request.question == 'get_trm_id') {
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                var obj = JSON.parse(xhr.responseText);
                sendResponse({
                    answer: obj[0].id
                });
            }
            xhr.open('GET', 'https://tramway.skyeng.ru/teacher/autocomplete/search?stage=all&term=' + request.id, false)
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.withCredentials = true;
            xhr.send();
        }
        if (request.question == 'get_lessons_today') {
            var data = new Date()
            var xhr = new XMLHttpRequest();
            var body = 'from=' + String(data.getDate() - 1) + '-' + String(data.getMonth() + 1) + '-' + String(data.getFullYear()) + ' 20:00:00&to=' + String(data.getDate()) + '-' + String(data.getMonth() + 1) + '-' + String(data.getFullYear()) + ' 20:00:00&offset=0&filters[teacherIds][]=' + String(request.id);
            xhr.onloadend = function () {
                if (xhr.responseText == undefined) {
                    //console.log('Не могу найти такого П, вы уверены что ID верный?')
                } else {
                    var obj = JSON.parse(xhr.responseText);
                    
                    if (obj[0].result[0].classes !== undefined) {
                        var total = obj[0].result[0].classes;
                        for (var i = 0; i < total.length; i++) {
                            if (total[i].createdAt !== undefined) {
                                let str = total[i].createdAt;
                                total[i].createdAt = total[i].createdAt.replace(str.slice(10, 13), 'T' + String(Number(str.slice(11, 13)) + 3));
                            }
                            if (total[i].endAt !== undefined) {
                                let str = total[i].endAt;
                                total[i].endAt = total[i].endAt.replace(str.slice(10, 13), 'T' + String(Number(str.slice(11, 13)) + 3));
                            }
                            if (total[i].startAt !== undefined) {
                                total[i].startAt = String(Number(total[i].startAt.slice(11, 13)) + 3);
                            }
                            if (total[i].updatedAt !== undefined) {
                                let str = total[i].updatedAt;
                                total[i].updatedAt = total[i].updatedAt.replace(str.slice(10, 13), 'T' + String(Number(str.slice(11, 13)) + 3));
                            }
                            if (total[i].classStatus !== undefined) {
                                if (total[i].classStatus.createdAt !== undefined) {
                                    let str = total[i].classStatus.createdAt;
                                    total[i].classStatus.createdAt = total[i].classStatus.createdAt.replace(str.slice(10, 13), 'T' + String(Number(str.slice(11, 13)) + 3));
                                }
                            }
                        }
                    }

                    if (obj[0].result[0].classesRegular !== undefined) {
                        let class_reg = obj[0].result[0].classesRegular
                        var class_reg_fin = [];
                        if (data.getDay() == 0) { var date_day = 6; } else { var date_day = data.getDay() - 1; }
                        for (var i = 0; i < class_reg.length; i++) {
                            class_reg[i].startAt = class_reg[i].startAt.split(':')[0].slice(1)
                            class_reg[i].startAtDays = Math.floor( class_reg[i].startAt / 24);
                            class_reg[i].startAt = class_reg[i].startAt - class_reg[i].startAtDays * 24 + 3;
                        }
                        for (var i = 0; i < class_reg.length; i++) {
                            if (class_reg[i].startAtDays == date_day) { class_reg_fin.push(class_reg[i]); }
                        }
                    }
                    
                    if (class_reg_fin.length !== 0) {
                        var total_finish_super_last_one = total.concat(class_reg_fin)
                        sendResponse({
                            answer: total_finish_super_last_one
                        });
                    } else {
                        sendResponse({
                            answer: null
                        });
                    }
                }
            }
            xhr.open('POST', 'https://timetable.skyeng.ru/api/teachers/search', false)
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.withCredentials = true;
            xhr.send(body);
        }
        if (request.question == 'get_Lazzy_TimeTable') {
            var xhr = new XMLHttpRequest();
            xhr.onloadend = function () {
                var page = document.createElement('html');
                page.innerHTML = xhr.response;
                var asd = page.getElementsByClassName('col-md-6')[0].children[0].innerText.trim().replace(/\n/g, "");
                asd = asd + '\n' + page.getElementsByClassName('col-md-6')[0].children[1].innerText.trim();
                sendResponse({
                    answer: asd.replace(/\s+/g,' ').trim()
                });
            }
            xhr.open('POST', 'https://crm.skyeng.ru/order/lazyTimetable' , false)
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            xhr.setRequestHeader('x-requested-with', 'XMLHttpRequest');
            xhr.withCredentials = true;
            xhr.send('order_id=' + String(request.id));
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

        var once = 0
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