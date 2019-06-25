window.onload = function () {
    document.querySelectorAll('input[name=Settings][type=checkbox]').forEach( function(elem) {
        var name = elem.id;
        chrome.storage.local.get(name, function(result) {elem.checked = result[name];});
        elem.onclick = function () {
            let name = elem.id, type = elem.checked, setting = new Object();
            setting[name] = type;
            chrome.storage.local.set(setting, function() {});
        };
    });
}