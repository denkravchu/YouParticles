import * as THREE from 'three'

class Light {
    color       = 0xFFFFFF
    dirIntesity = 0.5
    ambient     = null
    directional = null

    constructor() {
        this.ambient = new THREE.AmbientLight(this.color)
        this.directional = new THREE.DirectionalLight(this.color, this.dirIntesity)
        this.directional.position.set( 0, 10, 10 )
    }
}

export default Light