function get_lesson_info (ID, Hour, Day, Month, Year) {
    if (ID !== '' && ID !== undefined && ID !== null) {
        var info0 = {search: 0, result: 0};
        ID = String(ID).trim();

        let t = new Date();
        if (Hour == undefined) { Hour = t.getHours();} else if (String(Hour).length < 2) { Hour = String('0' + Hour)}
        if (Day == undefined) { Day = t.getDate();} else if (String(Day).length < 2) { Day = String('0' + Day)}
        if (Month == undefined) { Month = t.getMonth() + 1;} else if (String(Month).length < 2) { Month = String('0' + Month)}
        if (Year == undefined) { Year = t.getFullYear();} else if (String(Year).length < 3 && String(Year).length > 0) { Year = String('20' + Year) }

        var once = 0
        var xhr = new XMLHttpRequest();
        let from = Number(Day) + '-' + Number(Month) + '-' + Number(Year) + ' ' + (Number(Hour) - 3), to = from;
        var body = 'from=' + from + ':00:00&to=' + to + ':00:00&offset=0&filters[teacherIds][]=' + ID + '&callback=getJSONP';
        XMLHttpRequest.responseType = "arraybuffer";
        xhr.onreadystatechange = function() {
            if ( once == 0 && xhr.status == 200 && xhr.responseText !== '') {
                once = 1
                var obj = JSON.parse(xhr.responseText);
                if (obj[0].count !== '0') {
                    if (obj[0].result[0].classes !== undefined) {
                        //console.log(obj[0].result[0].classes)
                        info0.result = 2;
                        info0.search = obj[0].result[0].classes;
                    } else {
                        info0.result = 1;
                        console.log('Lesson doesn\'t find')
                    }
                } else {
                    info0.result = 0;
                    console.log('Teacher doesn\'t find');
                }
            }
        }
        xhr.open('POST', 'https://timetable.skyeng.ru/api/teachers/search', false)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.withCredentials = true;
        xhr.send(body);
        setTimeout( function() {
            if (info0.search !== 0) {
                if (info0.search[0].classStatus.status !== undefined) {
                    if (info0.search[0].classStatus.status == 'moved') {
                        var asd = get_lessons_info(ID,Number(Day),30, Month - 1);
                        for (var i = 0; i < asd.search.length; i++) {
                            if (asd.search[i].createdAt == info0.search[0].classStatus.createdAt && asd.search[i].id !== info0.search[0].id) {
                                console.log('Was moved to: ');
                                console.log(asd.search[i]);
                            }
                        }
                    }
                }
            }
        }, 2000);
        return info0
    } else {
        console.log('get_lesson_info(ID, Hour, Day, Month, Year)')
        console.log('get_lesson_info(ID) - Покажет уроки за текущий час')
        console.log('get_lesson_info(ID, Hour) - Покажет уроки за указанный час')
        console.log('get_lesson_info(ID, Hour, Day) - Покажет уроки за указанные час и день')
    }
}

function get_lessons_info (ID, Day, Count, Month, Year) {
    if (ID !== '' && ID !== undefined && ID !== null) {
        var info1 = {search: 0, result: 0};
        ID = String(ID).trim();

        let t = new Date();
        if (Day == undefined || Day == '') { Day = t.getDate();} else if (String(Day).length < 2) { Day = String('0' + Day)};
        if (Month == undefined) { Month = t.getMonth() + 1;} else if (String(Month).length < 2) { Month = String('0' + Month)};
        if (Year == undefined) { Year = t.getFullYear();} else if (String(Year).length < 3) { Year = String('20' + Year)};
        if (Count == undefined || Count == '') { 
            t.setDate( Number(Day) + (7 - t.getDay()) )
            Count = t.getDate(); 
            var Month2 = t.getMonth() + 1;
            var Year2 = t.getFullYear();
        } else {
            t.setDate( Number(Day) + Number(Count) )
            Count = t.getDate(); 
            var Month2 = t.getMonth() + 1;
            var Year2 = t.getFullYear();
        }

        var once = 0
        var xhr = new XMLHttpRequest();
        let from = Number(Day) + '-' + Number(Month) + '-' + Number(Year);
        let to = Number(Count) + '-' + Number(Month2) + '-' + Number(Year2)
        var body = 'from=' + from + ' ' + '00:00:00&to=' + to + ' ' + '00:00:00&offset=0&filters[teacherIds][]=' + ID + '&callback=getJSONP';
        //console.log( 'c ' + Day + '/' + Month + '/' + Year + ' по ' + Count + '/' + Month2 + '/' + Year2)
        XMLHttpRequest.responseType = "arraybuffer";
        xhr.onreadystatechange = function() {
            if ( once == 0 && xhr.status == 200 && xhr.responseText !== '') {
                once = 1
                var obj = JSON.parse(xhr.responseText);
                if (obj[0].count !== '0') {
                    if (obj[0].result[0].classes !== undefined) {
                        
                        //console.log(obj[0].result[0].classes);
                        info1.result = 2;
                        info1.search = obj[0].result[0].classes;
                    } else {
                        info1.result = 1;
                        console.log('Lessons doesn\'t find');
                    }
                } else {
                    info1.result = 0;
                    console.log('Teacher doesn\'t find');
                }
            }
        }
        xhr.open('POST', 'https://timetable.skyeng.ru/api/teachers/search', false)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.withCredentials = true;
        xhr.send(body);
        return info1
    } else {
        console.log('get_lessons_info(ID, Day, Count, Month, Year)')
        console.log('get_lessons_info(ID) - Покажет уроки от сегодня до конца текущей недели')
        console.log('get_lessons_info(ID, Day) - Покажет уроки от указанного Day до конца недели')
        console.log('get_lessons_info(ID, Day, Count) - Покажет уроки от указанного Day до указанных Day + Count')
    }
}

function get_lessons_today(ID) {
    var data = new Date()
    var xhr = new XMLHttpRequest();
    var body = 'from=' + String(data.getDate() - 1) + '-' + String(data.getMonth() + 1) + '-' + String(data.getFullYear()) + ' 20:00:00&to=' + String(data.getDate()) + '-' + String(data.getMonth() + 1) + '-' + String(data.getFullYear()) + ' 20:00:00&offset=0&filters[teacherIds][]=' + String(ID);
    xhr.onloadend = function () {
        if (xhr.responseText == undefined) {
            console.log('Не могу найти такого П, вы уверены что ID верный?')
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
            
            var total_finish_super_last_one = total.concat(class_reg_fin)
            console.log(total_finish_super_last_one)
        }
    }
    xhr.open('POST', 'https://timetable.skyeng.ru/api/teachers/search', false)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.withCredentials = true;
    xhr.send(body);
}

chrome.storage.local.get(['timetable'], function(result) {
    if (result['timetable'] === undefined) { chrome.storage.local.set({timetable: true}, function() {}); }
    if (result['timetable'] === true) {
        var script = document.createElement("script");
        script.setAttribute("type", "text/javascript");
        script.innerHTML = get_lessons_info.toString();
        document.getElementsByTagName("head")[0].appendChild(script);

        var script = document.createElement("script");
        script.setAttribute("type", "text/javascript");
        script.innerHTML = get_lesson_info.toString();
        document.getElementsByTagName("head")[0].appendChild(script);

        var script = document.createElement("script");
        script.setAttribute("type", "text/javascript");
        script.innerHTML = get_lessons_today.toString();
        document.getElementsByTagName("head")[0].appendChild(script);
    }
});

function inner_html() {
/* <style type="text/css">
    ::-webkit-clear-button {
        display: none;
    }
    
    ::-webkit-inner-spin-button {
        display: none;
    }
    
    ::-webkit-calendar-picker-indicator {
        display: none;
    }
    </style>
    <div style="width: 100%; margin: 0 auto; text-align: center;">
        <input type="number" id="TTIdSearch" style="height: 16px; width: 70px; text-align: center; margin-left: 2px;" placeholder="Teacher">
        <input type="button" id="TTSearch" value="Search">
        <input type="date" id="TTDateSearch" style="height: 16px; width: 80px; text-align: center; margin-right: 2px;">
    </div>
    <div id="answer" style="margin: 2px;"></div>*/
}
        
if (localStorage.getItem('winTop') == null) {
    localStorage.setItem('winTop', '120');
    localStorage.setItem('winLeft', '295');
}
        
let wint = document.createElement('div');
document.body.append(wint);
wint.style = 'padding: 4px; min-height: 25px; max-height: 700px; min-width: 76px; max-width: 518px; background: wheat; top: ' + localStorage.getItem('winTop') + 'px; left: ' + localStorage.getItem('winLeft') + 'px; font-size: 14px; z-index: 100; position: fixed; border: 1px solid rgb(56, 56, 56);';
let html_inner = inner_html.toString().slice(27);
html_inner = html_inner.toString().slice('',-5)
wint.innerHTML = html_inner;
        
var listener = function(e , a) {
    wint.style.left = Number(e.clientX - myX) + "px";
    wint.style.top = Number(e.clientY - myY) + "px";
    localStorage.setItem('winTop', String(Number(e.clientY - myY)));
    localStorage.setItem('winLeft', String(Number(e.clientX - myX)));
};
wint.onmousedown = function (a) {
    if (a.button == 1) {
    	window.myX = a.layerX; 
    	window.myY = a.layerY;
    	document.addEventListener('mousemove', listener);
    }
}
wint.onmouseup = function () {document.removeEventListener('mousemove', listener);}
    
var time = new Date().toLocaleDateString("ru-RU", {timeZone: 'Europe/Moscow'}).split('.');
document.getElementById('TTDateSearch').value = time[2] + '-' + time[1] + '-' + time[0]
    
document.getElementById('TTSearch').onclick = function() {
    document.getElementById('answer').innerHTML = '';
    var ID = Number(document.getElementById('TTIdSearch').value);
    var xhr = new XMLHttpRequest();
    var from = new Date(new Date(document.getElementById('TTDateSearch').value) - 864e5).toLocaleDateString().replace(/[.]/gi,'-');
    var to = new Date(document.getElementById('TTDateSearch').value).toLocaleDateString().replace(/[.]/gi,'-');
    var body = 'from=' + from + ' ' + '21:00:00&to=' + to + ' ' + '21:00:00&offset=0&filters[teacherIds][]=' + ID + '&callback=getJSONP';
    XMLHttpRequest.responseType = "arraybuffer";
    xhr.onloadend = function() {
        window.localStorage.setItem('TimeTable', xhr.responseText)
        setTimeout(response, 1000)
    }
    xhr.open('POST', 'https://timetable.skyeng.ru/api/teachers/search', false)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.withCredentials = true;
    xhr.send(body);
};
    
function response() {
    if (window.localStorage.getItem('TimeTable') == '[{"count":"0","result":[]}]' ) {
        alert('Не правильный ID. Возможно ученик?')
    } else {
        var test = JSON.parse(window.localStorage.getItem('TimeTable'))[0].result[0];
        if (test.classes !== undefined) {
             for (var i = 0; i < test.classes.length; i++) {
                var text = test.classes[i].studentId + ' | ' + new Date(test.classes[i].startAt).toLocaleTimeString("ru-RU", {timeZone: 'Europe/Moscow'}).slice(0,5)
    
                if (test.classes[i].classStatus !== undefined) {
                    text = text + ' | status: ' + test.classes[i].classStatus.status;
                    text = text + ' | at: ' + new Date(test.classes[i].classStatus.createdAt).toLocaleString("ru-RU", {timeZone: 'Europe/Moscow'});
                    text = text + ' | by: ' + test.classes[i].classStatus.createdByUserId;
                    if (test.classes[i].classStatus.comment !== '') {
                        text = text + ' | comment: ' + test.classes[i].classStatus.comment;
                    }
                } else if (test.classes[i].removedAt) {
                    text = text + ' | removed | at: ' + new Date(test.classes[i].removedAt).toLocaleString("ru-RU", {timeZone: 'Europe/Moscow'});
                }
                    
                var temp = document.createElement('input');
                document.getElementById('answer').append(temp);
                temp.setAttribute('type','text');
                temp.setAttribute('style','width: 99.4%; height: 12px;');
                temp.value = text;
                console.log(text);
            }
        } else {
            alert('Нет уроков')
        }
    }
}

