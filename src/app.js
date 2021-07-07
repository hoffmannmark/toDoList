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
let storage = JSON.parse(localStorage.getItem("toDoItem"));
let input = document.getElementById("inputText");
let item = document.getElementsByTagName('todo__list-label');

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

// init ToDoList when page is loaded
window.addEventListener('DOMContentLoaded', function (event) {
    initTodo();
    watchCheckedStatus();
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

// checked status when click
onclick = function (ev) {

        if (ev.target.tagName === 'LABEL') {
            storage[0].checkedStatus = !storage[0].checkedStatus;
            localStorage.setItem("toDoItem", JSON.stringify(storage));
        }

    watchCheckedStatus();
}

function watchCheckedStatus() {

    let checkBox = document.querySelector('.todo__item-checkbox');
    let label = document.querySelector('.todo__item-label');
    let item = this.parentElement;
    let kkk = item.getAttribute('data-id');

    if (storage[0].checkedStatus === true) {
        checkBox.checked = true;
        label.classList.add('todo__item-checked');
    } else {
        label.classList.remove('todo__item-checked');
        checkBox.checked = false;
    }

}

