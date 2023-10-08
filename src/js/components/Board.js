import Column from "./Column";

export class Board {
    constructor(columnNumber) {
        this.board = this.createBoardElement();
        this.columns = [];
        for (let i = 0; i < columnNumber; i++) {
            const boardColumn = new Column();
            this.columns.push(boardColumn);
            boardColumn.bindToBoard(this.board);
        }
    }

    createBoardElement = () => {
        const board = document.createElement('div');
        board.classList.add('board');
        return board;
    }

    bindToDOM = (container) => {
        container.appendChild(this.board);
    }
}