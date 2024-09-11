"use strict";
class ThemeRoller extends HTMLElement {
  #themes = [];
  #currentTheme = "";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
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

  makeDraggable(element) {
    let isDragging = false;
    let offset = { x: 0, y: 0 };

    element.addEventListener("mousedown", (e) => {
      isDragging = true;
      offset.x = e.offsetX;
      offset.y = e.offsetY;
    });

    document.addEventListener("mousemove", (e) => {
      if (isDragging) {
        element.style.right = window.innerWidth - e.clientX - offset.x + "px";
        element.style.bottom = window.innerHeight - e.clientY - offset.y + "px";
      }
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;
    });
  }

  render() {
    const circle = document.createElement("div");
    circle.style.position = "fixed";
    circle.style.width = "50px";
    circle.style.height = "50px";
    circle.style.borderRadius = "50%";
    circle.style.cursor = "pointer";
    circle.style.bottom = "20px";
    circle.style.right = "20px";
    circle.style.backgroundColor = "var(--primary-color)";
    circle.style.zIndex = "1000";
    circle.style.border = "2px solid rgba(255, 255, 255, 1)";

    this.shadowRoot.appendChild(circle);

    this.makeDraggable(circle);

    circle.addEventListener("click", () => {
      console.log("Clicked circle");
      this.nextTheme();
    });
  }
}

customElements.define("theme-roller", ThemeRoller);
