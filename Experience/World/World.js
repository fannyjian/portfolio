import * as THREE from "three";
import EventEmitter from "events";

import Experience from "../Experience";
import Prince from "./Prince";
import Environment from "./Environment";
import Sky from "./Sky";

export default class World extends EventEmitter {
    constructor() {
        super();
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;
        this.theme = this.experience.theme;

        this.resources.on("ready", () => {
            this.environment = new Environment();
            this.prince = new Prince();
            this.sky = new Sky();
            this.emit("worldready");
        })

        this.theme.on("switch", (theme) => {
            this.switchTheme(theme);
        })
    }

    switchTheme(theme) {
        if (this.environment) {
            this.environment.switchTheme(theme);
        }

        if (this.sky) {
            this.sky.switchTheme(theme);
        }
    }

    resize() {

    }

    update() {
        if (this.prince) {
            this.prince.update();
        }

        if (this.sky) {
            this.sky.update();
        }
    }
}