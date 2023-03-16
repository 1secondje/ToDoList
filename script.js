let taskNameInput = document.querySelector(".addTaskText");
let addTaskButton = document.querySelector(".addTask");
let taskList = document.querySelector(".todo");
let notCompleted = document.querySelector('#not-completed-tasks');
let showAll = document.querySelector('#show-all');
let tasks = [];

addTaskButton.addEventListener("click", addTaskHandler);

taskNameInput.addEventListener("keydown", function (e) {
	if (e.code == "Enter") addTaskHandler();
})

// notCompleted.addEventListener('click', showNotCompleted);
// showAll.addEventListener('click', showAllTasks)

function addTaskHandler() {
	if (taskNameInput.value) {
		let newTask = new Task(taskNameInput.value);
		newTask.createTask(taskList);
		tasks.push(newTask);
		taskNameInput.value = "";
	} else {
		alert('Enter task name')
	}
}

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
		input.addEventListener("click", () => this.changeState(this.div));
		input.type = "checkbox";

		let deleteButton = document.createElement('div');
		deleteButton.dataset.id = 'delete';
		deleteButton.classList.add('deleteBtn');
		deleteButton.textContent = 'X'
		deleteButton.addEventListener('click', () => this.deleteTask(this.div));

		this.div.append(input);
		this.div.append(li);
		this.div.append(deleteButton);

		if (this.isDone) {
			this.div.classList.add('completed');
			input.checked = true;
		}

		if (!this.isDeleted) {
			element.append(this.div);
		}

	}

	changeState(element) {
		this.isDone = !this.isDone;
		element.classList.toggle("completed");
	}

	deleteTask() {
		this.div.remove();
		this.isDeleted = true;
	}

}

// function showNotCompleted() {
// 	taskList.innerHTML = '';
// 	for (let task of tasks) {
// 		if (!task.isDone) {
// 			task.createTask(taskList)
// 		}
// 	}
// }

// function showAllTasks() {
// 	taskList.innerHTML = '';
// 	tasks.forEach(task => task.createTask(taskList))
// }