async function importFrom(PATH, MODE = 0) {
    let textFunc = await fetch(chrome.runtime.getURL(PATH)).then(r => r.text());
    let func = new Function(
        (MODE === 0) ? textFunc
            : 'return ' + textFunc
    );
    return func();
}

let element = importFrom('/libs/element.js');
let dataArr = importFrom('/autofaq/patterns.json', 1);
let textEvent = importFrom('/libs/insertText.js');
const preload = Promise.all([element, dataArr, textEvent]);

window.addEventListener('load', async () => {
    preload.then(array => {
        element = array[0],
        dataArr = array[1],
        textEvent = array[2]
    })
    .then(() => {
        setInterval(() => { checkBeforeInitiate(); }, 100);
    });
})

function checkBeforeInitiate() {
    try {
        window.location.pathname.match(/assigned\/(?:.+)/g)[0].replace('assigned/', '');
        if (!document.querySelector('#datalist-input')) interfaceInitiate();
    } catch (e) {
        //do nothing
    }
}

function interfaceInitiate() {
    window.DataList = element.DataList;
    window.Element = element.Element;

    const inputList = new Element({
        html: `<div id="datalist"><ul id="datalist-ul"></ul><input id="datalist-input" type="text" placeholder="" autocomplete="off"></div>`,
        parentSelector: '.expert-chat-footer > .expert-chat-footer-left'
    });

    const customTextArea = newCustomTextAreaInit();

    const datalist = new DataList(
        "datalist",
        "datalist-input",
        "datalist-ul",
        dataArr
    );
    datalist.create();
    datalist.addListeners(datalist);

    inputList.element.firstElementChild.addEventListener("click", function (e) {
        if (e.target.nodeName.toLocaleLowerCase() === "li") datalistElmBeenChosen(e, customTextArea);
    });

    const svgSettings = `<path d="m499.953125 197.703125-39.351563-8.554687c-3.421874-10.476563-7.660156-20.695313-12.664062-30.539063l21.785156-33.886719c3.890625-6.054687 3.035156-14.003906-2.050781-19.089844l-61.304687-61.304687c-5.085938-5.085937-13.035157-5.941406-19.089844-2.050781l-33.886719 21.785156c-9.84375-5.003906-20.0625-9.242188-30.539063-12.664062l-8.554687-39.351563c-1.527344-7.03125-7.753906-12.046875-14.949219-12.046875h-86.695312c-7.195313 0-13.421875 5.015625-14.949219 12.046875l-8.554687 39.351563c-10.476563 3.421874-20.695313 7.660156-30.539063 12.664062l-33.886719-21.785156c-6.054687-3.890625-14.003906-3.035156-19.089844 2.050781l-61.304687 61.304687c-5.085937 5.085938-5.941406 13.035157-2.050781 19.089844l21.785156 33.886719c-5.003906 9.84375-9.242188 20.0625-12.664062 30.539063l-39.351563 8.554687c-7.03125 1.53125-12.046875 7.753906-12.046875 14.949219v86.695312c0 7.195313 5.015625 13.417969 12.046875 14.949219l39.351563 8.554687c3.421874 10.476563 7.660156 20.695313 12.664062 30.539063l-21.785156 33.886719c-3.890625 6.054687-3.035156 14.003906 2.050781 19.089844l61.304687 61.304687c5.085938 5.085937 13.035157 5.941406 19.089844 2.050781l33.886719-21.785156c9.84375 5.003906 20.0625 9.242188 30.539063 12.664062l8.554687 39.351563c1.527344 7.03125 7.753906 12.046875 14.949219 12.046875h86.695312c7.195313 0 13.421875-5.015625 14.949219-12.046875l8.554687-39.351563c10.476563-3.421874 20.695313-7.660156 30.539063-12.664062l33.886719 21.785156c6.054687 3.890625 14.003906 3.039063 19.089844-2.050781l61.304687-61.304687c5.085937-5.085938 5.941406-13.035157 2.050781-19.089844l-21.785156-33.886719c5.003906-9.84375 9.242188-20.0625 12.664062-30.539063l39.351563-8.554687c7.03125-1.53125 12.046875-7.753906 12.046875-14.949219v-86.695312c0-7.195313-5.015625-13.417969-12.046875-14.949219zm-152.160156 58.296875c0 50.613281-41.179688 91.792969-91.792969 91.792969s-91.792969-41.179688-91.792969-91.792969 41.179688-91.792969 91.792969-91.792969 91.792969 41.179688 91.792969 91.792969zm0 0"/>`;
    const settings = new Element({
        html: `<button type="button" class="ant-btn ant-btn-icon-only" ant-click-animating-without-extra-node="false"><span role="img" aria-label="slash-forward" type="slash-forward" class="anticon anticon-inbox"><svg focusable="false" class="" data-icon="inbox" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="0 0 512 512">${svgSettings}</svg></span></button>`,
        parentSelector: '.expert-chat-footer > .expert-chat-footer-left'
    })

    const popup = new Element({
        parentDOM: document.body,
        html: 
`<div id="script_pack_popup" class="b-popup" style="display: none;">
    <div class="b-popup-content">
        <button style="display: block;border: 1px solid black;border-radius: 11px;position: fixed;background-color: white;" onclick="document.querySelector('#script_pack_popup').style.setProperty('display', 'none')">х</button>
        <div class="content-menu">
            <button class="menu">Добавить новый шаблон</button>
            <button class="menu">Удалить свой шаблон</button>
            <button class="menu">Настроить порядок шаблонов</button>
        </div>
        <div class="content-new-pattern" style="display: none;">
            <p>Введите название шаблона</p>
            <input type="text" placeholder="">
            <p>Введите текст шаблона</p>
            <textarea type="text" placeholder=""></textarea><button class="menu">Добавить</button>
        </div>
        <div class="content-remove-pattern" style="display: none;">
            <p>Выберите шаблон:</p>
            <input type="text" placeholder=""><button class="menu">Удалить свой шаблон</button>

        </div>
        <div class="content-move-pattern" style="display: none;">
            <p>Настройте порядок шаблонов:</p>
            <b>Тест шаблон №1</b>
            <a href="#">для помощи наведите мышку</a>
        </div>
    </div>
</div>`,
        possition: 'after'
    })
}

async function datalistElmBeenChosen(event, customTextArea) {  
    const inputBox = document.querySelector('div[role="textbox"][spellcheck="true"]');
    const dataObj = getObjFromArrayByPattern(dataArr, {
        name: 'text',
        text: event.target.innerText        
    });

    if (dataObj.type !== 'custom') {
        if (!customTextArea.isExists()) customTextArea = newCustomTextAreaInit();
        customTextArea.show(); 
        customTextArea.element.innerHTML = dataObj.input;
        customTextArea.element.setAttribute('data-name', dataObj.text);
    } else {
        try {
            textEvent.appendData(inputBox, { data: dataObj.input, type: 'text/html' });
        } catch (e) {
            textEvent.appendText(inputBox, dataObj.input);
        }
    }

    //Clear input
    setTimeout(() => { document.querySelector('#datalist-input').value = ''; }, 100);
}

function getObjFromArrayByPattern(array, pattern) {
    const {name, text} = pattern;

    let result = '';
    array.forEach((str) => {
        if (str[name] === text) result = str;
    });
    return result;
}

function pasteLinksAsInSlack(event) {
    let paste = (event.clipboardData || window.clipboardData).getData('text');
    if (!paste.match(/http|https/)) return false;
    
    const selection = window.getSelection();
    if (!selection.rangeCount) return false;
    const selectionText = selection.toString();

    selection.deleteFromDocument();
    let link = document.createElement('div');
    link.innerHTML = `<a href="${paste}">${selectionText}</a>`;
    selection.getRangeAt(0).insertNode(link.firstElementChild);

    event.preventDefault();
}

function newCustomTextAreaInit() {
    try {
        removeEventListener('paste', pasteLinksAsInSlack);
        removeEventListener('keydown', customTextAreaKeyDownInitiate);
    } catch (e) { };

    const customTextArea = new Element({
        html: `<div id="customTextAreaForAutoFaqPatterns" contenteditable="true"></div>`,
        parentDOM: document.querySelector('div[role="textbox"][spellcheck="true"]').parentElement
    });
    customTextArea.element.addEventListener('paste', pasteLinksAsInSlack);
    customTextArea.element.addEventListener('keydown', customTextAreaKeyDownInitiate)
    document.querySelector('button.ant-btn-primary').addEventListener('click', customTextAreaClickSendBtn)
    return customTextArea;
}

function customTextAreaKeyDownInitiate(event) {
    //Backspace
    if (event.keyCode === 8) {
        if (event.target.innerText.trim() === '') event.target.style.display = '';
        else setTimeout(() => { if (event.target.innerText.trim() === '') event.target.style.display = ''; }, 50)
    }
    //Enter
    if (event.keyCode === 13) {
        const check = document.querySelector('#sendByEnterSetting').getAttribute('aria-checked');
        const checkResult = (check === 'true') ? true : false;

        if (!checkResult && event.ctrlKey || checkResult && !event.ctrlKey) { //Режим CTRL+ENTER и Нажат CTRL+ENTER или Режим ENTER и Нажат ENTER
            const dataObj = getObjFromArrayByPattern(dataArr, {
                name: 'text',
                text: event.target.getAttribute('data-name')      
            });
            sendMessageAsPatternByCusomTextArea(dataObj, event.target.innerHTML);
        }
    }
}

function customTextAreaClickSendBtn(event) {
    const target = document.querySelector('#customTextAreaForAutoFaqPatterns');
    if (target.style.display !== 'block') return false;

    const dataObj = getObjFromArrayByPattern(dataArr, {
        name: 'text',
        text: target.getAttribute('data-name')      
    });
    sendMessageAsPatternByCusomTextArea(dataObj, target.innerHTML)
}

async function sendMessageAsPatternByCusomTextArea(dataObj, newHTML) {
    const patternText = newHTML.replace(/\"/g, '\\\"');
    const patternID = dataObj.type;
    const patternName = dataObj.text;
    const { conversation, session } = await getChatData();
    
    fetch("https://skyeng.autofaq.ai/api/reason8/answers", {
      "headers": {
        "content-type": "multipart/form-data; boundary=----WebKitFormBoundaryLVR85uzdkOvj6JNC",
      },
      "body": `------WebKitFormBoundaryLVR85uzdkOvj6JNC\r\nContent-Disposition: form-data; name=\"payload\"\r\n\r\n{\"sessionId\":\"${session}\",\"conversationId\":\"${conversation}\",\"text\":\"${patternText}\",\"ext\":null,\"suggestedAnswerDocId\":${patternID},\"autoFaqTitle\":\"${patternName}\"}\r\n------WebKitFormBoundaryLVR85uzdkOvj6JNC--\r\n`,
      "method": "POST",
      "mode": "cors",
      "credentials": "include"
    });

    document.querySelector('#customTextAreaForAutoFaqPatterns').remove();
}

async function getChatData() {
    const conversation = window.location.pathname.match(/assigned\/(?:.+)/g)[0].replace('assigned/', '');
    const answer = await fetch(`https://skyeng.autofaq.ai/api/conversations/${conversation}`, { "credentials": "include" });
    const json = await answer.json();
    const session = json.sessionId;
    return { conversation, session };
}



//Отправить по клику на кнопку
//Проверить режим отправки в основном окне и \/
//Отправить по нажатию Enter или Ctrl Enter