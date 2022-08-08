import * as THREE from 'three'

import logoImage from './assets/logo.png'

class Logo {
    geometry    = null
    material    = null
    instance    = null

    constructor() {
        this.geometry = new THREE.PlaneGeometry( 4, 4, 1, 1 )
        this.material = new THREE.MeshBasicMaterial({
            transparent: true,
            side: THREE.DoubleSide,
            wireframe: false,
            map: new THREE.TextureLoader().load( logoImage )
        })
        this.instance = new THREE.Mesh( this.geometry, this.material )
    }

    render() {
        this.instance.rotation.y -= 0.02
    }
}

export default Logo