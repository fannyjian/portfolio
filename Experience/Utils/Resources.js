import * as THREE from "three";

import EventEmitter from "events";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader"
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import Experience from "../Experience"

// class to load resources and for other classes to access
export default class Resources extends EventEmitter{
    constructor(assets) {
        super();
        this.experience = new Experience();
        this.renderer = this.experience.renderer;

        this.assets = assets;

        this.items = {};
        this.queue = this.assets.length
        this.loaded = 0;

        this.setLoaders();
        this.startLoading();
    }

    setLoaders() {
        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader();

        /* for compressed files */
        this.loaders.dracoLoader = new DRACOLoader();  
        this.loaders.dracoLoader.setDecoderPath("/draco/");
        this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader)
    }

    startLoading() {
        for(const asset of this.assets) {
            // do type checking and load accordingly
            if (asset.type === "glbModel") {
                this.loaders.gltfLoader.load(asset.path, (file) => {
                    this.singleAssetLoaded(asset, file);
                })
            }
        }
    }

    // returns key value pairs
    singleAssetLoaded(asset, file) {
        this.items[asset.name] = file;
        this.loaded++;


        // if all assets are loaded
        if (this.loaded == this.queue) {
            this.emit("ready");
        }
    }
}