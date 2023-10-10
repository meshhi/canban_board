import Task from "./Task";

export default class Column {
    constructor() {
        this.column = document.createElement('div');
        this.column.classList.add('column');
        
        this.columnHeader = document.createElement('header');
        this.columnHeader.classList.add('column-header');
        this.columnHeader.textContent = 'Column';
        this.column.appendChild(this.columnHeader);
    
        this.taskList = document.createElement('div');
        this.taskList.classList.add('task-list');
        this.column.appendChild(this.taskList);
    
        this.addBtn = document.createElement('div');
        this.addBtn.classList.add('add-task-btn');
        this.addBtn.textContent = '+ Add another card';
        this.column.appendChild(this.addBtn);

        this.addBtn.addEventListener('click', this.addTask);
    }

    bindToBoard = (board) => {
        board.appendChild(this.column);
    }

    addTask = () => {
        const task = new Task();
        this.taskList.appendChild(task.task);
    }
}