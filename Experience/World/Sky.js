import * as THREE from "three";

import Experience from "../Experience";

export default class Sky {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.setSky();
    }

    setSky() {
        const vertices = [];

        for ( let i = 0; i < 6000; i ++ ) {
            const spread = 40;
            const x = THREE.MathUtils.randFloatSpread( spread );
            const y = THREE.MathUtils.randFloatSpread( spread );
            const z = THREE.MathUtils.randFloatSpread( spread );

            vertices.push( x, y, z );
        }
        this.geometry = new THREE.BufferGeometry();
        this.geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
        this.material = new THREE.PointsMaterial( { color: "white", size: 0.8});
        this.points = new THREE.Points( this.geometry, this.material );
        this.points.name="stars";

        this.scene.add( this.points );
    }

    resize() {
    }

    update() {
        this.stars = this.scene.getObjectByName("stars");
        this.stars.rotation.y += 0.0005;     
        this.stars.rotation.x += 0.0001;           
    }
}