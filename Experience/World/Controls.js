import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import ASScroll from "@ashthornton/asscroll";

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

        document.querySelector(".page").style.overflow = "visible";

        this.setSmoothScroll();
        this.setScrollTrigger();
    }

    setupASScroll() {
        // https://github.com/ashthornton/asscroll
        const asscroll = new ASScroll({
            ease: 0.1,
            disableRaf: true,
        });

        GSAP.ticker.add(asscroll.update);

        ScrollTrigger.defaults({
            scroller: asscroll.containerElement,
        });

        ScrollTrigger.scrollerProxy(asscroll.containerElement, {
            scrollTop(value) {
                if (arguments.length) {
                    asscroll.currentPos = value;
                    return;
                }
                return asscroll.currentPos;
            },
            getBoundingClientRect() {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight,
                };
            },
            fixedMarkers: true,
        });

        asscroll.on("update", ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh", asscroll.resize);

        requestAnimationFrame(() => {
            asscroll.enable({
                newScrollElements: document.querySelectorAll(
                    ".gsap-marker-start, .gsap-marker-end, [asscroll]"
                ),
            });
        });
        return asscroll;
    }

    setSmoothScroll() {
        this.asscroll = this.setupASScroll();    
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
                        x: -4.5,
                        y:  -8,
                        z: 0
                    }, "second")
                    .to(this.actualPrince.scale, {
                        x: 0.1,
                        y: 0.1,
                        z: 0.1
                    }, "second")
                    .to(this.camera.orthographicCamera.rotation, {
                        y: -1
                    }, "second")
                    .to(this.camera.orthographicCamera.position, {
                        x: -9,
                        y: 5.5,
                    }, "second");

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
                    .to(this.actualPrince.scale, {
                        x: 0.05,
                        y: 0.05,
                        z: 0.05
                    }, "third")
                    .to(this.actualPrince.position, {
                        x: 0,
                        y: -2,
                        z: 0
                    }, "third")
                    .to(this.camera.orthographicCamera.position, {
                        x: 4,
                        y: 3,
                    }, "third")
                    .to(this.camera.orthographicCamera.rotation, {
                        y: 1
                    }, "third");
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
                    }, "second")
                    .to(this.actualPrince.position, {
                        y: -5
                    }, "second")
                    .to(this.camera.orthographicCamera.rotation, {
                        y: -1
                    }, "second")
                    .to(this.camera.orthographicCamera.position, {
                        x: -12,
                        y: 7
                    }, "second");


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
                    }, "third")
                    .to(this.actualPrince.position, {
                        y: 0
                    }, "third")
                    .to(this.camera.orthographicCamera.position, {
                        x: 12,
                        y: 5
                    }, "third")
                    .to(this.camera.orthographicCamera.rotation, {
                        y: 1
                    }, "third")
            },

            all: () => {
                this.sections = document.querySelectorAll(".section");
                this.sections.forEach((section) => {
                    this.progressWrapper =
                        section.querySelector(".progress-wrapper");
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
                            scrub: 0.4,
                            pin: this.progressWrapper,
                            pinSpacing: false,
                        },
                    });
                });
            },

        })

    }

    resize() { 

    }


    update() {
    }
}