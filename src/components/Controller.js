import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

class Controller {
    instance        = null

    constructor( camera, canvas ) {
        this.instance = new OrbitControls( camera, canvas )
        // this.instance.autoRotate = true
        // this.instance.autoRotateSpeed = 20
        this.instance.update()
    }

    render() {
        this.instance.update()
    }

}

export default Controller