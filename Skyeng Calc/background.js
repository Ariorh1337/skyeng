if (localStorage.getItem ('start') == null | localStorage.getItem ('start') == 'null') {
	localStorage.setItem ('start', true);
	localStorage.setItem ('start2', true);
	var qwe = [];
	chrome.storage.local.set({'watching' : qwe});
	chrome.storage.local.set({'assign' : qwe});
	chrome.storage.local.set({'handover' : qwe});	
	chrome.storage.local.set({'event' : qwe});
	chrome.storage.local.set({'chat_event' : qwe});
	chrome.storage.local.set({'chat_assign' : qwe});
} else if (localStorage.getItem ('start2') == null | localStorage.getItem ('start2') == 'null') {
	localStorage.setItem ('start2', true);
	chrome.storage.local.set({'chat_event' : qwe});
	chrome.storage.local.set({'chat_assign' : qwe});
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.name === "ticket_calc") {
		new_request( request );
		sendResponse({ answer: 200 });
	} else {
		sendResponse({ answer: 400 });
	};
});

async function new_request(request) {
	if (request.type == 'enter' || request.type == 'event' || request.type == 'chat_event') {
		(request.type == 'enter') ? request.type = 'watching' : false;
		storage_ask(request['type']).then((data) => {
			data.push(request.data);
			let responce = {};
			responce[request['type']] = data;
			chrome.storage.local.set(responce);
		});
	} else if (request.type == 'assign') {
		remove_and_replace(request ,  'handover', 'assign');
	} else if (request.type == 'handover') {
		remove_and_replace(request ,  'assign', 'handover');
	} else if (request.type == 'chat_assign') {
		storage_ask(request[type]).then((data) => {
            let find = false;
            for (var i = 0; i < data.length; i++) {
                (data[i].ticket == data1.data.ticket) ? find = true : false;
            };
            if (find == false) {
                data.push(data1.data);
                chrome.storage.local.set({[to] : data});
            };	
        });
	}
}

function storage_ask(type) {
	var store = new Promise((resolve) => {
		chrome.storage.local.get(type, function(result){
			resolve(result[type]);
		});
	});
	return store;
}

function remove_and_replace(data1 ,  from, to) {
    storage_ask(from).then((data_0) => {
        storage_ask(to).then((data_1) => {
            let time = null;
            for (var i = 0; i < data_0.length; i++) {
                if (data_0[i].ticket == data1.data.ticket) {
                    time = data_0[i].time;
                    data_0.splice(i,1);
                    chrome.storage.local.set({[from] : data_0});
                    break;
                }
            };
            let find = false;
            for (var i = 0; i < data_1.length; i++) {
                (data_1[i].ticket == data1.data.ticket) ? find = true : false;
            };
            if (find == false) {
                if (time !== null) { data1.data.time = time; };
                data_1.push(data1.data);
                chrome.storage.local.set({[to] : data_1});
            };	
        });
    });
}

/* 
'watching' - [{ time: {"year": 2019, "month": 9, "day": 1, "hours": 14, "minutes": 0, "seconds": 42, "week": 2}},{...}]
'event' - [{ time: {"year": 2019, "month": 9, "day": 1, "hours": 14, "minutes": 0, "seconds": 42, "week": 2}},{...}]
'assign' - [{ "prior": "Низкий", "ticket": "547-692841", time: {"year": 2019, "month": 9, "day": 1, "hours": 14, "minutes": 0, "seconds": 42, "week": 2}},{...}]
'handover' - [{ "prior": "Низкий", "ticket": "547-692841", time: {"year": 2019, "month": 9, "day": 1, "hours": 14, "minutes": 0, "seconds": 42, "week": 2}},{...}]
'chat_event' - [{ time: {"year": 2019, "month": 9, "day": 1, "hours": 14, "minutes": 0, "seconds": 42, "week": 2}},{...}]
'chat_assign' - [{ "prior": "Низкий", "ticket": "547-692841", time: {"year": 2019, "month": 9, "day": 1, "hours": 14, "minutes": 0, "seconds": 42, "week": 2}},{...}]
*/