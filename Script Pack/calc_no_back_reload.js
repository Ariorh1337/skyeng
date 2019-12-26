setTimeout(() => {
    setTimeout(() => {
        for (let i = 0; i < 1000; i++) {
            clearTimeout(i)
        }
    }, 10000);

    $last_event = new Date();
    function MouseMove (event) {
        $new_event = new Date();
        if (($new_event - $last_event) > 180000) {
            document.location.reload(true);
        }
    }
    document.onmousemove = MouseMove;
}, 1000)