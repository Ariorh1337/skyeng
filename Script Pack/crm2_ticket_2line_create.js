async function importFrom(PATH, MODE = 0) {
    let textFunc = await fetch(chrome.runtime.getURL(PATH)).then(r => r.text());
    let func = new Function(
        (MODE === 0) ? textFunc
            : 'return ' + textFunc
    );
    return func();
}

const ticketCreateWindowHTML = `<div style="position: fixed; z-index: 888888888; bottom: 0px; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.7); overflow-y: auto;">
<div style="max-width: 800px; position: absolute; top: 25%; left: 40%; margin-bottom: 0px;">
    <div style="background:#ffffff;padding: 30px;margin: 0px;text-align: center;">
        <div style="color: rgb(60,91,151);font-size: 25px;font-weight: 700;font-family: Source Sans Pro;"><sub>Создать задачу на 2Л</sub></div>

        <div style="color: rgb(60,91,151);font-size: 20px;font-family: Source Sans Pro;margin-top: 20px;"><sub>ID пользователя</sub></div>
        <input id="ticket_create_user_id" style="margin-top: 5px;text-align: center;" type="number">

        <div style="color: rgb(60,91,151);font-size: 20px;font-family: Source Sans Pro;margin-top: 20px;"><sub>Комментарий</sub></div>
        <input id="ticket_create_comment" style="margin-top: 5px;text-align: center;width: 100%;" type="text">

        <div style="color: rgb(60,91,151);font-size: 20px;font-family: Source Sans Pro;margin-top: 20px;"><sub>Тип задачи</sub></div>
        <input id="ticket_create_type" style="margin-top: 5px;text-align: center; width: 100%;" list="ticket_error_type">
        <datalist id="ticket_error_type">
            <option value="poor_connection.student_device">Не качественное соединение - Устройство - Ученик</option>
            <option value="poor_connection.teacher_device">Не качественное соединение - Устройство - Учитель</option>
            <option value="poor_connection.student_internet">Не качественное соединение - Интернет - Ученик</option>
            <option value="poor_connection.teacher_internet">Не качественное соединение - Интернет - Учитель</option>
            <option value="disconnection.student_device">Отсутствие связи - Устройство - Ученик</option>
            <option value="disconnection.teacher_device">Отсутствие связи - Устройство - Учитель</option>
            <option value="disconnection.student_internet">Отсутствие связи - Интернет - Ученик</option>
            <option value="disconnection.teacher_internet">Отсутствие связи - Интернет - Учитель</option>
        </datalist>

        <div style="color: rgb(60,91,151);font-size: 20px;font-family: Source Sans Pro;margin-top: 20px;"><sub>Дата и время</sub></div>
        <input id="ticket_create_date" style="margin-top: 5px;text-align: center;" type="date">
        <input id="ticket_create_time" style="margin-top: 5px;text-align: center;" type="time">

        <button id="ticket_create_new_one" type="button" style="margin-top: 15px;border-style: solid;border-top-left-radius: 5px;border-top-right-radius: 5px;border-top-width: 1px;font-size: 18px;font-weight: 700;line-height: 1;padding-bottom: 20px;padding-top: 20px;width: 100%;cursor: pointer;">Отправить</button>
        <button id="ticket_exit_and_remove" type="button" style="margin-top: 15px; border-style: solid; border-top-left-radius: 5px; border-top-right-radius: 5px; border-top-width: 1px; line-height: 1; padding-bottom: 3px; padding-top: 3px; cursor: pointer;">закрыть</button>
    </div>
</div>
</div>`;

(async function () {

    const allow = await new Promise((resolve) => {
        chrome.runtime.sendMessage({ name: "script_pack", question: 'crm2_get_self_group'}, function (response) {
            resolve((response.data.name === 'technical_support_second_line') ? true : false);
        })
    })
    if (!allow) return false;

    const element = await importFrom('/libs/element.js');
    window.ElementCustom = element.Element;
    window.createTicketButton = false;

    setInterval(() => {
        const headerExists = document.querySelector('crm-header');
        if (!headerExists) return false;

        if (!window.createTicketButton || !window.createTicketButton.isExists()) {
            window.createTicketButton = new ElementCustom({
                html: '<button aria-haspopup="true" mat-button="" class="mat-focus-indicator mat-menu-trigger mat-button mat-button-base ng-star-inserted">Создать тикет</button>',        
                parentSelector: 'crm-header > mat-toolbar > mat-toolbar-row > crm-header-menu > nav',
                possition: 'after'
            });

            window.createTicketButton.element.addEventListener('click', () => {
                const ticketCreateWindow = new ElementCustom({
                    html: ticketCreateWindowHTML,        
                    parentSelector: 'body',
                    possition: 'after'
                });

                ticketCreateWindow.element.querySelector('#ticket_exit_and_remove').addEventListener('click', () => {
                    ticketCreateWindow.remove();
                })

                ticketCreateWindow.element.querySelector('#ticket_create_new_one').addEventListener('click', () => {
                    const userID = ticketCreateWindow.element.querySelector('#ticket_create_user_id').value;
                    if (!userID || userID === 0) {
                        alert('Не правильный ID пользователя');
                        return false;
                    }

                    const comment = ticketCreateWindow.element.querySelector('#ticket_create_comment').value;
                    if (!comment || comment === '') {
                        alert('Не правильный / пустой комментарий');
                        return false;
                    }

                    const type = ticketCreateWindow.element.querySelector('#ticket_create_type').value;
                    if (!type || type === '') {
                        alert('Не правильный / пустой тип задачи');
                        return false;
                    }

                    const now = new Date();
                    const nowSTR = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getUTCDate()}`;

                    const date = ticketCreateWindow.element.querySelector('#ticket_create_date').value;
                    if (!date || date === '') {
                        alert('Не правильная / пустая дата');
                        return false;
                    } else if (Number(now) > Number(new Date(date))) {
                        alert('Нельзя ставить эвент в прошлое (Дата)');
                        return false;
                    }

                    const time = ticketCreateWindow.element.querySelector('#ticket_create_time').value;
                    if (!time || time === '') {
                        alert('Не правильное / пустое время');
                        return false;
                    } else if (nowSTR === date && Number(now) > Number(new Date(`${nowSTR} ${time}`))) {
                        alert('Нельзя ставить эвент в прошлое (Время)');
                        return false;
                    }

                    const date_time = new Date(`${date} ${time}`).toJSON();

                    fetch("https://customer-support.skyeng.ru/task/create", { "credentials": "include", "headers": { "content-type": "application/json" }, "body": "{\"userId\":" + userID + ",\"taskType\":\"" + type + "\",\"extra\":\"{\\\"comment\\\":\\\"" + comment + "\\\"}\",\"activeOn\":\"" + date_time + "\",\"operatorGroupName\":\"technical_support_second_line\"}", "method": "POST" })
                        .then(r => r.json())
                        .then(r => { 
                            window.open(`https://crm2.skyeng.ru/persons/${userID}/customer-support/task/${r.taskId}`, '_blank');
                        })

                    ticketCreateWindow.remove();
                })
            })
        }
    }, 1000);
})()

    

    

    





