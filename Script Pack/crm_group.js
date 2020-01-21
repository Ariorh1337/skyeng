window.onload = function (e) {
	let style = document.createElement('style');
	document.body.append(style);
	style.innerHTML = "td:hover {	background		: #ffffff;	/*необходимо для IE6*/	text-decoration	: none;}td.toooltip span {	display			: none; 	padding			: 2px 3px; 	margin-left		: 8px; 	max-width: 400px; padding: 2px; padding-right: 6px; padding-left: 6px;}td.toooltip:hover span {	display			: inline; 	position		: absolute; 	background		: #ffffff; 	border			: 1px solid #cccccc; 	color			: #6c6c6c;}";

	var tHead = document.querySelector('table > thead[class="ng-scope"] > tr[class="ng-table-sort-header"]')
	var tBody = document.querySelectorAll('table[ng-table="ctrl.tableParams"] > tbody > tr[class="ng-scope"]');

	//В титл
	var wint = document.createElement('th')
	wint.append('подписка');
	tHead.prepend(wint)

	for (var i = 0; i < tBody.length; i++) {
		//Замена ID на ссылки
		let id = document.querySelectorAll('table[ng-table="ctrl.tableParams"] > tbody > tr[class="ng-scope"] > td[data-title-text="ID"]')[i]
		id.innerHTML = '<a href="https://id.skyeng.ru/admin/users/' + id.innerText + '">' + id.innerText + '</a>'
		id = id.innerText;

		chrome.runtime.sendMessage({name: "script_pack", question: 'get_group_student_info', id: id}, function(response) {
			let a = 0
			for (a; a < document.querySelectorAll('table[ng-table="ctrl.tableParams"] > tbody > tr[class="ng-scope"] > td[data-title-text="ID"]').length; a++) {
				if ( id == document.querySelectorAll('table[ng-table="ctrl.tableParams"] > tbody > tr[class="ng-scope"] > td[data-title-text="ID"]')[a].innerText ) {
					break;
				}
			}

			//Подписка
			let wint = document.createElement('th');
			wint.append(response.subscribe);
			tBody[a].prepend(wint);

			//Заморозка
			var now = new Date();
			var from = new Date(response.from);
			var to = new Date(response.to);
			var sub = new Date(response.sub);

			if (now < sub) {
				tBody[a].style = 'color: darkgreen;'
			}

			if (now > sub) {
				tBody[a].style = 'color: darkred;'
			}

			if (now !== null) {
				if (now > from && now < to) {
					tBody[a].style = 'color: orange;'
				}
			}

			document.querySelectorAll('table[ng-table="ctrl.tableParams"] > tbody > tr[class="ng-scope"] > td[data-title-text="Имя"]')[a].append(document.createElement('span'));
			document.querySelectorAll('table[ng-table="ctrl.tableParams"] > tbody > tr[class="ng-scope"] > td[data-title-text="Имя"]')[a].className += ' toooltip';
			document.querySelectorAll('table[ng-table="ctrl.tableParams"] > tbody > tr[class="ng-scope"] > td[data-title-text="Имя"]')[a].firstElementChild.innerHTML = response.info;
			
		},);		
	}

	(() => {
		var list = document.querySelectorAll('div[class="row"] > div[class="col-md-12"] > div:not([class])');
		if (list.length > 1) {
			for (let i = 0; i < list.length; i++) {
				var name = list[i].innerText.split(/:[0-9][0-9]/)[1];
				if (name) {
					chrome.runtime.sendMessage({name: "script_pack", question: 'get_teacher_by_name', fullname: name.trim()}, function(response) {
						list[i].innerText = list[i].innerText.replace(list[i].innerText.split(/:[0-9][0-9]/)[1].trim(), response.answer.full_name);
					})
				}
			}
		}
	})();
}