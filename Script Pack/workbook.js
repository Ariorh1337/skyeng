document.body.onclick = function(e) {
    if (!e.altKey) return;
    var steps = document.querySelectorAll('div[class="steps"] > div')

    for (var i = 0; i < steps.length; i++) {
        steps[i].click()
        document.querySelector('sky-ui-button[data-qa-id="btn-send-as-hw"] > button').click()
    }
}