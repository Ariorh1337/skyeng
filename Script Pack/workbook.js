document.body.onclick = function(e) {
    if (!e.altKey) {
        if (e.target.getAttribute('data-qa-id') == 'btn-lesson-tab') {
            var token = document.cookie.match(/token_global=(.*?);/)[1];
            var hash = window.location.href.match(/workbook\/([a-z]+)\/[0-9]/i)[1];
            fetch(`https://rooms.vimbox.skyeng.ru/rooms/api/v1/rooms/${hash}/join`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            }).then(r => r.json()).then((r) => {
                console.log(r);
                var cms = `https://content.vimbox.skyeng.ru/cms/lesson/update/id/${r.lessonId}`, level = '';
                if (r.lessonInfo.info.level == 0) level = 'Starter';
                if (r.lessonInfo.info.level == 1) level = 'Beginner';
                if (r.lessonInfo.info.level == 2) level = 'Elementary';
                if (r.lessonInfo.info.level == 3) level = 'Pre-Intermediate';
                if (r.lessonInfo.info.level == 4) level = 'Intermediate';
                if (r.lessonInfo.info.level == 5) level = 'Upper-Intermediate';
                if (r.lessonInfo.info.level == 6) level = 'Advanced';
                if (r.lessonInfo.info.level == 7) level = 'Proficiency';
                copyToClipboard(`${r.lessonInfo.info.program} -> ${level} -> ${r.lessonInfo.info.title} -> ${document.querySelector('.-selected > div > span[class="title"]').innerText}\nCMS: ${cms}`);//
            });
        }
        return;
    } else {
        var steps = document.querySelectorAll('div[class="steps"] > div');

        for (var i = 0; i < steps.length; i++) {
            steps[i].click();
            document.querySelector('sky-ui-button[data-qa-id="btn-send-as-hw"] > button').click();
        }
    }
}

const copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};