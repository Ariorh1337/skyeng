let head_html = (...text) => {
    return `<div _ngcontent-nrp-c17="" class="root" style="flex-direction: row; box-sizing: border-box; display: grid; align-items: center;">
        <h2 _ngcontent-nrp-c17="" class="title">
            <header _ngcontent-nrp-c71="">Данные</header>
        </h2>
        ${text.join('')}
    </div>`;
}

let row_html = (id, name, tid, tname) => {
    return `<div _ngcontent-nrp-c17="" style="place-content: center space-between; display: flex;">
        <span>Услуга: (${id}) ${name}</span>
        <span>Учитель: (${tid}) ${tname}</span>
    </div>`;
}

function draw_block() {
    let id = window.location.href.match(/persons\/([0-9]*)\//)[1]; //Получаем ID ученика

    chrome.runtime.sendMessage({ name: "script_pack", question: 'crm2_status', id: id }, function (r) { //Запрашиваем информацию в background.js
        let data = r.answer[0].other;
        if (data.length > 0) {
            let place = document.querySelectorAll('ng-component[class="ng-star-inserted"] > crm-title')[1]; //Выбираем место куда вставим блок
            let rows_result = new Array();
    
            data.forEach(row => {
                rows_result.push(
                    row_html(
                        row.id,
                        `${row.student.general.name} ${row.student.general.surname}`,
                        (row.teacher && row.teacher.general) ? row.teacher.general.id : '~',
                        (row.teacher && row.teacher.general) ? `${row.teacher.general.name} ${row.teacher.general.surname}` : '~'
                    )
                );
            });
    
            let head = document.createElement('div');
            place.prepend(head);
            head.outerHTML = head_html(rows_result);
        }
    });
}

let last_url = window.location.href;
setInterval(() => {
    let url = window.location.href
    if (last_url !== url && url.indexOf('/communications/mail/new') !== -1) { //https://crm2.skyeng.ru/persons/*/communications/mail/new
        draw_block();
        last_url = url;
    } else if (last_url !== url) {
        last_url = url;
    }
}, 1000, last_url);
