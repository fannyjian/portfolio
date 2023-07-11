import * as THREE from "three";

import Experience from "./Experience";

export default class Camera {
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;

        this.createOrthographicCamera();
    }


    createOrthographicCamera() {
        this.orthographicCamera = new THREE.OrthographicCamera(
            (-this.sizes.aspect * this.sizes.frustrum) / 2,
            (this.sizes.aspect * this.sizes.frustrum) / 2,
            this.sizes.frustrum / 2,
            -this.sizes.frustrum / 2,
            -50,
            50
        );

        this.orthographicCamera.position.x = 1.5;
        this.orthographicCamera.position.y = 3.5;
        this.orthographicCamera.position.z = 8;
        this.orthographicCamera.rotation.x = -Math.PI/15;
        this.orthographicCamera.rotation.y = Math.PI/15;
        this.orthographicCamera.rotation.z = Math.PI/15;


        this.scene.add(this.orthographicCamera);
    }

    resize() {
        this.orthographicCamera.left =
            (-this.sizes.aspect * this.sizes.frustrum) / 2;
        this.orthographicCamera.right =
            (this.sizes.aspect * this.sizes.frustrum) / 2;
        this.orthographicCamera.top = this.sizes.frustrum / 2;
        this.orthographicCamera.bottom = -this.sizes.frustrum / 2;
        this.orthographicCamera.updateProjectionMatrix();
    }

    update() {

    }
}