if (localStorage.getItem ('start') == null | localStorage.getItem ('start') == 'null') {
	localStorage.setItem ('start', true);
	var qwe = [];
	chrome.storage.local.set({'watching' : qwe});
	chrome.storage.local.set({'assign' : qwe});
	chrome.storage.local.set({'handover' : qwe});	
	chrome.storage.local.set({'event' : qwe});
}

Date.daysBetween = function( date1 ) {
	var date3 = new Date()
	var date2 = new Date(date3.getFullYear(), date3.getMonth(), date3.getDate())
 	//Get 1 day in milliseconds
	var one_day=1000*60*60*24

	// Convert both dates to milliseconds
	var date1_ms = date1.getTime();
	var date2_ms = date2.getTime();

	// Calculate the difference in milliseconds
	var difference_ms = date2_ms - date1_ms;

	// Convert back to days and return
	return Math.round(difference_ms/one_day);
}

Date.daysWeek = function( date1 ) {
	var date3 = new Date()
	if (date3.getDay() !== 0) {
		var date2 = new Date(date3.getFullYear(), date3.getMonth(), date3.getDate() + (7 - date3.getDay()))
    } else {
		var date2 = new Date(date3.getFullYear(), date3.getMonth(), date3.getDate())
    }
 	//Get 1 day in milliseconds
	var one_day=1000*60*60*24

	// Convert both dates to milliseconds
	var date1_ms = date1.getTime();
	var date2_ms = date2.getTime();

	// Calculate the difference in milliseconds
	var difference_ms = date2_ms - date1_ms;

	// Convert back to days and return
	return Math.round(difference_ms/one_day);
}

chrome.storage.local.get('event', function(result){
	var days = 0, weeks = 0, months = 0;
	for (var i = 0; i < result.event.length; i++) {
		var res = result.event[i].time
		var dat = new Date(res.year,res.month,res.day)
		if (Date.daysBetween(dat) < 1) {
			days += 1;
        }
		if (Date.daysWeek(dat) < 7) {
			weeks += 1;
        }
		var now = new Date()
		if (now.getMonth() == res.month) {
			months += 1;
		}
    }

	document.getElementById("actions").innerText = days;
	document.getElementById("actions2").innerText = weeks;
	document.getElementById("actions3").innerText = months;
});

chrome.storage.local.get('watching', function(result){
	var days = 0, weeks = 0, months = 0;
	for (var i = 0; i < result.watching.length; i++) {
		var res = result.watching[i].time
		var dat = new Date(res.year,res.month,res.day)
		if (Date.daysBetween(dat) < 1) {
			days += 1;
        }
		if (Date.daysWeek(dat) < 7) {
			weeks += 1;
        }
		var now = new Date()
		if (now.getMonth() == res.month) {
			months += 1;
		}
    }

	document.getElementById("looked").innerText = days;
	document.getElementById("looked2").innerText = weeks;
	document.getElementById("looked3").innerText = months;
});

chrome.storage.local.get('assign', function(result){
	var days = 0, weeks = 0, months = 0, Dhigh = 0, Dcrit = 0, Whigh = 0, Wcrit = 0, Mhigh = 0, Mcrit = 0;
	for (var i = 0; i < result.assign.length; i++) {
		var res = result.assign[i].time
		var prior = result.assign[i].prior
		var dat = new Date(res.year,res.month,res.day)
		if (Date.daysBetween(dat) < 1) {
			days += 1;
			if (prior == 'Высокий') { Dhigh += 1; };
			if (prior == 'Критический') { Dcrit += 1; };
    }
		if (Date.daysWeek(dat) < 7) {
			weeks += 1;
			if (prior == 'Высокий') { Whigh += 1; };
			if (prior == 'Критический') { Wcrit += 1; };
    }
		var now = new Date()
		if (now.getMonth() == res.month) {
			months += 1;
			if (prior == 'Высокий') { Mhigh += 1; };
			if (prior == 'Критический') { Mcrit += 1; };
		}
  }

	document.getElementById("first").innerText = days;
	localStorage.setItem ('first', days);
	document.getElementById("first2").innerText = weeks;
	localStorage.setItem ('first2', weeks);
	document.getElementById("first3").innerText = months;
	localStorage.setItem ('first3', months);
	document.getElementById("total_crit").innerText = Dcrit;
	document.getElementById("total_high").innerText = Dhigh;
	document.getElementById("total_crit2").innerText = Wcrit;
	document.getElementById("total_high2").innerText = Whigh;
	document.getElementById("total_crit3").innerText = Mcrit;
	document.getElementById("total_high3").innerText = Mhigh;
});

chrome.storage.local.get('handover', function(result){
	var days = 0, weeks = 0, months = 0;
	for (var i = 0; i < result.handover.length; i++) {
		var res = result.handover[i].time
		var dat = new Date(res.year,res.month,res.day)
		if (Date.daysBetween(dat) < 1) {
			days += 1;
        }
		if (Date.daysWeek(dat) < 7) {
			weeks += 1;
        }
		var now = new Date()
		if (now.getMonth() == res.month) {
			months += 1;
		}
  }

	document.getElementById("second").innerText = days;
	localStorage.setItem ('second', days);
	document.getElementById("second2").innerText = weeks;
	localStorage.setItem ('second2', weeks);
	document.getElementById("second3").innerText = months;
	localStorage.setItem ('second3', months);
});

function count_total() {
	if (localStorage['first'] !== 0) {
		if (localStorage['second'] !== 0) {
			document.getElementById("total").innerText = Number(localStorage['first']) + Number(localStorage['second'])
		} else {
			document.getElementById("total").innerText = localStorage['first'];
		}
	} else {
		if (localStorage['second'] !== 0) {
			document.getElementById("total").innerText = localStorage['second'];
		} else {
			document.getElementById("total").innerText = 0;
		}
	}
	if (localStorage['first2'] !== 0) {
		if (localStorage['second2'] !== 0) {
			document.getElementById("total2").innerText = Number(localStorage['first2']) + Number(localStorage['second2'])
		} else {
			document.getElementById("total2").innerText = localStorage['first2'];
		}
	} else {
		if (localStorage['second2'] !== 0) {
			document.getElementById("total2").innerText = localStorage['second2'];
		} else {
			document.getElementById("total2").innerText = 0;
		}
	}
	if (localStorage['first3'] !== 0) {
		if (localStorage['second3'] !== 0) {
			document.getElementById("total3").innerText = Number(localStorage['first3']) + Number(localStorage['second3'])
		} else {
			document.getElementById("total3").innerText = localStorage['first3'];
		}
	} else {
		if (localStorage['second3'] !== 0) {
			document.getElementById("total3").innerText = localStorage['second3'];
		} else {
			document.getElementById("total3").innerText = 0;
		}
	}
}

setTimeout(count_total, 50);

window.onload = function(){
	var myticket = document.getElementById('left_1');
	myticket.addEventListener('click', function(){
		document.getElementById('block_1').setAttribute('style','display: none;');
		document.getElementById('block_3').setAttribute('style','');
	});

	var myticket2 = document.getElementById('right_1');
	myticket2.addEventListener('click', function(){
		document.getElementById('block_1').setAttribute('style','display: none;');
		document.getElementById('block_2').setAttribute('style','');
	});

	var myticket3 = document.getElementById('left_2');
	myticket3.addEventListener('click', function(){
		document.getElementById('block_2').setAttribute('style','display: none;');
		document.getElementById('block_1').setAttribute('style','');
	});

	var myticket4 = document.getElementById('right_2');
	myticket4.addEventListener('click', function(){
		document.getElementById('block_2').setAttribute('style','display: none;');
		document.getElementById('block_3').setAttribute('style','');
	});

	var myticket5 = document.getElementById('left_3');
	myticket5.addEventListener('click', function(){
		document.getElementById('block_3').setAttribute('style','display: none;');
		document.getElementById('block_2').setAttribute('style','');
	});

	var myticket6 = document.getElementById('right_3');
	myticket6.addEventListener('click', function(){
		document.getElementById('block_3').setAttribute('style','display: none;');
		document.getElementById('block_1').setAttribute('style','');
	});

	var myticket7 = document.getElementById('reset_button');
	myticket7.addEventListener('click', function(){
		var qwe = [];
		chrome.storage.local.set({'watching' : qwe});
		chrome.storage.local.set({'assign' : qwe});
		chrome.storage.local.set({'handover' : qwe});
		chrome.storage.local.set({'event' : qwe});
	});


	var dfg = document.getElementById('menu_left_1');
	var dfg2 = document.getElementById('menu_right_1');
	dfg.onclick = function () {
		set_history();
	}
	dfg2.onclick = function () {
		set_history();
	}

	var dfg3 = document.getElementById('menu_left_2');
	var dfg4 = document.getElementById('menu_right_2');
	dfg3.onclick = function () {
		rem_history();
	}
	dfg4.onclick = function () {
		rem_history();
	}

	var dfg5 = document.getElementById('hist1_right_1');
	dfg5.onclick = function () {
		document.getElementById('history_menu1').setAttribute('style','display: none');
		document.getElementById('history_menu2').setAttribute('style','');
		document.getElementById('hist1_today').setAttribute('style','display: none');
		document.getElementById('hist1_week').setAttribute('style','');
	};

	var dfg6 = document.getElementById('hist1_left_1');
	dfg6.onclick = function () {
		document.getElementById('history_menu1').setAttribute('style','display: none');
		document.getElementById('history_menu3').setAttribute('style','');
		document.getElementById('hist1_today').setAttribute('style','display: none');
		document.getElementById('hist1_month').setAttribute('style','');
	};

	var dfg7 = document.getElementById('hist1_right_2');
	dfg7.onclick = function () {
		document.getElementById('history_menu2').setAttribute('style','display: none');
		document.getElementById('history_menu3').setAttribute('style','');
		document.getElementById('hist1_week').setAttribute('style','display: none');
		document.getElementById('hist1_month').setAttribute('style','');
	};

	var dfg8 = document.getElementById('hist1_left_2');
	dfg8.onclick = function () {
		document.getElementById('history_menu2').setAttribute('style','display: none');
		document.getElementById('history_menu1').setAttribute('style','');
		document.getElementById('hist1_week').setAttribute('style','display: none');
		document.getElementById('hist1_today').setAttribute('style','');
	};

	var dfg9 = document.getElementById('hist1_right_3');
	dfg9.onclick = function () {
		document.getElementById('history_menu3').setAttribute('style','display: none');
		document.getElementById('history_menu1').setAttribute('style','');
		document.getElementById('hist1_month').setAttribute('style','display: none');
		document.getElementById('hist1_today').setAttribute('style','');
	};

	var dfg10 = document.getElementById('hist1_left_3');
	dfg10.onclick = function () {
		document.getElementById('history_menu3').setAttribute('style','display: none');
		document.getElementById('history_menu2').setAttribute('style','');
		document.getElementById('hist1_month').setAttribute('style','display: none');
		document.getElementById('hist1_week').setAttribute('style','');
	};

	var dfg11 = document.getElementById('hist2_right_1');
	dfg11.onclick = function () {
		document.getElementById('history_menu4').setAttribute('style','display: none');
		document.getElementById('history_menu5').setAttribute('style','');
		document.getElementById('hist2_today').setAttribute('style','display: none');
		document.getElementById('hist2_week').setAttribute('style','');
	};

	var dfg12 = document.getElementById('hist2_left_1');
	dfg12.onclick = function () {
		document.getElementById('history_menu4').setAttribute('style','display: none');
		document.getElementById('history_menu6').setAttribute('style','');
		document.getElementById('hist2_today').setAttribute('style','display: none');
		document.getElementById('hist2_month').setAttribute('style','');
	};

	var dfg13 = document.getElementById('hist2_right_2');
	dfg13.onclick = function () {
		document.getElementById('history_menu5').setAttribute('style','display: none');
		document.getElementById('history_menu6').setAttribute('style','');
		document.getElementById('hist2_week').setAttribute('style','display: none');
		document.getElementById('hist2_month').setAttribute('style','');
	};

	var dfg14 = document.getElementById('hist2_left_2');
	dfg14.onclick = function () {
		document.getElementById('history_menu5').setAttribute('style','display: none');
		document.getElementById('history_menu4').setAttribute('style','');
		document.getElementById('hist2_week').setAttribute('style','display: none');
		document.getElementById('hist2_today').setAttribute('style','');
	};

	var dfg15 = document.getElementById('hist2_right_3');
	dfg15.onclick = function () {
		document.getElementById('history_menu6').setAttribute('style','display: none');
		document.getElementById('history_menu4').setAttribute('style','');
		document.getElementById('hist2_month').setAttribute('style','display: none');
		document.getElementById('hist2_today').setAttribute('style','');
	};

	var dfg16 = document.getElementById('hist2_left_3');
	dfg16.onclick = function () {
		document.getElementById('history_menu6').setAttribute('style','display: none');
		document.getElementById('history_menu5').setAttribute('style','');
		document.getElementById('hist2_month').setAttribute('style','display: none');
		document.getElementById('hist2_week').setAttribute('style','');
	};

	var dfg17 = document.getElementById('hist0_right_1');
	dfg17.onclick = function () {
		document.getElementById('history_menu0').setAttribute('style','display: none');
			document.getElementById('history_menu1').setAttribute('style','display: none');
			document.getElementById('history_menu2').setAttribute('style','display: none');
			document.getElementById('history_menu3').setAttribute('style','display: none');
			document.getElementById('history_menu4').setAttribute('style','');
		document.getElementById('history_menu00').setAttribute('style','');
			document.getElementById('hist1_today').setAttribute('style','display: none');
			document.getElementById('hist1_week').setAttribute('style','display: none');
			document.getElementById('hist1_month').setAttribute('style','display: none');
			document.getElementById('hist2_today').setAttribute('style','');
	};

	var dfg18 = document.getElementById('hist0_left_1');
	dfg18.onclick = function () {
		document.getElementById('history_menu0').setAttribute('style','display: none');
			document.getElementById('history_menu1').setAttribute('style','display: none');
			document.getElementById('history_menu2').setAttribute('style','display: none');
			document.getElementById('history_menu3').setAttribute('style','display: none');
			document.getElementById('history_menu4').setAttribute('style','');
		document.getElementById('history_menu00').setAttribute('style','');
			document.getElementById('hist1_today').setAttribute('style','display: none');
			document.getElementById('hist1_week').setAttribute('style','display: none');
			document.getElementById('hist1_month').setAttribute('style','display: none');
			document.getElementById('hist2_today').setAttribute('style','');
	};

	var dfg19 = document.getElementById('hist0_right_2');
	dfg19.onclick = function () {
			document.getElementById('history_menu1').setAttribute('style','');
			document.getElementById('history_menu4').setAttribute('style','display: none');
			document.getElementById('history_menu5').setAttribute('style','display: none');
			document.getElementById('history_menu6').setAttribute('style','display: none');
		document.getElementById('history_menu00').setAttribute('style','display: none');
		document.getElementById('history_menu0').setAttribute('style','');
			document.getElementById('hist2_today').setAttribute('style','display: none');
			document.getElementById('hist2_week').setAttribute('style','display: none');
			document.getElementById('hist2_month').setAttribute('style','display: none');
			document.getElementById('hist1_today').setAttribute('style','');
	};

	var dfg20 = document.getElementById('hist0_left_2');
	dfg20.onclick = function () {
			document.getElementById('history_menu1').setAttribute('style','');
			document.getElementById('history_menu4').setAttribute('style','display: none');
			document.getElementById('history_menu5').setAttribute('style','display: none');
			document.getElementById('history_menu6').setAttribute('style','display: none');
		document.getElementById('history_menu00').setAttribute('style','display: none');
		document.getElementById('history_menu0').setAttribute('style','');
			document.getElementById('hist2_today').setAttribute('style','display: none');
			document.getElementById('hist2_week').setAttribute('style','display: none');
			document.getElementById('hist2_month').setAttribute('style','display: none');
			document.getElementById('hist1_today').setAttribute('style','');
	};
};



function set_history () {
	document.getElementsByClassName('container')[0].setAttribute('style','min-width: 170px;');
	document.getElementById('menu_1').setAttribute('style','display: none;');
	document.getElementById('block_1').setAttribute('style','display: none;');
	document.getElementById('block_2').setAttribute('style','display: none;');
	document.getElementById('block_3').setAttribute('style','display: none;');
	document.getElementById('reset_button').setAttribute('style','display: none;');
	document.getElementById('menu_2').removeAttribute('style');
	document.getElementById('history').setAttribute('style','width: 180;');
	document.getElementById('hist1_today').removeAttribute('style');

	var asd = document.getElementById("history_table");
	chrome.storage.local.get('assign', function(result){
		var days = 0, weeks = 0, months = 0, Dhigh = 0, Dcrit = 0, Whigh = 0, Wcrit = 0, Mhigh = 0, Mcrit = 0;
		var hist1_today = '', hist1_week = '', hist1_month = '';
		for (var i = 0; i < result.assign.length; i++) {
			var res = result.assign[i].time;
			var qwe = Number(res.month) + 1;
			var dat = new Date(res.year,res.month,res.day);
			if (Date.daysBetween(dat) < 1) {
				hist1_today = hist1_today + '<tr><td><a href="https://help.skyeng.ru/staff/cases/record/' + result.assign[i].ticket + '/">' + result.assign[i].ticket + '</a></td><td>' + res.hours + ':' + res.minutes + ' ' + res.day + '/' + qwe + '</td><td class="delete">X</td></tr>';
			};
			if (Date.daysWeek(dat) < 7) {
				hist1_week = hist1_week + '<tr><td><a href="https://help.skyeng.ru/staff/cases/record/' + result.assign[i].ticket + '/">' + result.assign[i].ticket + '</a></td><td>' + res.hours + ':' + res.minutes + ' ' + res.day + '/' + qwe + '</td><td class="delete">X</td></tr>';
			}
			var now = new Date()
			if (now.getMonth() == res.month) {
				hist1_month = hist1_month + '<tr><td><a href="https://help.skyeng.ru/staff/cases/record/' + result.assign[i].ticket + '/">' + result.assign[i].ticket + '</a></td><td>' + res.hours + ':' + res.minutes + ' ' + res.day + '/' + qwe + '</td><td class="delete">X</td></tr>';
			}
		};
		asd.children[0].innerHTML = hist1_today;
		asd.children[1].innerHTML = hist1_week;
		asd.children[2].innerHTML = hist1_month;
	});

	chrome.storage.local.get('handover', function(result){
		var days = 0, weeks = 0, months = 0, Dhigh = 0, Dcrit = 0, Whigh = 0, Wcrit = 0, Mhigh = 0, Mcrit = 0;
		var hist1_today = '', hist1_week = '', hist1_month = '';
		for (var i = 0; i < result.handover.length; i++) {
			var res = result.handover[i].time;
			var qwe = Number(res.month) + 1;
			var dat = new Date(res.year,res.month,res.day);
			if (Date.daysBetween(dat) < 1) {
				hist1_today = hist1_today + '<tr><td><a href="https://help.skyeng.ru/staff/cases/record/' + result.handover[i].ticket + '/">' + result.handover[i].ticket + '</a></td><td>' + res.hours + ':' + res.minutes + ' ' + res.day + '/' + qwe + '</td><td class="delete">X</td></tr>';
			};
			if (Date.daysWeek(dat) < 7) {
				hist1_week = hist1_week + '<tr><td><a href="https://help.skyeng.ru/staff/cases/record/' + result.handover[i].ticket + '/">' + result.handover[i].ticket + '</a></td><td>' + res.hours + ':' + res.minutes + ' ' + res.day + '/' + qwe + '</td><td class="delete">X</td></tr>';
			}
			var now = new Date()
			if (now.getMonth() == res.month) {
				hist1_month = hist1_month + '<tr><td><a href="https://help.skyeng.ru/staff/cases/record/' + result.handover[i].ticket + '/">' + result.handover[i].ticket + '</a></td><td>' + res.hours + ':' + res.minutes + ' ' + res.day + '/' + qwe + '</td><td class="delete">X</td></tr>';
			}
		};
		asd.children[3].innerHTML = hist1_today;
		asd.children[4].innerHTML = hist1_week;
		asd.children[5].innerHTML = hist1_month;

		var remove = document.getElementsByClassName('delete')
		for (var q = 0; q < remove.length; q++) {
			var rem = remove[q];
			rem.onclick = function () {
				this.parentElement.setAttribute('style','background-color:red;');
				var data1 = {data : {ticket: this.parentElement.children[0].innerText}}
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
			}
		}
	});
}

function rem_history () {
	document.getElementsByClassName('container')[0].removeAttribute('style');
	document.getElementById('menu_1').removeAttribute('style');
	document.getElementById('block_1').removeAttribute('style');
	document.getElementById('reset_button').removeAttribute('style');
	document.getElementById('menu_2').setAttribute('style','display: none;');
	document.getElementById('history').setAttribute('style','display: none;');

	var asd = document.getElementById("history_table");
	asd.children[0].innerHTML = '';
	asd.children[1].innerHTML = '';
	asd.children[2].innerHTML = '';
	asd.children[3].innerHTML = '';
	asd.children[4].innerHTML = '';
	asd.children[5].innerHTML = '';
}