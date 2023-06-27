import * as THREE from "three";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Experience from "../Experience";

export default class Controls {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.prince = this.experience.world.prince.actualPrince;
        GSAP.registerPlugin(ScrollTrigger);

        this.setPath();
    }

    setPath(){
        console.log(this.prince);
        this.timeline = new GSAP.timeline();
        this.timeline.to(this.prince.position, {
            x: 5,
        });
    }

    resize() { 

    }


    update() {

    }
}