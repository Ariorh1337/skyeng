function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement('a'),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

let scr = document.createElement('script')
document.head.append(scr)
scr.innerHTML = download.toString();


setTimeout(() => {
    let btn = document.createElement('span');
    document.querySelector('body > header > form').append(btn);
    btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" style="margin: -2px 1px;"><path d="M12,3C7.58,3 4,4.79 4,7C4,9.21 7.58,11 12,11C16.42,11 20,9.21 20,7C20,4.79 16.42,3 12,3M4,9V12C4,14.21 7.58,16 12,16C16.42,16 20,14.21 20,12V9C20,11.21 16.42,13 12,13C7.58,13 4,11.21 4,9M4,14V17C4,19.21 7.58,21 12,21C16.42,21 20,19.21 20,17V14C20,16.21 16.42,18 12,18C7.58,18 4,16.21 4,14Z"></path></svg>';
    btn.setAttribute('onclick', `fetch('https://qie.glitch.me/search').then(response => response.text()).then(text => download(text,'test.txt','text/plain')); alert('Подожди не много, щас начнется загрузка. Ок?')`);
    btn.setAttribute('class','main button');
}, 1000)