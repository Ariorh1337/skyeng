function input_label () {
    let menu = document.querySelector('.footer-toolbar-inner > div[class=fl-right]');
    let inpt = document.createElement('input');
    menu.append(inpt);
    inpt.style = "width: 90px; margin-right: 20px; margin-top: 4px; color: black;"
    inpt.classList = 'js_omni_redactor_container';
    inpt.onblur = function () {
        let text = this.value;
        localStorage.setItem('label', text);
        all_labels_list.forEach( function (a) {
            if (a.text == text) {AddLabels(a.id.slice(2))}
        })
        document.getElementsByClassName('case_update_button')[0].removeAttribute('disabled');
    }
    if (localStorage.getItem('label') !== null) {inpt.value = localStorage.getItem('label');}
}

chrome.storage.local.get(['ticket_input_label'], function(result) {
    if (result['ticket_input_label'] === undefined) { chrome.storage.local.set({ticket_input_label: false}, function() {}); }
    if (result['ticket_input_label'] === true) {
        var script = document.createElement("script");
        script.setAttribute("type", "text/javascript");
        script.innerHTML = '(' + input_label.toString() + ')();';
        document.getElementsByTagName("head")[0].appendChild(script);
    }
});