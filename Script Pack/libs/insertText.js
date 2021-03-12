let exportTo = new Object();

function appendText(TargetDOM, text) {
    //Элемент куда отправляем текст
    const txtarea = TargetDOM;
    //Отправляем событие фокус
    txtarea.dispatchEvent(new Event("focus"));

    //Инициализируем событие ввода
    const txtEvt = document.createEvent("TextEvent");
    txtEvt.initTextEvent("textInput", true, true, null, text);

    //Отправляем событие ввода
    txtarea.dispatchEvent(txtEvt);
    //Снимаем фокус
    txtarea.dispatchEvent(new Event("blur"));

    return txtEvt;
}
exportTo.appendText = appendText;

function appendData(TargetDOM, pasteOptions) {
    const {data, type} = pasteOptions;

    const clipboardData = new DataTransfer();
    clipboardData.setData(type, data);

    const pasteEvent = new ClipboardEvent('paste', {
      bubbles: true,
      cancelable: true,
      dataType: type,
      data,
      clipboardData,
    });
    TargetDOM.dispatchEvent(pasteEvent);

    return pasteEvent;
}
exportTo.appendData = appendData;

return exportTo;