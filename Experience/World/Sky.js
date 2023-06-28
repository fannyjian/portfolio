import * as THREE from "three";
import GSAP from "gsap";

import Experience from "../Experience";

export default class Sky {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.setSky();
        this.setStars();
    }

    setSky() {
        this.skyGeometry = new THREE.PlaneGeometry(100,100);
        this.skyMaterial = new THREE.MeshStandardMaterial({
            color: "black",
            side: THREE.BackSide,
        });
        this.plane = new THREE.Mesh(this.skyGeometry, this.skyMaterial);
        this.scene.add(this.plane);
        this.plane.receiveShadow = true;
        this.plane.rotation.x = Math.PI / 2;
        this.plane.position.y = -1;
        this.plane.receiveShadow = true;
    }

    setStars() {
        const vertices = [];

        for ( let i = 0; i < 5000; i ++ ) {
            const spread = 40;
            const x = THREE.MathUtils.randFloatSpread( spread );
            const y = THREE.MathUtils.randFloatSpread( spread );
            const z = THREE.MathUtils.randFloatSpread( spread );

            vertices.push( x, y, z );
        }
        this.geometry = new THREE.BufferGeometry();
        this.geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
        this.material = new THREE.PointsMaterial( { color: "#EFDBCE", size: 2});
        this.points = new THREE.Points( this.geometry, this.material );
        this.points.name="stars";

        this.scene.add( this.points );
    }

    switchTheme(theme) {
        if (theme === "light") {
            GSAP.to(this.skyMaterial.color, {
                r: 240/255,
                g: 192/255,
                b: 181/255
            });
            GSAP.to(this.material.color, {
                r: 0.4,
                g: 0.2,
                b: 0.1
            })
        } else {
            GSAP.to(this.skyMaterial.color, {
                r: 0,
                g: 0,
                b: 0
            });
            GSAP.to(this.material.color, {
                r: 1,
                g: 1,
                b: 1
            });
        }
    }

    resize() {
    }

    update() {
        this.stars = this.scene.getObjectByName("stars");
        this.stars.rotation.y += 0.0005;     
        this.stars.rotation.x += 0.0001;           
    }
}