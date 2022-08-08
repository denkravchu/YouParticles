import * as THREE from 'three'

class Camera {
    instance    = null
    aspect      = null
    fov         = 45
    near        = 0.1
    far         = 100
    lookAt      = [ 0, 0, 0 ]
    position    = [ 0, 0, 20 ]

    constructor() {
        this.aspect = window.innerWidth / window.innerHeight
        this.instance = new THREE.PerspectiveCamera(this.fov, this.aspect, this.near, this.far)
        this.instance.lookAt( ...this.lookAt )
        this.instance.position.set( ...this.position )
    }

    resize() {
        this.aspect = window.innerWidth / window.innerHeight
        this.instance.aspect = this.aspect
        this.instance.updateProjectionMatrix()
    }
}

export default Camera