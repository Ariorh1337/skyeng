chrome.storage.local.get(['ticket_dark_css'], function(result) {
    if (result['ticket_dark_css'] === undefined) { chrome.storage.local.set({ticket_dark_css: false}, function() {}); }
    if (result['ticket_dark_css'] === true) {
        var fix_css = `.text-area div * {
            all: unset !important;
            color: white !important;
        }`; //Правим фон текста в сообщениях
        
        fix_css += `
        .added-note-area .request-user-avatar i,.added-note-area .atached-items *, .added-note-area .merged-msg * {
            color: #ffffff !important;
        }`; //Белая собачка в заметках
        
        fix_css += `
        .added-note-area div {
            background: #6a511a !important;
            color: #fff !important;
        }`; //Сделал темнее оранжевые заметки + белый текст
        
        fix_css += `
        .added-note-area .request-top-info, .added-note-area .request-top-info .request-info-right .request-date-time {
            color: #d1931e !important;
        }`; //Цвет времени и имени заметок
        
        fix_css += `
        .added-answer-area > .request-top-info, .added-answer-area > .text-area-box, .added-answer-area > .atached-items, .added-answer-area > .merged-msg {
            background: #334667;
        }`; //Синее поле ответа
        
        fix_css += `
        .added-answer-area .request-top-info, .added-answer-area .request-top-info .request-info-right .request-date-time {
            color: #8abbff;
        }`; //Цвет времени ответа

        fix_css += `
        .text-area a,.atached-items .atach-it * a {
                color: #04adff !important;
        }`; //Цвет ссылок в заметках и сообщениях
                
        var elm_css = document.createElement('style');
        document.head.append(elm_css);
        elm_css.innerHTML = fix_css;
    }
});