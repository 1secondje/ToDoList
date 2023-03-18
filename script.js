// Variables
let taskNameInput = document.querySelector(".addTaskText");
let addTaskButton = document.querySelector(".addTask");
let taskList = document.querySelector(".todo");
let startMessage = document.querySelector(".start-message");
let notCompleted = document.querySelector('.not-completed-tasks');
let showAll = document.querySelector('.show-all');
let deleteAllBtn = document.querySelector('.deleteAll')
let tasks = [];
// 

// EventListeners
addTaskButton.addEventListener("click", addTaskHandler);
deleteAllBtn.addEventListener('click', deleteAll)
taskNameInput.addEventListener("keydown", function (e) {
	if (e.code == "Enter") addTaskHandler();
})
notCompleted.addEventListener('click', showNotCompleted);
showAll.addEventListener('click', showAllTasks)
// 

// class Task
class Task {
	constructor(text) {
		this.text = text;
		this.isDone = false;
		this.div = null;
		this.isDeleted = false;
	}

	createTask(element) {
		this.div = document.createElement("div");
		this.div.classList.add("task");

		let li = document.createElement("li");
		li.innerText = this.text;

		let input = document.createElement("input");
		input.classList.add('checked')
		input.type = "checkbox";
		input.addEventListener("click", () => this.changeState(this.div));

		let editButton = document.createElement('div');
		editButton.classList.add('editBtn');
		editButton.textContent = '✎'
		editButton.addEventListener('click', () => this.editTask(li));

		let deleteButton = document.createElement('div');
		deleteButton.dataset.id = 'delete';
		deleteButton.classList.add('deleteBtn');
		deleteButton.textContent = 'X'
		deleteButton.addEventListener('click', () => this.deleteTask(this.div));

		this.div.append(input);
		this.div.append(li);
		this.div.append(editButton);
		this.div.append(deleteButton);

		if (this.isDone) {
			this.div.classList.add('completed');
			input.checked = true;
		}

		if (!this.isDeleted) {
			element.append(this.div);
		}
	}
// methods
	editTask(element) {
		if (element.querySelector('.editInput')) {
			const newValue = element.querySelector('.editInput').value;
			if (newValue == '') {
				alert('enter task')
			} else {
				element.innerText = newValue;
				this.text = newValue;
				return;
			}
		}

		element.innerText = '';
		let newInput = document.createElement('input');
		newInput.setAttribute('type', 'text');
		newInput.setAttribute('maxlength', '35')
		newInput.classList.add('editInput')
		newInput.value = this.text;
		element.append(newInput);

		newInput.addEventListener('keydown', (e) => {
			const newValue = element.querySelector('.editInput').value;
			if (e.code == "Enter") {
				if (newValue == '') {
					alert('enter task')
				} else {
					element.innerText = newValue;
					this.text = newValue;
					return;
				}
			}
		});
		// 
		newInput.focus();
	}
	
	changeState(element) {
		this.isDone = !this.isDone;
		element.classList.toggle("completed");
	}

	deleteTask() {
		const index = tasks.indexOf(this);
		if (index !== -1) {
			tasks.splice(index, 1);
		}
		this.div.remove();
		this.isDeleted = true;
		if (tasks.length == 0) {
			startMessage.hidden = false;
		}
	}
}
// 

// functions
function addTaskHandler() {
	if (taskNameInput.value) {
		if (!startMessage.hidden) startMessage.hidden = true;
		let newTask = new Task(taskNameInput.value);
		newTask.createTask(taskList);
		tasks.push(newTask);
		taskNameInput.value = "";
	} else {
		alert('Enter task name')
	}
}

function deleteAll() {
	for (i = 0; i < tasks.length; i++) {
		let task = document.querySelector('.task')
		task.remove()
	}
	tasks = [];
	startMessage.hidden = false;
}

function showNotCompleted() {
	taskList.innerHTML = '';
	for (let task of tasks) {
		if (!task.isDone) {
			task.createTask(taskList)
		}
	}
}

function showAllTasks() {
	taskList.innerHTML = '';
	tasks.forEach(task => task.createTask(taskList))
}
// 
