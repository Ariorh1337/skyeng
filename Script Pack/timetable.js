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
    }
});