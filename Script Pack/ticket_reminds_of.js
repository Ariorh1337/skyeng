window.onload = function () {
    if (document.getElementsByClassName('info_header').length !== 0) {
        var id = document.querySelectorAll('label > input[class="form-custom-field"]')[0].value.replace(/[^0-9]/g, "");
        if (id !== '') {
            var asd = document.createElement('div');
            document.getElementById('info_user_info_panel').insertBefore(asd, document.getElementsByClassName('info_header')[1]);
            asd.outerHTML = '<div class="info_header"><p>упоминания Teacher</p><a href="/staff/cases/search/?search=' + id + '" target="_blank">открыть</a></div>'
        }

        var id = document.querySelectorAll('label > input[class="form-custom-field"]')[1].value.replace(/[^0-9]/g, "");
        if (id !== '') {
            var asd = document.createElement('div');
            document.getElementById('info_user_info_panel').insertBefore(asd, document.getElementsByClassName('info_header')[1]);
            asd.outerHTML = '<div class="info_header"><p>упоминания Student</p><a href="/staff/cases/search/?search=' + id + '" target="_blank">открыть</a></div>'
        }
    }
}