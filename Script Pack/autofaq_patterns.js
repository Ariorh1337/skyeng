//стили
let mst2 = document.createElement('style');
document.body.append(mst2);
var style = `.win_btn {
    background-color: #768d87;
    border-radius: 10px;
    border: 1px solid #566963;
    color: #ffffff;
    font-size: 12px;
    padding: 3px 2px;
    margin: -2px 1px;
}
button {
    background-color:#768d87;
    border-radius:5px; 
    border:1px solid #566963; 
    color:#ffffff; 
    padding:2px 2px;
}`
mst2.innerHTML = style;
//


var win_AFhelper =  
    `<div style="display: flex; width: 301px;">
        <span style="width: 301px">
			<span style="cursor: -webkit-grab;">
				<div style="margin: 5px;">
					<button id="languageAF" style="width:100px">Русский</button>
					<button id="hideMenu" style="margin-left: 44px">hide</button>
					<button id="rfrTmr" style="margin-left: 44px">T10</button>
					<button id="rfrTmr1" style="margin-left: 5px">T1</button>
				</div>
				<div style="margin: 5px;">
					<button id="helloAF">Привет</button>
					<button id="min">Минуту</button>
					<button id="internet">Инет</button>
					<button id="TW">TW</button>
					<button id="secLine">2Л</button>
					<button id="twoMin">Помогу</button>
				</div>
				<div style="margin: 5px;">
					<button id="utoch">Доп впр</button>
					<button id="bag">Подождите</button>
					<button id="idU">ID У</button>
					<button id="screen">скрин</button>
					<button id="cacheTmp">кэш</button>
				</div>
				<div style="margin: 5px;">
					<button id="longans">Нет ответа</button>
					<button id="NS">урок NS</button>
					<button id="perevod">Др отд</button>
					<button id="tc_sc">tc+sc</button>
					<button id="VPN">VPN</button>
				</div>
				<div style="margin: 5px;">
					<button id="engConv">общ на англ</button>
					<button id="micro">микро</button>
					<button id="browser">ус+брауз</button>
					<button id="thanks">Спс</button>
					<button id="mobile">в моб</button>
				</div>
			</span>
			<div style="margin: 5px;">
				<button id="tmplt1_save">save</button>
				<button id="tmplt1_snd">send</button>
				
				<button id="tmplt2_save" style="margin-left: 25px">save</button>
				<button id="tmplt2_snd">send</button>
				
				<button id="tmplt3_save" style="margin-left: 25px">save</button>
				<button id="tmplt3_snd">send</button>
			</div>
			<div style="margin: 5px;">
				<textarea style="width: 291px; height: 125px; resize: none" id="inp"></textarea>
				<button id="msg1" style="width:100px;">Отправить</button>
				<button id="snd" style="width:50px; margin-left:16px">send</button>
				<button id="msg" style="width:100px; margin-left:16px">Заметки</button>
			</div>
            <div style="border: 2px double black; display: none; background-color: #464451" id="addTmp">
                <div style="margin: 5px; width: 300px">
                        <button id="cacheSafari" style="margin: 2px">Кэш Сафари</button>
                        <button id="UnapisalSam" style="margin: 2px">П -> У написал сам</button>
                        <button id="nedozvonU">недозвон У</button>
                        <button id="macBag" style="margin: 2px">Макобаг</button>
                        <button id="hiddenHW" style="margin: 2px">Скрытое ДЗ</button>
                        <button id="revision" style="margin: 2px">Ревизия</button>
                        <button id="grammar" style="margin: 2px">Грамматика</button>
                        <button id="mat" style="margin: 2px">Материалы приложение</button>
                        <button id="serverAF" style="margin: 2px">Серверные</button>
                        <button id="bil_qa" style="margin: 2px">Баланс (таска)</button>
                        <button id="longAnsOld" style="margin: 2px">Нет ответа(old)</button>
                        <button id="mobApp">Переуст прил</button>
                        <button id="RK1" style="margin: 2px">Общ инф РК</button>
                        <button id="RK2" style="margin: 2px">Вход РК</button>
                        <button id="privateMode" style="margin: 2px">Инкогнито</button>
                        <button id="browser_clear" style="margin: 2px">Проверка браузера</button>
                        <button id="predlozh" style="margin: 2px">Предложение</button>
                        <button id="calltest">vcall-test</button>
                        <button id="vcall_2" style="margin: 2px">vcall-2</button>
                        <button id="bag1">баг</button>
                </div>
            </div>
	    </span>
    </div>`;
	
if (localStorage.getItem('winTopAF') == null) {
    localStorage.setItem('winTopAF', '120');
    localStorage.setItem('winLeftAF', '295');
}


let wintAF = document.createElement('div');
document.body.append(wintAF);
wintAF.style = 'min-height: 25px; min-width: 65px; background: #464451; top: ' + localStorage.getItem('winTopAF') + 'px; left: ' + localStorage.getItem('winLeftAF') + 'px; font-size: 14px; z-index: 20; position: fixed; border: 1px solid rgb(56, 56, 56); color: black;';
wintAF.setAttribute('id' ,'AF_helper');
wintAF.innerHTML = win_AFhelper; 

	
function move_again_AF() {
    if(window.location.href.indexOf('autofaq') === -1) {
		document.getElementById('AF_helper').style.display = 'none';
	}
		
		
    var listener2 = function(e , a) {
        wintAF.style.left = Number(e.clientX - myX2) + "px";
        wintAF.style.top = Number(e.clientY - myY2) + "px";
        localStorage.setItem('winTopAF', String(Number(e.clientY - myY2)));
        localStorage.setItem('winLeftAF', String(Number(e.clientX - myX2)));
    };
    wintAF.firstElementChild.firstElementChild.firstElementChild.ondblclick = function () {
		if(document.getElementById('addTmp').style.display == 'none')
			document.getElementById('addTmp').style.display = '';
		else
			document.getElementById('addTmp').style.display = 'none';
	}
    wintAF.firstElementChild.firstElementChild.firstElementChild.onmousedown = function (a) {
        window.myX2 = a.layerX; 
        window.myY2 = a.layerY; 
        document.addEventListener('mousemove', listener2);
    }
    wintAF.onmouseup = function () {document.removeEventListener('mousemove', listener2);}
	
	
    document.getElementById('msg').onclick = function () {
        if(this.innerHTML == "Чат") {
            this.innerHTML = "Заметки";
        } else {
            this.innerHTML = "Чат";
        }
	}
    document.getElementById('hideMenu').onclick = function () {
		document.getElementById('AF_helper').style.display = 'none'
		document.getElementById('scriptBut').style.display = ''
	}
		
    document.getElementById('thanks').onclick = function () {
		if(document.getElementById('languageAF').innerHTML == "Русский") {
			sendAnswer("Спасибо за ожидание")
        } else {
			sendAnswer("Thanks for waiting")
        }
	}
    document.getElementById('cacheTmp').onclick = function () {
		if(document.getElementById('languageAF').innerHTML == "Русский") {
			sendAnswerTemplate("Очистка кэша общая (шаблон ТП)", "кэш")
        } else {
			sendAnswer("Please clear your browser cache using instructions: http://en_faq.usedocs.com/article/14753 \n\
And then reboot the device and check again, if nothing changes, please write to us.")
        }
	}
    document.getElementById('mobile').onclick = function () {
		if(document.getElementById('languageAF').innerHTML == "Русский") {
			sendAnswer("Я всё проверил и передал обращение в ответственный отдел. С вами свяжется наш специалист по почте и поможет с решением этого вопроса. Пожалуйста, ожидайте")
        } else {
			sendAnswer("I checked everything and transferred all information to the mobile department. Our specialist will contact you by email and will help with the solution. Please wait for an email")
        }
	}
	
			
    document.getElementById('languageAF').onclick = function () {
        if(this.innerHTML == "Русский") {
            this.innerHTML = "Английский";
			document.getElementById('TW').style.display = 'none'
			document.getElementById('cacheSafari').style.display = 'none'
			document.getElementById('macBag').style.display = 'none'
			document.getElementById('hiddenHW').style.display = 'none'
			document.getElementById('revision').style.display = 'none'
			document.getElementById('grammar').style.display = 'none'
			document.getElementById('mat').style.display = 'none'
			document.getElementById('bil_qa').style.display = 'none'
			document.getElementById('mobApp').style.display = 'none'
			document.getElementById('RK1').style.display = 'none'
			document.getElementById('RK2').style.display = 'none'
			document.getElementById('predlozh').style.display = 'none'
			document.getElementById('vcall_2').style.display = 'none'
			document.getElementById('calltest').style.display = 'none'
			document.getElementById('internet').style.display = 'none'
			document.getElementById('AF_helper').style.background = "#EBC7DF"
        } else {
            this.innerHTML = "Русский";
			document.getElementById('TW').style.display = ''
			document.getElementById('cacheSafari').style.display = ''
			document.getElementById('macBag').style.display = ''
			document.getElementById('hiddenHW').style.display = ''
			document.getElementById('revision').style.display = ''
			document.getElementById('grammar').style.display = ''
			document.getElementById('mat').style.display = ''
			document.getElementById('bil_qa').style.display = ''
			document.getElementById('mobApp').style.display = ''
			document.getElementById('RK1').style.display = ''
			document.getElementById('RK2').style.display = ''
			document.getElementById('predlozh').style.display = ''
			document.getElementById('vcall_2').style.display = ''
			document.getElementById('calltest').style.display = ''
			document.getElementById('internet').style.display = ''
			document.getElementById('AF_helper').style.background = "#464451"
        }
	}
    document.getElementById('twoMin').onclick = function () {
		if(document.getElementById('languageAF').innerHTML == "Русский")
			sendAnswerTemplate("Сейчас я вам помогу (шаблон)", "Сейчас я вам помогу")
        else
			sendAnswer("I will help you now. Please wait a couple of minutes.")
	}
	
    document.getElementById('rfrTmr').onclick = function () {
		//addTimer()
		refCurTimer("10:00")
	}
    document.getElementById('rfrTmr1').onclick = function () {
		//addTimer()
		refCurTimer("1:00")
	}
    document.getElementById('cacheSafari').onclick = function () {
		sendAnswer("Давайте попробуем очистить кэш Safari:\n\
1. Зайдите в Настройки->Safari.\n\
2. Найдите пункт \"Очистить историю и данные сайтов\". Жмите по этой кнопке.\n\
3. В новом окне прочитайте сообщение и нажмите \"Очистить\"")
	}
    document.getElementById('bil_qa').onclick = function () {
		sendAnswer("Сейчас наблюдаются неполадки с некорректным списанием уроков с баланса. Передал в ответственный отдел, чтобы баланс исправили.\n\
Есть возможность это исправить сразу, чтобы в дальнейшем баланс списывался корректно, но это приведёт к потере прогресса в личном кабинете. Сейчас разработчики занимаются устранением этой неполадки и рекомендуют пока ничего не исправлять.")
		sendComment('https://skyeng.slack.com/archives/CJQRWT346/p1590040959451600?thread_ts=1590007548.447300&cid=CJQRWT346')
	}
	
    document.getElementById('longAnsOld').onclick = function () {
		if(document.getElementById('languageAF').innerHTML == "Русский")
			sendAnswer("Мы не получили от вас ответа, чат будет закрыт.\n\
Если у вас будут вопросы, пожалуйста, задавайте и мы вам поможем.", 1, "1:00")
		else 
			sendAnswer("We did not received a response from you. Chat will be closed.\n\
If you need help, please write and we will help you.", 1, "1:00")
	}
	
    document.getElementById('tmplt1_save').onclick = function () {
		if(document.getElementById('languageAF').innerHTML == "Русский") {
			txt = document.getElementById('inp').value
			localStorage.setItem('tmplt1_ru', txt)
		} else {
			txt = document.getElementById('inp').value
			localStorage.setItem('tmplt1_en', txt)
		}
	}
    document.getElementById('tmplt2_save').onclick = function () {
		if(document.getElementById('languageAF').innerHTML == "Русский") {
			txt = document.getElementById('inp').value
			localStorage.setItem('tmplt2_ru', txt)
		} else {
			txt = document.getElementById('inp').value
			localStorage.setItem('tmplt2_en', txt)
		}
	}
    document.getElementById('tmplt3_save').onclick = function () {
		if(document.getElementById('languageAF').innerHTML == "Русский") {
			txt = document.getElementById('inp').value
			localStorage.setItem('tmplt3_ru', txt)
		} else {
			txt = document.getElementById('inp').value
			localStorage.setItem('tmplt3_en', txt)
		}
	}
	
    document.getElementById('tmplt1_snd').onclick = function () {
		if(document.getElementById('languageAF').innerHTML == "Русский") {
			txt = localStorage.getItem('tmplt1_ru')
		} else {
			txt = localStorage.getItem('tmplt1_en')
		}
		if(txt == null || txt == "")
			document.getElementById('inp').value = "Не введен текст 1 шаблона"
		else 
			sendAnswer(txt)
	}
    document.getElementById('tmplt2_snd').onclick = function () {
		if(document.getElementById('languageAF').innerHTML == "Русский") {
			txt = localStorage.getItem('tmplt2_ru')
		} else {
			txt = localStorage.getItem('tmplt2_en')
		}
		if(txt == null || txt == "")
			document.getElementById('inp').value = "Не введен текст 2 шаблона"
		else 
			sendAnswer(txt)
	}
    document.getElementById('tmplt3_snd').onclick = function () {
		if(document.getElementById('languageAF').innerHTML == "Русский") {
			txt = localStorage.getItem('tmplt3_ru')
		} else {
			txt = localStorage.getItem('tmplt3_en')
		}
		if(txt == null || txt == "")
			document.getElementById('inp').value = "Не введен текст 3 шаблона"
		else 
			sendAnswer(txt)
	}
	
    document.getElementById('VPN').onclick = function () {
		if(document.getElementById('languageAF').innerHTML == "Русский") {
			sendAnswer("Пожалуйста, установите VPN-расширение для браузера <a href=\"https://skyeng.ru/go/brvpn\" target=\"_blank\" rel=\"noopener\">по инструкции</a>\n\
Затем запустите его и обновите страницу.")
		} else {
			sendAnswer("Please install browser VPN extension using <a href=\"http://en_faq.usedocs.com/article/14752\" target=\"_blank\" rel=\"noopener\">this instruction</a>\n\
Then run it and refresh the page.")
		}
	}
    document.getElementById('micro').onclick = function () {
		if(document.getElementById('languageAF').innerHTML == "Русский") {
			sendAnswer("Проверьте, пожалуйста, настройки микрофона следуя <a href=\"http://faq.usedocs.com/article/7648\" target=\"_blank\" rel=\"noopener\">этой инструкции</a> \n\
Затем, пожалуйста, напишите нам о результате")
		} else {
			sendAnswer("Please check your microphone settings using <a href=\"http://en_faq.usedocs.com/article/14747\" target=\"_blank\" rel=\"noopener\">this instruction</a> \n\
Then please write to us about the result.")
		}
	}
    document.getElementById('RK1').onclick = function () {
		sendAnswerTemplate("Информация о разговорных клубов", "РК")
	}
    document.getElementById('RK2').onclick = function () {
		sendAnswerTemplate("Как войти в РК (шаблон)", "РК")
	}
	
    document.getElementById('vcall_2').onclick = function () {
		sendAnswer("Также на этой странице есть кнопка \"Проверить динамики\", нажав на которую вы должны услышать звук")
	}
    document.getElementById('browser_clear').onclick = function () {
		if(document.getElementById('languageAF').innerHTML == "Русский")
			sendAnswer("Попробуйте, пожалуйста, воспользоваться следующими инструкциями, а затем проверить ещё раз\n\
1. <a href=\"http://faq.usedocs.com/article/7652\" target=\"_blank\" rel=\"noopener\">проверить обновления браузера&nbsp;</a> \n\
2. <a href=\"http://faq.usedocs.com/article/7656\" target=\"_blank\" rel=\"noopener\">удалить Cookies сайта Skyeng&nbsp;</a> \n\
3. <a href=\"http://faq.usedocs.com/article/7654\" target=\"_blank\" rel=\"noopener\">очистить кэш&nbsp;</a> \n\
4. <a href=\"http://faq.usedocs.com/article/7655\" target=\"_blank\" rel=\"noopener\">очистить браузер от лишних расширений&nbsp;</a>")
		else 
			sendAnswer("Please use instructions and then check again \n\
1. <a href=\"http://en_faq.usedocs.com/article/14744\" target=\"_blank\" rel=\"noopener\">check browser for updates&nbsp;</a> \n\
2. <a href=\"http://en_faq.usedocs.com/article/14751\" target=\"_blank\" rel=\"noopener\">delete Skyeng cookies&nbsp;</a> \n\
3. <a href=\"http://en_faq.usedocs.com/article/14753\" target=\"_blank\" rel=\"noopener\">clean browser's cache&nbsp;</a> \n\
4. <a href=\"http://en_faq.usedocs.com/article/14749\" target=\"_blank\" rel=\"noopener\">clean browser from addons&nbsp;</a>")
	
	}
    document.getElementById('privateMode').onclick = function () {
		if(document.getElementById('languageAF').innerHTML == "Русский") 
			sendAnswer("Пожалуйста, откройте новую вкладку в режиме инкогнито сочетанием клавиш Ctrl + Shift + N. Либо через специальное меню как <a href=\"https://skyeng.ru/go/screen6\" target=\"_blank\" rel=\"noopener\">на скриншоте&nbsp;</a> \n\
Для Макбука: Нажмите ⌘ + Shift + N. \n\
И проверьте как работает платформа в нем.\n\
Затем, пожалуйста, напишите нам о результате")
		else 
			sendAnswer('Please open a new tab in incognito mode by pressing Ctrl + Shift + N. \n\
For MacBook: Press ⌘ + Shift + N. \n\
And check how the platform works in it. \n\
Then please write to us about the result.')
	}
    document.getElementById('predlozh').onclick = function () {
		sendAnswerTemplate("Платформа: Пожелания/Отзыв по платформе и личному кабинету", "предложение")
	}


	
	
    document.getElementById('UnapisalSam').onclick = function () {
		if(document.getElementById('languageAF').innerHTML == "Русский") {
			sendAnswer("Попросите ученика самостоятельно написать нам в чат, чтобы мы получили информацию о нем и его системе. Это поможет нам оперативно связаться с учеником и получить необходимую информацию. Спасибо за понимание!")
		} else {
			sendAnswer("Ask the student to write us a chat on their own so that we receive information about him and his system. This will help us quickly contact the student and get the necessary information. Thank you for understanding!")
		}
	}
    document.getElementById('nedozvonU').onclick = function () {
		if(document.getElementById('languageAF').innerHTML == "Русский") {
			sendAnswer("Напишите, пожалуйста, повторно в этот чат позже или попросите ученика написать в чат Support самостоятельно в удобное для него время и мы свяжемся с ним")
		} else {
			sendAnswer("Please write again to this chat later or ask a student to write Support chat on their own at a convenient time for him and we will contact him")
		}
	}
	
    document.getElementById('grammar').onclick = function () {
		sendAnswer("Раздел \"Грамматика\" находится в разработке, поэтому кнопка перехода в раздел грамматики отображается не всегда. \n\
Перейти в раздел грамматики вы можете по ссылке: https://vimbox.skyeng.ru/grammar-trainer")
		sendComment('https://skyeng.slack.com/archives/CD2P42ES0/p1591254192411400 \n\
https://devjira.skyeng.ru/browse/ST-1539')
	}
	
    document.getElementById('hiddenHW').onclick = function () {
		sendAnswer("Ваш преподаватель забыл открыть для вас скрытый раздел, выполнение которого влияет на подсчет балла и завершение домашнего задания.\n\
Мы открыли его для вас, теперь после выполнения вы сможете завершить это домашнее задание.")
	}
    document.getElementById('mat').onclick = function () {
		sendAnswer("Приложение сейчас в режиме доработки и исправления контента.\
По этому из него временно убраны видео и статьи в ежедневных заданиях.")
	}
	
	
    document.getElementById('serverAF').onclick = function () {
		if(document.getElementById('languageAF').innerHTML == "Русский")
			sendAnswer("Извините, пожалуйста, за технические неисправности.\n\
Наши разработчики уже знают об этом и решают вопрос. \n\
Если остались вопросы, пожалуйста, напишите.")
		else
			sendAnswer("Sorry, please for technical issues.\n\
Our developers already know about it and solve the issue.\n\
If you have any questions, please write.")
	}
    document.getElementById('macBag').onclick = function () {
		sendAnswerTemplate("Макобаг (ТП)", "мак")
	}
    document.getElementById('revision').onclick = function () {
		sendAnswerTemplate("Старая ревизия (шаблон ТП)", "ревизия")
	}
	
	
    document.getElementById('msg1').onclick = function () {
        if(this.innerHTML == "Отправить") {
            this.innerHTML = "Доработать";
        } else {
            this.innerHTML = "Отправить";
        }
	}
    document.getElementById('snd').onclick = function () {
		if(document.getElementById('msg').innerHTML == "Чат")
			sendAnswer(document.getElementById('inp').value, 0)
		else 
			sendComment(document.getElementById('inp').value)
		document.getElementById('inp').value = ""
	}
	
	
    document.getElementById('helloAF').onclick = async function () {
		var values = await getInfo()
		adr = values[0]; adr1 = values[1]; uid = values[2]
		if(document.getElementById('languageAF').innerHTML == "Русский")
			txt = "Здравствуйте!"
		else
			txt = "Hello!"
		
		if(document.getElementById('msg1').innerHTML == "Доработать")
			document.getElementById('inp').value = txt
		else 
			if(values[3])
		if(document.getElementById('languageAF').innerHTML == "Русский") {
				refCurTimer('10:00')
				fetch("https://skyeng.autofaq.ai/api/reason8/answers", {
					  "headers": {
						"accept": "*/*",
						"accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
						"cache-control": "max-age=0",
						"content-type": "multipart/form-data; boundary=----WebKitFormBoundarymasjvc4O46a190zh",
						"sec-fetch-dest": "empty",
						"sec-fetch-mode": "cors",
						"sec-fetch-site": "same-origin"
					  },
					  "referrer": adr,
					  "referrerPolicy": "no-referrer-when-downgrade",
					  "body": "------WebKitFormBoundarymasjvc4O46a190zh\r\nContent-Disposition: form-data; name=\"payload\"\r\n\r\n{\"sessionId\":\"" + uid + "\",\"conversationId\":\"" + adr1 + "\",\"text\":\"Здравствуйте!\",\"suggestedAnswerDocId\":0}\r\n------WebKitFormBoundarymasjvc4O46a190zh--\r\n",
					  "method": "POST",
					  "mode": "cors",
					  "credentials": "include"
				});
		} else 
			sendAnswer('Hello!')
	}
    document.getElementById('utoch').onclick = function () {
		if(document.getElementById('languageAF').innerHTML == "Русский")
			sendAnswer("Уточните, пожалуйста, у вас остались дополнительные вопросы?")
		else
			sendAnswer("Do you have any additional questions?")
	}
    document.getElementById('calltest').onclick = function () {
		sendAnswerTemplate("Тест видеосвязи (ТП)", "тест видеосвязи")
	}
    document.getElementById('perevod').onclick = function () {
		if(document.getElementById('languageAF').innerHTML == "Русский")
			sendAnswerTemplate("Перевод на другой отдел (шаблон)", "перевод на другой отдел")
		else
			sendAnswer('Please expect me to contact you with a specialist for your question.')
	}
    document.getElementById('browser').onclick = function () {
		if(document.getElementById('languageAF').innerHTML == "Русский")
			sendAnswer("Уточните, пожалуйста, какое устройство и какой браузер используете")
		else 
			sendAnswer("Please specify which device and browser you are using.")
	}
    document.getElementById('tc_sc').onclick = function () {
		if(document.getElementById('languageAF').innerHTML == "Русский")
			sendAnswer("Обратитесь, пожалуйста, с этим вопросом в \"Teachers Care\" или \"Student care\"")
		else 
			sendAnswer("Please contact \"Teachers care\" or \"Student care\" with this question.")
	}
    document.getElementById('bag').onclick = function () {
		if(document.getElementById('languageAF').innerHTML == "Русский")
			sendAnswer("Подождите, пожалуйста, сейчас я проверю и отвечу вам")
		else 
			sendAnswer("Wait please. Now I will check and answer you.")
	}
    document.getElementById('bag1').onclick = function () {
		if(document.getElementById('languageAF').innerHTML == "Русский")
			sendAnswerTemplate("ТП уже в разработке (есть тикет jira) (шаблон ТП)", "jira")
		else 
			sendAnswer("Sorry for the issue, our developers are already solving it. As soon as they find a way to fix this defect, they will do everything as quickly as possible.")
	}
    document.getElementById('secLine').onclick = function () {
		if(document.getElementById('languageAF').innerHTML == "Русский")
			sendAnswer("Передал обращение старшему специалисту, пожалуйста, ожидайте")
		else 
			sendAnswer("Reffered the appeal to a senior specialist, please wait")
	}
    document.getElementById('idU').onclick = function () {
		if(document.getElementById('languageAF').innerHTML == "Русский")
			sendAnswerTemplate("Уточнение ID ученика (шаблон ТП)", "id")
		else 
			sendAnswer("Please specify student ID")
	}
    document.getElementById('TW').onclick = function () {
		sendAnswerTemplate("Программа TeamViewer (шаблон ТП)", "jira")
	}
    document.getElementById('internet').onclick = function () {
		sendAnswerTemplate("Проблема с Интернетом (ТП)", "интернет")
	}
    document.getElementById('engConv').onclick = function () {
		sendAnswerTemplate("Общение на англ (шаблон)", "общение на англ")
	}
    document.getElementById('min').onclick = function () {
		if(document.getElementById('languageAF').innerHTML == "Русский")
			sendAnswer("Одну минуту")
		else 
			sendAnswer("Wait a minute please")
	}
	
    document.getElementById('screen').onclick = function () {
		if(document.getElementById('languageAF').innerHTML == "Русский")
			sendAnswer("Отправьте, пожалуйста, ссылку на скриншот вашей неполадки и мы поможем вам. Для быстрого создания скриншота вы можете воспользоваться <a href=\"http://skyeng.ru/go/prnt\" target=\"_blank\" rel=\"noopener\">этим сервисом</a>&nbsp;")
		else 
			sendAnswer("Please send a link to a screenshot of your problem and we will help you. To quickly create a screenshot, you can use <a href=\"http://skyeng.ru/go/prnt\" target=\"_blank\" rel=\"noopener\">this service</a>&nbsp")
		
	}
	
    document.getElementById('mobApp').onclick = function () {
		sendAnswer("Чтобы исправить неполадку, пожалуйста, воспользуйтесь следующей инструкцией:\n\
1.Закрыть все приложения на устройстве.\n\
2.Удалить приложение Skyeng.\n\
3.Установить приложение Skyeng.\n\
4.Не открывать приложение.\n\
5.Перезапустить устройство(выключение/включение).\n\
После этого, пожалуйста, проверьте приложение ещё раз")
	}
    document.getElementById('NS').onclick = function () {
		if(document.getElementById('languageAF').innerHTML == "Русский")
		txt = "Пожалуйста, воспользуйтесь инструкцией, а затем напишите, удалось ли вам наладить связь\n\
1. Завершаете урок через Finish\n\
2. Создаете урок через New Student <a href=\"http://joxi.ru/v298jgeTzKyKYm\" target=\"_blank\" rel=\"noopener\">вот так&nbsp;</a> \n\
3. Копируете ссылку и отправляете в чат ученику, заранее предупредив его об этом, так как кнопка войти в класс уже не будет функционировать."
		else 
			txt = "Use this instruction, and then write if you managed to establish a connection \n\
1. End the lesson by clicking Finish \n\
2. Create a lesson through New Student <a href=\"http://joxi.ru/v298jgeTzKyKYm\" target=\"_blank\" rel=\"noopener\">like this&nbsp;</a> \n\
3. Copy the link and send the student to the chat, warning him about this in advance, since the button to enter the class will no longer function."
		sendAnswer(txt)
	}
    document.getElementById('longans').onclick = function () {
		if(document.getElementById('languageAF').innerHTML == "Русский")
			sendAnswerTemplate("Нет долго от У ответа (шаблон)", "долго ответ", "1:00")
		else 
			sendAnswer("I am closing this chat. If you have questions, please write.", 1, "1:00")
	}
	

	window.onkeydown = function(e) {
			if(e.key == 'Control') {
					bool = 1;
			}
			if(e.key == 'Enter' && bool == 1) {
				refCurTimer('10:00')
			}
		}
	window.onkeyup = function(e) {
		if(e.key == 'Control') {
			bool = 0;
		}
	}
	
	let button1 = document.createElement('div');
	button1.id = 'scriptBut';
	button1.innerHTML = "Скрипт";
	button1.style.marginRight = "15px";
	button1.style.display = 'none'
	button1.onclick = function() {
		document.getElementById('AF_helper').style.display = 'flex'
		this.style.display = 'none'
	}
	btnAdd = document.getElementsByClassName('app-body-content-user_menu')[0].childNodes[0]
	btnAdd.insertBefore(button1, btnAdd.children[0])
}
move_again_AF();
var bool = 0;	

async function sendAnswerTemplate(template, word, time = "10:00") {
	//addTimer()
	var values = await getInfo()
	adr = values[0]; adr1 = values[1]; uid = values[2]
	a = await fetch("https://skyeng.autofaq.ai/api/reason8/autofaq/top/batch", {
  "headers": {
    "accept": "*/*", 
    "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
    "cache-control": "max-age=0",
    "content-type": "application/json",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin"
  },
  "referrer": adr,
  "referrerPolicy": "no-referrer-when-downgrade",
  "body": "{\"query\":\"" + word + "\",\"answersLimit\":10,\"autoFaqServiceIds\":[119636,119638,119646,119649,118980,119841,119843,119844,120181,120969,121286,121299,121300,121305]}",
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
});
b = a.json()
serviceId = queryId = sessionId = tmpText = title = accuracy = ""
b.then(b => {b.forEach(b => {if (b.title == template) {documentId = b.documentId
serviceId = b.serviceId
queryId = b.queryId
AFsessionId = b.sessionId
tmpText = b.text
tmpText = tmpText.split("\"").join("\\\"")
tmpText = tmpText.split("\n").join("\\n")
title = b.title
title = title.split("\"").join("\\\"")
accuracy = b.accuracy
}});}).then(k => {
		if(document.getElementById('msg1').innerHTML == "Доработать")
			document.getElementById('inp').value = tmpText
		else 
			if(!values[3])
				console.log('Не знаю id У')
			else if(tmpText == "")
				console.log('Шаблон не найден')
			else {
				refCurTimer(time)
				fetch("https://skyeng.autofaq.ai/api/reason8/answers", {
					  "headers": {
						"accept": "*/*",
						"accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
						"cache-control": "max-age=0",
						"content-type": "multipart/form-data; boundary=----WebKitFormBoundaryZ3ivsA3aU80QEBST",
						"sec-fetch-dest": "empty",
						"sec-fetch-mode": "cors",
						"sec-fetch-site": "same-origin"
					  },
					  "referrer": adr,
					  "referrerPolicy": "no-referrer-when-downgrade",
					  "body": "------WebKitFormBoundaryZ3ivsA3aU80QEBST\r\nContent-Disposition: form-data; name=\"payload\"\r\n\r\n{\"sessionId\":\"" + uid + "\",\"conversationId\":\"" + adr1 + "\",\"text\":\"" + tmpText + "\",\"ext\":null,\"files\":[],\"suggestedAnswerDocId\":" + documentId + ",\"autoFaqServiceId\":" + serviceId + ",\"autoFaqSessionId\":\"" + AFsessionId + "\",\"autoFaqQueryId\":\"" + queryId + "\",\"autoFaqTitle\":\"" + title + "\",\"autoFaqQuery\":\"" + word + "\",\"autoFaqAccuracy\":" + accuracy + "}\r\n------WebKitFormBoundaryZ3ivsA3aU80QEBST--\r\n",
					  "method": "POST",
					  "mode": "cors",
					  "credentials": "include"
					});
				}
			});
}
async function sendAnswer(txt, flag = 1, time = "10:00") {
		//addTimer()
		var values = await getInfo(flag)
		adr = values[0]; adr1 = values[1]; uid = values[2]
		txt2 = txt.split('\n')
		txt3 = ""
		txt2.forEach(el => txt3 += "<p>" + el + "</p>\\n")
		txt3 = txt3.split("\"").join("\\\"")
		
		if(document.getElementById('msg1').innerHTML == "Доработать" && flag)
			document.getElementById('inp').value = txt
		else 
			if(!values[3])
				console.log('Не знаю id У')
			else {
				refCurTimer(time)
				fetch("https://skyeng.autofaq.ai/api/reason8/answers", {
					  "headers": {
						"accept": "*/*",
						"accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
						"cache-control": "max-age=0",
						"content-type": "multipart/form-data; boundary=----WebKitFormBoundaryFeIiMdHaxAteNUHd",
						"sec-fetch-dest": "empty",
						"sec-fetch-mode": "cors",
						"sec-fetch-site": "same-origin"
					  },
					  "referrer": adr,
					  "referrerPolicy": "no-referrer-when-downgrade",
					  "body": "------WebKitFormBoundaryFeIiMdHaxAteNUHd\r\nContent-Disposition: form-data; name=\"payload\"\r\n\r\n{\"sessionId\":\"" + uid + "\",\"conversationId\":\"" + adr1 + "\",\"text\":\"" + txt3 + "\"}\r\n------WebKitFormBoundaryFeIiMdHaxAteNUHd--\r\n",
					  "method": "POST",
					  "mode": "cors",
					  "credentials": "include"
				});
			}
}
async function getInfo(flag1 = 1) {
		adr = document.location.href
		adr1 = document.location.pathname
		adr1 = adr1.split('/')
		adr1 = adr1[3]
		sessionId = ""
		flag = false
		if(document.getElementById('msg1').innerHTML != "Доработать" || flag1 == 0) {
			flag = true
			a = await fetch("https://skyeng.autofaq.ai/api/conversations/"+adr1, {
	  "headers": {
		"accept": "*/*",
		"accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
		"cache-control": "max-age=0",
		"sec-fetch-dest": "empty",
		"sec-fetch-mode": "cors",
		"sec-fetch-site": "same-origin"
	  },
	  "referrer": adr,
	  "referrerPolicy": "no-referrer-when-downgrade",
	  "body": null,
	  "method": "GET",
	  "mode": "cors",
	  "credentials": "include"
	}).then(a => b = a.json()).then(b => sessionId = b.sessionId).then(b => {if(sessionId == "")
		flag = false});
		}
		return [adr, adr1, sessionId, flag]
}

async function sendComment(txt){ 
		var values = await getInfo(0)
		adr = values[0]; adr1 = values[1]; uid = values[2]
		txt2 = txt.split('\n').join('\\n')
		txt2 = txt2.split("\"").join("\\\"")
		
	fetch("https://skyeng.autofaq.ai/api/reason8/answers", {
	  "headers": {
		"accept": "*/*",
		"accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
		"cache-control": "max-age=0",
		"content-type": "multipart/form-data; boundary=----WebKitFormBoundaryH2CK1t5M3Dc3ziNW",
		"sec-fetch-dest": "empty",
		"sec-fetch-mode": "cors",
		"sec-fetch-site": "same-origin"
	  },
	  "referrer": adr,
	  "referrerPolicy": "no-referrer-when-downgrade",
	  "body": "------WebKitFormBoundaryH2CK1t5M3Dc3ziNW\r\nContent-Disposition: form-data; name=\"payload\"\r\n\r\n{\"sessionId\":\"" + uid + "\",\"conversationId\":\"" + adr1 + "\",\"text\":\"" + txt2 + "\",\"isComment\":true}\r\n------WebKitFormBoundaryH2CK1t5M3Dc3ziNW--\r\n",
	  "method": "POST",
	  "mode": "cors",
	  "credentials": "include"
	});
}

idk = 0
var tmrs = []
function addTimer() {
	tm = document.getElementsByClassName('ant-btn expert-item-block expert-item-block-selected ant-btn-block')[0].childNodes[0].childNodes[0]
	if(tm.childNodes[0].childNodes[2] === undefined) {
		let serv = document.createElement('div')
		tm.childNodes[0].appendChild(serv)
		tm.childNodes[0].childNodes[2].innerHTML = "10:00"
		let d = new Date()
		tmrs[idk] = ["10:00", tm.childNodes[1].childNodes[0].innerText, 1, number(d)]
		idk++
	}
}


function addTimers() {
	k = 0
	btns = document.getElementsByClassName('ant-list expert-sidebar-list ant-list-split')[0]
	let d = new Date()
	while (true) {
		if(btns.childNodes[0].childNodes[0].childNodes[0].childNodes[k] == undefined)
			break;
		btns.childNodes[k]
		nm = btns.childNodes[0].childNodes[0].childNodes[0].childNodes[k].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].innerHTML
		flag = 0
		for(i = 0; i < idk; i++) {
			name = tmrs[i][1]
			if(nm == name) {
				flag = 1
				break
			}
		}
		if(flag == 0)
			tmrs[idk++] = ["10:00", nm, 1, Number(d)]

		k++
	}	
	
	k = 0
	btns = document.getElementsByClassName('ant-list expert-sidebar-list ant-list-split')[0]
	while (true) {
		if(btns.childNodes[0].childNodes[0].childNodes[0].childNodes[k] == undefined)
			break;
		if(btns.childNodes[0].childNodes[0].childNodes[0].childNodes[k].childNodes[0].childNodes[0].childNodes[0].childNodes[2] == undefined)
			btns.childNodes[0].childNodes[0].childNodes[0].childNodes[k].childNodes[0].childNodes[0].childNodes[0].appendChild(document.createElement('div'))
		k++
	}
}

function refreshTimer() {
	btns = document.getElementsByClassName('ant-list expert-sidebar-list ant-list-split')[0]
	j = 0
	while(true) {
		if(btns.childNodes[0].childNodes[0].childNodes[0].childNodes[j] === undefined)
			break
		if(btns.childNodes[0].childNodes[0].childNodes[0].childNodes[j].className === "ant-empty ant-empty-normal")
			break;
		if(btns.childNodes[0].childNodes[0].childNodes[0].childNodes[j].childNodes[0].childNodes[0].childNodes[0].childNodes[2] == undefined)
			addTimers()
		name = btns.childNodes[0].childNodes[0].childNodes[0].childNodes[j].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].innerHTML
		for (i = 0; i < idk; i++) {
			if(tmrs[i][1] == name) {
				btns.childNodes[0].childNodes[0].childNodes[0].childNodes[j].childNodes[0].childNodes[0].childNodes[0].childNodes[2].innerHTML = tmrs[i][0]
				if(tmrs[i][0] == "00:00")
					if(tmrs[i][2] == 1)
						btns.childNodes[0].childNodes[0].childNodes[0].childNodes[j].childNodes[0].childNodes[0].style.backgroundColor = "#ECEBBD"
					else
						btns.childNodes[0].childNodes[0].childNodes[0].childNodes[j].childNodes[0].childNodes[0].style.backgroundColor = "#FBCEB1"
				else
					btns.childNodes[0].childNodes[0].childNodes[0].childNodes[j].childNodes[0].childNodes[0].style.backgroundColor = "white"
					
				var cT = new Date();
				var curT1 = tmrs[i][3]
				var curT2 = Number(cT);
				var curT3 = (13.5 * 60) - Math.floor((curT2 - curT1) / 1000);
				if(curT3 < 0)
					btns.childNodes[0].childNodes[0].childNodes[0].childNodes[j].childNodes[0].childNodes[0].style.backgroundColor = "#FF47CA"
			}
		}
		j++
	}
}

function refCurTimer(time) {
	btns = document.getElementsByClassName('ant-btn expert-item-block expert-item-block-selected ant-btn-block')[0]

	name = btns.childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].innerHTML
	for (i = 0; i < idk; i++) {
		if(tmrs[i][1] == name) {
			tmrs[i][0] = time
			if(time == "1:00")
				tmrs[i][2] = 0
			else 
				tmrs[i][2] = 1
			tmrs[i][3] = Number(new Date())
		}
	}
}
		
flag = 0		
function startTimer() {
	for(i = 0; i < idk; i++) {
		var cT = new Date();
		var curTime1 = tmrs[i][3]
		var curTime2 = Number(cT);
		t = 0
		if(tmrs[i][2] == 0)
			t = 1
		else 
			t = 10
		var curTime3 = (t * 60) - Math.floor((curTime2 - curTime1) / 1000);
		if(curTime3 < 0)
			continue
		var m = Math.floor(curTime3 / 60);
		var s = Math.floor(curTime3 % 60);
		var curTime4 = "";    
		if(Number(m) < 10) {
			curTime4 = "0";
		}
		curTime4 = curTime4 + String(m) + ":";
		if(Number(s) < 10) {
			curTime4 = curTime4 + "0";
		}
		curTime4 = curTime4 + String(s);
		tmrs[i][0] = curTime4
	}
	if(window.location.href.indexOf('skyeng.autofaq.ai/tickets/assigned') !== -1 && flag == 0) {
		requestsRed()
		flag = 1
	} 
	if(window.location.href.indexOf('skyeng.autofaq.ai/tickets/assigned') === -1 && flag == 1)
		flag = 0
	
	if(window.location.href.indexOf('skyeng.autofaq.ai/tickets/assigned') !== -1) {
		if(document.getElementsByClassName('ant-btn ant-btn-primary')[0] !== undefined)
			document.getElementsByClassName('ant-btn ant-btn-primary')[0].onclick = function () {
				refCurTimer('10:00')
			}
		refreshTimer()
	if(document.getElementsByClassName('ant-btn ant-btn-icon-only')[3] !== undefined)
		document.getElementsByClassName('ant-btn ant-btn-icon-only')[3].style.display = 'none'

	}
}
setInterval(startTimer, 1000)

function requestsRed () {
	document.getElementsByClassName('expert-sidebar-button')[0].childNodes[0].childNodes[0].addEventListener("DOMSubtreeModified", function() {
			txt = document.getElementsByClassName('expert-sidebar-button')[0].childNodes[0].childNodes[0].innerHTML
			if(txt != "Взять запрос (0)")
				document.getElementsByClassName('expert-sidebar-button')[0].childNodes[0].style.backgroundColor = "#F34723"
			else
				document.getElementsByClassName('expert-sidebar-button')[0].childNodes[0].style.backgroundColor = "white"
	});
}

setTimeout(function () {document.getElementById('testUsers').style.background = "#464451"}, 200)