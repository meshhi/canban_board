export default class Task {
    constructor() {
        this.task = document.createElement('div');

        this.task.text = document.createElement('input');
        this.task.text.type = 'text';
        this.task.text.classList.add('task-text');
        this.task.appendChild(this.task.text);

        this.task.deleteBtn = document.createElement('input');
        this.task.deleteBtn.type = 'button';
        this.task.deleteBtn.classList.add('task-delete-btn');
        this.task.appendChild(this.task.deleteBtn);
        this.task.deleteBtn.addEventListener('click', this.deleteTask);
        
        this.task.classList.add('task');
        this.task.addEventListener('click', this.addTaskText);
    }

    deleteTask = () => {
        this.task.remove();
    }
}