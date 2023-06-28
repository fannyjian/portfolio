import * as THREE from "three";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";

import Experience from "../Experience";

export default class Controls {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.prince = this.experience.world.prince.actualPrince;
        this.sky = this.experience.world.sky;
        GSAP.registerPlugin(ScrollTrigger);

        this.setPath();
    }

    setPath(){
        this.timeline = new GSAP.timeline();
        this.timeline.to(this.prince.position, {
            x: () => {
                return this.sizes.width * 0.003;
            },
            scrollTrigger: {
                triger: ".first-move",   
                scrub: 0.6,
                invalidateOnRefresh: true,
            }
        });
    }

    resize() { 

    }


    update() {
    }
}