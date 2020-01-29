function storage_ask(type) { //await storage_ask('watching') - [{...},{...},...]
	var store = new Promise((resolve) => {
		chrome.storage.local.get(type, function(result){
			resolve(result[type]);
		});
	});
	return store;
}

Date.daysBetween = function( date1 ) {
	var date3 = new Date()
	var date2 = new Date(date3.getFullYear(), date3.getMonth(), date3.getDate())
 	//Get 1 day in milliseconds
	var one_day=1000*60*60*24

	// Convert both dates to milliseconds
	var date1_ms = date1.getTime();
	var date2_ms = date2.getTime();

	// Calculate the difference in milliseconds
	var difference_ms = date2_ms - date1_ms;

	// Convert back to days and return
	return Math.round(difference_ms/one_day);
}

Date.daysWeek = function( date1 ) {
	var date3 = new Date()
	if (date3.getDay() !== 0) {
		var date2 = new Date(date3.getFullYear(), date3.getMonth(), date3.getDate() + (7 - date3.getDay()))
    } else {
		var date2 = new Date(date3.getFullYear(), date3.getMonth(), date3.getDate())
    }
 	//Get 1 day in milliseconds
	var one_day=1000*60*60*24

	// Convert both dates to milliseconds
	var date1_ms = date1.getTime();
	var date2_ms = date2.getTime();

	// Calculate the difference in milliseconds
	var difference_ms = date2_ms - date1_ms;

	// Convert back to days and return
	return Math.round(difference_ms/one_day);
}

async function calculate(event, time) { //await calculate('watching', 0) - {count: 0, crit: 0, high: 0}
    let data = await storage_ask(event);
	let days = 0, weeks = 0, months = 0, Dhigh = 0, Dcrit = 0, Whigh = 0, Wcrit = 0, Mhigh = 0, Mcrit = 0, result;
    
    if (event == 'assign') {
        for (let i = 0; i < data.length; i++) {
            let res = data[i].time, prior = data[i].prior, dat = new Date(res.year,res.month,res.day), now = new Date();
            if (Date.daysBetween(dat) < 1) {
                days += 1;
                if (prior == 'Высокий') { Dhigh += 1; };
                if (prior == 'Критический') { Dcrit += 1; };
            }
            if (Date.daysWeek(dat) < 7) {
                weeks += 1;
                if (prior == 'Высокий') { Whigh += 1; };
                if (prior == 'Критический') { Wcrit += 1; };
            }
            if (now.getMonth() == res.month) {
                months += 1;
                if (prior == 'Высокий') { Mhigh += 1; };
                if (prior == 'Критический') { Mcrit += 1; };
            }
        }
    } else {
        for (let i = 0; i < data.length; i++) {
            let res = data[i].time, dat = new Date(res.year,res.month,res.day), now = new Date();
            (Date.daysBetween(dat) < 1) ? days += 1 : false;
            (Date.daysWeek(dat) < 7) ? weeks += 1 : false;
            (now.getMonth() == res.month) ? months += 1 : false;
        }
    }

    if (time == 0) {
        result = { count: days, crit: Dcrit, high: Dhigh };
    } else if (time == 1) {
        result = { count: weeks, crit: Wcrit, high: Whigh };
    } else if (time == 2) {
        result = { count: months, crit: Mcrit, high: Mhigh };
    }
    return result;
}

async function draw_stat (time) {
	document.getElementById('big_edit').style.width = '145px';
	let watching = await calculate('watching', Number(time));
    let event = await calculate('event', Number(time));
    let assign = await calculate('assign', Number(time));
	let handover = await calculate('handover', Number(time));
	let chat_event = await calculate('chat_event', Number(time));
	let chat_assign = await calculate('chat_assign', Number(time));
    let text = (time == 0) ? 'Сегодня' : (time == 1) ? 'Неделя' : (time == 2) ? 'Месяц' : false;
    document.getElementById('big_edit').innerHTML = `
    <div id="small_menu">
        <span class="button">⬅</span>
        <span style="font-size: 12px;">${text}</span>
        <span class="button">➡</span>
    </div>
    <table border="1" style="width: 132px;">
        <tbody>
            <tr><td colspan="3">Просмотрено: </td><td style="min-width: 13px;">${watching.count}</td></tr>
            <tr><td colspan="3">Действия: </td><td>${event.count}</td></tr>
            <tr><td colspan="3">Тикеты 1Л: </td><td>${assign.count}</td></tr>
            <tr><td colspan="3">Тикеты 2Л: </td><td>${handover.count}</td></tr>
            <tr>
                <td>Всего: </td>
                <td id="total_crit">${assign.crit}</td>
                <td id="total_high">${assign.high}</td>
                <td>${assign.count + handover.count}</td>
			</tr>
			<tr><td colspan="3">Действия чаты: </td><td>${chat_event.count}</td></tr>
			<tr>
                <td colspan="2">Чаты: </td>
                <td id="total_crit2">${chat_assign.crit}</td>
                <td>${chat_assign.count}</td>
			</tr>
        </tbody>
    </table>
    <button id="reset_button">сброс</button>`;
    document.getElementById('small_menu').firstElementChild.addEventListener('click', () => {
        (small_menu == 0) ? small_menu = 2 : (small_menu == 1) ? small_menu = 0 : (small_menu == 2) ? small_menu = 1 : false;
        draw_stat(small_menu);
    });
    document.getElementById('small_menu').lastElementChild.addEventListener('click', () => {
        (small_menu == 0) ? small_menu = 1 : (small_menu == 1) ? small_menu = 2 : (small_menu == 2) ? small_menu = 0 : false;
        draw_stat(small_menu);
	});
	document.getElementById('reset_button').addEventListener('click', () => {
		chrome.storage.local.set({'watching' : []});
		chrome.storage.local.set({'assign' : []});
		chrome.storage.local.set({'handover' : []});	
		chrome.storage.local.set({'event' : []});
		chrome.storage.local.set({'chat_event' : []});
		chrome.storage.local.set({'chat_assign' : []});
	});
}

async function text_history(event, time) {
    (event == 0) ? event = 'assign' : (event == 1) ? event = 'handover' : (event == 2) ? event = 'chat_assign' : false;

    let data = await storage_ask(event);
	let hist1_today = '', hist1_week = '', hist1_month = '', result;
    for (var i = 0; i < data.length; i++) {
        var res = data[i].time, qwe = Number(res.month) + 1, dat = new Date(res.year,res.month,res.day), now = new Date();
        if (Date.daysBetween(dat) < 1) {
            hist1_today = hist1_today + '<tr><td><a href="https://help.skyeng.ru/staff/cases/record/' + data[i].ticket + '/">' + data[i].ticket + '</a></td><td>' + res.hours + ':' + res.minutes + ' ' + res.day + '/' + qwe + '</td><td class="delete">X</td></tr>';
        };
        if (Date.daysWeek(dat) < 7) {
            hist1_week = hist1_week + '<tr><td><a href="https://help.skyeng.ru/staff/cases/record/' + data[i].ticket + '/">' + data[i].ticket + '</a></td><td>' + res.hours + ':' + res.minutes + ' ' + res.day + '/' + qwe + '</td><td class="delete">X</td></tr>';
        }
        if (now.getMonth() == res.month) {
            hist1_month = hist1_month + '<tr><td><a href="https://help.skyeng.ru/staff/cases/record/' + data[i].ticket + '/">' + data[i].ticket + '</a></td><td>' + res.hours + ':' + res.minutes + ' ' + res.day + '/' + qwe + '</td><td class="delete">X</td></tr>';
        }
    };

    if (time == 0) {
        result = hist1_today;
    } else if (time == 1) {
        result = hist1_week;
    } else if (time == 2) {
        result = hist1_month;
    }
    return result;
}

async function draw_history(medium_menu, small_menu) {
	let html = await text_history(medium_menu, small_menu);
	document.getElementById('big_edit').style.width = '190px';
	let small_text = (small_menu == 0) ? 'Сегодня' : (small_menu == 1) ? 'Неделя' : (small_menu == 2) ? 'Месяц' : false;
	let medium_text = (medium_menu == 0) ? '1 Линия' : (medium_menu == 1) ? '2 Линия' : (medium_menu == 2) ? 'Чаты' : false;
    document.getElementById('big_edit').innerHTML = `
    <div id="medium_menu">
        <span id="hist0_left_2" class="button">⬅</span>
        <span style="text-align: center; margin: 0%; margin-bottom: 5%; font-size: 10px;">${medium_text}</span>
        <span id="hist0_right_2" class="button">➡</span>
    </div>

    <div id="small_menu">
        <span id="hist2_left_2" class="button">⬅</span>
        <span style="text-align: center; margin: 0%; margin-bottom: 5%; font-size: 10px;">${small_text}</span>
        <span id="hist2_right_2" class="button">➡</span>
    </div>

    <table border="1">
        <tbody>
            ${html}
        </tbody>
    </table>`;
    document.getElementById('medium_menu').firstElementChild.addEventListener('click', () => {
        (medium_menu == 0) ? medium_menu = 2 : (medium_menu == 1) ? medium_menu = 0 : (medium_menu == 2) ? medium_menu = 1 : false;
        draw_history(medium_menu, small_menu);
    });
    document.getElementById('medium_menu').lastElementChild.addEventListener('click', () => {
        (medium_menu == 1) ? medium_menu = 2 : (medium_menu == 2) ? medium_menu = 0 : (medium_menu == 0) ? medium_menu = 1 : false;
        draw_history(medium_menu, small_menu);
    });
    document.getElementById('small_menu').firstElementChild.addEventListener('click', () => {
        (small_menu == 0) ? small_menu = 2 : (small_menu == 1) ? small_menu = 0 : (small_menu == 2) ? small_menu = 1 : false;
        draw_history(medium_menu, small_menu);
    });
    document.getElementById('small_menu').lastElementChild.addEventListener('click', () => {
        (small_menu == 0) ? small_menu = 1 : (small_menu == 1) ? small_menu = 2 : (small_menu == 2) ? small_menu = 0 : false;
        draw_history(medium_menu, small_menu);
    });

	document.querySelectorAll('td[class="delete"]').forEach((item) => {
		item.addEventListener('click', (a) => {
			let element = a.toElement.parentElement
			element.style = 'background-color: red;';
			let ticket = element.firstElementChild.innerText;
			let medium_text = (medium_menu == 0) ? 'assign' : (medium_menu == 1) ? 'handover' : false;
			storage_ask(medium_text).then((data) => {
				for (let i = 0; i < data.length; i++) {
					if (data[i].ticket == ticket) {
						data.splice( i, 1);
                    	chrome.storage.local.set({[medium_text] : data});
					}
				}
			})
		});
	});
}

function move_big_menu() {
    (big_menu == 0) ? big_menu = 1: big_menu = 0;

    if (big_menu == 0) {
		document.getElementById('big_menu').children[1].innerText = 'Статистика';
        draw_stat(small_menu);
    } else if (big_menu == 1) {
		document.getElementById('big_menu').children[1].innerText = 'История';
        draw_history(medium_menu, small_menu);
    }
}

var big_menu = 0, medium_menu = 0, small_menu = 0;
//big_menu кнопки
document.addEventListener('DOMContentLoaded', () => {
	document.getElementById('big_menu').firstElementChild.addEventListener('click', move_big_menu);
	document.getElementById('big_menu').lastElementChild.addEventListener('click', move_big_menu);

	draw_stat(small_menu);
});