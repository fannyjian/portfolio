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
        this.actualPrince = this.experience.world.prince.actualPrince;
        this.sky = this.experience.world.sky;
        GSAP.registerPlugin(ScrollTrigger);

        this.setScrollTrigger();
    }

    setScrollTrigger(){
        ScrollTrigger.matchMedia({
            "(min-width: 969px)": () => {
                console.log("fired desktop");

                this.actualPrince.scale.set(0.05, 0.05, 0.05);
                this.actualPrince.position.set(0, -2, 0);
                this.actualPrince.rotation.set(0, 0, 0);

                // desktop first section --------------------------------------
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
                    .to(this.actualPrince.position, {
                        x: () => {
                            return this.sizes.width * 0.003;
                        },
                    });

                // desktop second section --------------------------------------
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
                    .to(this.actualPrince.position, {
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
                    .to(this.actualPrince.scale, {
                        x: 0.1,
                        y: 0.1,
                        z: 0.1
                    }, "same")
                    .to(this.actualPrince.rotation, {
                        y: 1,
                    }, "same")
                    .to(this.camera.orthographicCamera.position, {
                        x: 1,
                        y: 5,
                    }, "same");

                // desktop third section --------------------------------------
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        // markers: true,
                        invalidateOnRefresh: true,
                    },
                })
                    .to(this.actualPrince.rotation, {
                        y:-1,
                    }, "same")
                    .to(this.actualPrince.scale, {
                        x: 0.05,
                        y: 0.05,
                        z: 0.05
                    }, "same")
                    .to(this.actualPrince.position, {
                        x: 0,
                        y: -2,
                        z: 0
                    }, "same")
                    .to(this.camera.orthographicCamera.position, {
                        x: -3,
                        y: 3,
                    }, "same");
            },

            "(max-width: 968px)": () => {
                console.log("fired mobile");

                // resets for mobile
                this.actualPrince.scale.set(0.04, 0.04, 0.04)
                this.actualPrince.position.set(0, -1, 0);
                this.actualPrince.rotation.set(0, 0, 0);

                // mobile first section --------------------------------------
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
                    .to(this.actualPrince.scale, {
                        x: 0.07,
                        y:0.07,
                        z:0.07
                    }, "same")
                    .to(this.actualPrince.position, {
                        y:-3,
                    }, "same")
                    .to(this.camera.orthographicCamera.position, {
                        y: 4.5
                    }, "same");

                // mobile second section --------------------------------------
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
                    .to(this.actualPrince.scale, {
                        x: 0.1,
                        y: 0.1,
                        z: 0.1
                    }, "same")
                    .to(this.actualPrince.rotation, {
                        y: 1
                    }, "same")
                    .to(this.actualPrince.position, {
                        y: -8
                    }, "same");


                // mobile third section --------------------------------------
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        // markers: true,
                        invalidateOnRefresh: true,
                    },
                })
                    .to(this.actualPrince.scale, {
                        x: 0.05,
                        y: 0.05,
                        z: 0.05
                    }, "same")
                    .to(this.actualPrince.position, {
                        y: 0
                    }, "same")
                    .to(this.camera.orthographicCamera.position, {
                        y: 5
                    }, "same")
                    .to(this.actualPrince.rotation, {
                        y: -1
                    }, "same");
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