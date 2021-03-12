(function styleSave() { 
    window.css = document.querySelector('#fast-style').innerHTML;
})()

function turnToDefault() {
    document.querySelector('#data-body').innerHTML = '<tr><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>';
    window.lesson = {
        hash: [],
        roomID: [],
        videoServer: [],
        users: []
    };
    document.querySelector('#fast-style').innerHTML = window.css;
}

