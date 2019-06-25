chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.name === "ariorh") {
			sendResponse({answer: "done"});
			new_request(request);
		} else {
			sendResponse({answer: "tell me my name"});
		};
	}
);

function new_request(data1) {
	if (data1.type == 'enter') {
		chrome.storage.local.get('watching', function(result){
			var temp = result.watching
			temp.push(data1.data)
			chrome.storage.local.set({'watching' : temp});
		});
	} else if (data1.type == 'event') {
		chrome.storage.local.get('event', function(result){
			var temp = result.event
			temp.push(data1.data)
			chrome.storage.local.set({'event' : temp});
		});
	} else if (data1.type == 'assign') {
		chrome.storage.local.get('assign', function(result){
			var find = false;
			var temp = result.assign;
			for (var i = 0; i < temp.length; i++) {
				if (temp[i].ticket == data1.data.ticket) {
					find = true
				}
			};
			if (find == false) {
				temp.push(data1.data);
				chrome.storage.local.set({'assign' : temp});
			};
		});
	} else if (data1.type == 'handover') {
		chrome.storage.local.get('assign', function(result){
			var find = null;
			var temp = result.assign;
			for (var i = 0; i < temp.length; i++) {
				if (temp[i].ticket == data1.data.ticket) {
					find = i;
				}
			}
			if (find !== null) {
				temp.splice(find,1);
				chrome.storage.local.set({'assign' : temp});
			};
		});
		chrome.storage.local.get('handover', function(result){
			var find = false;
			var temp = result.handover;
			for (var i = 0; i < temp.length; i++) {
				if (temp[i].ticket == data1.data.ticket) {
					find = true
				}
			};
			if (find == false) {
				temp.push(data1.data);
				chrome.storage.local.set({'handover' : temp});
			};
		});
	}
}