setInterval(() => {
    let search = (window.location.href.match(/persons\//) === null) ? true : false; //https://crm2.skyeng.ru/persons
    if (search) {
        let search_rows = document.querySelectorAll('div[class="item mat-ripple ng-star-inserted"]:not([onauxclick])');
        if (search_rows) {
            search_rows.forEach((row) => {
                row.setAttribute('onauxclick', "window.open(`https://crm2.skyeng.ru/persons/${this.querySelector('header').innerText.replace(/[a-zA-Z]/g, '')}`,'_blank');");
            });
        }
    }
}, 1000)