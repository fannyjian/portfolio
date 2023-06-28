import * as THREE from "three";
import GSAP from "gsap";

import Experience from "../Experience";

export default class Environment {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        
        this.setSunlight();
    }

    setSunlight() {
        this.sunLight = new THREE.PointLight("#F0C0B5", 20);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 100;
        this.sunLight.shadow.mapSize.set(4096, 4096);
        this.sunLight.shadow.normalBias = 0.05;

        this.sunLight.position.set(-1, 7, 3);
        this.scene.add(this.sunLight);

        this.shadowLight = new THREE.PointLight("orange", 20);
        this.shadowLight.castShadow = true;
        this.shadowLight.shadow.camera.far = 100;
        this.shadowLight.shadow.mapSize.set(4096, 4096);
        this.shadowLight.shadow.normalBias = 0.05;

        this.shadowLight.position.set(1, 7, -5);
        this.scene.add(this.shadowLight);

        this.ambientLight = new THREE.AmbientLight("#BD855C", 0.8);
        this.scene.add(this.ambientLight)
    }

    switchTheme(theme) {
        if (theme === "light") {
            GSAP.to(this.sunLight.color, {
                r: 240/255,
                g: 100/255,
                b: 200/255
            });
            GSAP.to(this.ambientLight.color, {
                r: 0.2,
                g:0.1,
                b: 0.15,
            });
        } else {
            GSAP.to(this.sunLight.color, {
                r: 255/255,
                g: 180/255,
                b: 181/255
            });
            GSAP.to(this.ambientLight.color, {
                r: 0.4,
                g:0.15,
                b: 0,
            });
        }
    }

    resize() {
    }

    update() {

    }
}