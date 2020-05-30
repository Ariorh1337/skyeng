const AutoFaqCookie = document.cookie.match(/jwt=(.*)/)[1];
const person = (id, name, count, state, text = '', isDuty = false) => `<li class="ant-menu-item" role="people" style="padding-left: 32px;" title="${text}" data-user-id="${id}" data-is-duty="${isDuty}">
<a class="app-left_menu-item">
    <span style="border-inline-start: 16px dotted ${(state !== 'Online') ? 'darkorange' : (count == 0) ? 'darkgreen' : 'darkred'};"></span>
    <span role="img" aria-label="alert" type="alert" class="anticon anticon-alert" style="margin: 0px 0px 0px -15px; font-weight: bold;">${count}</span>
    <span class="nav-text">
        <span class="ant-badge" style="font-size: ${(name.length < 21) ? '10' : (name.length < 23) ? '9' : '8'}px;">${name}</span>
    </span>
</a>
</li>`;
window.backup = '';
var operators = new Object();
var say_my_name = new Object();

function get_state() {
    let result = new Promise(function (resolve, reject) {
        fetch("https://skyeng.autofaq.ai/api/operators/statistic/currentState", {
            "headers": {
                'Content-Type': 'application/json',
                'cookie': `jwt=${AutoFaqCookie};`
            }
        })
            .then(r => r.json())
            .then(response => {
                resolve(response.rows);
            });
    });

    return result.then((array) => {
		return array;
	});
}

function get_operator_chats(operator_id) {
    let result = new Promise(function (resolve, reject) {
        fetch("https://skyeng.autofaq.ai/api/conversations/history", { 
            "credentials": "include", 
            "headers": { 
                "content-type": "application/json",
                'cookie': `jwt=${document.cookie.match(/jwt=(.*)/)[1]};`
            }, 
            "body": `{\"serviceId\":\"361c681b-340a-4e47-9342-c7309e27e7b5\",\"mode\":\"Json\",\"participatingOperatorsIds\":[\"${operator_id}\"],\"tsFrom\":\"${new Date(Number(new Date()) - 1 * 60 * 60 * 1000).toJSON()}\",\"tsTo\":\"${new Date(Number(new Date()) + 10 * 60 * 60 * 1000).toJSON()}\",\"usedStatuses\":[\"OnOperator\",\"AssignedToOperator\",\"Active\"],\"orderBy\":\"ts\",\"orderDirection\":\"Asc\",\"page\":1,\"limit\":10}`, 
            "method": "POST"
        }).then(r => r.json())
        .then(response => {
            resolve(response);
        });
	});

	return result.then((array) => {
		return array;
	});
}

function head_list() {
    let elm = document.createElement('li');
    document.querySelector('div[class="app-content"] > ul[role="menu"]').append(elm);
    elm.outerHTML = `
    <li id="people_head" class="ant-menu-submenu ant-menu-submenu-inline ant-menu-submenu-active" role="PeopleList">
        <div class="ant-menu-submenu-title" role="button" aria-expanded="true" aria-haspopup="true" style="padding-left: 16px;" aria-owns="people_list">
            <span class="ant-badge">
                <span role="img" aria-label="message" type="message" class="anticon anticon-message"></span>
                <span class="nav-text">Список</span>
            </span>
            <i class="ant-menu-submenu-arrow"></i>
        </div>
        <ul id="people_list" class="ant-menu ant-menu-sub ant-menu-inline" role="people" style="display: none;"></ul>
    </li>`;//ant-menu-submenu-open

    document.getElementById('people_head').firstElementChild.onclick = () => {
        let list = document.getElementById('people_list');
        let head = document.getElementById('people_head');
        if (list.style.display == 'none') {
            list.style.display = '';
            head.style = 'ant-menu-submenu ant-menu-submenu-inline ant-menu-submenu-open';
        } else {
            list.style.display = 'none';
            head.style = 'ant-menu-submenu ant-menu-submenu-inline ant-menu-submenu-active';
        }
    }
}

async function make_list() { 
    var asd = await get_state();
    var people = '';0
    asd.forEach(s => {
        if (s && s.operator && s.operator.status !== "Offline" && s.operator.fullName.indexOf('ТП') !== -1) {
            if (s.aCnt == null) s.aCnt = 0; //в работе
            if (s.cCnt == null) s.cCnt = 0; //в очереди
            if (s.operator.fullName.indexOf('ТП2-') !== -1) {
                //Do nothing here, remove after 01/05
                let date = new Date();
                if (date.getMonth() < 5 && date.getFullYear() >= 2020) { // date.getMonth() < 5 && date.getFullYear() >= 2020
                    people = person(s.operator.id, s.operator.fullName, s.aCnt + s.cCnt, s.operator.status) + people;
                }
            } else {
                people = people + person(s.operator.id, s.operator.fullName, s.aCnt + s.cCnt, s.operator.status);
            }
        };

        //Массив для расшифровки ID оператора
        if (s && s.operator && s.operator.id && s.operator.fullName) {
            operators[s.operator.id] = s.operator.fullName;
            if (document.querySelector('.user_menu-dropdown-user_name') && s.operator.fullName === document.querySelector('.user_menu-dropdown-user_name')) {
                say_my_name = {
                    id: s.operator.id,
                    fullName: s.operator.fullName,
                    group: s.operator.kbs[0]
                };
            }
        }
    });

    chrome.runtime.sendMessage({ name: "script_pack", question: 'duty_info' }, function (response) {
        //Remove this IF statment after 01\05
        let date = new Date();
        if (date.getMonth() > 4 && date.getFullYear() >= 2020) { // date.getMonth() > 4 && date.getFullYear() >= 2020
            if (response.answer.ok) {
                response.answer.result.forEach((duty) => {
                    people = person(
                        '',
                        'ТП2-' + duty.name,
                        (duty.isBusy === false) ? 0 :
                            (duty.start !== null) ? Math.floor((Number(new Date(new Date().toJSON())) - Number(new Date(duty.start))) / 1000 / 60) : 1,
                        'Online',
                        (duty.isBusy === true) ? duty.text : '',
                        true
                    ) + people;
                });
            }
        }

        document.getElementById('people_list').innerHTML = people;

        document.getElementById('people_list').childNodes.forEach(function (user) { 
            if (user.getAttribute('data-is-duty') === false) {
                user.addEventListener("click", function () {
                    get_operator_chats(this.getAttribute('data-user-id')).then(r => {
                        if (r.items && r.items.length > 0) {
                            second_step();
                            window.backup = r;
                            draw_list(window.backup);
                        }
                    });
                })
            }
        })
    })
}

document.onreadystatechange = () => {
    setTimeout(function () {
        head_list();
        make_list();
        setInterval(make_list, 10000);

        sidebar_css();
        first_step(); //sidebar start
    }, 1000)
}

//Sidebar --START--

function get_history_chat(chat_id) {
    let result = new Promise(function (resolve, reject) {
		fetch(`https://skyeng.autofaq.ai/api/reason8/reports/conversations/${chat_id}`, {
            "headers": {
                'Content-Type': 'application/json',
                'cookie': `jwt=${document.cookie.match(/jwt=(.*)/)[1]};`
            }
        }).then(r => r.json())
        .then(response => {
            response.messages.sort((a, b) => { return Number(new Date(a.ts)) - Number(new Date(b.ts)) });
            resolve(response);
        });
	});

	return result.then((array) => {
		return array;
	});
}

function get_chats_by_id (id_user) {
	let result = new Promise(function (resolve, reject) {
        fetch(`https://skyeng.autofaq.ai/api/reason8/operator/conversationHistory?channelUserId=${id_user}&operatorId=all&orderBy=tsCreate&isOrderByDesc=true`)
        .then(r => r.json())
        .then(response => {
            response.items.sort((a, b) => { return a.tsCreate - b.tsCreate });
            resolve(response);
        });
	});

	return result.then((array) => {
		return array;
	});
}

function send_msg(user_id, chat_id, text_msg, comment = false) {
    fetch("https://skyeng.autofaq.ai/api/reason8/answers", {
        "headers": {
            "content-type": "multipart/form-data; boundary=----WebKitFormBoundaryBTRQ4cJh2gdKAmdX",
            'cookie': `jwt=${AutoFaqCookie};`
        },
        "body": `------WebKitFormBoundaryBTRQ4cJh2gdKAmdX\r\nContent-Disposition: form-data; name="payload"\r\n\r\n{"sessionId":"${user_id},-11","conversationId":"${chat_id}","text":"<p>${text_msg}</p>"${(comment == true) ? ',"isComment":true' : ''}}\r\n------WebKitFormBoundaryBTRQ4cJh2gdKAmdX--\r\n`,
        "method": "POST"
    })
        .then(r => { 
            return r.status;
        });
}

function draw_chat(id, type = 0) {
    get_history_chat(id) //'1559977__370534916'
        .then(r => {
            if (type == 1) {
                document.querySelector('#search').style.display = 'none';
                document.querySelector('#back_btn').style.display = '';
            } else {
                document.querySelector('#search').style.display = '';
                document.querySelector('#back_btn').style.display = 'none';
            }

            if (document.querySelector('#send_btns')) document.querySelector('#send_btns').remove();

            let block = document.querySelector('#msg_block');
            block.innerHTML = 
            `<div style="margin-bottom: 10px;">
                <span style="display: flex;justify-content: space-between;align-items: center;">
                    <div style="font-weight: bold;">ID: ${r.id}</div>
                    <button type="button" class="ant-btn ant-dropdown-trigger"><span>...</span></button>
                </span>
                <div style="font-weight: bold;margin-top: -8px;">User ID: ${r.channelUser.id}</div>
            </div>`;
            document.querySelector('#side_bar').style = "";

            r.messages.forEach((msg) => {
                if (msg.tpe == "Question") block.innerHTML += user_msg((r.channelUser.fullName && r.channelUser.fullName !== null) ? r.channelUser.fullName : 'Неизвестный', msg.ts, msg.txt);
                if (msg.tpe == "Event")  block.innerHTML += event_msg(msg.eventTpe, msg.ts);
                if (msg.tpe == "AnswerOperatorWithBot") block.innerHTML += bot_msg(msg.ts, msg.txt);
                if (msg.tpe == "AnswerBot") block.innerHTML += bot_msg(msg.ts, msg.txt);
                if (msg.tpe == "OperatorComment") block.innerHTML += comment_msg(msg.operatorId, msg.ts, msg.txt)
                if (msg.tpe == "AnswerOperator") block.innerHTML += operator_msg(msg.operatorId, msg.ts, msg.txt);
                if (msg.tpe == "Rate") block.innerHTML += event_msg('Rate', msg.ts);
                if (msg.tpe == "AnswerSystem") block.innerHTML += bot_msg(msg.ts, msg.txt);
            });

            block.outerHTML +=
                `<div id="send_btns" data-user-id="${r.channelUser.id}" data-chat-id="${r.id}" data-msg-type="message">
                    <a href="#">заметка</a>
                    <textarea id="send_text" type="text" size="10"></textarea>
                    <button id="send_btn">отправить</button>
                </div>`;
            document.querySelector('#send_btns > a').onclick = function () {
                let mode = this.parentElement.getAttribute('data-msg-type');
                if (mode === 'message') {
                    this.parentElement.setAttribute('data-msg-type', 'note');
                } else {
                    this.parentElement.setAttribute('data-msg-type', 'message');
                }
            }

            document.querySelector('#chat_id').value = '';

            document.querySelector('#send_btn').onclick = function () {
                let mode = this.parentElement;
                if (mode.getAttribute('data-msg-type') === 'message') {
                    send_msg(mode.getAttribute('data-user-id'), mode.getAttribute('data-chat-id'), document.querySelector('#send_text').value);
                } else {
                    send_msg(mode.getAttribute('data-user-id'), mode.getAttribute('data-chat-id'), document.querySelector('#send_text').value, true);
                }
                setTimeout(() => {
                    document.querySelector('#send_text').value = '';
                    draw_chat(mode.getAttribute('data-chat-id'), type);
                }, 1000);
            }
        });
}

function draw_list(r) {
    let block = document.querySelector('#msg_block');
    block.innerHTML = '';
    document.querySelector('#side_bar').style = "";

    r.items.forEach((msg) => {
        if (msg.id && msg.tsCreate) {
            block.innerHTML += block_msg(msg.id, msg.tsCreate, msg.channelUser.payload.userType, msg.channelUser.fullName);
        } else {
            block.innerHTML += block_msg(msg.conversationId, msg.ts.slice(0, -5), (msg.channelUser.payload && msg.channelUser.payload.userType) ? msg.channelUser.payload.userType : 'not_ApiEx', msg.channelUser.fullName);
        }
    });

    document.querySelector('#user_id').value = '';

    document.querySelector('#msg_block').childNodes.forEach(function (msg) {
        msg.addEventListener("click", function () {
            draw_chat(this.title, 1);
        })
    })
}

var user_msg = (name, time, text) => `<div class="chat-message chat-question"><div class="chat-message-block"><div class="chat-message-header"><div class="chat-message-sender">${name}</div><div class="chat-message-time chat-message-time-question">${new Date(time).toLocaleDateString()}, ${new Date(time).toLocaleTimeString()}</div></div><span>${(text) ? text : '<тут могла быть ваша реклама>'}</span></div></div>`;
var event_msg = (type, time) => `<div class="chat_event"><div class="chat_event-text">${type}</div><div class="chat_event-time">${ new Date(time).toLocaleTimeString() }</div></div>`;
var bot_msg = (time, text) => `<div class="chat-message chat-answer chat-answer-from_bot"><div class="chat-message-block"><div class="chat-message-header"><div class="chat-message-sender">AutoFAQ bot:</div><div class="chat-message-time chat-message-time-answer">${new Date(time).toLocaleDateString()}, ${new Date(time).toLocaleTimeString()}</div></div><span>${text}</span></div></div>`;
var operator_msg = (name, time, text) => `<div class="chat-message chat-answer chat-answer-from_operator"><div class="chat-message-block"><div class="chat-message-header"><div class="chat-message-sender">${operators[name]}</div><div class="chat-message-time chat-message-time-answer">${new Date(time).toLocaleDateString()}, ${new Date(time).toLocaleTimeString()}</div></div><span>${text}</span></div></div>`;
var comment_msg = (name, time, text) => `<div class="chat-message chat-comment"><div class="chat-message-block"><div class="chat-message-header"><div class="chat-message-sender">${operators[name]}</div><div class="chat-message-time chat-message-time-answer">${new Date(time).toLocaleDateString()}, ${new Date(time).toLocaleTimeString()}</div></div><span>${text}</span></div></div>`;
var block_msg = (id, time, type, text) => `<div title="${id}" style="display: inline-flex; align-content: center; border-bottom: 1px dotted black; margin-top: 10px; cursor: pointer;"><span style="width: max-content;">${new Date(time).toLocaleString().slice(0,-3).replace(',','')}</span><span style="margin-left: 10px; font-weight: bold;">${type}</span><span style=" margin-left: 10px; white-space: nowrap; width: 180px; overflow: hidden; text-overflow: ellipsis;">${text}</span></div>`;

function first_step() {
    if (document.querySelector('#side_bar')) {
        var block = document.querySelector('#side_bar');
    } else {
        var block = document.createElement('aside');
        document.querySelector("#root > section").append(block);
    }

    block.outerHTML = `<aside id="side_bar" style="max-width: 35px !important; min-width: 35px !important;"><div style="padding: 5px;"><div style="display: contents;"><button id="hide_or_display">&lt;</button></div></div></aside>`;
    document.querySelector('#hide_or_display').onclick = second_step;
}

function second_step() {
    var block = document.querySelector('#side_bar');
    block.outerHTML = `
    <aside id="side_bar">
        <div style="padding: 5px; height: 100%;">
            <div style="z-index: 4; position: relative;">
                <button id="hide_or_display" style="width: 49%;">свернуть</button>
                <button id="search" >поиск</button>
                <button id="back_btn" style="display: none;">вернуться</button>
            </div>
            <div style="margin-top: 4px; z-index: 3; position: relative;">
                <span><input id="user_id" placeholder="ID пользователя"></span>
                <span><input id="chat_id" placeholder="ID чата"></span>
            </div>
            <div id="msg_block">
                <!-- блок чатов и сообщений \ контент -->
            </div>
        </div>
    </aside>`;

    document.querySelector('#hide_or_display').onclick = first_step;
    document.querySelector('#side_bar').style = "background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZlcnNpb249JzEuMCcgdmlld0JveD0nMCAwIDEwNDYgMTI4MCc+PGcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMC4wMDAwMDAsMTI4MC4wMDAwMDApIHNjYWxlKDAuMTAwMDAwLC0wLjEwMDAwMCknIGZpbGw9JyMwMDAwMDAnIHN0cm9rZT0nbm9uZSc+PHBhdGggZD0nTTYxMjUgMTI3NDEgYy0zODcgLTEzOSAtNTk3IC0yNTQgLTkwOCAtNDk1IC0yMzMgLTE4MSAtMzMxIC0yMzYgLTQyMiAtMjM2IC0xNyAwIC02OSAxMSAtMTE1IDI0IC0xMTUgMzMgLTM4NyA4MiAtNTQwIDk3IC0yMzYgMjIgLTU3MyAwIC04NDkgLTU2IC0xNjEgLTMzIC0yMjcgLTM5IC0yODUgLTI1IC0zMiA3IC0xMDggNDggLTIyMCAxMTcgLTM4MSAyMzggLTc4MyA0MTggLTExNjUgNTIyIGwtNzQgMjAgNyAtODcgYzQ3IC02MDUgMTkzIC0xMTM3IDM5NiAtMTQ0MyBsNDAgLTYwIC0yNSAtNjUgYy0zOCAtMTAxIC05MyAtMzA3IC0xMTYgLTQzOSAtMTggLTk3IC0yMiAtMTYxIC0yMyAtMzMwIDAgLTIxMyAxMSAtMzE3IDQ5IC00NDEgMjYgLTg2IDUxIC03OSAtMjc3IC03NiAtMzMxIDQgLTY5NyAtMTAgLTEwMjUgLTM4IC0yMTUgLTE5IC01NjQgLTU5IC01NzIgLTY2IC0yIC0yIC0xIC05IDIgLTE3IDQgLTExIDI3IC0xMCAxMzggNCA0NzYgNjMgMTIxNCAxMDEgMTYwMCA4NCBsMTY3IC03IDM2IC04NyBjMjAgLTQ3IDU1IC0xMjEgODAgLTE2MyBsNDMgLTc3IC0zNiAtNSBjLTIwIC0zIC05MiAtMTMgLTE2MSAtMjEgLTUxMyAtNjUgLTEwODIgLTE4MyAtMTUwNiAtMzE1IC0xOTQgLTU5IC0yMzQgLTc2IC0yMzQgLTk1IDAgLTggMSAtMTUgMyAtMTUgMiAwIDU3IDE4IDEyMiA0MCAyNjYgOTAgNTY2IDE2OCA5MDAgMjM0IDI3NiA1NSA0MTMgNzYgODkxIDE0MSBsNDEgNiA1OCAtNzcgYzMxIC00MiA4OCAtMTA5IDEyNiAtMTQ5IGw2OSAtNzIgLTExOCAtNDMgYy0yNjUgLTk3IC02NDggLTI3NyAtODgyIC00MTUgLTE3OSAtMTA1IC0zNzAgLTIzNSAtMzcwIC0yNTEgMCAtOCA0IC0xNCA5IC0xNCA0IDAgNjkgNDAgMTQyIDg5IDMzOSAyMjUgNzQyIDQyNiAxMTU2IDU3NyBsOTMgMzMgOTMgLTk0IGMyMTQgLTIxNSAyODcgLTM4MCAyODcgLTY1MiAwIC0yNjAgLTUzIC01NDQgLTIwNCAtMTA5MyAtNzAgLTI1NCAtMTI0IC00ODAgLTE1NiAtNjUyIC0xNTcgLTgzNSAtMTA4IC0xNTUzIDE1OSAtMjM1OCA4OSAtMjY2IDE1NSAtNDMxIDMxMiAtNzgyIDI3NCAtNjExIDMxMCAtNzI3IDM1NCAtMTE0NiAyMiAtMjA1IDM2IC02ODMgMzMgLTEwNzIgbC0zIC0zNDUgLTg4IC03IGMtMTA5IC04IC0yMzIgLTMyIC0yOTAgLTU3IC02NiAtMjggLTExMSAtNzMgLTE0MyAtMTQzIC0yNiAtNTYgLTI5IC03NCAtMjkgLTE1OCAwIC03NCA0IC0xMDMgMTkgLTEyOSA2NyAtMTIzIDI1NyAtMTk2IDYxMSAtMjM1IDEzMTAgLTE0MyAyNjAzIC0xNjMgMzg2NSAtNjEgNjg0IDU2IDE1NTggMTY5IDE2ODAgMjE4IDM0OSAxNDEgNjcwIDczNyA5MjUgMTcyMSAxODUgNzEyIDM1NCAxNzEzIDM3MSAyMjAxIDI0IDY1MCAtMTY2IDEyNzUgLTU2OSAxODgwIC0yMDcgMzEwIC0zNTYgNDg0IC04MDcgOTQwIC00NzcgNDgzIC02MzEgNjYyIC04MDUgOTM1IC0xNDMgMjI0IC0yNzMgNTM3IC0zMTEgNzQ3IC0zNSAxOTggLTI4IDQ2MCAxOCA2NzMgNDcgMjIxIDE0NSA0NDUgMjYyIDYwMSAyMDMgMjY5IDU1NCA0ODYgOTE2IDU2NSA2NiAxNSAxMjUgMTkgMjYwIDE4IDE1NyAwIDE4NSAtMyAyNzQgLTI3IDIyOCAtNjEgMzU5IC0xNjAgMzg2IC0yOTIgMjYgLTEyNCAtNTUgLTI4MyAtMTkwIC0zNzMgLTEzNSAtOTEgLTI3OCAtMTA5IC00NjQgLTU5IC0xMzEgMzUgLTE4MyA0MSAtMjM2IDI3IC03NSAtMTkgLTExNSAtNTIgLTE1MCAtMTI0IC0zMCAtNjEgLTMyIC03MSAtMjggLTE0NCA2IC05NyAzNiAtMTU4IDExOSAtMjM4IDcxIC02NyAyMDkgLTEzNSAzMjEgLTE1OCA5OSAtMjAgMjUzIC0yMCAzNTggMCAyNjcgNTAgNTgxIDI0NCA3MzcgNDU0IDIwOSAyODEgMjYwIDY3MyAxMzMgMTAxMyAtNzAgMTg2IC0zMTEgNDMxIC01MjUgNTMzIC0yMDYgOTggLTU5MyAxNDAgLTkyNSA5OSAtNTQ5IC02OCAtMTA0MSAtMjk4IC0xNDAwIC02NTQgLTI0MyAtMjQyIC00MDUgLTQ5MiAtNDk2IC03NjkgbC0zNyAtMTEzIC01NiA2IGMtMTM1IDEzIC00ODYgMjUgLTc1MyAyNSAtMjcxIDAgLTI4OSAxIC0yODQgMTggNDQgMTUwIDYwIDI3NCA2MCA0NTcgMCAyNDQgLTMzIDQxMCAtMTI5IDY1MCBsLTQ0IDEwOSA0OSA2NiBjMjUyIDM0MiA0MDYgNzE1IDQ1NiAxMTAzIDIyIDE3NiAxMiA2MjggLTE1IDYyNyAtMyAtMSAtNzggLTI3IC0xNjYgLTU5eiBtNzA5IC0zMDIxIGM4OCAtNiAxNjEgLTExIDE2MiAtMTMgMSAtMSAtNiAtNDIgLTE3IC05MiAtMjUgLTExOSAtNDkgLTMwNSAtNDkgLTM3NyAwIC0zMiAtMyAtNTggLTYgLTU4IC0zIDAgLTYzIDEzIC0xMzIgMjkgLTI1MSA1OCAtNTkzIDExOSAtODcyIDE1NiAtNjkgOSAtMTM1IDE4IC0xNDcgMjEgLTIxIDQgLTIwIDggMzIgMTE3IDI5IDYxIDYxIDEzOCA3MSAxNjkgMTggNTMgMjEgNTcgNTQgNjIgNTcgNyA3MzIgLTMgOTA0IC0xNHogbS02MDQgLTQzNiBjMTczIC0yOCAzOTAgLTcxIDY2NiAtMTMxIDIwIC01IDIxIC0xMyAyOCAtMTY2IDI3IC02MjEgMTc3IC0xMDQzIDU4MyAtMTY1MCAyNTMgLTM3OCA1ODAgLTc2OCAxMDIzIC0xMjIyIDI3MyAtMjc5IDM0MyAtMzU3IDQzOCAtNDg0IDIzOCAtMzE1IDM4NyAtNjUyIDQ1MyAtMTAxOSA3MiAtNDA2IDM2IC0xMDQ1IC05NyAtMTcxMiAtMTYwIC04MDQgLTQ3NiAtMTU5NiAtNzA5IC0xNzcyIC05MSAtNjkgLTE5NiAtODMgLTI4NSAtMzggLTEyNiA2NSAtMTU0IDIyMCAtMTExIDYwNSAxMiAxMDUgMzcgMzE4IDU2IDQ3NSA2MiA1MjMgNzUgNjkwIDc1IDk1NSAwIDY0MSAtMTM2IDExNjkgLTQ3NCAxODQ0IC0zNDQgNjg3IC01OTIgMTAyMyAtMTE3OSAxNTk3IC0yOTMgMjg3IC00MjYgNDA3IC03MjEgNjUzIC0xNDMgMTIwIC0yOTcgMjUxIC0zNDAgMjkyIC0yNDAgMjI0IC0zNTkgNTEyIC0zNzMgODk5IC00IDExNCAtMiAxNTkgMTEgMjEwIDIxIDg2IDczIDE4NiAxNDggMjg4IDU0IDc1IDY0IDgzIDg3IDc5IDQ2IC0xMCAzNDEgLTEzNiA1MTYgLTIyMiAyMDcgLTEwMSAzNzQgLTE5NiA1NjQgLTMyMiAxMDcgLTcxIDE0NiAtOTIgMTU0IC04NCA4IDggOCAxNCAyIDE5IC0zNjQgMjUyIC04MDkgNDg4IC0xMTcyIDYyMSAtNDAgMTUgLTYwIDI3IC01NiAzNSA0IDYgNDEgNjEgODQgMTIxIDQyIDYxIDg4IDEzMSAxMDMgMTU2IGwyNiA0NiAxNDMgLTE5IGM3OCAtMTAgMjM5IC0zNCAzNTcgLTU0eicvPjwvZz48L3N2Zz4='); background-repeat: no-repeat; background-position: center center; background-size: 90%; background-position-x: -9%;";

    //кнопка поиска нажата
    document.querySelector('#search').onclick = () => {
        if (chat_id.value !== '' && user_id.value === '') {
            draw_chat(chat_id.value);
        } else if (chat_id.value === '' && user_id.value !== '') {
            get_chats_by_id(user_id.value)
                .then(r => {
                    if (r.items && r.items.length > 0) {
                        window.backup = r;
                        draw_list(window.backup);
                    }
                });
        } else {
            console.log('Заполнены оба поля, уберите лишнее');
        }
    }

    //Кнопка вернуться
    document.querySelector('#back_btn').onclick = () => {
        document.querySelector('#search').style.display = '';
        document.querySelector('#back_btn').style.display = 'none';
        document.querySelector('#send_btns').outerHTML = '';
        draw_list(window.backup);
    }
}

function sidebar_css() {
    let style = document.createElement('style');
    style.innerHTML = 
        `#side_bar {
            flex: 0 0 400px;
            max-width: 400px;
            min-width: 400px;
            max-height: 100%;
        }

        #msg_block {
            margin-top: -75px; 
            padding-top: 85px; 
            overflow: scroll; 
            height: inherit; 
            z-index: 0; 
            position: fixed; 
            min-width: 410px; 
            max-width: 410px; 
            padding-right: 15px; 
            padding-bottom: 20px;
        }

        #search, #back_btn, #user_id, #chat_id {
            width: 49%; 
            text-align: center;
        }
        
        #send_btns {
            position: absolute;
            bottom: 0;
            display: inline;
            padding-bottom: 4px;
        }
        
        #send_btns > a {
            padding: 2px;
            border: 1px grey dotted;
            border-radius: 6px;
            font-size: 12px;
        }
        
        #send_btns > textarea {
            font-size: 10px;
            margin-bottom: -11px;
            border-radius: 6px;
            padding-bottom: 0px;
            width: 29vh;
            margin-top: 0px;
            height: 30px;
        }
        
        #send_btns > button {
            border-radius: 6px;
            font-size: 12px;
            margin: 0px 0px 2px 0px;
            padding: 5px 5px 2px 5px;
            text-align: center;
        }
        
        #send_btns[data-msg-type="note"] > a, #send_btns[data-msg-type="note"] > textarea {
            background-color: lightgray;
        }`;
    document.head.append(style)
}

//Sidebar --END--