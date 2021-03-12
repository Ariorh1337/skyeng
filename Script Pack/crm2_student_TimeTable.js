let htmlTimeTable = {
    html: (body) => {
        return `<div><crm-title style="display: block;">
                    <div style="flex-direction: row;
                        box-sizing: border-box;
                        display: flex;
                        place-content: center space-between;
                        align-items: center;
                        margin-top: 12px;
                        margin-bottom: 4px;
                        min-height: 32px;
                    ">
                        <header style="font-size: 13px; font-weight: 500;">Расписание</header>
                        <div _ngcontent-kts-c21=""></div>
                    </div>
                </crm-title>
                <div style="
                    box-shadow: 0 0 0 0 rgba(0,0,0,.2), 0 0 0 0 rgba(0,0,0,.14), 0 0 0 0 rgba(0,0,0,.12);
                    padding: 12px;
                    background-color: #fff;
                    border-radius: 4px;
                    margin-bottom: 10px;
                ">${body}</div></div>`;
    },
    parent: 'crm-education-service-main'
}

class TimeTable {
    constructor(html, parent) {
        this.element = this.create(html, parent);
        return this;
    }

    create(html, parentNode) {
        let button = document.createElement("button");
        button.innerHTML = html;
        button = button.firstElementChild;
        document.querySelector(parentNode).append(button);
        return button;
    }

    isExists() {
        try {
            if ( this.element.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement === null) {
                return false;
            } else return true;
        } catch {
            return false;
        }
    }
}

function apiTimeTable(id) {
    let promise = new Promise((resolve) => {
        chrome.runtime.sendMessage({name: "script_pack", question: 'get_Lazzy_TimeTable_v2', id: id}, function(response) {
            resolve(response.answer);
        });
    });

    return promise.then((r) => {
        return r;
    });
}

window.addEventListener("load", () => {
    let timeTable = {};
    timeTable.isExists = () => { return false; };

    setInterval(async () => {
        let order = window.location.href.match(/services\/([0-9]+)/);
        if (order && !timeTable.isExists()) {
            let body = await apiTimeTable(order[1]);
            if (!body.err) {
                timeTable = new TimeTable(htmlTimeTable.html(body), htmlTimeTable.parent);
            } else {
                timeTable = new TimeTable(htmlTimeTable.html(`<div>Сервис выдает ${body.err} ошибку 😢</div>`), htmlTimeTable.parent);
            }
        }
    }, 5000);
});