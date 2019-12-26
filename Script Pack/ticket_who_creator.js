document.onreadystatechange = () => {
    function get_id (email) {
        return new Promise(resolve => {
            chrome.runtime.sendMessage({name: "script_pack", question: 'info_user_search', id: email}, function(response) {
                resolve(response.answer[0].id);
            });
        });
    }

    function get_info(id) {
        return new Promise(resolve => {
            chrome.runtime.sendMessage({name: "script_pack", question: 'get_person_info', id: id}, function(response) {
                resolve(response.role);
            })
        });
    }

    async function who_was_send_this() {
        let email = document.querySelector('.info_fields > p > a[href][target]').innerText; //email
        let id = await get_id(email);
        let role = await get_info(id);
        let item = document.createElement('p');
        item.innerHTML = `Role: ${role}  <br>ID: <span><a href="https://id.skyeng.ru/admin/users/${id}" target="blank">${id}</a></span>`;
        let before = document.querySelector('.info_fields > h6');
        document.querySelector('.info_fields').insertBefore(item,before);
        window.$link = window.location.href;
    }

    $link = window.location.href;
    who_was_send_this($link);

    if (window.location.href.indexOf('chat') !== -1) {
        setInterval( () => {	
            $link !== window.location.href ? who_was_send_this() : false;
        }, 2000, $link);
    }
}