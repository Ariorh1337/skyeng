const startBtn = document.querySelector('#start-open');

startBtn.addEventListener("click", function () {
    turnToDefault();

    //Дата
    let date = document.querySelector('#lesson-date');
    if (date) date = date.value;

    if (!date || date === '') {
        
    }


    //Время
    let time = document.querySelector('#lesson-time');
    if (time) time = time.value;

    if (!time || time === '') {
        alert('Не правильное время урока');
        return false;
    }


    //ID пользователей
    let userID1 = document.querySelector('#userID-first');
    let userID2 = document.querySelector('#userID-second');

    if (userID1) userID1 = userID1.value;
    if (userID2) userID2 = userID2.value;

    if ((!userID1 && !userID2) || (userID1 === '' && userID2 === '') || (!userID1 && userID2 === '') || (userID1 === '' && !userID2)) {
        alert('Нужен хотя бы один ID пользователя');
        return false;
    }

    getKibanaLogByIDs('userId', [userID1, userID2], `${date} ${time}`).then(data => {
        const events = data.responses[0].hits.hits;

        if (events.length === 0) {
            alert('Пусто :(');
            return false;
        }

        events.forEach((event, index) => {
            const source = event._source;
            const userID = source.userId;
            const time = new Date(source.browserTimestamp).toLocaleTimeString('ru-RU');
            const lessonHash = source.appSessionId;
            const lessonRoomID = source.roomId;


            if (!window.lesson.users.includes(userID)) window.lesson.users.push(userID);
            if (!window.lesson.hash.includes(lessonHash)) window.lesson.hash.push(lessonHash);
            if (!window.lesson.roomID.includes(lessonRoomID)) window.lesson.roomID.push(lessonRoomID);


            let eventType = null;

            if (source.event === 'tech-summary-minute') eventType = 'tech-summary';
            else if (source.details.event && source.details.event.type === 'webRTCStateUp') eventType = 'server-initiate';
            else if (source.event === 'videoRoomEvent' && source.details.source === 'publisher') eventType = 'room-event-log';

            let data;
            if (eventType === 'room-event-log') data = beautyRoomEvenLog(source);
            if (eventType === 'server-initiate') data = beautyServerInit(source);
            if (eventType === 'tech-summary') data = beautyTechSummary(source);

            if (data) {    
                tableDraw([
                    time,
                    userID,
                    ...data
                ]);
            }
        });
    }).then(() => {
        if (window.lesson.users.length > 1) {
            document.querySelector('#fast-style').innerHTML += `
            tbody > tr[name="${window.lesson.users[1]}"] {
                background-color: bisque;
            }
            `;
        }
    })
});



function beautyTechSummary(data) {
    let result = Array(), stat = false, comment1 = '-', comment2 = '-';
    let audio = {
        receivedP: 0,
        lostP: 0
    }
    let video = {
        receivedP: 0,
        lostP: 0,
        receivedF: 0,
        lostF: 0
    }

    try {
        let stats = data.details.summary.lastWebrtcReport.receiver.stats;
        audio.receivedP = stats.audio.packetsReceived
        audio.lostP = stats.audio.packetsLost
        
        video.receivedF = stats.video.framesReceived
        video.lostF = stats.video.framesDropped
    
        video.receivedP = stats.video.packetsReceived
        video.lostP = stats.video.packetsLost

        stat = true;
    } catch (err) {
        
    }

    if (stat) {
        comment1 = `audio: get  ${audio.receivedP} / lost  ${audio.lostP}`
        comment2 = `video: get  ${video.receivedP} / lost  ${video.lostP}`
    }

    return ['-->', comment1, comment2, '-'];
}

function beautyServerInit(data) {
    const comment = 'Подключение к видео серверу';
    const server = data.event.match(/janus.(.*?).webRTCStateUp/)[1];

    if (!window.lesson.videoServer.includes(server)) window.lesson.videoServer.push(server);

    return [comment, server, '-', '-'];
}

function beautyRoomEvenLog(data) {
    let description, comment = '-', eventName, result = new Array();

    if (data.description === '' && !data.details.pluginEvent.name) return null;


    if (data.description !== '') description = data.description;
    if (data.details.pluginEvent.name) eventName = data.details.pluginEvent.name;




    if (description === 'send offer: with audio; with video') {
        const video = data.details.pluginEvent.jsep.sdp.match(/m=video/);
        const audio = data.details.pluginEvent.jsep.sdp.match(/m=audio/);

        if (video && audio) comment = 'Запрос с Видео и Аудио';
        if (!video && audio) comment = 'Запрос только с Аудио';
        if (video && !audio) comment = 'Запрос только с Видео';
    }

    if (description === 'receive answer. Codecs: opus; vp9') {
        const video = data.details.pluginEvent.jsep.sdp.match(/m=video/);
        const audio = data.details.pluginEvent.jsep.sdp.match(/m=audio/);

        if (video && audio) comment = 'Ответ с Видео и Аудио';
        if (!video && audio) comment = 'Ответ только с Аудио';
        if (video && !audio) comment = 'Ответ только с Видео';
    }

    if (description === 'ice state checking') comment = 'Ждем ice state checking connected';

    if (description === 'webrtcState up') comment = 'Ждем mediaState audio up';
    if (description === 'mediaState audio up') comment = 'Ждем mediaState video up';

    if (eventName === 'muteVideo') comment = 'Выкл Камеру';
    if (eventName === 'muteAudio') comment = 'Выкл Микрофон';
    if (eventName === 'unmuteVideo') comment = 'Вкл Камеру';
    if (eventName === 'unmuteAudio') comment = 'Вкл Микрофон';

    if (eventName === 'detach') comment = 'Запрос на выход';
    if (description === 'detached') comment = 'Вышел';
    
        
        
        

    result.push(comment);
    if (description) result.push(description);
    if (eventName) result.push(eventName);
    

    return [...result, '-', '-', '-', '-'];
}

function tableDraw(arr) {
    const table = document.querySelector('#data-body');
    table.innerHTML += `<tr name="${(arr[1]) ? arr[1] : '-'}"><td>${(arr[0]) ? arr[0] : '-'}</td><td>${(arr[1]) ? arr[1] : '-'}</td><td>${(arr[2]) ? arr[2] : '-'}</td><td>${(arr[3]) ? arr[3] : '-'}</td><td>${(arr[4]) ? arr[4] : '-'}</td><td>${(arr[5]) ? arr[5] : '-'}</td></tr>`;
}



