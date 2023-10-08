import { Board } from "./components/Board";

const baseContainer = document.createElement("div");
baseContainer.classList.add("container");
document.body.appendChild(baseContainer);

const board = new Board(3);
board.bindToDOM(baseContainer);