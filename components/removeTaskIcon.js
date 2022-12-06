import { readTasks } from './readTasks.js';

const removeTaskIcon = (id) => {
	const i = document.createElement('i');
	i.classList.add('fas', 'fa-trash-alt', 'trashIcon', 'icon');
	i.addEventListener('click', () => removeTaskHandler(id));
	return i;
};

const removeTaskHandler = (id) => {
	const list = document.querySelector('[data-list]');

	const tasks = JSON.parse(localStorage.getItem('tasks'));
	const index = tasks.findIndex((item) => item.id === id);
	tasks.splice(index, 1);

	list.innerHTML = '';

	localStorage.setItem('tasks', JSON.stringify(tasks));
	readTasks();
};

export default removeTaskIcon;
