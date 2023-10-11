export default class Task {
  constructor(isShadow) {
    this.task = document.createElement("div");
    this.task.classList.add("task");
    if (isShadow) {
      this.task.classList.add("shadow");
      return
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
