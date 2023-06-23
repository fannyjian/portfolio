import * as THREE from "three";
import GSAP from "gsap";

import Experience from "../Experience";

export default class Sky {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.setSky();
    }

    setSky() {

    }

    resize() {
    }

    update() {

    }
}