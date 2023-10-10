import Column from "./Column";

export class Board {
    offsetLeft = undefined;
    offsetTop = undefined;

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

    changeCardPosition = (e) => {       
        this.draggingElement.style.left = e.clientX - this.offsetLeft + 'px';
        this.draggingElement.style.top = e.clientY  - this.offsetTop + 'px';
    }

    mouseDownHandler = (e) => {
        if (!e.target.classList.contains('task')) return;
        this.draggingElement = e.target;
        document.documentElement.classList.add('force-pointer');
        const rects = e.target.getBoundingClientRect();
        this.offsetLeft = e.x - rects.left;
        this.offsetTop = e.y - rects.top;
        e.target.classList.add('dragging');
        this.changeCardPosition(e);
    }

    mouseUpHandler = (e) => {
        document.documentElement.classList.remove('force-pointer');
        if (!this.draggingElement) return;
        const hoverElement = document.elementFromPoint(e.clientX, e.clientY);
        if (hoverElement.classList.contains('task-list')) {
            hoverElement.appendChild(this.draggingElement);
        }
        if (hoverElement.closest('.task')) {
            hoverElement.closest('.task').insertAdjacentElement('beforebegin', this.draggingElement);
        }
        this.draggingElement.classList.remove('dragging');
        this.draggingElement = undefined;
        this.offsetLeft = undefined;
        this.offsetTop = undefined;
    }

    mouseMoveHandler = (e) => {
        if (!this.draggingElement) return;
        document.body.style.userSelect = 'none'
        this.changeCardPosition(e);
    }

    addDragAndDrop = () => {
        this.board.addEventListener('mousedown', this.mouseDownHandler);
        this.board.addEventListener('mousemove', this.mouseMoveHandler);
        document.addEventListener('mouseup', this.mouseUpHandler);
    }
}