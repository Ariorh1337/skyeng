//*://help.skyeng.ru/staff/cases/list/*
//*://skyeng.omnidesk.ru/staff/cases/list/*


function new_elm() {
	var list = document.getElementById('records_list_sorting_chosen').lastElementChild.lastElementChild.firstElementChild;
    var listElm1 = document.createElement('li');
    list.insertBefore(listElm1 , list.firstElementChild);
    listElm1.outerHTML = '<li class="active-result" style="" data-option-array-index="9">действию (старые в начале)</li>';
    var listElm2 = document.createElement('li');
    list.insertBefore(listElm2 , list.firstElementChild);
    listElm2.outerHTML = '<li class="active-result" style="" data-option-array-index="8">действию (новые в начале)</li>';
}

function new_elm2(a) {
	this.getElementsByClassName('result-selected')[0].classList.remove('result-selected');
	this.getElementsByClassName('highlighted')[0].classList.add('result-selected');
    document.getElementById('records_list_sorting_chosen').firstElementChild.firstElementChild.innerText = this.getElementsByClassName('result-selected')[0].innerText
    localStorage.setItem('filter2', this.getElementsByClassName('result-selected')[0].innerText);
    document.getElementById('records_list_sorting_chosen').classList = 'chosen-container chosen-container-single';
    
    var val = this.getElementsByClassName('result-selected')[0].attributes[2].value;
    if (val == '0') {
        localStorage.setItem('filter','0');
        xajax_ShowRecordsList(0, GetFilterOptions(), '', '', '', '', 'response_0', true, '{}');
    } else if (val == '1') {
        localStorage.setItem('filter','0');
        xajax_ShowRecordsList(0, GetFilterOptions(), '', '', '', '', 'response_1', true, '{}');
    } else if (val == '2') {
        localStorage.setItem('filter','0');
        xajax_ShowRecordsList(0, GetFilterOptions(), '', '', '', '', 'created_0', true, '{}');
    } else if (val == '3') {
        localStorage.setItem('filter','0');
        xajax_ShowRecordsList(0, GetFilterOptions(), '', '', '', '', 'created_1', true, '{}');
    } else if (val == '4') {
        localStorage.setItem('filter','0');
        xajax_ShowRecordsList(0, GetFilterOptions(), '', '', '', '', 'priority_0', true, '{}');
    } else if (val == '5') {
        localStorage.setItem('filter','0');
        xajax_ShowRecordsList(0, GetFilterOptions(), '', '', '', '', 'priority_1', true, '{}');
    } else if (val == '6') {
        localStorage.setItem('filter','0');
        xajax_ShowRecordsList(0, GetFilterOptions(), '', '', '', '', 'status_1', true, '{}');
    } else if (val == '7') {
        localStorage.setItem('filter','0');
        xajax_ShowRecordsList(0, GetFilterOptions(), '', '', '', '', 'status_0', true, '{}');
    } else if (val == '8') {
        localStorage.setItem('filter','1');
        xajax_ShowRecordsList(0, GetFilterOptions(), '', '', '', '', 'response_0', true, '{}');
    } else if (val == '9') {
        localStorage.setItem('filter','2');
        xajax_ShowRecordsList(0, GetFilterOptions(), '', '', '', '', 'response_1', true, '{}')
    }

    setTimeout(function() {
        document.getElementById('records_list_sorting_chosen').firstElementChild.firstElementChild.innerText = localStorage.getItem('filter2')
    }, 5000);
}

function my_own_sort(sortV) {
    //var sortV = '>';
    var menu = document.querySelectorAll('.req-data-row > div[class="req-case-date"]')

    for (var a = 0; a < menu.length; a++) {
		menu = document.querySelectorAll('.req-data-row > div[class="req-case-date"]')
    	var test = ['']
    	for (var q = 0; q < menu.length; q++) {
        	test[q] = [menu[q].innerText.replace(/(\r\n|\n|\r)/gm,"").slice(12, 29) , menu[q].parentElement];
    	}
		
        var date = test[a][0].split(',');
        var date1 = date[0].split(':');
        var date2 = date[1].split('.');
        var first = new Date(Number(date2[2]),Number(date2[1] - 1),Number(date2[0]),date1[0],date1[1]);

        for (var i = a + 1; i < test.length; i++) {
            var qdate = test[i][0].split(',');
            var qdate1 = qdate[0].split(':');
            var qdate2 = qdate[1].split('.');
            var next = new Date(Number(qdate2[2]),Number(qdate2[1] - 1),Number(qdate2[0]),Number(qdate1[0]),Number(qdate1[1]));

            var main = document.getElementsByClassName("req-main-cont")[0];
            if (sortV == '<'){
                if (first < next) {
                    main.insertBefore(test[i][1], test[a][1]);
					a = 0;
                };
            } else if (sortV = '>') {
                if (first > next) {
                    main.insertBefore(test[i][1], test[a][1]);
					a = 0;
                };
            } else {
                console.log('wrong parametr of sort')
            }
        }
    }
}

function check_for_sort () {
    if (localStorage.getItem('filter') == '1') {
        let menu = document.getElementById('records_list_sorting_chosen').firstElementChild.firstElementChild
        if ( menu.innerText !== 'действию (новые в начале)' ) {
            menu.innerText = 'действию (новые в начале)'
        }
        my_own_sort('<');
    } else if (localStorage.getItem('filter') == '2') {
        let menu = document.getElementById('records_list_sorting_chosen').firstElementChild.firstElementChild
        if ( menu.innerText !== 'действию (старые в начале)' ) {
            menu.innerText = 'действию (старые в начале)'
        }
        my_own_sort('>');
    }
}

function start_sort() {
    var list = document.getElementById('records_list_sorting_chosen').firstElementChild;
    list.addEventListener('click', new_elm, false);
    var list2 = document.getElementById('records_list_sorting_chosen').lastElementChild;
    list2.addEventListener('mousedown', new_elm2, false);
    setInterval(check_for_sort, 1000);
}

chrome.storage.local.get(['box_sort'], function(result) {
    if (result['box_sort'] === undefined) { chrome.storage.local.set({box_sort: true}, function() {}); }
    if (result['box_sort'] === true) {
        var script = document.createElement("script");
        script.setAttribute("type", "text/javascript");
        script.innerHTML = new_elm.toString();
        document.getElementsByTagName("head")[0].appendChild(script);

        var script = document.createElement("script");
        script.setAttribute("type", "text/javascript");
        script.innerHTML = new_elm2.toString();
        document.getElementsByTagName("head")[0].appendChild(script);

        var script = document.createElement("script");
        script.setAttribute("type", "text/javascript");
        script.innerHTML = my_own_sort.toString();
        document.getElementsByTagName("head")[0].appendChild(script);

        var script = document.createElement("script");
        script.setAttribute("type", "text/javascript");
        script.innerHTML = check_for_sort.toString();
        document.getElementsByTagName("head")[0].appendChild(script);

        var script = document.createElement("script");
        script.setAttribute("type", "text/javascript");
        script.innerHTML = '(' + start_sort.toString() + ')();';
        document.getElementsByTagName("head")[0].appendChild(script);
    }
});