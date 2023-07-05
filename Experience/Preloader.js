import EventEmitter from "events";
import GSAP from "gsap"

import Experience from "./Experience";

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
        this.prince = this.experience.world.prince.actualPrince;
        this.sky = this.experience.world.sky;
    }

    firstIntro() {
        return new Promise ((resolve) => {
            this.timeline = new GSAP.timeline();

            if (this.device === "desktop") {
                // desktop animation
                this.timeline.to(this.prince.position, {
                    x: 0,
                    y: -2,
                    z: 0,
                    onComplete: resolve  // must do for all promise 
                })
            } else {
                // mobile animation
            }
        });
    }

    secondIntro() {
        return new Promise ((resolve) => {
            this.secondTimeline = new GSAP.timeline();

            if (this.device === "desktop") {
                // desktop animation
            } else {
                // mobile animation
            }
        });
    }

    onScroll(e) {
        if (e.deltaY > 0) {     // scroll downwards
            window.removeEventListener("wheel", this.scrollOnceEvent);
            this.playSecondIntro();
        }
    }

    async playIntro() {
        await this.playFirstIntro();
        this.scrollOnceEvent = this.onScroll.bind(this)     // pointer
        window.addEventListener("wheel", this.scrollOnceEvent);
    }

    async playSecondIntro() {
        await this.secondIntro();
    }
}