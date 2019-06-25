var s = document.createElement('script');
s.src = chrome.extension.getURL('script.js');
(document.head||document.documentElement).appendChild(s);

s.onload = function() {
	s.parentNode.removeChild(s);
	
	var prior = document.getElementById('priority_select_chosen').firstElementChild.firstElementChild.innerText;
	sessionStorage.setItem('prior', prior);
	var group = document.getElementById('case_group_id_chosen').firstElementChild.firstElementChild.innerText;
	sessionStorage.setItem('group', group);
	var my_name = document.getElementsByTagName('img')[0].parentElement.getAttribute('data-staff-name');
	var first_msg = document.getElementsByClassName('added-answer-area')[0];
	var send_btn = document.getElementsByClassName('alpha3_mod_wrap')[1];
	var cmnt_btn = document.getElementsByClassName('_save_note_button')[0];
	var box = document.getElementById('response_answer_area');

	var on_msg_tool = function () {
		send_msg('event');
	};

	send_btn.onclick = function (event) {
		on_msg_tool();
	};
	cmnt_btn.onclick = function (event) {
		send_msg('event');
	};

	box.addEventListener("keydown", function(event) {
		if (event.key == 'Enter' && event.ctrlKey == true) {
			if (event.target.attributes.placeholder.nodeValue) {
				send_msg('event');
    		};
	    };
	});

	//Если есть первый ответ
	if (first_msg) {
		var first_msg_name = first_msg.getElementsByTagName('img')[0].alt;
		if (first_msg_name) {
			//Это мой первый ответ?
			if (my_name == first_msg_name) {
				//это точно не дочерка?
				var request = document.getElementsByClassName('request-area')[0]
				if (request.className.indexOf('added-note-area') == -1) {
					var first_msg_time = first_msg.getElementsByClassName('request-date-time')[0].innerText;
					var time = { hours: Number(first_msg_time.split(',')[0].split(':')[0]), minutes: Number(first_msg_time.split(',')[0].split(':')[1]), day: Number(first_msg_time.split(',')[1].split('.')[0]), month: Number(first_msg_time.split(',')[1].split('.')[1]) - 1, year: Number(first_msg_time.split(',')[1].split('.')[2])};
					//Давай спросим есть ли у нас этот тикет
					if (group == 'Техподдержка: 1-я линия') {
						send_msg('assign', prior, time);
						// Мы зашли в свой тикет? Может хотим его перебросить на 2ю линию, нужно проверить
						setInterval(check_group, 10);
					} else if (group == 'Техподдержка: 2-я линия') {
						send_msg('handover', prior, time);
					};
				} else {
					console.log('Это дочерка, она мне не нравится. Я не буду ее считать :Р')
				}
			};
		} else {
			console.log('первый ответ есть но я его не вижу, очень много сообщений в тикете?')
		}
	} else {
		//Нет первого ответа???
		send_msg('enter');

		//Участок кода Защити и сохрани
		var my_interval = null;
		sessionStorage.setItem('my_interval', 'null');
		if (document.getElementById('redactor-uuid-0') == null) {
			var text_block_msg = document.getElementsByClassName('redactor-box')[0].children[2];
			text_block_msg.setAttribute('id', 'redactor-uuid-0');
		} else {
			var text_block_msg = document.getElementById('redactor-uuid-0');
		};
		setInterval(check_prior, 10);
		//Конец Защити и сохрани
		
		var on_msg_tool = function () {
			send_msg('assign', prior);
			send_msg('event');
		};
	};
};

function check_prior () {
	var text_block_msg = document.getElementById('redactor-uuid-0');
	var prior = sessionStorage.getItem('prior');
	var my_interval = sessionStorage.getItem('my_interval');
	if (prior !== document.getElementById('priority_select_chosen').firstElementChild.firstElementChild.innerText) {
        if (my_interval == null || my_interval == "null") {
		    my_interval = setInterval( function () {
                text_block_msg.innerHTML = '';
                text_block_msg.setAttribute('placeholder', 'Пссс, я спасу тебя! Сохрани свой приоритет!');
	            if (String(text_block_msg.classname).indexOf('redactor-placeholder') == -1) {
                    text_block_msg.classname = text_block_msg.classname + 'redactor-placeholder';
                };
			}, 10);
			sessionStorage.setItem('my_interval', my_interval);
        };
    } else {
		var my_interval = Number(sessionStorage.getItem('my_interval'));
        clearInterval(my_interval);
        text_block_msg.removeAttribute('placeholder');
    };
}

function check_group () {
	var group = sessionStorage.getItem('group');
	if (group !== document.getElementById('case_group_id_chosen').firstElementChild.firstElementChild.innerText) {
		if ( document.getElementById('case_group_id_chosen').firstElementChild.firstElementChild.innerText == 'Техподдержка: 2-я линия') {
            var save_btn = document.getElementsByClassName('alpha3_mod_wrap')[0];
            var send_btn = document.getElementsByClassName('alpha3_mod_wrap')[1];
            send_btn.onclick = function (event) {
				send_msg('handover')
				send_msg('event')
            }
            save_btn.onclick = function (event) {
	            send_msg('handover')
            }
        }
    }
}

function send_msg(types , prioritet = 'Низкий', enterTime = {hours: new Date().getHours(), minutes: new Date().getMinutes(), day: new Date().getDate(), month: new Date().getMonth(), year: new Date().getFullYear(), seconds: new Date().getSeconds(), week: new Date().getDay()}) {
	if (types == 'event' || types == 'enter') {
		var info = {time: enterTime};
	} else {
		var info = {ticket: document.getElementsByClassName('omni_custom_tooltip')[2].innerText.slice(0,10), time: enterTime, prior : prioritet};
	}

	chrome.runtime.sendMessage({name: "ariorh", type: types , data: info }, function(response) {
		if (response.answer === "tell me my name") {
			console.log(response.answer);
		}
	});
}