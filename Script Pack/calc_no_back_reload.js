chrome.storage.local.get(['calc_no_back_reload'], function(result) {
    if (result['calc_no_back_reload'] === undefined) { chrome.storage.local.set({calc_no_back_reload: false}, function() {}); }
    if (result['calc_no_back_reload'] === true) {
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
                    window.location.href = "https://qie.glitch.me/";
                }
            }
            document.onmousemove = MouseMove;
        }, 1000)
    }
});