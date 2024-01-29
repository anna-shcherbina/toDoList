const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const headerButton = document.querySelector('.header-button');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

let toDoData = []

const setLocalStorage = function () {
    localStorage.setItem('toDoDataStored', JSON.stringify(toDoData));
};

const getLocalStorage = function (str) {
    return JSON.parse(localStorage.getItem(str) || []);
};

const render = function () {
    todoList.innerHTML = '';
    todoCompleted.innerHTML = '';

    toDoData = getLocalStorage('toDoDataStored');


    toDoData.forEach(function (item, i) {
        const li = document.createElement('li');

        li.classList.add('todo-item');

        li.innerHTML = '<span class="text-todo">' + item.text + '</span>' +
            '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
            '</div>'

        if (item.completed && item.text !== '') {
            todoCompleted.append(li)
        } else if (!item.completed && item.text !== '') {
            todoList.append(li)
        };

        li.querySelector('.todo-complete').addEventListener('click', function () {
            item.completed = !item.completed
            setLocalStorage('toDoDataStored');
            render();
        });

        li.querySelector('.todo-remove').addEventListener('click', function () {
            toDoData.splice(i, 1); // возвращает массив без удаленного эл-та по клику на Корзину
            setLocalStorage('toDoDataStored'); //сохраняет массив без удал.эл-тов в LStorage
            render();
        })
    })
    console.log(toDoData);
}

todoControl.addEventListener('submit', function (event) {

    event.preventDefault(); //останавливает перезагрузку страницы после ввода данных + Enter

    if (headerInput.value !== '') {

        const newToDo = {
            text: headerInput.value,
            completed: false
        }
        toDoData.push(newToDo);
        headerInput.value = ''; //очищение поля ввода инпута

        setLocalStorage('toDoDataStored');
        render();
    };
})
render();








