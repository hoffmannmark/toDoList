import './main.sass';

// variables
let addButton = document.getElementById("addBtn");
let close = document.getElementsByClassName("todo__item-close");
let list = document.querySelector('ul');


// Close button
for (let i = 0; i < close.length; i++) {
    close[i].onclick = function () {
        let div = this.parentElement.parentElement;
        div.remove();
    }
}

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

// Create a new list item when click button
addButton.addEventListener('click', function (event) {
    let li = document.createElement("li");
    let addClassWarning = document.getElementById("inputText");
    let inputValue = document.getElementById("inputText").value;
    let todo = [];
    todo.push(inputValue);

    localStorage.setItem('toDoItem', JSON.stringify(todo));

    // li.appendChild(addItem);
    li.className = "todo__item";
    li.innerHTML = `
        <label class="todo__item-label">
            <input class="todo__item-checkbox" type="checkbox">
            ${inputValue}
        </label>
        <div class="todo__item-icons">
            <img class="todo__item-icon todo__item-close" src="https://raw.githubusercontent.com/hoffmannmark/toDoList/639d36b4c8566d86eaaa657cb64608f62e6060ad/img/trash.svg" alt="">
        </div>`;

    if (inputValue === '') {
        addClassWarning.classList.add("todo__header-warning");
        setTimeout(() => addClassWarning.classList.remove("todo__header-warning"), 2500);
    } else {
        document.getElementById("itemsList").appendChild(li);
    }

    document.getElementById("inputText").value = "";

    for (let i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            let div = this.parentElement.parentElement;
            div.remove();
        }
    }

});



