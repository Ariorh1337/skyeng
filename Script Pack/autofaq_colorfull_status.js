function colorfull_status() {
    document.querySelector('div[class="user_menu-status"] > button[type="button"]').onclick = () => { 
        setTimeout(() => {
            document.querySelectorAll('li[role="menuitem"][aria-disabled="false"]').forEach((s) => {
                s.onclick = () => {
                    setTimeout(() => {
                        let btn = document.querySelector('div[class="user_menu-status"] > button[type="button"]');
                        if (btn.firstElementChild.innerText == 'Офлайн') btn.style = 'background-color: red;';
                        if (btn.firstElementChild.innerText == 'Занят' || btn.firstElementChild.innerText == 'Перерыв') btn.style = 'background-color: orange;';
                        if (btn.firstElementChild.innerText == 'Онлайн') btn.style = 'background-color: green;';
                    }, 1000);
                }
            })
        }, 100);
    }

    setTimeout(() => { 
        let btn = document.querySelector('div[class="user_menu-status"] > button[type="button"]');
        if (btn.firstElementChild.innerText == 'Офлайн') btn.style = 'background-color: red;';
        if (btn.firstElementChild.innerText == 'Занят' || btn.firstElementChild.innerText == 'Перерыв') btn.style = 'background-color: orange;';
        if (btn.firstElementChild.innerText == 'Онлайн') btn.style = 'background-color: green;';
    }, 7000)
}

var script = document.createElement("script");
script.setAttribute("type", "text/javascript");
script.innerHTML = colorfull_status.toString() + '; setTimeout(colorfull_status, 1000);';
document.body.append(script);