setInterval(() => {
    if (window.location.href === "https://skyeng.autofaq.ai/tickets/assigned") {
        let btn = document.querySelectorAll('button[type="button"][class="ant-btn expert-get_ticket ant-btn-block"]')[1];
        if (btn) {
            (btn.innerText === 'Взять запрос (0)') ? btn.style.backgroundColor = 'white' : btn.style.backgroundColor = 'red';
        }
    }
}, 5000);