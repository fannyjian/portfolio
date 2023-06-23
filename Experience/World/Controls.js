import * as THREE from "three";
import GSAP from "gsap";

import Experience from "../Experience";

export default class Controls {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;
        this.time = this.experience.time;

    }

    resize() {
    }


    update() {

    }
}