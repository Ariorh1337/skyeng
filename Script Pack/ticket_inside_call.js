class Inside_Call_Element {
    constructor(obj) {
        this.element = this.create(obj.html, obj.parent);
        return this;
    }

    create(html, parentNode) {
        let button = document.createElement("div");
        button.innerHTML = html;
        button = button.firstElementChild;
        document.querySelector(parentNode).append(button);
        return button;
    }

    isExists() {
        try {
            if ( this.element.parentElement === null || this.element.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement === null) {
                return false;
            } else return true;
        } catch {
            return false;
        }
    }

    remove() {
        this.element.remove();
        delete this;
    }
}

let obj = {
    'navButton': {
        html: 
        `<li class="nav-item nav-item-call inlb ">
            <a class="nav-item-url" href="#"> Входящий звонок</a>
        </li>`,
        parent: '.primary-nav'
    },
    'modalWindow': {
        html:
        `<div id="myModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <span class="close">&times;</span>
                    <h2>Входящий звонок</h2>
                </div>
                <div class="modal-body">
                    <p>ID пользователя</p>
                    <input type="text" id="modal_user_id"></input>
                    <p>Телефон пользователя</p>
                    <input type="text" id="modal_user_phone"></input>
                    <p>Метки</p>
                    <input list="inside_call_list" type="text"></input>
                    <datalist id="inside_call_list">
                        <option>CRM → передано в разработку</option>
                        <option>CRM → понимание системы</option>
                        <option>Не работают аудио/видеоролики → передано в разработку</option>
                        <option>Не работают аудио/видеоролики → устройство → ученик</option>
                        <option>Не работают аудио/видеоролики → устройство → учитель</option>
                        <option>Не работают аудио\\видео ролики → системный сбой</option>
                        <option>ДЗ mobile → передано в разработку</option>
                        <option>ДЗ mobile → проблемы с контентом → системный сбой</option>
                        <option>Отсутствие связи → интернет → учитель</option>
                        <option>Отсутствие связи → интернет→ ученик</option>
                        <option>Отсутствие связи → системный сбой</option>
                        <option>Отсутствие связи → устройство → ученик</option>
                        <option>Отсутствие связи → устройство → учитель</option>
                        <option>Отсутствие связи → заблокирована связь → ученик</option>
                        <option>Отсутствие связи → заблокирована связь → учитель</option>
                        <option>Отсутствие связи  →  браузер  → ученик</option>
                        <option>Отсутствие связи  →  браузер  → учитель</option>
                        <option>Некачественная связь → интернет → ученик</option>
                        <option>Некачественная связь → интернет → учитель</option>
                        <option>Некачественная связь → системный сбой</option>
                        <option>Некачественная связь → устройство → ученик</option>
                        <option>Некачественная связь → устройство → учитель</option>
                        <option>Проблемы с контентом → передано в разработку</option>
                        <option>Проблемы с контентом → системный сбой</option>
                        <option>Проблемы с контентом → устройство</option>
                        <option>Проблемы с контентом → понимание системы</option>
                        <option>Проблемы с ЛК → передано в разработку</option>
                        <option>Проблемы с ЛК → системный сбой</option>
                        <option>Проблемы с ЛК → аккаунт → учитель</option>
                        <option>Проблемы с ЛК → аккаунт → ученик</option>
                        <option>Проблемы с ЛК → устройство → ученик</option>
                        <option>Проблемы с ЛК → устройство → учитель</option>
                        <option>Проблемы с ЛК → понимание системы</option>
                        <option>Проблемы с оплатой → школа</option>
                        <option>Проблемы с оплатой → ученик</option>
                        <option>Проблемы с оплатой → передано в разработку</option>
                        <option>Проблемы с оплатой → понимание системы</option>
                        <option>Предложение</option>
                        <option>Передано в соответствующий отдел</option>
                        <option>Поиск в базе данных</option>
                        <option>Телефония</option>
                        <option>Проблемы со сторонним ПО</option>
                        <option>Серверные проблемы (Решено)</option>
                        <option>Серверные проблемы (Не решено)</option>
                        <option>Техосмотр</option>
                        <option>Понимание системы → объяснено</option>
                        <option>Невыход на связь → ученик</option>
                        <option>Невыход на связь → учитель</option>
                        <option>Отказ от помощи → ученик</option>
                        <option>Отказ от помощи → учитель</option>
                    </datalist>
                    <p></p>
                </div>
                <div class="modal-footer">
                    <button>Отправить</button>
                </div>
            </div>
        </div>`,
        parent: 'body'
    },
    'style': {
        html:
        `<style>
            .modal {
                display: none;
                position: fixed;
                z-index: 100;
                padding-top: 100px;
                left: 25%;
                top: 0;
                width: 400px;
                height: 300px;
                overflow: auto;
            }
        
            .modal-content {
                position: relative;
                background-color: #fefefe;
                margin: auto;
                padding: 0;
                border: 1px solid #888;
                width: 80%;
                -webkit-animation-name: animatetop;
                -webkit-animation-duration: 0.4s;
                animation-name: animatetop;
                animation-duration: 0.4s;
                text-align: center;
            }
        
            .close {
                color: white;
                float: right;
                font-size: 28px;
                font-weight: bold;
            }
        
            .close:hover,
            .close:focus {
                color: #000;
                text-decoration: none;
                cursor: pointer;
            }
        
            .modal-header {
                padding: 2px 16px;
                background-color: #5cb85c;
                color: white;
            }
        
            .modal-body {
                padding: 2px 16px;
                color: black;
            }
            .modal-body > p {
                margin: 5px 0;
            }
            .modal-body > input {
                width: 100%;
                text-align: center;
                color: black;
            }
        
            .modal-footer {
                padding: 2px 16px;
                background-color: #5cb85c;
            }
            .modal-footer > button {
                color: black;
            }
        </style>`,
        parent: 'head'
    }
}

function getSelfName() {
    let text = document.querySelector('#IntercomSettingsScriptTag').innerText.replace('window.', 'let ');
    var temp = new Function(`return ( function() {${text} return intercomSettings.name})()`);
    return temp();
}

function sendImportantInfo(name, id, phone, mark) {
    if (!name) name = '';
    if (!id) id = '';
    if (!phone) phone = '';
    if (!mark) mark = '';
    
    let body = "entry.919122711=" + encodeURI(phone);
    body += "&entry.1927219353=" + encodeURI(name);
    body += "&entry.1029687462=" + encodeURI(id);
    body += "&entry.1048122562=" + encodeURI(mark);
    fetch("https://docs.google.com/forms/d/e/1FAIpQLScN-QWR4pMkeGnE8V7rVr-dfnpv9z2s5IKRfiJuBgZ4t7817w/formResponse", {
        "credentials":"include",
        "headers":{
            "content-type":"application/x-www-form-urlencoded"
        },
        "body": body,
        "mode": "no-cors",
        "method":"POST"
    });
}

function inside_Call_init() {
    let nav_btn = new Inside_Call_Element(obj.navButton);
    let modalWindow = new Inside_Call_Element(obj.modalWindow);
    let style = new Inside_Call_Element(obj.style);

    nav_btn.element.addEventListener('click', () => {
        modalWindow.element.style.display = 'block';
    })
    modalWindow.element.querySelector('.close').addEventListener('click', () => {
        modalWindow.element.style.display = 'none';
        modalWindow.element.querySelectorAll('.modal-body > input').forEach((elm) => {
            elm.value = '';
        });
    })

    modalWindow.element.querySelector('.modal-footer > button').addEventListener('click', () => {
        let temp = new Array(2), accept = true;
        modalWindow.element.querySelectorAll('.modal-body > input').forEach((elm, index) => {
            if (elm.value.trim() !== '') {
                temp[index] = elm.value.trim();
                elm.style.border = "";
            } else {
                if (index > 0) {
                    accept = false;
                    elm.style.border = "2px solid red";
                }
            }
        })

        if (accept) {
            let name = getSelfName();
            
            sendImportantInfo(name, temp[0], temp[1], temp[2]);
            modalWindow.element.querySelector('.close').click();
        }
    })
}

window.addEventListener('load', () => {
    inside_Call_init();
});