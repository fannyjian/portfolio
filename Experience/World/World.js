import * as THREE from "three";
import Experience from "../Experience";
import Prince from "./Prince";
import Controls from "./Controls";
import Environment from "./Environment";
import Sky from "./Sky";

export default class World {
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;

        this.resources.on("ready", () => {
            this.environment = new Environment();
            this.prince = new Prince();
            this.sky = new Sky();
            this.controls = new Controls();
        })

    }

    resize() {

    }

    update() {
        if (this.prince) {
            this.prince.update();
        }

        if (this.controls) {
            this.controls.update();
        }

        if (this.sky) {
            this.sky.update();
        }
    }
}