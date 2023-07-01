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
                        x: 0.08,
                        y:0.08,
                        z:0.08
                    }, "same")
                    .to(this.actualPrince.position, {
                        y:-3,
                    }, "same")
                    .to(this.camera.orthographicCamera.position, {
                        y: 5
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

            all: () => {
                this.sections = document.querySelectorAll(".section");
                this.sections.forEach(section => {
                    // looping through each section and grabbing the indicated components 
                    this.progressWrapper = section.querySelector(".progress-wrapper");
                    this.progressBar = section.querySelector(".progress-bar");

                    if (section.classList.contains("right")) {
                        GSAP.to(section, {
                            borderTopLeftRadius: 10,
                            scrollTrigger: {
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                scrub: 0.6,
                            },
                        });
                        GSAP.to(section, {
                            borderBottomLeftRadius: 700,
                            scrollTrigger: {
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                scrub: 0.6,
                            },
                        });

                    } else {
                        GSAP.to(section, {
                            borderTopRightRadius: 10,
                            scrollTrigger: {
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                scrub: 0.6,
                            },
                        });
                        GSAP.to(section, {
                            borderBottomRightRadius: 700,
                            scrollTrigger: {
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                scrub: 0.6,
                            },
                        });
                    }

                    GSAP.from(this.progressBar, {
                        scaleY: 0,
                        scrollTrigger: {
                            trigger: section,
                            start: "top top",
                            end: "bottom bottom",
                            scrub: 0.4,     // progressBar has 100 view height, scrub delays the fill of height 
                            pin: this.progressWrapper,  // progressBar pinned to progressWrapper, which has height of 0 in viewport => moves with view
                            pinSpacing: false,
                        },
                    });
                });
            }

        })

    }

    resize() { 

    }


    update() {
    }
}