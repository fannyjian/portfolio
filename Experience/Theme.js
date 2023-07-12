import EventEmitter from "events";

export default class Theme extends EventEmitter {
    constructor() {
        super();

        this.theme = "dark";

        this.toggleButton = document.querySelector(".toggle-button")
        this.toggleCircle = document.querySelector(".toggle-circle")
        this.toggleImg = document.querySelector(".toggle-image")

        this.setEventListeners();
    }

    setEventListeners() {
        this.toggleButton.addEventListener("click", () => {
            this.toggleCircle.classList.toggle("slide");
            this.toggleImg.src = this.theme === "dark" ? "./images/sun.png" : "./images/night.png";
            this.theme = this.theme === "dark" ? "light" : "dark";
            document.body.classList.toggle("light-theme");

            this.emit("switch", this.theme)
        })
    }
}