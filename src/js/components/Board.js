import Column from "./Column";
import Task from "./Task";

export class Board {
  offsetLeft = undefined;
  offsetTop = undefined;

  constructor(columnNumber) {
    this.board = this.createBoardElement();
    this.columns = [];
    this.createColumns(columnNumber);
    this.draggingElement = undefined;
    this.hoverElement = undefined;
    this.addDragAndDrop();
    this.shadowElement = new Task(true).task;
  }

  createBoardElement = () => {
    const board = document.createElement("div");
    board.classList.add("board");
    return board;
  };

  createColumns = (columnNumber) => {
    for (let i = 0; i < columnNumber; i++) {
      const boardColumn = new Column();
      this.columns.push(boardColumn);
      boardColumn.bindToBoard(this.board);
    }
  };

  bindToDOM = (container) => {
    container.appendChild(this.board);
  };

  changeCardPosition = (e) => {
    this.draggingElement.style.left = e.clientX - this.offsetLeft + "px";
    this.draggingElement.style.top = e.clientY - this.offsetTop + "px";
  };

  mouseDownHandler = (e) => {
    if (!e.target.classList.contains("task")) return;
    this.draggingElement = e.target;
    document.documentElement.classList.add("force-grabbing");
    const rects = e.target.getBoundingClientRect();
    this.offsetLeft = e.x - rects.left;
    this.offsetTop = e.y - rects.top;
    e.target.classList.add("dragging");
    this.changeCardPosition(e);

    this.draggingElement.insertAdjacentElement('beforebegin', this.shadowElement);
  };

  mouseUpHandler = (e) => {
    document.documentElement.classList.remove("force-grabbing");
    if (!this.draggingElement) return;
    this.hoverElement = document.elementFromPoint(e.clientX, e.clientY);
    if (this.hoverElement.classList.contains("task-list")) {
      this.hoverElement.appendChild(this.draggingElement);
    }
    if (this.hoverElement.closest(".task")) {
      this.hoverElement
        .closest(".task")
        .insertAdjacentElement("beforebegin", this.draggingElement);
    }
    this.draggingElement.classList.remove("dragging");
    this.draggingElement = undefined;
    this.offsetLeft = undefined;
    this.offsetTop = undefined;
    this.hoverElement = undefined;
    this.shadowElement.remove();
  };

  mouseMoveHandler = (e) => {
    if (!this.draggingElement) return;
    document.body.style.userSelect = "none";
    this.hoverElement = document.elementFromPoint(e.clientX, e.clientY);
    this.changeCardPosition(e);

    if (this.hoverElement.classList.contains("task-list")) {
      if (this.hoverElement.querySelector(".shadow")) return;
      this.hoverElement.appendChild(this.shadowElement);
    }
    if (this.hoverElement.closest(".task")) {
      this.hoverElement
        .closest(".task")
        .insertAdjacentElement("beforebegin", this.shadowElement);
    }
  };

  addDragAndDrop = () => {
    this.board.addEventListener("mousedown", this.mouseDownHandler);
    this.board.addEventListener("mousemove", this.mouseMoveHandler);
    document.addEventListener("mouseup", this.mouseUpHandler);
  };
}
