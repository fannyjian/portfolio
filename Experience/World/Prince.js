import * as THREE from "three";
import GSAP from "gsap";

import Experience from "../Experience";

export default class Prince {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.sizes = this.experience.sizes;
        this.prince = this.resources.items.prince;
        this.actualPrince = this.prince.scene;
        this.device = this.experience.sizes.device;

        this.sizes.on("switchdevice", (device) => {
            this.device = device;
        })

        this.lerp = {
            current: 0,
            target: 0,
            ease:0.1,   // determines how smooth camera motion is 
        }
        
        this.setModel();
        this.onMouseMove();
    }

    setModel() {
        this.scene.add(this.actualPrince);
    }

    onMouseMove() {
        if (this.device == 'desktop') {
            window.addEventListener("mousemove", (e) => {
                this.rotation = ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
                this.lerp.target = this.rotation * 0.2;
            })
        }
    }

    resize() {
    }

    update() {
        if (this.device == 'desktop') {
            this.lerp.current = GSAP.utils.interpolate(
                this.lerp.current,
                this.lerp.target,
                this.lerp.ease
            )

            this.actualPrince.rotation.y = this.lerp.current;
        }
    }
}