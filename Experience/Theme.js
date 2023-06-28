import EventEmitter from "events";

export default class Theme extends EventEmitter {
    constructor() {
        super();

        this.theme = "dark";

        this.toggleButton = document.querySelector(".toggle-button")
        this.toggleCircle = document.querySelector(".toggle-circle")

        this.setEventListeners();
    }

    setEventListeners() {
        this.toggleButton.addEventListener("click", () => {
            this.toggleCircle.classList.toggle("slide");
            this.theme = this.theme === "dark" ? "light" : "dark";

            this.emit("switch", this.theme)
        })
    }
}