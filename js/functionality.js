const button = document.getElementById('mySubmitButton');
const textInput = document.getElementById('descriptionInput');
const dateInput = document.getElementById('dateInput')
const listUIElement = document.getElementById('list');


let listOfTasks = []

button.onclick = e => {
    e.preventDefault();
    addTask();
    resetForm();
    renderListOfTasks();
}

// Función de resetear el form de input

function resetForm() {
    textInput.value = '';
    dateInput.value = '';
}

// Función de añadir tarea

function addTask() {
    console.log('estos son los valores actuales de text y date', textInput.value, dateInput.value)
    const newTask = {
        name: textInput.value,
        dueDate: dateInput.value
    }
    // añadir esta tarea recien creada a la lista que tenemos en memoria listOfTasks
    listOfTasks.push(newTask);
}

// Funciones para mover arriba o abajo con flechas las tareas

function moveTaskUp(index) {
    if (index > 0) {
        const temp = listOfTasks[index];
        listOfTasks[index] = listOfTasks[index - 1];
        listOfTasks[index - 1] = temp;
    }
}

function moveTaskDown(index) {
    if (index < listOfTasks.length - 1) {
        const temp = listOfTasks[index];
        listOfTasks[index] = listOfTasks[index + 1];
        listOfTasks[index + 1] = temp;
    }
}

// Funcion eliminar tareas

function removeTask(indexOfTaskToBeRemoved) {
    listOfTasks.splice(indexOfTaskToBeRemoved, 1);
}

// Funcion pop-up deletion confirmation

function showDeleteConfirmation(index) {
    const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar esta tarea?");
    if (confirmDelete) {
        removeTask(index);
        renderListOfTasks();
    }
}


// Para presentar la lista de tareas en estado final usamos: 

const renderListOfTasks = () => {
    console.log('renderizando lista de tareas')
    // primero dejo la lista vacía para repintar
    listUIElement.innerHTML = '';
    // ahora hago loop para pintar cada tarea dentro de la lista
    listOfTasks.forEach((task, index) => {
        // crear un elemento li
        const liElement = document.createElement('li');
        liElement.className = 'item'


        // crear unos párrafos
        const nameElement = document.createElement('p');
        nameElement.innerText = task.name;
        const dateElement = document.createElement('p');
        dateElement.innerText = task.dueDate;


        // Eliminar tareas locas
        const buttonElement = document.createElement('button');
        buttonElement.innerText = 'ELIMINAR'
        buttonElement.className = 'delete-button'
        buttonElement.onclick = () => {
            showDeleteConfirmation(index);
        }

        //Flechas de subir y bajar elementos
        const buttonUpElement = document.createElement('button');
        buttonUpElement.innerText = '▲';
        buttonUpElement.className = 'arrow-button arrow-up'; // Agrega la clase 'arrow-up'
        buttonUpElement.onclick = () => {
            moveTaskUp(index);
            renderListOfTasks();
        };
    
        const buttonDownElement = document.createElement('button');
        buttonDownElement.innerText = '▼';
        buttonDownElement.className = 'arrow-button arrow-down'; // Agrega la clase 'arrow-down'
        buttonDownElement.onclick = () => {
            moveTaskDown(index);
            renderListOfTasks();
        };


        liElement.appendChild(nameElement)
        liElement.appendChild(dateElement)
        liElement.appendChild(buttonElement)
        liElement.appendChild(buttonUpElement);
        liElement.appendChild(buttonDownElement);

        listUIElement.appendChild(liElement);
    })
}
