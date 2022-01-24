'use-strict'

const navBtn = document.querySelector('.nav #left-item .toggle-btn')
const todoList = document.querySelector('.toDoList')
const taskInput = document.querySelector('.toDoList .add-to-do')
const taskList = document.querySelector('.toDoList .task-list')

if(!localStorage.getItem('taskList'))
    localStorage.setItem('taskList',JSON.stringify([]))

if(!localStorage.getItem('freeIndexQueue'))
    localStorage.setItem('freeIndexQueue',JSON.stringify([]))

let taskListData = JSON.parse(localStorage.getItem('taskList'))
for(let i = 0; i < taskListData.length; i++) {
    if(taskListData[i].removed==false) {
        let html = getItemFromStorage(i,taskListData[i])
        taskList.insertAdjacentHTML('beforeend', html)
    }
}

document.addEventListener('keypress',(e) => {
    if(e.key == 'Enter' && taskInput.value!='') addTask()
})

navBtn.addEventListener('click',(e) => {
    todoList.classList.toggle('invisible')
})

todoList.addEventListener('click',(e) => {
    if(e.target.classList.contains('check-item')) {
        console.log('check');
        checkTask(e.target);

    } else if(e.target.classList.contains('remove-item')) {
        console.log('remove');
        removeTask(e.target);
    }
})

function addTask() {
    let taskListData = JSON.parse(localStorage.getItem('taskList'))
    let freeIndex = JSON.parse(localStorage.getItem('freeIndexQueue'))
    let index = (freeIndex.length > 0) ? freeIndex.shift() : taskListData.length
    localStorage.setItem('freeIndexQueue',JSON.stringify(freeIndex))

    let input = taskInput.value
    let html = `<li class="task-item">
    <i class="far fa-square check-item" data-index=${index}></i>
    <p class="task-text">${input}</p>
    <i class="fas fa-times remove-item" data-index=${index}></i>
    </li>`

    storeItemTOStorage(index,input)
    taskList.insertAdjacentHTML('beforeend', html)
    taskInput.value = ''
}

function checkTask(checkIcon) {
    let index = checkIcon.getAttribute('data-index')
    let taskListData = JSON.parse(localStorage.getItem('taskList'))
    taskListData[index].checked = !taskListData[index].checked
    localStorage.setItem('taskList',JSON.stringify(taskListData))

    checkIcon.classList.toggle('fa-square')
    checkIcon.classList.toggle('fa-check-square')
    checkIcon.nextElementSibling.classList.toggle('task-text-checked')
}

function removeTask(removeIcon) {
    let index = removeIcon.getAttribute('data-index')
    let taskListData = JSON.parse(localStorage.getItem('taskList'))
    let freeIndex = JSON.parse(localStorage.getItem('freeIndexQueue'))
    taskListData[index].removed = true
    freeIndex.push(index)
    localStorage.setItem('taskList',JSON.stringify(taskListData))
    localStorage.setItem('freeIndexQueue',JSON.stringify(freeIndex))

    removeIcon.parentNode.remove()
}

function storeItemTOStorage(index,text,checked=false) {
    let task = {
        text: text,
        checked: checked,
        removed: false,
    }

    if(taskListData.length == index)    
        taskListData.push(task);
    else
        taskListData[index] = task

    localStorage.setItem('taskList',JSON.stringify(taskListData))
}

function getItemFromStorage(index,task) {
    if(task.checked) {
        return `<li class="task-item">
                <i class="far fa-check-square check-item" data-index=${index}></i>
                <p class="task-text task-text-checked">${task.text}</p>
                <i class="fas fa-times remove-item" data-index=${index}></i>
                </li>`
    } else {
        return `<li class="task-item">
                <i class="far fa-square check-item" data-index=${index}></i>
                <p class="task-text">${task.text}</p>
                <i class="fas fa-times remove-item" data-index=${index}></i>
                </li>`
    }
}