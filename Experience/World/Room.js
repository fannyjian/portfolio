import * as THREE from "three";

import Experience from "../Experience";

export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.prince = this.resources.items.prince;
        this.actualPrince = this.prince.scene
        
        this.setModel();
    }

    setModel() {
        this.actualPrince.children.forEach((child) => {
            child.castShadow = true;
            child.receiveShadow = true;
            
            if (child instanceof THREE.Group) {
                child.children.forEach((groupChild) => {
                    groupChild.castShadow = true;
                    groupChild.receiveShadow = true;
                })
            }
        })
        this.scene.add(this.actualPrince);
        this.actualPrince.scale.set(0.05, 0.05, 0.05);
    }

    resize() {
    }

    update() {

    }
}