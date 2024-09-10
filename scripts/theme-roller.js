const themes = [
  "pink-theme",
  "purple-theme",
  "blue-theme",
  "green-theme",
  "orange-theme",
  "dark-theme",
];
let currentThemeIndex = 0;

class ThemeRoller extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

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

    circle.addEventListener("click", function () {
      currentThemeIndex = (currentThemeIndex + 1) % themes.length;
      const nextTheme = themes[currentThemeIndex];
      document.body.classList.remove(...themes);
      document.body.classList.add(nextTheme);
    });
  }

  makeDraggable(element) {
    let isDragging = false;
    let offset = { x: 0, y: 0 };

    element.addEventListener("mousedown", function (e) {
      isDragging = true;
      offset.x = e.offsetX;
      offset.y = e.offsetY;
    });

    document.addEventListener("mousemove", function (e) {
      if (isDragging) {
        element.style.right = window.innerWidth - e.clientX - offset.x + "px";
        element.style.bottom = window.innerHeight - e.clientY - offset.y + "px";
      }
    });

    document.addEventListener("mouseup", function () {
      isDragging = false;
    });
  }
}

customElements.define("theme-roller", ThemeRoller);
