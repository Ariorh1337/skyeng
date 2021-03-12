
async function importFrom(PATH, MODE = 0) {
    let textFunc = await fetch(chrome.runtime.getURL(PATH)).then(r => r.text());
    let func = new Function(
        (MODE === 0) ? textFunc
            : 'return ' + textFunc
    );
    return func();
}

(async function () {
    const element = await importFrom('/libs/element.js');
    window.ElementCustom = element.Element;
    window.createTicketButton = false;

    setInterval(() => {
        const inListPage = (window.location.href.indexOf('customer-support/list') !== -1) ? true : false;
        if (!inListPage) return false;

        const taskBlockList = document.querySelectorAll('crm-cs-tasks-list-item > crm-container');
        if (taskBlockList.length === 0) return false;

        const isModified = document.querySelector('crm-cs-tasks-list-education-service').getAttribute('data-isModified');
        if (isModified !== null) return false;

        const userID = window.location.href.match(/persons\/([0-9]+)\//)[1];
        const data = new Promise((resolve) => {
            chrome.runtime.sendMessage({ name: "script_pack", question: 'crm2_get_task_list', id: userID }, function (response) {
                resolve(response.data);
            });
        });

        data.then(taskList => {
            taskList.forEach((task, index) => {
                const view = new ElementCustom({
                    html: '<crm-grid-col class="crm-vertical-center from" span="1"><crm-row><main><button>👁</button></main></crm-row></crm-grid-col>',
                    parentDOM: taskBlockList[index].firstElementChild,
                    possition: 'after'
                });
                const assign = new ElementCustom({
                    html: '<crm-grid-col class="crm-vertical-center from" span="1"><crm-row><main><button>▶</button></main></crm-row></crm-grid-col>',
                    parentDOM: taskBlockList[index].firstElementChild,
                    possition: 'after'
                });

                view.element.addEventListener('click', () => {
                    window.open(`https://crm2.skyeng.ru/persons/${userID}/customer-support/task/${task.id}`, '_blank')
                })
                assign.element.addEventListener('click', () => {
                    fetch(`https://customer-support.skyeng.ru/task/${task.id}/take`, {"credentials":"include","headers":{"content-type":"application/json"},"body":"{\"message\":\"забираю\"}","method":"POST","mode":"cors"});
                    window.location.href = `https://crm2.skyeng.ru/persons/${userID}/customer-support/process`;
                })
            })

            document.querySelector('crm-cs-tasks-list-education-service').setAttribute('data-isModified', 'true');
        })
    }, 1000);
})()

