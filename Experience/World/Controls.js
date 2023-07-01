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

        this.setScrollTrigger();
    }

    setScrollTrigger(){
        ScrollTrigger.matchMedia({
            "(min-width: 969px)": () => {
                console.log("fired desktop");

                // first section --------------------------------------
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        // markers: true,
                        invalidateOnRefresh: true,
                    },
                })
                    .to(this.prince.position, {
                        x: () => {
                            return this.sizes.width * 0.003;
                        },
                    });

                // second section --------------------------------------
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        // markers: true,
                        invalidateOnRefresh: true,
                    },
                })
                    .to(this.prince.position, {
                        x: () => {
                            return -4.5;
                        },
                        y: () => {
                            return -8;
                        },
                        z: () => {
                            return 0;
                        }
                    }, "same")
                    .to(this.prince.scale, {
                        x: 0.1,
                        y: 0.1,
                        z: 0.1
                    }, "same")
                    .to(this.prince.rotation, {
                        y: () => {
                            return 1;
                        },
                    }, "same")
                    .to(this.camera.orthographicCamera.position, {
                        y: 5,
                    }, "same")

                // third section --------------------------------------
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.8,
                        // markers: true,
                        invalidateOnRefresh: true,
                    },
                })
                    .to(this.camera.orthographicCamera.position, {
                        x: -6,
                        y:3.5,
                    }, "same")
            },

            "(max-width: 968px)": function() {
                console.log("fired mobile");
            },
            all: function() {

            },
        })

    }

    resize() { 

    }


    update() {
    }
}