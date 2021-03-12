window.addEventListener("load", function () {
    //Сначала проверим какой тип аккаунта сейчас активен
    fetch("https://rooms.vimbox.skyeng.ru/users/api/v1/auth/config", {
        "credentials": "include",
        "headers": {
            "accept": "application/json"
        },
        "method": "POST"
    })
        .then(response => {
            if (response.ok) return response.json();
            else false;
        })
        //Нам нужен преподаватель
        .then(response => {
            if (!response) return false;
            let result = false;
            response.roles.forEach(role => {
                if (role === 'teacher') result = true;
            });
            return result;
        })
        .then(state => {
            if (!state) return false;
        
            const studentRemoveButton = document.querySelector('div[skyuitooltip][skyuitooltipposition="below"]');
            const blockNewStudent = document.querySelector('vim-core-lesson-list-student-selector-item[title="New student"] > *');
            const NewStudentRemoveButton = document.createElement('div');

            if (!studentRemoveButton) return false;

            NewStudentRemoveButton.innerHTML = studentRemoveButton.outerHTML;
            //По умолчанию кнопка скрыта, ее нужно показать
            NewStudentRemoveButton.firstElementChild.style.display = 'block';

            blockNewStudent.prepend(NewStudentRemoveButton.firstElementChild, blockNewStudent.firstElementChild);
            return true;
        })
        .then(state => {
            if (!state) return false;
            document.querySelector('vim-core-lesson-list-student-selector-item[data-qa-id="btn-new-student"] > * > .remove').addEventListener("click", removeAllStudents);
        });
});

function removeAllStudents() {
    fetch("https://rooms.vimbox.skyeng.ru/users/api/v1/auth/config", { "credentials": "include", "method": "POST" })
        .then(response => { if (response.ok) return response.json(); else false; })
        .then(json => {
            if (!json || !json.user || !json.user.id) return false;
            else return json.user.id;
        })
        .then(teacher_id => {
            if (!teacher_id) return false;
            else return fetch(`https://rooms.vimbox.skyeng.ru/users/api/v1/teachers/${teacher_id}/students`, { "credentials": "include" });
        })
        .then(response => { if (response.ok) return response.json(); else false; })
        .then(json => {
            if (!json) return false;
            json.forEach(user => {
                console.log('remove user: ', user.id);
                fetch(`https://rooms.vimbox.skyeng.ru/users/api/v1/teachers/unlink-student/${user.id}`, { "credentials": "include", "method": "POST", });
            });
            window.location.reload();
        })
}