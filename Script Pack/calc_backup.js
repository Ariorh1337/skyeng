chrome.storage.local.get(['calc_backup'], function(result) {
    if (result['calc_backup'] === undefined) { chrome.storage.local.set({calc_backup: true}, function() {}); }
    if (result['calc_backup'] === true) {
        setTimeout(() => {
            if (document.querySelector('body > header > form') == null) {
                if (document.querySelector('body > form[id="data"]') == null) {
                    if (localStorage.getItem('head') !== null && localStorage.getItem('body') !== null) {
                        //load
                        document.head.innerHTML = localStorage.getItem('head')
                        document.body.innerHTML = localStorage.getItem('body')
                        
                        //UI
                        document.querySelector('body > header > form').style = 'background-color: darkorange;';
                        let btn = document.querySelector('body > header > form > input[value="Загрузить"]')
                        btn.outerHTML = btn.outerHTML + '<span style="color: white; text-shadow: black 0px -1px 4px;"><b>Это BACKUP!!!</b></span>';
                    }
                }
            } else {
                let cookie = document.cookie.split(';');
                for (var i = 0; i < cookie.length; i++) {
                    if (cookie[i].indexOf('date') !== -1) {
                        cookie = cookie[i].split('=')[1];
                        break;
                    }
                }
        
                var now = new Date();
                var calendar = new Date(cookie);
                if (now.getDate() == calendar.getDate() && now.getMonth() == calendar.getMonth() && now.getYear() == calendar.getYear()) {
                    localStorage.setItem('head', document.head.innerHTML);
                    localStorage.setItem('body', document.body.innerHTML);    
                }
            }
        }, 1000)
    }
});