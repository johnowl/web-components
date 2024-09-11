"use strict";

HTMLElement.prototype.makeDraggable = function () {
  let isDragging = false;
  let offset = { x: 0, y: 0 };

  this.addEventListener("mousedown", (e) => {
    isDragging = true;
    offset.x = e.offsetX;
    offset.y = e.offsetY;
  });

  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      this.style.right = window.innerWidth - e.clientX - offset.x + "px";
      this.style.bottom = window.innerHeight - e.clientY - offset.y + "px";
    }
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });
};

class ThemeRoller extends HTMLElement {
  #themes = [];
  #currentTheme = "";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <style>
        div#themeRoller {
          position: fixed;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          cursor: pointer;
          bottom: 20px;
          right: 20px;
          background-color: var(--primary-color);
          z-index: 1000;
          border: 2px solid rgba(255, 255, 255, 1);
        }
      </style>
      <div id="themeRoller"></div>
    `;
  }

  connectedCallback() {
    const circle = this.shadowRoot.getElementById("themeRoller");
    circle.makeDraggable();
    circle.addEventListener("click", () => {
      console.log("Clicked circle");
      this.nextTheme();
    });
  }

  static get observedAttributes() {
    return ["themes", "current-theme"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "themes") {
      this.#themes = newValue.split(",");
      console.log("Themes", this.#themes);
    }

    if (name === "current-theme") {
      this.#currentTheme = newValue;
      console.log("Current theme", this.#currentTheme);
      this.nextTheme();
    }
  }

  nextTheme() {
    const currentThemeIndex = this.#themes.indexOf(this.#currentTheme);
    console.log("Current theme index", currentThemeIndex);
    if (currentThemeIndex === -1) {
      console.error(
        `Current theme [${currentTheme}] not found in themes array`
      );
      return;
    }

    const nextThemeIndex = (currentThemeIndex + 1) % this.#themes.length;
    const nextTheme = this.#themes[nextThemeIndex];
    this.#currentTheme = nextTheme;

    document.body.classList.remove(...this.#themes);
    document.body.classList.add(nextTheme);
  }
}

customElements.define("theme-roller", ThemeRoller);
