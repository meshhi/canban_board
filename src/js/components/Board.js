import Column from "./Column";

export class Board {
    constructor(columnNumber) {
        this.board = this.createBoardElement();
        this.columns = [];
        this.createColumns(columnNumber);
        this.draggingElement = undefined;
        this.addDragAndDrop();
    }

    createBoardElement = () => {
        const board = document.createElement('div');
        board.classList.add('board');
        return board;
    }

    createColumns = (columnNumber) => {
        for (let i = 0; i < columnNumber; i++) {
            const boardColumn = new Column();
            this.columns.push(boardColumn);
            boardColumn.bindToBoard(this.board);
        }
    }

    bindToDOM = (container) => {
        container.appendChild(this.board);
    }

    mouseDownHandler = (e) => {
        if (!e.target.classList.contains('task')) return;
        this.draggingElement = e.target;
        e.target.classList.add('dragging');
    }

    mouseUpHandler = (e) => {
        if (!this.draggingElement) return;
        if(e.target.classList.contains('task-list')) {
            e.target.appendChild(this.draggingElement);
        };
        this.draggingElement.classList.remove('dragging');
        this.draggingElement = undefined;
    }

    mouseMoveHandler = (e) => {
        if (!this.draggingElement) return;
        document.body.style.userSelect = 'none'
        this.draggingElement.style.left = e.screenX + 'px';
        this.draggingElement.style.top = e.screenY + 'px';
    }

    addDragAndDrop = () => {
        this.board.addEventListener('mousedown', this.mouseDownHandler);
        this.board.addEventListener('mousemove', this.mouseMoveHandler);
        document.addEventListener('mouseup', this.mouseUpHandler);
    }
}