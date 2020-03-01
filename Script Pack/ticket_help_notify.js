window.onload = function (e) {
    setTimeout(() => {
        document.getElementById('add_note').onclick = () => {
            if (document.querySelector('.info_fields > div').innerText.indexOf('operator') !== -1) {
                alert('Обращения от оператора обрабатываются реплаями 😉');
            }
        }
    }, 1000);
};