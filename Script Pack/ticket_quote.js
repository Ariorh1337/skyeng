//*://help.skyeng.ru/staff/cases/record/*
//*://skyeng.omnidesk.ru/staff/cases/record/*

function useful_tag () {
    if (document.getElementById('redactor-uuid-0') == null) {
        var test = document.getElementsByClassName('redactor-box')[0].children[2];
        test.setAttribute('id', 'redactor-uuid-0');
    }
	if (document.getElementById('redactor-uuid-0').innerText.indexOf('[фулл_мсг]') !== -1) {
		var msg = document.getElementById('redactor-uuid-0').innerHTML.split('[фулл_мсг]')
		document.getElementById('redactor-uuid-0').innerHTML = msg[0] + '<pre>' + full_msg() + '</pre>' + msg[1]
	};
}

function full_msg() {
	var doc = document.getElementsByClassName('text-area')[0].innerText.split('\n');
	for (var i = 0; i < doc.length; i++) {
		if ( doc[i].startsWith('Location:') == true) { delete doc[i]; doc.splice( i, 1); i = 0; continue;};
		if ( doc[i].startsWith('OS:') == true) { delete doc[i]; doc.splice( i, 1); i = 0; continue;};
		if ( doc[i].startsWith('Browser:') == true) { delete doc[i]; doc.splice( i, 1); i = 0; continue;};
		if ( doc[i].startsWith('Screen resolution:') == true) { delete doc[i]; doc.splice( i, 1); i = 0; continue;};
		if ( doc[i].startsWith('stepDescription:') == true) { delete doc[i]; doc.splice( i, 1); i = 0; continue;};
		if ( doc[i].startsWith('cmsEditUrl:') == true) { delete doc[i]; doc.splice( i, 1); i = 0; continue;};
		if ( doc[i].startsWith('User-Agent:') == true) { delete doc[i]; doc.splice( i, 1); i = 0; continue;};
		if ( doc[i].startsWith('Referrer:') == true) { delete doc[i]; doc.splice( i, 1); i = 0; continue;};
		if ( doc[i].startsWith('Reporter:') == true) { delete doc[i]; doc.splice( i, 1); i = 0; continue;};
		if ( doc[i].startsWith('Skype:') == true) { delete doc[i]; doc.splice( i, 1); i = 0; continue;};
		if ( doc[i].startsWith('E-mail:') == true) { delete doc[i]; doc.splice( i, 1); i = 0; continue;};
		if ( doc[i].startsWith('next_lesson_type:') == true) { delete doc[i]; doc.splice( i, 1); i = 0; continue;};
		if ( doc[i].startsWith('next_lesson_student:') == true) { delete doc[i]; doc.splice( i, 1); i = 0; continue;};
		if ( doc[i].startsWith('next_lesson_teacher:') == true) { delete doc[i]; doc.splice( i, 1); i = 0; continue;};
		if ( doc[i].startsWith('next_lesson_start_time:') == true) { delete doc[i]; doc.splice( i, 1); i = 0; continue;};
		if ( doc[i].startsWith('Frontend build:') == true) { delete doc[i]; doc.splice( i, 1); i = 0; continue;};
		if ( doc[i].startsWith('Device ID:') == true) { delete doc[i]; doc.splice( i, 1); i = 0; continue;};

		if ( doc[i].startsWith('reporter_role:') == true) { delete doc[i]; doc.splice( i, 1); i = 0; continue;};
		if ( doc[i].startsWith('student_id:') == true) { delete doc[i]; doc.splice( i, 1); i = 0; continue;};
		if ( doc[i].startsWith('student_name:') == true) { delete doc[i]; doc.splice( i, 1); i = 0; continue;};
		if ( doc[i].startsWith('student_phone:') == true) { delete doc[i]; doc.splice( i, 1); i = 0; continue;};
		if ( doc[i].startsWith('student_skype:') == true) { delete doc[i]; doc.splice( i, 1); i = 0; continue;};
		if ( doc[i].startsWith('student_email: ') == true) { delete doc[i]; doc.splice( i, 1); i = 0; continue;};
		if ( doc[i].startsWith('next_lesson_teach er:') == true) { delete doc[i]; doc.splice( i, 1); i = 0; continue;};
		if ( doc[i].startsWith('ne xt_lesson_type:') == true) { delete doc[i]; doc.splice( i, 1); i = 0; continue;};
        if ( doc[i].startsWith('nex t_lesson_type:') == true) { delete doc[i]; doc.splice( i, 1); i = 0; continue;};
		if ( doc[i].startsWith('next_ lesson_student:') == true) { delete doc[i]; doc.splice( i, 1); i = 0; continue;};

		if ( doc[i].startsWith('teacher_id:') == true) { delete doc[i]; doc.splice( i, 1); i = 0; continue;};
		if ( doc[i].startsWith('teacher_name:') == true) { delete doc[i]; doc.splice( i, 1); i = 0; continue;};
		if ( doc[i].startsWith('teacher_phone:') == true) { delete doc[i]; doc.splice( i, 1); i = 0; continue;};
		if ( doc[i].startsWith('teacher_skype:') == true) { delete doc[i]; doc.splice( i, 1); i = 0; continue;};
		if ( doc[i].startsWith('teacher_email:') == true) { delete doc[i]; doc.splice( i, 1); i = 0; continue;};

        if ( doc[i].startsWith('next_lesson_sta rt_time:') == true) { delete doc[i]; doc.splice( i, 1); i = 0; continue;};

        if ( doc[i].startsWith('next _lesson_teacher:') == true) { delete doc[i]; doc.splice( i, 1); i = 0; continue;};

		if ( doc[i] == '') { delete doc[i]; doc.splice( i, 1); i = 0; continue;};
	};
	return doc.join('\n').replace('There is an error in the phrase: ','');
}

chrome.storage.local.get(['ticket_quote'], function(result) {
    if (result['ticket_quote'] === undefined) { chrome.storage.local.set({ticket_quote: true}, function() {}); }
    if (result['ticket_quote'] === true) { setInterval(useful_tag,100); }
});