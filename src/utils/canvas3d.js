import * as THREE from 'three'

class Canvas3d {
    canvas      = null

    rendering   = []
    resizing    = []

    width       = 0
    height      = 0
    ratio       = 0

    scene       = null
    renderer    = null

    constructor(canvas) {
        if (!canvas) {
            console.error(`[Canvas3d]: Canvas dom is required, got ${canvas}`)
            return
        }
        this.canvas = canvas
        this.scene = new THREE.Scene()
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true })
    
        this.render = this.render.bind(this)
        this.resize = this.resize.bind(this)
    }

    toRender(handler) {
        this.rendering.push(handler)
    }

    toResize(handler) {
        this.resizing.push(handler)
    }

    resize() {
        if (window.innerHeight !== this.height || window.innerWidth !== this.width) {
            this.canvas.width = this.width = window.innerWidth
            this.canvas.height = this.height = window.innerHeight
            this.ratio = window.devicePixelRatio
            this.renderer.setSize(this.width, this.height, false)
            this.renderer.setPixelRatio(this.ratio)
            this.resizing.forEach(handler => handler())
        }
    }

    render() {
        this.rendering.forEach(handler => handler())
    }
}

export default Canvas3d