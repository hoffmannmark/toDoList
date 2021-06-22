import './main.sass';

// variables
let addButtonAction = document.getElementById("addBtn");
let close = document.getElementsByClassName("todo__item-close");
let list = document.querySelector('ul');
let getLocalStorage = () => {
    return JSON.parse(localStorage.getItem('toDoItem'));
};
let html = function (itemValue) {
    return `
        <label class="todo__item-label">
            <input class="todo__item-checkbox" type="checkbox">
            ${itemValue}
        </label>
        <div class="todo__item-icons">
            <img class="todo__item-icon todo__item-close" src="https://raw.githubusercontent.com/hoffmannmark/toDoList/639d36b4c8566d86eaaa657cb64608f62e6060ad/img/trash.svg" alt="">
        </div>`
};

// Add checked status
list.addEventListener('click', function (ev) {
    if (ev.target.tagName === 'LABEL') {
        ev.target.classList.toggle('todo__item-checked');

        checkClass();
    }
}, false);

// Enter button push action
let input = document.getElementById("inputText");
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
function addItem(value) {
    let hotLocalStorage = JSON.parse(localStorage.getItem("toDoItem"));

    hotLocalStorage.push(value);
    localStorage.removeItem('toDoItem');
    localStorage.setItem('toDoItem', JSON.stringify(hotLocalStorage));

    // localStorage.removeItem('checkedItem');
    // localStorage.setItem('checkedItem', JSON.stringify(hotLocalStorage));

    initTodo();
}

// Check status item
function checkClass() {
    let checked = document.getElementsByClassName('todo__item-label');
    let checkedStorage = localStorage.getItem("hotLocalStorage");

    if (checked !== null) {
        localStorage.setItem('checkedItem', JSON.stringify(checkedStorage));
    }
    checked.setAttribute('data-id');

}
