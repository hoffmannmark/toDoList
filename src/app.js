import './main.sass';

// variables
let getLocalStorage = () => {
    return JSON.parse(localStorage.getItem('toDoItem'));
};
let html = function (value) {
    return `
        <label class="todo__item-label">
            <input class="todo__item-checkbox" type="checkbox">
            ${value.title}
        </label>
        <div class="todo__item-icons">
            <img class="todo__item-icon todo__item-close" src="https://raw.githubusercontent.com/hoffmannmark/toDoList/639d36b4c8566d86eaaa657cb64608f62e6060ad/img/trash.svg" alt="">
        </div>`
};
let addButtonAction = document.getElementById("addBtn");
let close = document.getElementsByClassName("todo__item-close");
let list = document.querySelector('ul');
let input = document.getElementById("inputText");

initTodo();

// Enter button push action
input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("addBtn").click();
    }
});

// Create a new list item on click button
addButtonAction.addEventListener('click', function (event) {
    let addClassWarning = document.getElementById("inputText");
    let inputValue = document.getElementById("inputText").value;

    if (inputValue === '') {
        addClassWarning.classList.add("todo__header-warning");
        setTimeout(() => addClassWarning.classList.remove("todo__header-warning"), 2500);
    } else {
        addItem(inputValue);
    }

    document.getElementById("inputText").value = "";
});

// Create list item
function initTodo() {
    document.querySelector('#itemsList').innerHTML = "";

    if (getLocalStorage() === null) {
        localStorage.setItem('toDoItem', '[]');
    } else {
        for (let i = 0; i < getLocalStorage().length; i++) {

            let liCountId = document.querySelectorAll('#itemsList > li').length;
            let itm = document.createElement("li");

            itm.setAttribute('data-id', liCountId);

            list.appendChild(itm);
            itm.className = 'todo__item';
            itm.innerHTML = html(getLocalStorage()[i]);

            // check marked items
            if (getLocalStorage()[i].checkedStatus === true) {
                itm.querySelector('label > input').checked = true;
                itm.classList.add('todo__item-checked');
            } else {
                itm.classList.remove('todo__item-checked');
                itm.querySelector('label > input').checked = false;
            }
            // Add event to checkbox and new event
            itm.querySelector('label > input').onclick = function () {

                let countIndex = i;
                let getLocalStorageIn = JSON.parse(localStorage.getItem("toDoItem"));

                getLocalStorageIn[parseInt(countIndex)].checkedStatus = !getLocalStorageIn[countIndex].checkedStatus;
                localStorage.setItem("toDoItem", JSON.stringify(getLocalStorageIn));

                if (getLocalStorage()[countIndex].checkedStatus === true) {
                    itm.querySelector('label > input').checked = true;
                    itm.classList.add('todo__item-checked');
                } else {
                    itm.classList.remove('todo__item-checked');
                    itm.querySelector('label > input').checked = false;
                }

            }

        }
    }

    deleteEventsTodoItem();
}

// Delete list item
function deleteEventsTodoItem() {
    for (let i = 0; i < close.length; i++) {
        close[i].onclick = function () {

            let element = this.parentElement.parentElement;
            let countIndex = element.getAttribute('data-id');
            let getLocalStorage = JSON.parse(localStorage.getItem("toDoItem"));

            element.remove();
            getLocalStorage.splice(countIndex, 1);

            localStorage.removeItem('toDoItem');
            localStorage.setItem('toDoItem', JSON.stringify(getLocalStorage));

            initTodo();
        }
    }
}

// Add list item to localStorage
function addItem() {
    let existingEntries = JSON.parse(localStorage.getItem("toDoItem"));
    let entryTitle = document.getElementById("inputText").value;
    let entry = {
        "title": entryTitle,
        "checkedStatus": false,
    };

    existingEntries.push(entry);
    localStorage.setItem("toDoItem", JSON.stringify(existingEntries));

    initTodo();
}

