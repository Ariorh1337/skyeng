//спасательный круг
let svg_lifeBuoy = `<svg width="18px" height="18px" viewBox="0 0 512 512" style="display: flex; height: inherit;">
<path d="M163.825,17.776C146.637,6.337,126.925,0,106,0C48.109,0,0,48.109,0,106c0,20.925,6.337,40.637,17.776,57.825    c-2.223,5.698-4.671,11.286-6.486,17.175h132.563c9.844-14.67,22.476-27.303,37.147-37.147V11.29    C175.111,13.105,169.523,15.553,163.825,17.776z M33.886,129.757C31.36,122.188,30,114.216,30,106c0-41.353,34.647-76,76-76    c8.216,0,16.188,1.36,23.758,3.885C90.284,56.508,56.508,90.284,33.886,129.757z"/>
<path d="M256,0c-15.377,0-30.364,1.6-45,4.221v125.072c14.145-5.043,29.145-8.293,45-8.293s30.855,3.25,45,8.293V4.221    C286.364,1.6,271.377,0,256,0z"/>
<path d="M512,106C512,48.109,463.891,0,406,0c-20.925,0-40.637,6.337-57.825,17.776c-5.698-2.223-11.287-4.671-17.175-6.486    v132.563c14.67,9.844,27.303,22.476,37.147,37.147H500.71c-1.815-5.889-4.263-11.477-6.486-17.175    C505.663,146.637,512,126.925,512,106z M478.115,129.758c-22.623-39.474-56.399-73.25-95.872-95.872    C389.812,31.36,397.784,30,406,30c41.353,0,76,34.647,76,76C482,114.216,480.64,122.188,478.115,129.758z"/>
<path d="M129.293,211H4.221C1.6,225.636,0,240.623,0,256s1.6,30.364,4.221,45h125.072C124.25,286.855,121,271.855,121,256    C121,240.145,124.25,225.145,129.293,211z"/>
<path d="M507.779,211H382.707c5.043,14.145,8.293,29.145,8.293,45s-3.25,30.855-8.293,45h125.072    c2.62-14.636,4.221-29.623,4.221-45S510.4,225.636,507.779,211z"/>
<path d="M143.853,331H11.29c1.815,5.889,4.263,11.477,6.486,17.175C6.337,365.363,0,385.075,0,406c0,57.891,48.109,106,106,106    c20.925,0,40.637-6.337,57.825-17.776c5.698,2.223,11.287,4.671,17.175,6.486V368.147C166.33,358.303,153.697,345.671,143.853,331    z M106,482c-41.353,0-76-34.647-76-76c0-8.216,1.36-16.188,3.885-23.758c22.623,39.474,56.399,73.25,95.872,95.872    C122.188,480.64,114.216,482,106,482z"/>
<path d="M256,391c-15.855,0-30.855-3.25-45-8.293v125.072c14.636,2.62,29.623,4.221,45,4.221s30.364-1.6,45-4.221V382.707    C286.855,387.75,271.855,391,256,391z"/>
<path d="M494.224,348.175c2.223-5.698,4.671-11.286,6.486-17.175H368.147c-9.844,14.67-22.476,27.303-37.147,37.147V500.71    c5.889-1.815,11.477-4.263,17.175-6.486C365.363,505.663,385.075,512,406,512c57.891,0,106-48.109,106-106    C512,385.075,505.663,365.363,494.224,348.175z M406,482c-8.216,0-16.188-1.36-23.758-3.885    c39.474-22.623,73.25-56.399,95.872-95.872C480.64,389.812,482,397.784,482,406C482,447.353,447.353,482,406,482z"/>
</svg>`;

let svg_calendar = `<svg width="18px" height="18px" viewBox="0 0 36 36" style="display: flex; height: inherit;">
<path d="M30.224,3.948h-1.098V2.75c0-1.517-1.197-2.75-2.67-2.75c-1.474,0-2.67,1.233-2.67,2.75v1.197h-2.74V2.75    c0-1.517-1.197-2.75-2.67-2.75c-1.473,0-2.67,1.233-2.67,2.75v1.197h-2.74V2.75c0-1.517-1.197-2.75-2.67-2.75    c-1.473,0-2.67,1.233-2.67,2.75v1.197H6.224c-2.343,0-4.25,1.907-4.25,4.25v24c0,2.343,1.907,4.25,4.25,4.25h24    c2.344,0,4.25-1.907,4.25-4.25v-24C34.474,5.855,32.567,3.948,30.224,3.948z M25.286,2.75c0-0.689,0.525-1.25,1.17-1.25    c0.646,0,1.17,0.561,1.17,1.25v4.896c0,0.689-0.524,1.25-1.17,1.25c-0.645,0-1.17-0.561-1.17-1.25V2.75z M17.206,2.75    c0-0.689,0.525-1.25,1.17-1.25s1.17,0.561,1.17,1.25v4.896c0,0.689-0.525,1.25-1.17,1.25s-1.17-0.561-1.17-1.25V2.75z M9.125,2.75    c0-0.689,0.525-1.25,1.17-1.25s1.17,0.561,1.17,1.25v4.896c0,0.689-0.525,1.25-1.17,1.25s-1.17-0.561-1.17-1.25V2.75z     M31.974,32.198c0,0.965-0.785,1.75-1.75,1.75h-24c-0.965,0-1.75-0.785-1.75-1.75v-22h27.5V32.198z"></path>
<rect x="12.857" y="14.626" width="4.596" height="4.089"></rect>
<rect x="18.995" y="14.626" width="4.595" height="4.089"></rect>
<rect x="25.128" y="14.626" width="4.596" height="4.089"></rect>
<rect x="6.724" y="20.084" width="4.595" height="4.086"></rect>
<rect x="12.857" y="20.084" width="4.596" height="4.086"></rect>
<rect x="18.995" y="20.084" width="4.595" height="4.086"></rect>
<rect x="25.128" y="20.084" width="4.596" height="4.086"></rect>
<rect x="6.724" y="25.54" width="4.595" height="4.086"></rect>
<rect x="12.857" y="25.54" width="4.596" height="4.086"></rect>
<rect x="18.995" y="25.54" width="4.595" height="4.086"></rect>
</svg>`;

let svg_person = `<svg viewBox="0 0 512 512" height="18px" width="18px" style="display: flex; height: inherit;">
<path d="M421.054,414.843c-4.142,0-7.5,3.358-7.5,7.5v70.514c0,2.283-1.858,4.141-4.141,4.141h-40.317V349.301    c0-4.142-3.358-7.5-7.5-7.5c-4.142,0-7.5,3.358-7.5,7.5v147.698h-81.185l23.543-25.9c2.572-2.83,3.785-6.861,3.244-10.787    c-0.01-0.076-0.022-0.152-0.035-0.228L277.24,327.617l6.041-9.094c3.34,2.372,5.913,4.656,10.738,4.656    c4.908,0,9.497-2.747,11.755-7.269v-0.001l23.65-47.4l53.876,20.865c1.949,0.836,30.252,13.582,30.252,47.238v50.73    c-0.001,4.141,3.357,7.5,7.5,7.5c4.142,0,7.5-3.358,7.5-7.5v-50.73c0-44.344-37.969-60.463-39.585-61.128    c-0.047-0.02-0.095-0.039-0.143-0.057l-89.668-34.726v-21.03c14.242-11.076,24.117-27.495,26.596-46.227    c7.101-0.5,13.69-3.152,19.071-7.779c7.027-6.043,11.059-14.838,11.059-24.126c0-7.708-2.781-15.068-7.737-20.803V92.953    C348.144,41.699,306.446,0,255.192,0c-51.254,0-92.952,41.699-92.952,92.953v28.511c-5.009,5.677-7.733,12.665-7.733,20.074    c0,9.291,4.03,18.085,11.059,24.129c5.377,4.625,11.962,7.274,19.061,7.775c2.499,19.083,12.662,36.114,28.117,47.339v19.92    l-89.571,34.725c-0.047,0.018-0.094,0.037-0.141,0.056c-1.617,0.665-39.585,16.784-39.585,61.128v156.245    c0,10.555,8.587,19.142,19.142,19.142h71.457c4.142,0,7.5-3.358,7.5-7.5c0-4.142-3.358-7.5-7.5-7.5h-16.137V349.301    c0-4.142-3.358-7.5-7.5-7.5c-4.142,0-7.5,3.358-7.5,7.5v147.698h-40.319c-2.283,0-4.141-1.858-4.141-4.141V336.611    c0-33.769,28.493-46.486,30.243-47.234l53.834-20.87l23.652,47.402c2.263,4.533,6.858,7.27,11.756,7.27    c4.801,0,7.349-2.249,10.738-4.656l6.041,9.094l-22.421,132.468c-0.013,0.075-0.024,0.15-0.035,0.226    c-0.542,3.924,0.671,7.957,3.244,10.789l23.543,25.9h-29.995c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h200.365    c10.555,0,19.142-8.588,19.142-19.142v-70.514C428.554,418.201,425.196,414.843,421.054,414.843z M315.375,263.069l-22.049,44.19    c-0.548-0.389-12.233-8.691-26.517-18.834c6.198-7.651-1.053,1.299,27.235-33.617L315.375,263.069z M271.043,309.833l-5.718,8.607    h-18.703l-5.718-8.607l15.07-10.703L271.043,309.833z M227.743,243.121v-14.036c9.112,3.673,18.85,5.376,28.36,5.376    c9.833,0,19.476-2.096,28.052-5.846v14.567l-28.181,34.785L227.743,243.121z M340.881,141.539    c-0.001,4.913-2.129,9.562-5.839,12.753c-2.453,2.11-5.416,3.459-8.661,3.987v-33.477    C335.001,126.202,340.881,133.352,340.881,141.539z M184.007,158.279c-8.718-1.415-14.5-8.623-14.5-16.741    c0-8.018,6.647-14.544,14.5-16.359V158.279z M184.41,109.896c-2.389,0.274-5.127,0.921-7.168,1.615V92.953    c0-42.983,34.968-77.952,77.951-77.952c42.983,0,77.951,34.969,77.951,77.952v18.043c-2.18-0.663-4.441-1.101-6.762-1.307    c0-7.237,0.063-5.841-23.612-31.294c-4.354-4.678-11.556-5.658-17.037-2.077c-26.13,17.069-58.005,25.644-87.415,23.532    C191.867,99.367,185.991,103.616,184.41,109.896z M199.008,164.184v-46.792v-2.465c32.375,1.896,66.318-7.722,93.739-25.283    c10.858,11.658,16.738,17.773,18.634,20.099c0,5.884,0,47.705,0,54.44c0,30.447-24.826,55.276-55.277,55.276    C221.91,219.46,199.008,192.934,199.008,164.184z M218.623,307.259l-22.049-44.19l21.293-8.247l27.241,33.625    C231.255,298.284,219.88,306.366,218.623,307.259z M227.228,461.702l21.709-128.263h14.071l21.709,128.263l-28.744,31.623    L227.228,461.702z"></path>
</svg>`;

let svg_phone = `<svg height="16" width="16" viewBox="0 0 512 512" style="margin: 3px 0px 0px 1px;">
<path d="m76 226c0 109.072 31.538 226 90 226 0 33.091 26.909 60 60 60h165c8.291 0 15-6.709 15-15s-6.709-15-15-15h-165c-16.538 0-30-13.462-30-30h45c8.291 0 15-6.709 15-15v-91c0-8.291-6.709-15-15-15h-62.988c-6.021-22.793-12.012-57.422-12.012-105s5.991-82.207 12.012-105h62.988c8.291 0 15-6.709 15-15v-91c0-8.291-6.709-15-15-15h-75c-58.462 0-90 116.928-90 226z"></path>
<path d="m331 121c-57.891 0-105 47.109-105 105s47.109 105 105 105 105-47.109 105-105-47.109-105-105-105zm31.816 115.605c5.859 5.859 5.859 15.352 0 21.211s-15.352 5.859-21.211 0l-10.605-10.605-10.605 10.605c-5.859 5.859-15.352 5.859-21.211 0s-5.859-15.352 0-21.211l10.605-10.605-10.605-10.605c-5.859-5.859-5.859-15.352 0-21.211s15.352-5.859 21.211 0l10.605 10.605 10.605-10.605c5.859-5.859 15.352-5.859 21.211 0s5.859 15.352 0 21.211l-10.605 10.605z"></path>
</svg>`;

var win_html = `
<div style="display: flex;">
    <span style="cursor: -webkit-grab;">
        <input id="id_type_for_chat" autocomplete="off" type="text" style="text-align: center; width: 72px; color: black; display: none; margin-left: 1px;" onchange="this.value = this.value.replace(' ','')">
        <datalist id="user_search"></datalist>
        <div style="margin: 10px;">
            <button style="width: 55px; background-color:#768d87; border-radius:5px; border:1px solid #566963; color:#ffffff; padding:4px 4px;" id="btn1_student">Info У</button>
        </div>

        

        <div style="margin: 10px;">
            <button style="width: 55px; background-color:#768d87; border-radius:5px; border:1px solid #566963; color:#ffffff; padding:4px 4px;" id="btn1_teacher">Info П</button>
        </div>
        <div style="margin: 10px;">
            <button style="padding-left: 1px; width: 55px; height: 22px; background-color: rgb(118, 141, 135); border-radius: 5px; border: 1px solid rgb(86, 105, 99); color: rgb(255, 255, 255); display: none;" id="btn_hide" disabled>Скрыть</button>
        </div>
    </span>

    

    <span style="border-left: solid black 1px;">
        <div id="info_block" style="display: none;">
            <div style="text-align: center; font-weight: bold; border-block-end: 1px black solid; padding: 6px;" id="info_status" title="">
                <span>
                    <button class="win_btn" style="float: left;" id="student_copy">Copy</button>
                    <button class="win_btn" style="float: left;" id="student_crm">CRM</button>
                    <span style="margin: 0px 10px; cursor: pointer;">User:</span>
                    <button class="win_btn" style="float: right;" id="student_login">Login</button>
                    <button class="win_btn" style="float: right;" id="student_edit">Edit</button>
                </span>
            </div>
            <div style="text-align: center; border-bottom: 1px black solid; cursor: help; display: none;" id="info_student_status">
                <span id="svg_calendar" style="float: left; padding: 0px 1px; border-right: solid black 1px; border-bottom: 1px solid black; height: 23px;" title="">
                    ${svg_calendar}
                </span>
                <span id="svg_person" title="" style="float: left; border-bottom: 1px solid black; border-right: 1px solid black; height: 23px">
                    ${svg_person}
                </span>
                <span id="svg_lifeBuoy" title="Создать запрос" style="float: right; padding: 0px 1px; border-left: solid black 1px; border-bottom: 1px solid black; height: 23px;">
                    ${svg_lifeBuoy}
                </span>
            </div>
            <div style="text-align: center; padding: 7px;" id="info_student_block"></div>
            <div style="font-weight: bold; text-align: center; padding: 5px; border-top: 1px black solid; border-bottom: 1px solid black; display: none; cursor: pointer;" id="teacher_status">
                <span>
                    <button class="win_btn" style="float: left;" id="teacher_copy">Copy</button>
                    <button class="win_btn" style="float: left;" id="teacher_crm">CRM</button>
                    <button class="win_btn" style="float: left;" id="teacher_trm">TRM</button>
                    <span style="margin: 0px 10px;">Teacher:</span>
                    <button class="win_btn" style="float: right;" id="teacher_login">Login</button>
                    <button class="win_btn" style="float: right;" id="teacher_edit">Edit</button>
                </span>
            </div>
            <div style="text-align: center; cursor: help; display: none;" id="info_teacher_status"></div>
            <div style="text-align: center; padding: 7px; display: none;" id="info_teacher_block"></div>
            <div style="text-align: center; padding: 7px; width: fit-content; max-width: 215px; color: black; display: flex; flex-direction: row; flex-wrap: wrap;" id="info_teacher_marks"></div>
            <div style="text-align: center; display: none;" id="table_time">
                <table style="border-top: 1px solid black;">
                    <tbody>
                        <tr>
                            <td style="cursor: pointer;">⬅</td>
                            <td style="border-left: 1px solid black; cursor: pointer;">00</td>
                            <td style="border-left: 1px solid black; cursor: pointer;">01</td>
                            <td style="border-left: 1px solid black; cursor: pointer;">02</td>
                            <td style="border-left: 1px solid black; cursor: pointer;">03</td>
                            <td style="border-left: 1px solid black; cursor: pointer;">04</td>
                            <td style="border-left: 1px solid black; cursor: pointer;">05</td>
                            <td style="border-left: 1px solid black; cursor: pointer;">06</td>
                            <td style="border-left: 1px solid black; cursor: pointer;">➡</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </span>
</div>
<button id="rollUp" style="display: flex; height: 15px; width: 15px; background-color:#768d87; border-radius:5px; border:1px solid #566963; color:#ffffff; padding:4px 4px;" >^</button>
<div id="searhcIdHash" style="display: flex;">
    <span style="cursor: -webkit-grab;">
        <div>
            <input id="hash_type_for_chat" autocomplete="off" type="text" style="text-align: center; width: 72px; color: black; margin-left: 1px;" onchange="this.value = this.value.replace(' ','')">
            <datalist id="user_search"></datalist>
            <div style="margin: 10px; ">
                <button style="display: block; width: 55px; background-color:#768d87; border-radius:5px; border:1px solid #566963; color:#ffffff; padding:4px 4px;" id="btn1_hash">Хэш</button>
                <button style="position: relative; top: 6px; width: 55px; background-color:#768d87; border-radius:5px; border:1px solid #566963; color:#ffffff; padding:4px 4px;" class="display-block-hash" id="btn1_hash_close">Скрыть</button>
            </div>
            
        </div>
    </span>

    <span style="cursor: -webkit-grab;">
        <div class="display-block-hash" id="block-hash">
            <div style="text-align: center; padding: 7px; display: flex;" id="info_student_block">
                <pre>У: </pre>
                <pre id="student_id_res"></pre>
            </div>
        </div>
    </span>

</div>
`;

//Добавляем стили
let mstl = document.createElement('style');
document.body.append(mstl);
var style = `
    .win_btn {
        background-color: #768d87;
        border-radius: 10px;
        border: 1px solid #566963;
        color: #ffffff;
        font-size: 12px;
        padding: 3px 2px;
        margin: -2px 1px;
    }
    .display-block-hash{
        display: none;
    }

`
mstl.innerHTML = style;

//Сохранение позиции окна
if (localStorage.getItem('winTop') == null) {
    localStorage.setItem('winTop', '120');
    localStorage.setItem('winLeft', '295');
}

// Создаем само окно
let wint = document.createElement('div');
document.body.append(wint);
wint.style = 'min-height: 68px; max-height: 750px; min-width: 76px; max-width: 370px; background: wheat; top: ' + localStorage.getItem('winTop') + 'px; left: ' + localStorage.getItem('winLeft') + 'px; font-size: 14px; z-index: 20; position: fixed; border: 1px solid rgb(56, 56, 56); color: black;';
wint.setAttribute('id' ,'main_easy_win');
wint.innerHTML = win_html;

//Добавляем имя сотрудника в страницу
let mscr = document.createElement('script');
document.body.append(mscr);
let send_comment_js = `let avatar = document.getElementById('top_avatar'); if (avatar) avatar.setAttribute('my_name', window.intercomSettings.name);`;
mscr.innerHTML = send_comment_js;

(function move_again() {
    let wint = document.getElementById('main_easy_win');

    //Перемещение окна
    var listener = function (e, a) {
        wint.style.left = Number(e.clientX - myX) + "px";
        wint.style.top = Number(e.clientY - myY) + "px";
        localStorage.setItem('winTop', String(Number(e.clientY - myY)));
        localStorage.setItem('winLeft', String(Number(e.clientX - myX)));
    };
    wint.firstElementChild.firstElementChild.onmousedown = function (a) {
        window.myX = a.layerX;
        window.myY = a.layerY;
        document.addEventListener('mousemove', listener);
    }
    wint.onmouseup = function () { document.removeEventListener('mousemove', listener); }
    
    // Функции на кнопку поиска id по хэшу
    document.querySelector('#btn1_hash').onclick = function () {
        let hash = document.querySelector('#hash_type_for_chat').value;
        getIdUsersHash(hash);
        //sdocument.querySelector('#btn1_hash').classList.remove('display-block-hash');
        document.querySelector('#btn1_hash_close').classList.remove ('display-block-hash');
    }
    document.querySelector('#btn1_hash_close').onclick = function () {
        //document.querySelector('#btn1_hash').classList.remove('display-block-hash');
        document.querySelector('#btn1_hash_close').classList.add('display-block-hash');
        document.querySelector('#block-hash').classList.add('display-block-hash');
    }

    document.querySelector('#searhcIdHash').style.display = 'none';
    document.querySelector('#rollUp').ondblclick = function () {
        if(document.querySelector('#searhcIdHash').style.display == 'none') {
            document.querySelector('#searhcIdHash').style.display = 'flex';
        }else {
            document.querySelector('#searhcIdHash').style.display = 'none';
        }
    } 
    //События на главные кнопки
    document.getElementById('btn1_student').onclick = function () { get_info("student"); };
    document.getElementById('btn1_teacher').onclick = function () { get_info("teacher"); };
    document.getElementById('student_copy').onclick = function () {
        let stdnt = document.getElementById('info_student_block').innerText;
        TrueCopyToClipboard(stdnt) //.replace(/<br>/g,'\n')

        let notes_box = document.getElementsByName('field_2240');
        if (notes_box && notes_box.length > 0) {
            if (notes_box[0].value === '') {
                notes_box[0].value = stdnt;
            } else {
                notes_box[0].value += `\n\n${new Array(15).fill('=').join('')}\n\n${stdnt}`;
            }
            document.getElementsByClassName('a17_bcc add_mail_copy')[0].click();
            document.getElementsByClassName('a17_delete')[1].click();
        }
    };
    document.getElementById('teacher_copy').onclick = function () {
        let tcher = document.getElementById('info_teacher_block').innerText;
        TrueCopyToClipboard(tcher) //.replace(/<br>/g,'\n')

        let notes_box = document.getElementsByName('field_2240');
        if (notes_box && notes_box.length > 0) {
            if (notes_box[0].value === '') {
                notes_box[0].value = tcher;
            } else {
                notes_box[0].value += `\n\n${new Array(15).fill('=').join('')}\n\n${tcher}`;
            }
            document.getElementsByClassName('a17_bcc add_mail_copy')[0].click();
            document.getElementsByClassName('a17_delete')[1].click();
        }
    };
    document.getElementById('info_status').firstElementChild.children[2].onclick = function () {
        let id = document.getElementById('info_status').getAttribute('user_id');
        TrueCopyToClipboard('https://profile.skyeng.ru/profile/' + id + '/showcase');
        document.getElementById('info_status').firstElementChild.children[2].setAttribute('title', 'click to copy link\nto the lesson');
    };
    document.getElementById('btn_hide').onclick = function () {
        document.getElementById('main_easy_win').innerHTML = win_html;
        move_again();
        teacher_easy_timetable();
        document.getElementById('btn_hide').setAttribute('disabled', '');
    }

    if (window.location.href.indexOf('chat') !== -1 || window.location.href.indexOf('skyeng.autofaq.ai') !== -1 || window.location.href.indexOf('crm2.skyeng.ru') !== -1) {
        document.getElementById('id_type_for_chat').style.display = '';
        document.getElementById('btn1_student').innerText = 'Info';
        document.getElementById('btn1_teacher').style.display = 'none';
    } else {
        document.getElementById('id_type_for_chat').style.display = 'none';
    }
})();

function teacher_easy_timetable() {//Время П
    var dat = new Date()
    var tab = document.getElementById('table_time').firstElementChild.firstElementChild.firstElementChild;

    if (dat.getHours() >= 20) {
        tab.children[1].innerText = 20 - 3;
        tab.children[2].innerText = 20 - 2;
        tab.children[3].innerText = 20 - 1;
        tab.children[4].innerText = 20;
        tab.children[5].innerText = 20 + 1;
        tab.children[6].innerText = 20 + 2;
        tab.children[7].innerText = 20 + 3;
    } else if (dat.getHours() <= 3) {
        tab.children[1].innerText = 3 - 3;
        tab.children[2].innerText = 3 - 2;
        tab.children[3].innerText = 3 - 1;
        tab.children[4].innerText = 3;
        tab.children[5].innerText = 3 + 1;
        tab.children[6].innerText = 3 + 2;
        tab.children[7].innerText = 3 + 3;
    } else {
        tab.children[1].innerText = dat.getHours() - 3
        tab.children[2].innerText = dat.getHours() - 2
        tab.children[3].innerText = dat.getHours() - 1
        tab.children[4].innerText = dat.getHours()
        tab.children[5].innerText = dat.getHours() + 1
        tab.children[6].innerText = dat.getHours() + 2
        tab.children[7].innerText = dat.getHours() + 3
    };

    var asd = document.querySelector('div[id=table_time] > table > tbody > tr');
    asd.children[8].onclick = function () {
        if (asd.children[7].innerText < 23) {
            for (var i = 1; i < 8; i++) {
                asd.children[i].style.backgroundColor = '';
                asd.children[i].innerText = Number(asd.children[i].innerText) + 1
            }
            
            var busy_time = document.getElementById('table_time').getAttribute('busy_time').split(';')
            var tab = document.getElementById('table_time').firstElementChild.firstElementChild.firstElementChild;
            for (var i = 0; i < busy_time.length; i++) {
                for (var ii = 1; ii < 8; ii++) {
                    if ( busy_time[i] == tab.children[ii].innerText || busy_time[i] == '0' + tab.children[ii].innerText ) {  tab.children[ii].style.backgroundColor = 'lightblue';}
                }
            }
        }	
    }
    asd.children[0].onclick = function () {
        if (asd.children[1].innerText > 0) {
            for (var i = 1; i < 8; i++) {
                asd.children[i].style.backgroundColor = '';
                asd.children[i].innerText = Number(asd.children[i].innerText) - 1
            }
            
            var busy_time = document.getElementById('table_time').getAttribute('busy_time').split(';')
            var tab = document.getElementById('table_time').firstElementChild.firstElementChild.firstElementChild;
            for (var i = 0; i < busy_time.length; i++) {
                for (var ii = 1; ii < 8; ii++) {
                    if ( busy_time[i] == tab.children[ii].innerText || busy_time[i] == '0' + tab.children[ii].innerText ) {  tab.children[ii].style.backgroundColor = 'lightblue';}
                }
            }
        }	
    }
}

teacher_easy_timetable();

const TrueCopyToClipboard = str => {
    console.log(str);
    let el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};

async function get_info(type) { //v.2
    let id;
    if (window.location.href.indexOf('chat') !== -1 || window.location.href.indexOf('skyeng.autofaq.ai') !== -1 || window.location.href.indexOf('crm2.skyeng.ru') !== -1) {
        id = document.getElementById('id_type_for_chat').value;
        /*/
        if (isNaN(id) == true) {
            let users = await get_user_id(id);
            for (let i = 0; i < users.length; i++) {

            }
        }
        /*/
    } else if (type == 'student') {
        id = document.querySelectorAll('label > input[class="form-custom-field"]')[1].value.replace(/[^0-9]/g, "");
    } else if (type == 'teacher') {
        id = document.querySelectorAll('label > input[class="form-custom-field"]')[0].value.replace(/[^0-9]/g, "");
    }

    if (id == '') {
        console.log('Нет ID');
        return 0;
    }

    var btns = document.querySelectorAll('#main_easy_win > div > span > div[style="margin: 10px;"]');
    btns[0].style.display = 'none', btns[1].style.display = 'none';
    document.getElementById('btn_hide').style.display = '';

    if (id) {
        var get_person_info = new Promise( (resolve) => {
            chrome.runtime.sendMessage({name: "script_pack", question: 'get_person_info_v3', id: id}, function(response) {
                resolve(response);
            })
        });
        
        get_person_info.then( (value) => {
            var role = value.role;

            if (role == 'operator') {
                document.getElementById('info_status').setAttribute('user_id', id);
                document.getElementById('btn_hide').style.display = '';
                document.getElementById('info_student_block').innerHTML = value.answer;
                document.getElementById('info_status').lastElementChild.children[2].innerText = role;
                document.getElementById('info_block').style.display = 'block';
                document.getElementById('student_crm').style.visibility = 'hidden';
                document.getElementById('info_student_status').style.display = '';

                document.getElementById('student_edit').onclick = function () {
                    window.open('https://id.skyeng.ru/admin/users/' + id, '_blank');
                }
            } else {
                if (role == 'student') {
                    let info_status = document.getElementById('info_status');
                    info_status.setAttribute('user_id', id);
                    document.getElementById('btn_hide').style.display = '';
                    document.getElementById('info_student_block').style.display = '';
                    info_status.style.display = '';
                    document.getElementById('info_student_block').innerHTML = value.status + value.answer; 
                    document.getElementById('info_block').style.display = 'block';
                    document.getElementById('info_student_status').style.display = '';

                    document.getElementById('svg_lifeBuoy').onclick = function () {
                        window.open(`https://crm2.skyeng.ru/persons/${id}/customer-support/manual`, '_blank');
                    }

                    info_status.lastElementChild.children[2].innerText = role;
                    document.getElementById('student_edit').onclick = function () {
                        window.open('https://id.skyeng.ru/admin/users/' + id + '/update-contacts', '_blank');
                    }

                    document.getElementById('student_login').onclick = function () {
                        document.getElementById('student_login').style.backgroundColor = 'orange';
                        chrome.runtime.sendMessage({name: "script_pack", question: 'get_login_link', id: id}, function(response) {
                            if (response.answer.success === true) {
                                TrueCopyToClipboard(response.answer.loginLink);
                                document.getElementById('student_login').style.backgroundColor = 'green';
                            } else {
                                document.getElementById('student_login').style.backgroundColor = 'red';
                            }
                        });
                    };

                    is_crm1(id).then( result => {
                        if (result === true) {
                            chrome.runtime.sendMessage({name: "script_pack", question: 'info_user_status', id: id}, function(response) {
                                if (response.type == 'crm1_normal') { //CRM1 only
                                    document.getElementById('student_crm').onclick = function () {
                                        window.open('https://crm.skyeng.ru/admin/orderPriority/search?page=1&user=' + id, '_blank');
                                    }

                                    info_status.style.backgroundColor = response.status;
                                    info_status.setAttribute('order_id', response.order);
                
                                    if (response.comment !== '') {
                                        document.querySelector('#svg_person').setAttribute('title', response.comment);
                                    } else {
                                        document.querySelector('#svg_person').setAttribute('title', 'Нет комментария');
                                    };
                                    
                                    chrome.runtime.sendMessage({name: "script_pack", question: 'get_Lazzy_TimeTable', id: id}, function(response) {
                                        document.querySelector('#svg_calendar').setAttribute('title', response.answer);
                                        document.querySelector('#svg_calendar').onclick = () => window.open('https://crm.skyeng.ru/orderV2/ajaxLessonsHistoryTab/id/' + id,'blank');
                                    });
        
                                    if (response.teacher == '') {
                                        if (response.group !== '') {
                                            let info_teacher_block = document.getElementById('info_teacher_block');
                                            info_teacher_block.innerHTML = '<span><span style="margin-right: 3px;">Группа:</span><a href="https://crm.skyeng.ru/admin/group/edit?id=' + response.group + '">' + response.group + '</a><a style="margin-left: 10px; margin-right: 10px;" href="https://api.olympiad.skyeng.ru/crm/cards/' + id + '">Семья</a><a href="https://grouplessons-api.skyeng.ru/admin/student/view/' + id + '">Подписка</a></span>';
                                            chrome.runtime.sendMessage({name: "script_pack", question: 'get_group_student_info', id: id}, function(response) {
                                                let windt = document.createElement('div');
                                                info_teacher_block.append(windt);
                                                windt.innerHTML = response.info;
                                            });
                                            info_teacher_block.style.display = '';
                                            info_teacher_block.style.marginTop = '';
                                        } else {
                                            document.getElementById('info_teacher_block').innerHTML = '';
                                            document.getElementById('teacher_status').style.display = 'none';
                                        }
                                    } else {
                                        var get_person_info2 = new Promise( (resolve) => {
                                            chrome.runtime.sendMessage({name: "script_pack", question: 'get_person_info_v3', id: response.teacher}, function(response) {
                                                resolve(response);
                                            })
                                        });
                                        get_person_info2.then( (value2) => {
                                            document.getElementById('info_teacher_block').innerHTML = value2.status + value2.answer;
                                            teacher_draw(response.teacher);
                                        });
                                    }
                                }
                            });
                        } else {
                            document.getElementById('student_crm').onclick = function () {
                                window.open('https://crm2.skyeng.ru/persons/' + id, '_blank');
                            }
                            chrome.runtime.sendMessage({name: "script_pack", question: 'get_Lazzy_TimeTable', id: id}, function(response) {
                                document.querySelector('#svg_calendar').setAttribute('title', response.answer);
                                document.querySelector('#svg_calendar').onclick = () => window.open('https://crm.skyeng.ru/orderV2/ajaxLessonsHistoryTab/id/' + id,'blank');
                            });

                            no_responce(id);
                            document.querySelector('#svg_person').style.display = 'none';

                            /*
                            if (is_kgl === true) {
                                chrome.runtime.sendMessage({name: "script_pack", question: 'get_group_student_info', id: id}, function(response) {
                                    let info_teacher_block = document.getElementById('info_teacher_block');
                                    info_teacher_block.innerHTML = '<span><span style="margin-right: 3px;">Группа:</span>' + response.group + '<a style="margin-left: 10px; margin-right: 10px;" href="https://api.olympiad.skyeng.ru/crm/cards/' + id + '">Семья</a><a href="https://grouplessons-api.skyeng.ru/admin/student/view/' + id + '">Подписка</a></span>';
    
                                    let windt = document.createElement('div');
                                    info_teacher_block.append(windt);
                                    windt.innerHTML = response.info;

                                    info_teacher_block.style.display = '';
                                    info_teacher_block.style.marginTop = '';
                                });         
                            }
                            */

                            chrome.runtime.sendMessage({ name: "script_pack", question: 'crm2_status', id: id }, function (response) {
                                console.log(response)
                                if (response.answer.length > 0) {
                                    response.answer.forEach((element) => {
                                        const isKGL = (element.subject.indexOf('KGL') !== -1) ? true : false;

                                        if (isKGL) {
                                            chrome.runtime.sendMessage({ name: "script_pack", question: 'get_group_student_info', id: id }, function (kglResponce) {
                                                console.log(kglResponce)
                                                if (!kglResponce.group && !kglResponce.teacher) crm2_status_draw(id, element.color, element.balance, element.subject, element.payment);
                                                else {
                                                    if (kglResponce.teacher) {
                                                        crm2_status_draw(id, element.color, element.balance, element.subject, element.payment, kglResponce.teacher);
    
                                                        crm2_teacher_draw(kglResponce.teacher);

                                                        var get_person_info2 = new Promise((resolve) => {
                                                            chrome.runtime.sendMessage({ name: "script_pack", question: 'get_person_info_v3', id: kglResponce.teacher }, function (response) {
                                                                resolve(response);
                                                            })
                                                        });
                                                        get_person_info2.then((value2) => {
                                                            let info_teacher_block = document.getElementById(`info_teacher_block_${kglResponce.teacher}`);
                                                            info_teacher_block.innerHTML = `
                                                            <span>
                                                                <span style="margin-right: 3px;">Группа:</span>
                                                                ${kglResponce.group}
                                                                <a href="https://grouplessons-api.skyeng.ru/admin/student/view/${id}" target="_blank" style="margin-left: 15px;">Карточка</a>
                                                            </span>
                                                            <br>
                                                            <br>`;
                                                            
                                                            info_teacher_block.innerHTML += value2.status + value2.answer;
                                                        });
                                                    }
                                                }
                                            });
                                        } else {
                                            if (element.teacher !== null) {
                                                crm2_status_draw(id, element.color, element.balance, element.subject, element.payment, element.teacher);
    
                                                crm2_teacher_draw(element.teacher);
                                                var get_person_info2 = new Promise( (resolve) => {
                                                    chrome.runtime.sendMessage({name: "script_pack", question: 'get_person_info_v3', id: element.teacher}, function(response) {
                                                        resolve(response);
                                                    })
                                                });
                                                get_person_info2.then( (value2) => {
                                                    document.getElementById(`info_teacher_block_${element.teacher}`).innerHTML = value2.status + value2.answer;
                                                });
                                            } else {
                                                crm2_status_draw(id, element.color, element.balance, element.subject, element.payment);
                                            }
                                        }
                                    });
                                }                                
                            });
                        }
                    })
                }
                if (role == 'teacher') {
                    document.getElementById('info_teacher_block').innerHTML = value.status + value.answer;
                    document.getElementById('info_status').style.display = 'none';
                    document.getElementById('info_student_block').style.display = 'none';
                    document.getElementById('info_student_status').style.display = 'none';
                    teacher_draw(id);
                }
                if (role == 'parent') {
                    let info_status = document.getElementById('info_status');
                    info_status.setAttribute('user_id', id);
                    document.getElementById('btn_hide').style.display = '';
                    document.getElementById('info_student_block').style.display = '';
                    info_status.style.display = '';
                    document.getElementById('info_student_block').innerHTML = value.status + value.answer; 
                    document.getElementById('info_block').style.display = 'block';
                    document.getElementById('info_student_status').style.display = '';
                    info_status.lastElementChild.children[2].innerText = role;

                    document.querySelector("#info_student_status").style.display = 'none'; //скрыть кнопки с svg: расписания, профиля, комментария, добавления в историю

                    document.getElementById('student_edit').onclick = function () {
                        window.open('https://id.skyeng.ru/admin/users/' + id + '/update-contacts', '_blank');
                    }

                    document.getElementById('student_login').onclick = function () {
                        document.getElementById('student_login').style.backgroundColor = 'orange';
                        chrome.runtime.sendMessage({name: "script_pack", question: 'get_login_link', id: id}, function(response) {
                            if (response.answer.success === true) {
                                TrueCopyToClipboard(response.answer.loginLink);
                                document.getElementById('student_login').style.backgroundColor = 'green';
                            } else {
                                document.getElementById('student_login').style.backgroundColor = 'red';
                            }
                        });
                    };

                    is_crm1(id).then(result => { 
                        if (result === true) { 
                            document.getElementById('student_crm').onclick = function () {
                                window.open('https://crm.skyeng.ru/admin/orderPriority/search?page=1&user=' + id, '_blank');
                            }
                        } else { 
                            document.getElementById('student_crm').onclick = function () {
                                window.open('https://crm2.skyeng.ru/persons/' + id, '_blank');
                            }
                        }
                    })
                }
            }
        });
    }

    setInterval(() => {
        document.getElementById('btn_hide').removeAttribute('disabled');
    }, 5000);
}

function teacher_draw(id) {
    let teacher_status = document.getElementById('teacher_status');
    teacher_status.setAttribute('user_id', id);
    document.getElementById('btn_hide').style.display = '';
    document.getElementById('info_teacher_block').style.display = '';
    document.getElementById('info_block').style.display = 'block';
    teacher_status.style.display = '';
    document.getElementById('info_teacher_status').style.display = '';    

    chrome.runtime.sendMessage({name: "script_pack", question: 'get_trm_id', id: id, type: 'trm_id'}, function(response) {
        document.getElementById('teacher_trm').onclick = function () {
            window.open('https://tramway.skyeng.ru/teacher/' + response.answer + '/show', '_blank'); 
        }
    });
    document.getElementById('teacher_crm').onclick = function () {
        window.open('https://crm2.skyeng.ru/persons/' + id, '_blank'); 
    }
    document.getElementById('teacher_login').onclick = function () {
        document.getElementById('teacher_login').style.backgroundColor = 'orange';
        chrome.runtime.sendMessage({name: "script_pack", question: 'get_login_link', id: id}, function(response) {
            if (response.answer.success === true) {
                TrueCopyToClipboard(response.answer.loginLink);
                document.getElementById('teacher_login').style.backgroundColor = 'green';
            } else {
                document.getElementById('teacher_login').style.backgroundColor = 'red';
            }
        });
    }
    document.getElementById('teacher_edit').onclick = function () {
        window.open('https://id.skyeng.ru/admin/users/' + id + '/update-contacts', '_blank');
    }
   
    //Easy timetable start
    chrome.runtime.sendMessage({name: "script_pack", question: 'get_lessons_today', id: id}, function(response) {
        if (response.answer !== 0 && response.answer !== null) {
            let lessons = '';
            for (let i = 0; i < response.answer.length; i++) {
                lessons += response.answer[i].startAt + ';';
            }
            document.getElementById('table_time').setAttribute('busy_time', lessons);
            document.getElementById('table_time').style.display = 'grid';
        } else { document.getElementById('table_time').style.display = 'none'; }
        if (response && response.slack && response.slack !== null) {
            document.querySelector('#info_teacher_block').innerHTML += `<br><b>Slack id: </b><a href="https://skyeng.slack.com/team/${response.slack}" target="_blank">${response.slack}</a>`;
        }
        if (response && response.marks) {
            if (response.marks.length > 0) {
                response.marks.forEach((mark) => {
                    document.querySelector('#info_teacher_marks').innerHTML += `<div class="win_btn" style="padding: 5px;">${mark}</div>`;
                });
            }
        }
    });
    
    setTimeout( function () {
        if (document.getElementById('table_time').getAttribute('busy_time') !== undefined && document.getElementById('table_time').getAttribute('busy_time') !== null) {
            var busy_time = document.getElementById('table_time').getAttribute('busy_time').split(';')
            var tab = document.getElementById('table_time').firstElementChild.firstElementChild.firstElementChild;
            for (var i = 0; i < busy_time.length; i++) {
                for (var ii = 1; ii < 8; ii++) {
                    if ( busy_time[i] == tab.children[ii].innerText || busy_time[i] == '0' + tab.children[ii].innerText ) {  tab.children[ii].style.backgroundColor = 'lightblue';}
                }
            }
        } else {
            console.log('у П нет уроков на сегодня');
        }
    }, 2000);
    //Easy timetable end            
}

async function is_crm1(id) {
    return new Promise(resolve => {
        chrome.runtime.sendMessage({name: "script_pack", question: 'is_crm1', id: id}, function(response) {
            resolve(response.answer);
        })
    });
}

function crm2_teacher_draw(id) {
    var html = `
    <div style="font-weight: bold; text-align: center; padding: 5px; border-top: 1px black solid; border-bottom: 1px solid black; cursor: pointer; display: none;" id="teacher_status_${id}">
        <span>
            <button class="win_btn" style="float: left;" id="teacher_copy_${id}">Copy</button>
            <button class="win_btn" style="float: left;" id="teacher_crm_${id}">CRM</button>
            <button class="win_btn" style="float: left;" id="teacher_trm_${id}">TRM</button>
            <span style="margin: 0px 10px;">Teacher:</span>
            <button class="win_btn" style="float: right;" id="teacher_login_${id}">Login</button>
            <button class="win_btn" style="float: right;" id="teacher_edit_${id}">Edit</button>
        </span>
    </div>
    <div style="text-align: center; cursor: help; display: none;" id="info_teacher_status_${id}"></div>
    <div style="text-align: center; padding: 7px; display: none;" id="info_teacher_block_${id}"></div>
    <div style="text-align: center; padding: 7px; width: fit-content; max-width: 215px; display: none; color: black; display: none; flex-direction: row; flex-wrap: wrap;" id="info_teacher_marks_${id}"></div>
    <div style="text-align: center; display: none;" id="table_time_${id}">
        
    </div>`;
    let elm = document.createElement('div');
    document.getElementById('info_block').append(elm);
    elm.outerHTML = html;

    document.getElementById(`teacher_copy_${id}`).onclick = function () {
        let tcher = document.getElementById(`info_teacher_block_${id}`).innerText;
        TrueCopyToClipboard(tcher); //.replace(/<br>/g,'\n')

        let notes_box = document.getElementsByName('field_2240');
        if (notes_box && notes_box.length > 0) {
            if (notes_box[0].value === '') {
                notes_box[0].value = tcher;
            } else {
                notes_box[0].value += `\n\n${new Array(15).fill('=').join('')}\n\n${tcher}`;
            }
            document.getElementsByClassName('a17_bcc add_mail_copy')[0].click();
            document.getElementsByClassName('a17_delete')[1].click();
        }
    };

    let teacher_status = document.getElementById(`teacher_status_${id}`);
    teacher_status.setAttribute('user_id', id);
    document.getElementById('btn_hide').style.display = '';
    document.getElementById('info_block').style.display = 'block'; 

    chrome.runtime.sendMessage({name: "script_pack", question: 'get_trm_id', id: id, type: 'trm_id'}, function(response) {
        document.getElementById(`teacher_trm_${id}`).onclick = function () {
            window.open('https://tramway.skyeng.ru/teacher/' + response.answer + '/show', '_blank'); 
        }
    });
    document.getElementById(`teacher_crm_${id}`).onclick = function () {
        window.open('https://crm2.skyeng.ru/persons/' + id, '_blank'); 
    }
    document.getElementById(`teacher_login_${id}`).onclick = function () {
        document.getElementById(`teacher_login_${id}`).style.backgroundColor = 'orange';
        chrome.runtime.sendMessage({ name: "script_pack", question: 'get_login_link', id: id }, function (response) {
            if (response.answer.success === true) {
                TrueCopyToClipboard(response.answer.loginLink);
                document.getElementById(`teacher_login_${id}`).style.backgroundColor = 'green';
            } else {
                document.getElementById(`teacher_login_${id}`).style.backgroundColor = 'red';
            }
        });
    }
    document.getElementById(`teacher_edit_${id}`).onclick = function () {
        window.open('https://id.skyeng.ru/admin/users/' + id + '/update-contacts', '_blank');
    }
    
    //Easy timetable start
    chrome.runtime.sendMessage({name: "script_pack", question: 'get_lessons_today', id: id}, function(response) {
        if (response.answer !== 0 && response.answer !== null) {
            let html = `<table style="border-top: 1px solid black;">
                            <tbody>
                                <tr>
                                    <td style="cursor: pointer;">⬅</td>
                                    <td style="border-left: 1px solid black; cursor: pointer;">00</td>
                                    <td style="border-left: 1px solid black; cursor: pointer;">01</td>
                                    <td style="border-left: 1px solid black; cursor: pointer;">02</td>
                                    <td style="border-left: 1px solid black; cursor: pointer;">03</td>
                                    <td style="border-left: 1px solid black; cursor: pointer;">04</td>
                                    <td style="border-left: 1px solid black; cursor: pointer;">05</td>
                                    <td style="border-left: 1px solid black; cursor: pointer;">06</td>
                                    <td style="border-left: 1px solid black; cursor: pointer;">➡</td>
                                </tr>
                            </tbody>
                        </table>`;
            document.getElementById(`table_time_${id}`).innerHTML = html;

            let lessons = '';
            for (let i = 0; i < response.answer.length; i++) {
                lessons += response.answer[i].startAt + ';';
            }
            document.getElementById(`table_time_${id}`).setAttribute('busy_time', lessons);
            //document.getElementById(`table_time_${id}`).style.display = 'grid';

            teacher_easy_timetable_crm2(id);

            var busy_time = document.getElementById(`table_time_${id}`).getAttribute('busy_time').split(';')
            var tab = document.getElementById(`table_time_${id}`).firstElementChild.firstElementChild.firstElementChild;
            for (var i = 0; i < busy_time.length; i++) {
                for (var ii = 1; ii < 8; ii++) {
                    if ( busy_time[i] == tab.children[ii].innerText || busy_time[i] == '0' + tab.children[ii].innerText ) {  tab.children[ii].style.backgroundColor = 'lightblue';}
                }
            }
        } else { 
            document.getElementById(`table_time_${id}`).style.display = 'none';
            console.log('у П нет уроков на сегодня');
        }
        if (response && response.slack && response.slack !== null) {
            document.querySelector(`#info_teacher_block_${id}`).innerHTML += `<br><b>Slack id: </b><a href="https://skyeng.slack.com/team/${response.slack}" target="_blank">${response.slack}</a>`;
        }
        if (response && response.marks) {
            if (response.marks.length > 0) {
                response.marks.forEach((mark) => {
                    document.querySelector(`#info_teacher_marks_${id}`).innerHTML += `<div class="win_btn" style="padding: 5px;">${mark}</div>`;
                });
            }
        }
    });
}

function crm2_status_draw(id, color, balance, subject, payment, teacher_id = false) {
    let html = `
    <div style="text-align: center;font-weight: bold;padding: 6px;background-color: ${color};">
        <span>
            <span style="float: left;">
                <img title="Плательщик: \n${payment.id}\n${payment.name}" src="https://angular-widgets.skyeng.ru/coin.d8eb9d6bceb4ac5d5ae1.svg" style="cursor: help;">
                <a href="https://cabinet.skyeng.ru/orderV2/student/id/${id}#payments" target="blank" style="color:black;">${balance}</a>
            </span>
            <span style="margin: 0px 10px; cursor: pointer;">${subject}</span>
            <span ${(teacher_id === false) ? '' : `id="hide_teacher_block_${teacher_id}"`} style="transform: rotate(-90deg); float: right; ${(teacher_id === false) ? 'display: none;' : ''}">
                <svg x="0px" y="0px" width="16" height="16" viewBox="0 0 444 444">
                    <path d="M352.025,196.712L165.884,10.848C159.029,3.615,150.469,0,140.187,0c-10.282,0-18.842,3.619-25.697,10.848L92.792,32.264   c-7.044,7.043-10.566,15.604-10.566,25.692c0,9.897,3.521,18.56,10.566,25.981l138.753,138.473L92.786,361.168   c-7.042,7.043-10.564,15.604-10.564,25.693c0,9.896,3.521,18.562,10.564,25.98l21.7,21.413   c7.043,7.043,15.612,10.564,25.697,10.564c10.089,0,18.656-3.521,25.697-10.564l186.145-185.864   c7.046-7.423,10.571-16.084,10.571-25.981C362.597,212.321,359.071,203.755,352.025,196.712z"></path>
                </svg>
            </span>
        </span>
    </div>`;
    let elm = document.createElement('div');
    document.getElementById('info_block').append(elm);
    elm.outerHTML = html;

    if (teacher_id !== false) {
        document.getElementById(`hide_teacher_block_${teacher_id}`).onclick = function () {
            if (this.style.transform == 'rotate(90deg)') {
                this.style.transform = 'rotate(-90deg)';
                document.getElementById(`teacher_status_${teacher_id}`).style.display = 'none';
                document.getElementById(`info_teacher_status_${teacher_id}`).style.display = 'none';
                document.getElementById(`info_teacher_block_${teacher_id}`).style.display = 'none';
                document.getElementById(`info_teacher_marks_${teacher_id}`).style.display = 'none';
                document.getElementById(`table_time_${teacher_id}`).style.display = 'none';
            } else {
                this.style.transform = 'rotate(90deg)';
                document.getElementById(`teacher_status_${teacher_id}`).style.display = '';
                document.getElementById(`info_teacher_status_${teacher_id}`).style.display = '';
                document.getElementById(`info_teacher_block_${teacher_id}`).style.display = '';
                document.getElementById(`info_teacher_marks_${teacher_id}`).style.display = 'flex';
                document.getElementById(`table_time_${teacher_id}`).style.display = 'grid';
            }
        }
    }
    document.getElementById('btn_hide').removeAttribute('disabled');
}

function teacher_easy_timetable_crm2(id) {//Время П
    var dat = new Date()
    var tab = document.getElementById(`table_time_${id}`).firstElementChild.firstElementChild.firstElementChild;

    if (dat.getHours() >= 20) {
        tab.children[1].innerText = 20 - 3;
        tab.children[2].innerText = 20 - 2;
        tab.children[3].innerText = 20 - 1;
        tab.children[4].innerText = 20;
        tab.children[5].innerText = 20 + 1;
        tab.children[6].innerText = 20 + 2;
        tab.children[7].innerText = 20 + 3;
    } else if (dat.getHours() <= 3) {
        tab.children[1].innerText = 3 - 3;
        tab.children[2].innerText = 3 - 2;
        tab.children[3].innerText = 3 - 1;
        tab.children[4].innerText = 3;
        tab.children[5].innerText = 3 + 1;
        tab.children[6].innerText = 3 + 2;
        tab.children[7].innerText = 3 + 3;
    } else {
        tab.children[1].innerText = dat.getHours() - 3
        tab.children[2].innerText = dat.getHours() - 2
        tab.children[3].innerText = dat.getHours() - 1
        tab.children[4].innerText = dat.getHours()
        tab.children[5].innerText = dat.getHours() + 1
        tab.children[6].innerText = dat.getHours() + 2
        tab.children[7].innerText = dat.getHours() + 3
    };

    var asd = document.querySelector(`div[id=table_time_${id}] > table > tbody > tr`);
    asd.children[8].onclick = function () {
        if (asd.children[7].innerText < 23) {
            for (var i = 1; i < 8; i++) {
                asd.children[i].style.backgroundColor = '';
                asd.children[i].innerText = Number(asd.children[i].innerText) + 1
            }
            
            var busy_time = document.getElementById(`table_time_${id}`).getAttribute('busy_time');
            if (busy_time !== null) {
                busy_time = busy_time.split(';');
                var tab = document.getElementById(`table_time_${id}`).firstElementChild.firstElementChild.firstElementChild;
                for (var i = 0; i < busy_time.length; i++) {
                    for (var ii = 1; ii < 8; ii++) {
                        if ( busy_time[i] == tab.children[ii].innerText || busy_time[i] == '0' + tab.children[ii].innerText ) {  tab.children[ii].style.backgroundColor = 'lightblue';}
                    }
                }
            }
        }	
    }
    asd.children[0].onclick = function () {
        if (asd.children[1].innerText > 0) {
            for (var i = 1; i < 8; i++) {
                asd.children[i].style.backgroundColor = '';
                asd.children[i].innerText = Number(asd.children[i].innerText) - 1
            }
            
            var busy_time = document.getElementById(`table_time_${id}`).getAttribute('busy_time');
            if (busy_time !== null) {
                busy_time = busy_time.split(';');
                var tab = document.getElementById(`table_time_${id}`).firstElementChild.firstElementChild.firstElementChild;
                for (var i = 0; i < busy_time.length; i++) {
                    for (var ii = 1; ii < 8; ii++) {
                        if ( busy_time[i] == tab.children[ii].innerText || busy_time[i] == '0' + tab.children[ii].innerText ) {  tab.children[ii].style.backgroundColor = 'lightblue';}
                    }
                }
            }
        }	
    }
}

function no_responce(id) {
    var elm = document.createElement('span');
    let status = document.getElementById('info_student_status');
    status.insertBefore(elm, status.children[1]);
    elm.outerHTML = `<span id="no_responce" title="Недозвон? Жми" style="float: left; padding: 0px 1px; border-right: solid black 1px; border-bottom: 1px solid black; height: 23px;">${svg_phone}</span>`;

    let ticket_id;
    if (window.location.href.indexOf('cases/record') !== -1) {
        ticket_id = window.location.pathname.match(/([0-9-]+\/)/g)[0].slice(0, -1);
    }

    document.getElementById('no_responce').onclick = function () {
        let body;
        if (window.location.href.indexOf('cases/record') === -1) body = prompt('Введите комментарий к логу:').trim();

        if (ticket_id || body) {
            chrome.runtime.sendMessage({ name: "script_pack", question: 'crm2_no_responce', id: id, ticket_id: ticket_id, body: body }, function (response) {
                if (response.answer == 'done') {
                    document.getElementById('no_responce').style.backgroundColor = 'green';
                } else {
                    document.getElementById('no_responce').style.backgroundColor = 'red';
                }
            });
        }
    };
}



function getIdUsersHash(hash){
    document.querySelector('#student_id_res').innerText = 'загрузка..'
    chrome.runtime.sendMessage({name: "script_pack", question: 'get_id_users_hash', hash: hash}, function(response) {
        b = (response.answer);
        console.log(b)
        document.querySelector('#student_id_res').innerText = b.studentId
        
    });
    console.log("test")
    document.querySelector('#block-hash').classList.remove ('display-block-hash');
}