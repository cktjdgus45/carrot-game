"use strict";

import * as sound from "./sound.js";

const CARROT_SIZE = 80;

export const ItemType = Object.freeze({
  carrot: "carrot",
  bug: "bug",
});

export class Field {
  constructor(carrotCount, bugCount) {
    this.field = document.querySelector(".game__field");
    this.fieldRect = this.field.getBoundingClientRect();
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.field.addEventListener("click", (event) => this.onClick(event));
  }

  init() {
    this.field.innerHTML = "";
    this._addItem("carrot", this.carrotCount, "./img/carrot.png", "c");
    this._addItem("bug", this.bugCount, "./img/bug.png", "b");
  }

  _addItem(className, count, imgPath, idDivider) {
    const fieldRect = this.field.getBoundingClientRect();
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width - CARROT_SIZE;
    const y2 = this.fieldRect.height - CARROT_SIZE;
    console.log(x2, y2);
    for (let i = 0; i < count; i++) {
      const item = document.createElement("img");
      item.setAttribute("class", className + " " + "scale");
      item.setAttribute("src", imgPath);

      item.style.position = "absolute";
      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);

      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      item.style.cursor = "pointer";
      this.field.appendChild(item);
    }
  }
  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  onClick(event) {
    const target = event.target;
    if (target.matches(".carrot")) {
      sound.playCarrot();
      target.remove();
      this.onItemClick && this.onItemClick(ItemType.carrot);
    } else if (target.matches(".bug")) {
      this.onItemClick && this.onItemClick(ItemType.bug);
    }
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
