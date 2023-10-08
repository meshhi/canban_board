export class Board {
    constructor(columnNumber) {
        this.board = this.createBoardElement();
        for (let i = 0; i < columnNumber; i++) {
            this.board.appendChild(this.createColumn());
        }
    }

    createBoardElement() {
        const board = document.createElement('div');
        board.classList.add('board');
        return board;
    }

    createColumn() {
        const column = document.createElement('div');
        column.classList.add('column');

        const taskList = document.createElement('div');
        taskList.classList.add('task-list');
        column.appendChild(taskList);

        const addBtn = document.createElement('input');
        addBtn.type = 'button';
        addBtn.classList.add('add-task-btn');
        column.appendChild(addBtn);
        
        return column;
    }

    bindToDOM(container) {
        container.appendChild(this.board);
    }
}