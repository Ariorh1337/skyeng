//document.querySelector('input[name="field_2998"]').value //Ответственный
//document.querySelector('button[class="btn_add_reply"]') //Кнопка отправить
//window.location.href //ID тикета

/*
1. Тык по кнопке отправить (Заметка, Ответ) - event | пункт 3
2. Нажатие Ctrl+Enter - event | пункт 3
3. Проверка чата на Владельца - assign
08:55:07 - new Date(1580190907 + 000)
*/

//Есть ли ответcтвенный за первичку?
function start() {
	var my_name = document.getElementsByTagName('img')[0].parentElement.getAttribute('data-staff-name');
	var responsible = document.querySelector('input[name="field_2998"]').value;
	var msg = document.querySelector(`li[class="chat_chat_win_answer"] > img[alt="${my_name}"]`);

	if (msg) { //Есть ли сообщения от меня
		var first_reply = msg.parentElement.querySelector('ul > li > span > p[data-tstamp]');
		if (responsible !== '' && responsible == my_name) { //Если мой первый ответ
			console.log('Это мой чат, отправляю запрос');
			var time = msg.parentElement.querySelector('li[class="chat_chat_win_answer"] > ul > li > span > p[data-tstamp]').getAttribute('data-tstamp') + '000';
			var priority = document.querySelector('#priority_select_chosen > a > span').innerText;
			send_msg('chat_assign' , priority, new Date(Number(time)));
		} else {
			console.log('Первый ответ пустой или не мой');
		}
	} else {
		console.log('Сообщений от меня нет');
	}
}

function send_msg(types , prioritet = 'Низкий', Time = new Date()) {
	var info = { time: {
		year: Time.getFullYear(),
		month: Time.getMonth(),
		day: Time.getDate(),
		hours: Time.getHours(),
		minutes: Time.getMinutes(),
		seconds: Time.getSeconds(),
		week: Time.getDay()
	}};
	if (types == 'chat_assign') {
		info = {
			ticket: document.getElementsByClassName('omni_custom_tooltip')[0].baseURI.match(/[0-9]*-[0-9]*/g)[0],
			prior : prioritet
		};
	}
	chrome.runtime.sendMessage({ name: "ticket_calc", type: types , data: info });
	//console.log({ name: "ticket_calc", type: types , data: info });
}

start();

let button = (document.querySelector('button[class="btn_add_reply"]') || document.querySelector('button[class="btn_add_reply active"]'));
button.addEventListener('click', () => {
	send_msg('chat_event');
	start();
})

let field = (document.querySelector('div[class="chat_chat_msg_win_wrap request-answer-area text-area-box"]') || document.querySelector('div[class="chat_chat_msg_win_wrap archived request-answer-area text-area-box"]'));
field.addEventListener("keydown", (event) => {
    if (event.key == 'Enter' && event.ctrlKey == true) {
        if (document.querySelector('div[class="chat_msg_win_actions "] > button[class="btn_add_reply active"]') !== null) {
			send_msg('chat_event');
			start();
        };
    };
});