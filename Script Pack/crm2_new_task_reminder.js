chrome.storage.local.get(['crm2_new_task_reminder'], function (result) {
    if (result['crm2_new_task_reminder'] === undefined) {
        chrome.storage.local.set({ crm2_new_task_reminder: false }, () => {});
    }

    if (result['crm2_new_task_reminder']) {
        // Предупреждает если состояние кнопки "Взять новую задачу" сменилось с серой на синюю
        (function() {
            window.workAgainPlaySound = true;
        
            setInterval(() => {
                if (!window.location.pathname.includes("customer-support/start"))
                    return;

                var playSound = false;
                var buttons = document.querySelectorAll(`crm-grid-col > crm-row > button`);
            
                buttons.forEach(button => {
                    if (button.textContent.includes("Взять новую задачу")) {
                        playSound = true;
                    }
                });
            
                if (window.workAgainPlaySound !== playSound) {
                    if (playSound) {
                        new Audio("https://first.ap-south-1.linodeobjects.com/getringtone/uploads/ringtones/Warcraft%203%20-%20%D0%9E%D0%BF%D1%8F%D1%82%D1%8C%20%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%B0_jkMN.mp3").play();
                    }
                    window.workAgainPlaySound = playSound;
                }
            }, 1000);
        })();
    }
});
