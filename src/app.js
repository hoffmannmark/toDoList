import './main.sass';

// variables
let addButtonAction = document.getElementById("addBtn");
let close = document.getElementsByClassName("todo__item-close");
let list = document.querySelector('ul');
let toDoItem = [];
let getLocalStorage = JSON.parse(localStorage.getItem('toDoItem'));
let html = function (item_text) {
    return `
        <label class="todo__item-label">
            <input class="todo__item-checkbox" type="checkbox">
            ${item_text}
        </label>
        <div class="todo__item-icons">
            <img class="todo__item-icon todo__item-close" src="https://raw.githubusercontent.com/hoffmannmark/toDoList/639d36b4c8566d86eaaa657cb64608f62e6060ad/img/trash.svg" alt="">
        </div>`
};

// Add checked status
list.addEventListener('click', function (ev) {
    if (ev.target.tagName === 'LABEL') {
        ev.target.classList.toggle('todo__item-checked');
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
    let liCountId = document.querySelectorAll('#itemsList > li').length;
    let addClassWarning = document.getElementById("inputText");
    let inputValue = document.getElementById("inputText").value;
    let li = document.createElement("li");
    li.setAttribute('data-id', liCountId);

    toDoItem.push(inputValue);

    li.className = "todo__item";
    li.innerHTML = html(inputValue);

    // add item & warning
    if (inputValue === '') {
        addClassWarning.classList.add("todo__header-warning");
        setTimeout(() => addClassWarning.classList.remove("todo__header-warning"), 2500);
    } else {
        // return object
        document.getElementById("itemsList").appendChild(li);
        // add ket to array
        localStorage.setItem('toDoItem', JSON.stringify(toDoItem));
    }

    // clean input
    document.getElementById("inputText").value = "";

    // close action
    // for (let i = 0; i < close.length; i++) {
    //     close[i].onclick = function () {
    //
    //         let element = this.parentElement.parentElement;
    //
    //         element.remove();
    //
    //         console.log(localStorage.removeItem('toDoItem'));
    //     }
    // }

});

window.addEventListener('DOMContentLoaded', function (event) {


    initTodo()
    for (let i = 0; i < close.length; i++) {
        close[i].onclick = function () {

            let element = this.parentElement.parentElement;
            let countIndex = element.getAttribute('data-id');
            element.remove();

            var getLocalStorage = JSON.parse(localStorage.getItem("toDoItem"));
            getLocalStorage.splice(countIndex, 1);
            localStorage.removeItem('toDoItem');
            localStorage.setItem('toDoItem', JSON.stringify(getLocalStorage));
            initTodo()
        }
    }

})

function initTodo() {
    for (let i = 0; i < getLocalStorage.length; i++) {
        if (getLocalStorage.length !== null) {
            let liCountId = document.querySelectorAll('#itemsList > li').length;
            let itm = document.createElement("li");
            itm.setAttribute('data-id', liCountId);
            list.appendChild(itm);
            itm.className = 'todo__item';
            itm.innerHTML = html(getLocalStorage[i]);

        }
    }
}