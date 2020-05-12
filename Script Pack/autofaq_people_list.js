let AutoFaqCookie = document.cookie.match(/jwt=(.*)/)[1];

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

let person = (name, count, state) => `<li class="ant-menu-item" role="people" style="padding-left: 32px;">
<a class="app-left_menu-item">
    <span style="border-inline-start: 16px dotted ${(state !== 'Online') ? 'darkorange' : (count == 0) ? 'darkgreen' : 'darkred'};"></span>
    <span role="img" aria-label="alert" type="alert" class="anticon anticon-alert" style="margin: 0px 0px 0px -15px; font-weight: bold;">${count}</span>
    <span class="nav-text">
        <span class="ant-badge" style="font-size: 10px;">${name}</span>
    </span>
</a>
</li>`;

async function make_list() { 
    var asd = await get_state();
    var people = '';0
    asd.forEach(s => {
        if (s.operator !== null && s.operator.status !== "Offline" && s.operator.fullName.indexOf('ТП') !== -1) {
            if (s.aCnt == null) s.aCnt = 0;
            if (s.cCnt == null) s.cCnt = 0;
            if (s.operator.fullName.indexOf('ТП2-') !== -1) {
                people = person(s.operator.fullName, s.aCnt + s.cCnt, s.operator.status) + people;
            } else {
                people += person(s.operator.fullName, s.aCnt + s.cCnt, s.operator.status);
            }
        };
    }); //aCnt = в работе, cCnt = в очереди, 
    document.getElementById('people_list').innerHTML = people;
}

document.onreadystatechange = () => { 
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

    make_list();
    setInterval(make_list, 30000);
}