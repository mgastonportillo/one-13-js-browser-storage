import completeTaskIcon from './completeTaskIcon.js';
import removeTaskIcon from './removeTaskIcon.js';
import { readTasks } from './readTasks.js';

export const addTask = () => {
	event.preventDefault();

	const list = document.querySelector('[data-list]');

	const input = document.querySelector('[data-form-input]');
	const calendar = document.querySelector('[data-form-datetime]');

	const date = calendar.value;
	const dateFormat = moment(date).format('DD/MM/YYYY');
	const value = input.value;
	if (value.trim() === '' || date === '') {
		alert('Must write a task name and pick a valid date');
		return;
	}

	input.value = '';
	calendar.value = '';
	list.innerHTML = '';

	const complete = false;

	const taskStorage = {
		value,
		dateFormat,
		complete,
		id: uuid.v4(),
	};
	const taskList = JSON.parse(localStorage.getItem('tasks')) || [];
	taskList.push(taskStorage);
	localStorage.setItem('tasks', JSON.stringify(taskList));

	readTasks();
};

export const createTask = ({ value, dateFormat, complete, id }) => {
	const task = document.createElement('li');
	task.classList.add('card');

	const taskContent = document.createElement('div');

	const taskTitle = document.createElement('span');
	taskTitle.classList.add('task');
	taskTitle.innerText = value;

	const check = completeTaskIcon(id);

	if (complete) {
		check.classList.toggle('fas');
		check.classList.toggle('completeIcon');
		check.classList.toggle('far');
		taskTitle.classList.toggle('complete');
	}

	taskContent.appendChild(check);
	taskContent.appendChild(taskTitle);

	const dateElement = document.createElement('span');
	dateElement.innerHTML = dateFormat;

	task.appendChild(taskContent);
	task.appendChild(dateElement);
	task.appendChild(removeTaskIcon(id));

	return task;
};
