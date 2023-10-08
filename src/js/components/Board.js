export class Board {
    constructor(columnNumber) {
        this.board = this.createBoardElement();
        this.columns = [];
        for (let i = 0; i < columnNumber; i++) {
            const boardColumn = this.createColumn();
            this.columns.push(boardColumn);
            this.board.appendChild(boardColumn);
        }

        console.log(this.columns);
        this.addTaskHandlers();
    }

    createBoardElement() {
        const board = document.createElement('div');
        board.classList.add('board');
        return board;
    }

    createColumn() {
        const column = document.createElement('div');
        column.classList.add('column');

        const columnHeader = document.createElement('header');
        columnHeader.classList.add('column-header');
        columnHeader.textContent = 'Column';
        column.appendChild(columnHeader);

        const taskList = document.createElement('div');
        taskList.classList.add('task-list');
        column.appendChild(taskList);

        const addBtn = document.createElement('div');
        addBtn.classList.add('add-task-btn');
        addBtn.textContent = '+ Add Task';
        column.appendChild(addBtn);

        return column;
    }

    createTask() {
        const task = document.createElement('div');
        task.classList.add('task');

        task.addEventListener('click', () => {
            task.remove();
        });
        return task;
    }

    addTaskHandlers() {
        for (let column of this.columns) {
            const columnAddTaskBtn = column.querySelector('.add-task-btn');
            const columnTaskList = column.querySelector('.task-list');
            columnAddTaskBtn.addEventListener('click', (e) => {
                e.preventDefault();
                columnTaskList.appendChild(this.createTask());
            });
        }
    }

    bindToDOM(container) {
        container.appendChild(this.board);
    }
}