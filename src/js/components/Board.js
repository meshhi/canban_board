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

  insertElementDependingOnHoverTask = (hoverElement, insertElement) => {
    hoverElement
      .closest(".task")
      .insertAdjacentElement("beforebegin", insertElement);
  }

  mouseDownHandler = (e) => {
    if (e.target.classList.contains('task-text')) {
      e.target.closest(".task").focus();
    };
    if (e.target.classList.contains('task-delete-btn')) {
      e.target.closest(".task").remove();
      return;
    };
    if (!e.target.closest(".task")) return;
    this.draggingElement = e.target.closest(".task");
    document.documentElement.classList.add("force-grabbing");
    const rects = this.draggingElement.getBoundingClientRect();
    this.offsetLeft = e.x - rects.left; 
    this.offsetTop = e.y - rects.top;
    this.draggingElement.focus();
    this.draggingElement.classList.add("dragging");
    this.changeCardPosition(e);

    this.draggingElement.insertAdjacentElement('beforebegin', this.shadowElement);
  };

  mouseUpHandler = (e) => {
    document.documentElement.classList.remove("force-grabbing");
    if (!this.draggingElement) return;
    this.hoverElement = document.elementFromPoint(e.clientX, e.clientY);
    if (this.hoverElement.classList.contains("task-list")) {
      if (this.hoverElement.querySelector('.shadow')) {
        this.insertElementDependingOnHoverTask(this.shadowElement, this.draggingElement);
      };
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
      if (this.hoverElement.querySelector(".shadow")) {
        return
      };
      this.hoverElement.appendChild(this.shadowElement);
    }
    if (this.hoverElement.closest(".task")) {
      this.insertElementDependingOnHoverTask(this.hoverElement, this.shadowElement);
    }

  };

  addDragAndDrop = () => {
    this.board.addEventListener("mousedown", this.mouseDownHandler);
    this.board.addEventListener("mousemove", this.mouseMoveHandler);
    document.addEventListener("mouseup", this.mouseUpHandler);

    document.addEventListener("click", (e) => {
      // console.log('click')
      // console.log(e.target)
      // if (e.target.classList.contains('task-list')) {
      //   e.target.querySelector('.task-text').focus();
      //   if (this.draggingElement) {
      //     this.draggingElement.querySelector('.task-text').focus();
      //   }
      // }
    });

  };
}
