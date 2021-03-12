/**
 * Author: Aleksandr Chernobrovkin
 * Slack: US487N5FU
 * Moderator: Omelchenko Dmitry
 */

window.addEventListener("load", async function () {
    const studentId = window.location.pathname.split('/')[2];
    const token = "Bearer " + document.cookie.match(/token_global=(.*?);/)[1];

    const homeworks = await fetch("https://api.vimbox.skyeng.ru/api/v1/homeworks?studentId=" + studentId, {
        "headers": {
            "authorization": token,
        },
        "body": null,
        "method": "GET",
    }).then(response => response.json());

    document.querySelectorAll('.tile').forEach((element, index) => {
        const buttonsHTML = (index) => `<div data-modify="" style="text-align: center;">
            <button data-hwIndex="${index}" data-type="reset" title="Сбросить прогресс только в заданном ДЗ" style="margin: 0px 5px;">reset</button>
            <button data-hwIndex="${index}" data-type="delete" title="Отозвать всe слайды" style="margin: 0px 5px;">delete</button>
            <button data-hwIndex="${index}" data-type="delete once" title="Отозвать нетронутые слайды" style="margin: 0px 5px;">☒</button>
        </div>`;

        let buttonsElement = document.createElement('div');
        element.prepend(buttonsElement);
        buttonsElement.outerHTML = buttonsHTML(index);
    });

    document.querySelectorAll('.tile > div[data-modify] > button[data-type="reset"]').forEach((element, index) => {
        element.onclick = function () { 
            if (confirm(`Сбросить прогресс у "${homeworks[this.getAttribute('data-hwIndex')].workbook.title}"?`)) {
                resetHW(token, homeworks[this.getAttribute('data-hwIndex')]);
                element.parentElement.style.border = '3px solid green';        
            }
        }
    });
    document.querySelectorAll('.tile > div[data-modify] > button[data-type="delete"]').forEach((element, index) => {
        element.onclick = function () { 
            if (confirm(`Отозвать все слайды из "${homeworks[this.getAttribute('data-hwIndex')].workbook.title}"?`)) {
                deleteHW(token, homeworks[this.getAttribute('data-hwIndex')], 0);
                element.parentElement.parentElement.remove();    
            }
        }
    });
    document.querySelectorAll('.tile > div[data-modify] > button[data-type="delete once"]').forEach((element, index) => {
        element.onclick = function () { 
            if (confirm(`Отозвать не выполненные слайды из "${homeworks[this.getAttribute('data-hwIndex')].workbook.title}"?`)) {
                deleteHW(token, homeworks[this.getAttribute('data-hwIndex')], 1)
                element.parentElement.style.border = '3px solid blue';        
            }
        }
    });
})

function resetHW(token, data) {
    const workbookID = data.workbook.id;
    data.workbook.workbookSteps.forEach((element) => {
        const stepID = element.stepRevId;

        fetch("https://rooms.vimbox.skyeng.ru/rooms/api/v1/workbooks/steps/" + stepID + "/reset", {
            "headers": {
                "authorization": token,
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
            "body": "workbookIds[]=" + workbookID,
            "method": "DELETE",
        });
    });
}

async function deleteHW(token, data, checkCompleteness = 0) {
    const workbookID = data.workbook.id;
    data.workbook.workbookSteps.forEach((element) => {
        const stepID = element.stepRevId;

        if (checkCompleteness === 1 && element.completeness !== 0) return 0;
            
        fetch("https://rooms.vimbox.skyeng.ru/rooms/api/v1/homeworks/workbook/" + workbookID + "/step/" + stepID, {
            "headers": {
                "authorization": token,
            },
            "method": "DELETE"
        });
    });
}