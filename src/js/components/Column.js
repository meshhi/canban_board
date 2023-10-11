import Task from "./Task";

export default class Column {
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

  bindToBoard = (board) => {
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

  cancelNewTaskCreationCauseWrongElementClickHandler = (e) => {
    if (!this.newTask) return;
    if (this.addBtn === e.target) return;
    if (this.addCurrentTaskBtn === e.target) return;
    if (this.cancelAddCurrentTaskBtn === e.target) return;
    this.cancelNewTaskCreationHandler();
  }

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
