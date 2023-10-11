/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/components/Task.js
class Task {
  constructor(isShadow) {
    this.task = document.createElement("div");
    this.task.classList.add("task");
    if (isShadow) {
      this.task.classList.add("shadow");
      return;
    }
    this.task.text = document.createElement("textarea");
    this.task.text.classList.add("task-text");
    this.task.appendChild(this.task.text);
    this.task.deleteBtn = document.createElement("input");
    this.task.deleteBtn.type = "button";
    this.task.deleteBtn.classList.add("task-delete-btn");
    this.task.appendChild(this.task.deleteBtn);
    this.task.deleteBtn.addEventListener("click", this.deleteTask);
  }
  deleteTask = () => {
    this.task.remove();
  };
}
;// CONCATENATED MODULE: ./src/js/components/Column.js

class Column {
  newTask = undefined;
  constructor(columnName) {
    this.column = document.createElement("div");
    this.column.classList.add("column");
    this.columnHeader = document.createElement("header");
    this.columnHeader.classList.add("column-header");
    this.columnHeader.textContent = columnName;
    this.column.appendChild(this.columnHeader);
    this.taskList = document.createElement("div");
    this.taskList.classList.add("task-list");
    this.column.appendChild(this.taskList);
    this.addContainer = document.createElement("div");
    this.addContainer.classList.add("add-container");
    this.addBtn = document.createElement("div");
    this.addBtn.classList.add("add-task-btn");
    this.addBtn.textContent = "+ Add another card";
    this.addContainer.appendChild(this.addBtn);
    this.addCurrentTaskContainer = document.createElement("div");
    this.addCurrentTaskContainer.classList.add("add-current-task-container");
    this.addContainer.appendChild(this.addCurrentTaskContainer);
    this.addCurrentTaskBtn = document.createElement("div");
    this.addCurrentTaskBtn.classList.add("add-current-task-btn");
    this.addCurrentTaskBtn.textContent = "Add Card";
    this.addCurrentTaskContainer.appendChild(this.addCurrentTaskBtn);
    this.cancelAddCurrentTaskBtn = document.createElement("div");
    this.cancelAddCurrentTaskBtn.classList.add("cancel-add-current-task-btn");
    this.addCurrentTaskContainer.appendChild(this.cancelAddCurrentTaskBtn);
    this.column.appendChild(this.addContainer);
    this.addBtn.addEventListener("click", this.addTask);
    this.addCurrentTaskBtn.addEventListener('click', this.approveNewTaskCreationHandler);
    this.cancelAddCurrentTaskBtn.addEventListener('click', this.cancelNewTaskCreationHandler);
  }
  bindToBoard = board => {
    board.appendChild(this.column);
  };
  approveNewTaskCreationHandler = () => {
    this.addBtn.style.display = "flex";
    this.addCurrentTaskContainer.style.display = "none";
    this.newTask.task.classList.remove('creating-task');
    document.removeEventListener('click', this.cancelNewTaskCreationCauseWrongElementClickHandler);
    document.removeEventListener('mousedown', this.cancelNewTaskCreationCauseWrongElementClickHandler);
    this.newTask = undefined;
  };
  cancelNewTaskCreationHandler = () => {
    this.addBtn.style.display = "flex";
    this.addCurrentTaskContainer.style.display = "none";
    this.newTask.task.remove();
    document.removeEventListener('click', this.cancelNewTaskCreationCauseWrongElementClickHandler);
    document.removeEventListener('mousedown', this.cancelNewTaskCreationCauseWrongElementClickHandler);
    this.newTask = undefined;
  };
  cancelNewTaskCreationCauseWrongElementClickHandler = e => {
    if (!this.newTask) return;
    if (this.addBtn === e.target) return;
    if (this.addCurrentTaskBtn === e.target) return;
    if (this.cancelAddCurrentTaskBtn === e.target) return;
    this.cancelNewTaskCreationHandler();
  };
  addTask = () => {
    this.newTask = new Task();
    this.taskList.appendChild(this.newTask.task);
    this.newTask.task.querySelector('.task-text').focus();
    this.newTask.task.classList.add('creating-task');
    this.addBtn.style.display = "none";
    this.addCurrentTaskContainer.style.display = "flex";
    document.addEventListener('click', this.cancelNewTaskCreationCauseWrongElementClickHandler);
    document.addEventListener('mousedown', this.cancelNewTaskCreationCauseWrongElementClickHandler);
  };
}
;// CONCATENATED MODULE: ./src/js/components/Board.js


class Board {
  offsetLeft = undefined;
  offsetTop = undefined;
  constructor(columnNumber, columnNames) {
    this.board = this.createBoardElement();
    this.columns = [];
    this.createColumns(columnNumber, columnNames);
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
  createColumns = (columnNumber, columnNames) => {
    for (let i = 0; i < columnNumber; i++) {
      const boardColumn = new Column(columnNames[i]);
      this.columns.push(boardColumn);
      boardColumn.bindToBoard(this.board);
    }
  };
  bindToDOM = container => {
    container.appendChild(this.board);
  };
  changeCardPosition = e => {
    this.draggingElement.style.left = e.clientX - this.offsetLeft + "px";
    this.draggingElement.style.top = e.clientY - this.offsetTop + "px";
  };
  insertElementDependingOnHoverTask = (hoverElement, insertElement) => {
    const task = hoverElement.closest(".task");
    if (task.nextSibling) {
      task.insertAdjacentElement("beforebegin", insertElement);
    } else {
      task.insertAdjacentElement("afterend", insertElement);
    }
  };
  mouseDownHandler = e => {
    if (e.target.classList.contains('task-text')) {
      e.target.closest(".task").focus();
    }
    ;
    if (e.target.classList.contains('task-delete-btn')) {
      e.target.closest(".task").remove();
      return;
    }
    ;
    if (!e.target.closest(".task")) return;
    this.draggingElement = e.target.closest(".task");
    document.documentElement.classList.add("force-grabbing");
    const rects = this.draggingElement.getBoundingClientRect();
    this.offsetLeft = e.x - rects.left;
    this.offsetTop = e.y - rects.top;
    this.draggingElement.classList.add("dragging");
    this.changeCardPosition(e);
    this.draggingElement.insertAdjacentElement('beforebegin', this.shadowElement);
  };
  mouseUpHandler = e => {
    document.documentElement.classList.remove("force-grabbing");
    if (!this.draggingElement) return;
    this.hoverElement = document.elementFromPoint(e.clientX, e.clientY);
    if (this.hoverElement.classList.contains('shadow')) {
      this.insertElementDependingOnHoverTask(this.shadowElement, this.draggingElement);
    }
    ;
    this.draggingElement.classList.remove("dragging");
    this.draggingElement.querySelector('.task-text').focus();
    this.draggingElement = undefined;
    this.offsetLeft = undefined;
    this.offsetTop = undefined;
    this.hoverElement = undefined;
    this.shadowElement.remove();
  };
  mouseMoveHandler = e => {
    if (!this.draggingElement) return;
    document.body.style.userSelect = "none";
    this.hoverElement = document.elementFromPoint(e.clientX, e.clientY);
    this.changeCardPosition(e);
    if (this.hoverElement.classList.contains("task-list")) {
      this.hoverElement.appendChild(this.shadowElement);
    } else if (this.hoverElement.closest(".task")) {
      this.insertElementDependingOnHoverTask(this.hoverElement, this.shadowElement);
    } else if (this.hoverElement.classList.contains("shadow")) {
      return;
    }
  };
  addDragAndDrop = () => {
    this.board.addEventListener("mousedown", this.mouseDownHandler);
    this.board.addEventListener("mousemove", this.mouseMoveHandler);
    document.addEventListener("mouseup", this.mouseUpHandler);
  };
}
;// CONCATENATED MODULE: ./src/js/app.js

const baseContainer = document.createElement("div");
baseContainer.classList.add("container");
document.body.appendChild(baseContainer);
const board = new Board(3, ['TODO', 'IN PROGRESS', 'LATER']);
board.bindToDOM(baseContainer);
;// CONCATENATED MODULE: ./src/index.js



// TODO: write your code in app.js
/******/ })()
;