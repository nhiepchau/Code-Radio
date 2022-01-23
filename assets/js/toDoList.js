'use-strict'

const navBtn = document.querySelector('.nav #left-item .toggle-btn')
const todoList = document.querySelector('.toDoList')
const taskInput = document.querySelector('.toDoList .add-to-do')
const taskList = document.querySelector('.toDoList .task-list')

document.addEventListener('keypress',(e) => {
    if(e.key == 'Enter' && taskInput.value!='') addTask()
})

navBtn.addEventListener('click',(e) => {
    todoList.classList.toggle('invisible')
})

todoList.addEventListener('click',(e) => {
    if(e.target.classList.contains('check-item'))
        checkTask(e.target);
    else if(e.target.classList.contains('remove-item'))
        removeTask(e.target);
})

function addTask() {
    let input = taskInput.value
    let html = `<li class="task-item">
    <i class="far fa-square check-item"></i>
    <p class="task-text">${input}</p>
    <i class="fas fa-times remove-item"></i>
    </li>`
    taskList.insertAdjacentHTML('beforeend', html)
    taskInput.value = ''
}

function checkTask(checkIcon) {
    checkIcon.classList.toggle('fa-square')
    checkIcon.classList.toggle('fa-check-square')
    checkIcon.nextElementSibling.classList.toggle('task-text-checked')
}

function removeTask(removeIcon) {
    removeIcon.parentNode.remove()
}