function new_icon(text = '0:00', color = '#fff') {
    let c = document.createElement("canvas"); // Используем тот же канвас
    c.height = c.width = 16;
    let cx = c.getContext("2d");
    cx.beginPath();// рисуем голубенький квадратик и черный текст на нем
    cx.font = "22px";
    cx.fillStyle = color;
    cx.fillText( text, 0, 12, 16 );
    return c.toDataURL()
}

setTimeout(function() {
    var sicon = { back: true, href: document.querySelector( 'link[rel="shortcut icon"]').href};
    document.querySelector( 'link[rel="shortcut icon"]').setAttribute('rel', 'icon');
	setInterval( () => {
		let time = document.querySelector('div > div > div[title="Add duration"]').innerText.slice(-4);
		if (time == '0:00') {
			if (sicon.back == false) {
				document.querySelector('link[rel="icon"]').href = sicon.href;
				sicon.back = true;
			}
		} else {
			document.querySelector('link[rel="icon"]').href = new_icon(time);
			sicon.back = false;
		}
	}, 1000, sicon);
}, 5000);