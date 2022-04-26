chrome.storage.local.get(['slack-redirect'], function(result) {
    console.log(result);
    if(result['slack-redirect']){
        console.log('запуск');
        let pathLink = window.location.pathname;
        let threadLink = pathLink.split('/');
        console.log(threadLink);
        let threadValue = threadLink[3];
        console.log(threadValue);
        let chanel = threadLink[2];
        let thread_ts = window.location.search.split('=').join('&').split('&')[1];
        console.log(thread_ts);
        let newthreadValue = threadValue.replace(/[^+\d]/g, '');
        console.log(newthreadValue);
        newthreadValue = newthreadValue.split('');
        console.log(newthreadValue);

        let count = newthreadValue.length - 6
        newthreadValue.splice(count, 0, '.');
        console.log(newthreadValue);
        newthreadValue = newthreadValue.join('');
        console.log(newthreadValue);
        
        if(window.location.search == ""){
            let hrefLink = `https://app.slack.com/client/T03A3SUFB/${chanel}/thread/${chanel}-${newthreadValue}`;
            console.log(hrefLink);
            document.location.href = hrefLink;
        }else{
            let hrefLink = `https://skyeng.slack.com/messages/${chanel}/${threadValue}?thread_ts=${thread_ts}`;
            console.log(hrefLink);
            document.location.href = hrefLink;
        }

    }{
        console.log('нет прав');
    }
  });
