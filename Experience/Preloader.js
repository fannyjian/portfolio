import EventEmitter from "events";
import GSAP from "gsap"

import Experience from "./Experience";
import convert from "./Utils/convertDivsToSpans";

export default class PreLoader extends EventEmitter {
    constructor() {
        super();
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;
        this.world = this.experience.world;
        this.device = this.sizes.device;

        this.sizes.on("switchdevice", (device) => {
            this.device = device;
        })

        this.world.on("worldready", () => {
            this.setAssets();
            this.playIntro();
        })
    }

    setAssets() {
        convert(document.querySelector(".intro-text"));
        convert(document.querySelector(".hero-main-title"));
        convert(document.querySelector(".hero-main-description"));
        convert(document.querySelector(".hero-second-subheading"));
        convert(document.querySelector(".second-sub"));


        this.prince = this.experience.world.prince.actualPrince;
        this.sky = this.experience.world.sky;
    }

    firstIntro() {
        return new Promise ((resolve) => {
            this.timeline = new GSAP.timeline();

            // if (this.device === "desktop") {

            // } else {
            //     // mobile animation
            // }
            this.timeline.to(".intro-text .animatedis", {
                yPercent: -100,
                stagger: 0.08,
                ease: "back.out(1.2)",
                onComplete: resolve
            })
        });
    }

    secondIntro() {
        return new Promise ((resolve) => {
            this.secondTimeline = new GSAP.timeline();

            if (this.device === "desktop") {
                this.secondTimeline.fromTo(this.prince.scale, 
                    {
                        x: 0,
                        y: 0,
                        z: 0,
                    },
                    {
                        x: 0.05,
                        y: 0.05,
                        z: 0.05,
                        duration: 0.7,
                }, "same")

            } else {
                this.secondTimeline.fromTo(this.prince.scale, 
                    {
                        x: 0,
                        y: 0,
                        z: 0,
                    },
                    {
                        x: 0.04,
                        y: 0.04,
                        z: 0.04,
                        duration: 0.7,
                    }, "same")
            }

            this.secondTimeline.fromTo(this.prince.rotation, 
                {
                    y: -10,
                },
                {
                    y: 0,
                    duration: 0.7,
                }, "same")
            .fromTo(this.sky.material, 
                {
                    size: 0.0
                },
                {
                    size: 2,
                    duration: 0.5,
                    onComplete: resolve,   
                })
        });
    }

    // on desktop: scroll
    onScroll(e) {
        if (e.deltaY > 0) { 
            this.removeEventListeners();
            this.playSecondIntro();
        }
    }

    // on mobile: swipe up
    onTouch(e) {
        this.initialY = e.touches[0].clientY;
    }

    onTouchMove(e) {
        let currentY = e.touches[0].clientY;
        let difference = this.initialY - currentY;
        if (difference > 0) {
            this.removeEventListeners();
            this.playSecondIntro();
        }
        this.initialY = null;
    }

    removeEventListeners() {
        window.removeEventListener("wheel", this.scrollOnceEvent);
        window.removeEventListener("touchstart", this.touchStart);
        window.removeEventListener("touchmove", this.touchMove);
    }

    async playIntro() {
        await this.firstIntro();
        this.moveFlag = true;

        this.scrollOnceEvent = this.onScroll.bind(this);
        this.touchStart = this.onTouch.bind(this);
        this.touchMove = this.onTouchMove.bind(this);  
        window.addEventListener("wheel", this.scrollOnceEvent);
        window.addEventListener("touchstart", this.touchStart);
        window.addEventListener("touchmove", this.touchMove);
    }

    async playSecondIntro() {
        this.moveFlag = false;
        this.scaleFlag = true;
        await this.secondIntro();
        this.scaleFlag = false;
        this.emit("enablecontrols");
    }

    move() {
        if (this.device === "desktop") {
            this.prince.position.set(0, -2, 0);
        } else {
            this.prince.position.set(0, -1, 0);
        }
    }

    scale() {
        if (this.device === "desktop") {
            this.prince.scale.set(0.05, 0.05, 0.05);
        } else {
            this.prince.scale.set(0.04, 0.04, 0.04);
        }
    }

    update() {
        // in the case that window dimensions switched device in between intros
        if (this.moveFlag) {
            this.move();
        }

        if (this.scaleFlag) {
            this.scale();
        }
    }
}