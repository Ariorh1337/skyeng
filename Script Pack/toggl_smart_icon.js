function new_icon(text = '0:00', color = '#fff') {
    let c = document.createElement( "canvas" ); // Используем тот же канвас
    c.height = c.width = 16;
    let cx = c.getContext( "2d" );
    cx.beginPath();// рисуем голубенький квадратик и черный текст на нем
    cx.font = "22px";
    cx.fillStyle = color;
    cx.fillText( text, 0, 12, 16 );
    return c.toDataURL()
}

function add_icon (icon) {
    var oldicons = document.querySelectorAll( 'link[rel="icon"], link[rel="shortcut icon"]' );
    for(var i = 0; i < oldicons.length; i++) {
        oldicons[i].parentNode.removeChild( oldicons[i] );
    }
    var newicon = document.createElement( "link" );
    newicon.setAttribute( "rel", "icon" );
    newicon.setAttribute( "href", icon );
    document.querySelector( "head" ).appendChild( newicon );
}

setTimeout(function() {
	setInterval( () => {
		var time = document.querySelector('div > div > div[title="Add duration"]').innerText.slice(-4)
		add_icon(new_icon(time))
	}, 1000);
}, 5000);