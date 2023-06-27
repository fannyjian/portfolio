import * as THREE from "three";

import Experience from "../Experience";

export default class Sky {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.setSky();
    }

    setSky() {
        this.geometry = new THREE.SphereGeometry(9);
        this.material = new THREE.PointsMaterial( { color: "white", size:1.5 } );
        this.points = new THREE.Points( this.geometry, this.material );
        this.points.name="stars";

        this.scene.add( this.points );
    }

    resize() {
    }

    update() {
        this.stars = this.scene.getObjectByName("stars");
        this.stars.rotation.y += 0.001;        
    }
}