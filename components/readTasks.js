import { createTask } from './addTask.js';
import { uniqueDates } from '../services/date.js';
import dateElement from './dateElement.js';

export const readTasks = () => {
	const list = document.querySelector('[data-list]');
	const taskList = JSON.parse(localStorage.getItem('tasks')) || [];
	const dates = uniqueDates(taskList);

	dates.forEach((date) => {
		list.appendChild(dateElement(date));
		taskList.forEach((task) => {
			if (task.dateFormat === date) {
				list.appendChild(createTask(task));
			}
		});
	});
};
