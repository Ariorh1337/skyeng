let btns = {
    saved: {
        html: `<button aria-haspopup="true" class="mat-menu-trigger mat-button mat-button-base ng-star-inserted" mat-button="">
                <span class="mat-button-wrapper">Сохраненные</span>
                <div class="mat-button-ripple mat-ripple" matripple=""></div>
                <div class="mat-button-focus-overlay"></div>
            </button>`,
        parent: "mat-toolbar-row > crm-header-menu > nav",
    },
    space: {
        html: `<mat-menu class="ng-tns-c13-11 ng-star-inserted"></mat-menu>`,
        parent: "mat-toolbar-row > crm-header-menu > nav",
    },
    save: {
        html: `<crm-sidenav-item id="save_user" _ngcontent-tih-c17="" _nghost-tih-c20="" class="ng-star-inserted">
                    <a _ngcontent-tih-c20=""
                        class="item mat-list-item mat-list-item-avatar mat-list-item-with-avatar ng-star-inserted" mat-list-item=""
                        mattooltipposition="after" routerlinkactive="-active" aria-describedby="cdk-describedby-message-35" cdk-describedby-host="">
                        <div class="mat-list-item-content">
                            <div class="mat-list-item-ripple mat-ripple" mat-ripple=""></div>
                            <mat-icon _ngcontent-tih-c20=""
                                class="icon mat-badge mat-icon notranslate mat-list-icon mat-badge-warn material-icons mat-badge-overlap mat-badge-above mat-badge-after mat-badge-small mat-badge-hidden mat-icon-no-color"
                                matbadgecolor="warn" matbadgesize="small" matlisticon="" role="img" aria-hidden="true"> save
                                <span _ngcontent-tih-c20="" id="mat-badge-content-16" class="mat-badge-content mat-badge-active"></span>
                            </mat-icon>
                            <div id="hover_text" class="mat-list-text">
                                <!---->
                            </div>
                        </div>
                    </a>
                </crm-sidenav-item>`,
        parent: 'mat-nav-list[role="navigation"]',
    },
    css: {
        html: `<style type="text/css">
                    .hide {
                        display: none;
                    }
                    input[type="datetime-local"]::-webkit-inner-spin-button,
                    input[type="datetime-local"]::-webkit-calendar-picker-indicator  {
                        display: none !important;
                    }
                    .saved {
                        background-color: rgb(117, 117, 117);
                        color: white;
                    }
                    .saved-opened {
                        background-color: white;
                        color: black;
                    }
                    .saved-menu-row {
                        margin-bottom: 10px;
                        padding: 10px 12px;
                        background-color: #fff;
                        cursor: pointer;
                    }
                    .saved-menu-col {
                        margin-right: 15px;
                        flex: 1 1 0%;
                        box-sizing: border-box;
                    }
                    .saved-menu-col > crm-row > header {
                        text-align: center;
                    }
                </style>`,
        parent: 'head'
    },
    menu: {
        html: `<mat-sidenav-saved class="content crm-layout-width mat-drawer-content mat-sidenav-content hide">
                    <router-outlet></router-outlet>
                    <ng-component class="ng-star-inserted">
                    <div class="persons-container">
                        <crm-title>
                            <div class="root" style="margin-left: 12px; margin-top: 20px; margin-bottom: 4px; min-height: 32px;">
                            <header style="font-size: 13px; font-weight: 500;">Сохраненные</header>
                            </div>
                        </crm-title>
                        <crm-persons-saved-results>
                            <!---->
                        </crm-persons-saved-results>
                    </div>
                    </ng-component>
                </mat-sidenav-saved>`,
        parent: 'ng-component[class="ng-star-inserted"]'
    },
    row: {
        html: ({ added, remind, comment, userId, userName }) => {
            return `<div data-user-id="${userId}" class="list ng-star-inserted saved-menu-row">
                    <div class="item mat-ripple ng-star-inserted">
                    <div style="flex-direction: row; box-sizing: border-box; display: flex;">
                        <div name="dateCreated" class="saved-menu-col" style="max-width: 130px; text-align: center; display: none;">
                        <crm-row>
                            <header>Добавлен</header>
                            <main>
                            <input type="datetime-local" style="background-color: white; color: black; display: flex;border: 0px;padding-left: 10px;max-width: 140px; text-align: center;letter-spacing: -0.9px;font-size: inherit;" disabled value="${added}">
                            </main>
                        </crm-row>
                        </div>
                        
                        <div name="userName" class="saved-menu-col" style="max-width: 110px; text-align: center; font-size: 12px;">
                        <crm-row>
                            <header>${userId}</header>
                            <main>${userName}</main>
                        </crm-row>
                        </div>
                
                        <div name="userComment" class="saved-menu-col">
                        <crm-row>
                            <header>Комментарий</header>
                            <main>
                            <input type="text" style="display: flex; border: 0px; min-width: -webkit-fill-available; text-align: center;" value="${comment}">
                            </main>
                        </crm-row>
                        </div>
                        
                        <div name="dateRemind" class="saved-menu-col" style="max-width: fit-content; text-align: center;">
                            <crm-row>
                                <header>Метка</header>
                                <main>
                                <input type="datetime-local" style="display: flex; border: 0px; padding-left: 10px; max-width: 140px; text-align: center; letter-spacing: -0.9px;" value="${remind}">
                                </main>
                            </crm-row>
                        </div>
                
                        <div name="userButtons" class="saved-menu-col" style="max-width: 80px; text-align: center; display: none;">
                            <button class="mat-icon-button" style="border: 1px solid; background-color: #2196F0; color: white;">
                                <mat-icon class="mat-icon material-icons">person</mat-icon>
                            </button>
                            <button class="mat-icon-button" style="border: 1px solid; background-color: #2196F0; color: white; display: none;s">
                                <mat-icon class="mat-icon material-icons">save</mat-icon>
                            </button>
                        </div>
                    </div>
                    </div>
                </div>`;
        },
        parent: 'crm-persons-saved-results'
    }
};
let btn_save = false;

class Element {
    constructor(obj) {
        this.element = this.create(obj.html, obj.parent);
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
            if ( this.element.parentElement === null) {
                return false;
            } else return true;
        } catch {
            return false;
        }
    }
}

class ElementRow extends Element {
    constructor(obj, data) {
        super({ html: obj.html(data), parent: obj.parent})
        this.init();
        return this;
    }

    init() {
        let temp = this;
        setTimeout(() => {
            temp.element.addEventListener("mouseover", () => {
                temp.element.querySelector('div[name="dateCreated"]').style.display = '';
                temp.element.querySelector('div[name="userButtons"]').style.display = '';
            });
            temp.element.addEventListener("mouseout", () => {
                temp.element.querySelector('div[name="dateCreated"]').style.display = 'none';
                temp.element.querySelector('div[name="userButtons"]').style.display = 'none';
            });
    
            function saveAllow() {
                temp.element.querySelector('div[name="userButtons"]').lastElementChild.style.display = '';
            }
            temp.element.querySelector('div[name="userComment"] > * > * > input').addEventListener("change", saveAllow);
            temp.element.querySelector('div[name="dateRemind"] > * > * > input').addEventListener("change", saveAllow);
    
            temp.element.querySelector('div[name="userButtons"]').firstElementChild.addEventListener("click", () => {
                window.open(`https://crm2.skyeng.ru/persons/${temp.element.getAttribute('data-user-id')}`, '_blank');
            });
            temp.element.querySelector('div[name="userButtons"]').lastElementChild.addEventListener("click", () => {
                let comment = temp.element.querySelector('div[name="userComment"] > * > * > input').value;
                let remind = temp.element.querySelector('div[name="dateRemind"] > * > * > input').value;

                if (remind === '') {
                    remind = 0;
                } else {
                    remind = Number(new Date(remind));
                }
    
                new IndexedDB({
                    id: Number(temp.element.getAttribute('data-user-id')),
                    comment: comment,
                    remindAt: remind
                }).change();

                temp.element.querySelector('div[name="userButtons"]').lastElementChild.style.display = 'none';

                setTimeout(() => {
                    row_draw_init();
                }, 100)
            });
        }, 100)
    }
}

class ApiRequest {
    constructor (id) {
        this.id = id
        return this;
    }

    async getAll() {
        let info = await this.getInfo();
        info.service = await this.getServices();
        return info;
    }

    getInfo() {
        this.info = this.request('crm2_get_info');
        return this.info;
    }

    getServices() {
        this.services = this.request('crm2_get_services');
        return this.services;
    }

    request(question) {
        let promise = new Promise((resolve) => {
            chrome.runtime.sendMessage({name: "script_pack", question: question, id: this.id}, function(response) {
                resolve(response.answer);
            });
        });
    
        return promise.then((r) => {
            return r;
        });
    }
}

class IndexedDB {
    constructor(data) {
        this.data = data;
        return this;
    }

    async delete() {
        let db = await this.init();
        let request = db.delete(Number(this.data));
        return new Promise((resolve) => {
            request.onsuccess = () => { resolve(true); }
            request.onerror = () => { resolve(false); }
        });
    }

    async add() {
        let db = await this.init();
        let request = db.add(this.data);
        return new Promise((resolve) => {
            request.onsuccess = () => { resolve(true); }
            request.onerror = () => { resolve(false); }
        });
    }

    async getAll() {
        let db = await this.init();
        let request = db.openCursor();
        return new Promise((resolve) => {
            let data = new Array();
            request.onsuccess = () => {
                if (event.target.result) {
                    data.push(event.target.result.value);
                    event.target.result.continue();
                } else {
                    if (data.length > 0) {
                        resolve(data);
                    } else {
                        resolve(false);
                    }
                }
            }
            request.onerror = () => { resolve(false); }
        });
    }

    async get() {
        let db = await this.init();
        let request = db.get(Number(this.data));
        return new Promise((resolve) => {
            request.onsuccess = () => {
                if (event.target.result) {
                    resolve(event.target.result);
                } else {
                    resolve(false);
                }
            }
            request.onerror = () => { resolve(false); }
        });
    }

    async change() {
        let temp = this.data;
        this.data = this.data.id;

        let store = await this.get();
        for (let key in temp) {
            store[key] = temp[key];
        }

        await this.delete();

        this.data = store;
        let result = await this.add();
        return result;
    }

    async isExists() {
        let result = await this.get();
        if (result) {
            return true;
        } else {
            return false;
        }
    }

    init() {
        let own = this;
        let result = new Promise((resolve) => {
            let request = indexedDB.open('ScriptPack', 2);
            request.onsuccess = function (event) {
                let db = event.target.result;
                if (own.firstTime) db.transaction(["users"], "readwrite").objectStore("users").delete(0);
                resolve(db.transaction(["users"], "readwrite").objectStore("users"));
            };
            request.onupgradeneeded = function (event) {
                let db = event.target.result;
                let objectStore = db.createObjectStore("users", {
                    keyPath: "id",
                });
                objectStore.createIndex("added", "createdAt", {
                    unique: false,
                });
                objectStore.createIndex("remind", "remindAt", {
                    unique: false,
                });
                objectStore.add({ id: 0 });
                own.firstTime = true;
                resolve( own.init() );
            };
        });
        return result.then((r) => {
            return r;
        });
    }
}

async function save_btn_init() {
    let id = window.location.href.match(/\/([0-9]+)/)
    if (id) {
        btn_save = new Element(btns.save);
        btn_save.element.parentElement.parentElement.addEventListener("mouseover",
            function () {
                btn_save.element.querySelector("#hover_text").innerText = "Запомнить";
            }
        );
        btn_save.element.parentElement.parentElement.addEventListener("mouseout",
            function () {
                btn_save.element.querySelector("#hover_text").innerText = "";
            }
        );

        btn_save.element.addEventListener("click", () => {
            if (btn_save.state) {
                btn_save.element.firstElementChild.classList.remove('saved');
                new IndexedDB(id[1]).delete();
                btn_save.state = false;
            } else {
                btn_save.element.firstElementChild.classList.add('saved');
                new ApiRequest(id[1]).getAll().then((data) => {
                    console.log(data);
                    new IndexedDB({
                        id: data.id,
                        'createdAt': Number(new Date()),
                        'remindAt': 0,
                        'comment': '',
                        user: data
                    }).add();
                });
                btn_save.state = true;
            }
        });

        let exists = await new IndexedDB(id[1]).isExists();
        if (exists) {
            btn_save.element.firstElementChild.classList.add('saved');
            btn_save.state = true;
        } else {
            btn_save.element.firstElementChild.classList.remove('saved');
            btn_save.state = false;
        }
    }
}

async function row_draw_init() {
    document.querySelector('crm-persons-saved-results').innerHTML = '';

    let rows = new Array();
    let data = await new IndexedDB().getAll();
    if (data && data.length > 0) {
        if (data.length > 1) {
            data.sort((a, b) => {
                if (a.remindAt === 0 && b.remindAt === 0) {
                    return b.createdAt - a.createdAt;
                }
                if (a.remindAt !== 0 && b.remindAt === 0) {
                    if (a.remindAt > b.createdAt) return a.remindAt - b.createdAt;
                    if (a.remindAt < b.createdAt) return b.createdAt - a.remindAt;
                }
                if (a.remindAt !== 0 && b.remindAt !== 0) {
                    return b.remindAt - a.remindAt;
                }
            })
        }

        data.forEach((data_row) => {
            let createdAt = new Date(data_row.createdAt);
            createdAt = `${createdAt.toLocaleDateString().split('.').reverse().join('-')}T${createdAt.toLocaleTimeString().slice(0, -3)}`;

            let remindAt = (data_row.remindAt === 0) ? '' : new Date(data_row.remindAt);
            remindAt = (remindAt === '') ? '' : `${remindAt.toLocaleDateString().split('.').reverse().join('-')}T${remindAt.toLocaleTimeString().slice(0, -3)}`;

            rows.push(new ElementRow(btns.row, {
                added: createdAt,
                remind: remindAt,
                comment: data_row.comment,
                userId: data_row.id,
                userName: data_row.user.name
            }));
        });
    }
}

window.addEventListener("load", () => {
    setTimeout(async () => {
        save_btn_init();
        setInterval(() => {
            if (btn_save && !btn_save.isExists()) save_btn_init();
        }, 5000);
    
        let css = new Element(btns.css);
        let btn_saved = new Element(btns.space) && new Element(btns.saved);
        let menu = new Element(btns.menu);

        btn_saved.element.addEventListener("click", function () {
            if (!css.isExists()) css = new Element(btns.css);
            document.querySelector('mat-sidenav-container').classList.toggle('hide');
            document.querySelector('mat-sidenav-saved').classList.toggle('hide');
            let exists = btn_saved.element.classList.toggle('saved-opened');
    
            if (exists) row_draw_init();
        });
    }, 2500);
});