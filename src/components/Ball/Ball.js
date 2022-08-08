import * as THREE from 'three'

import fragmentShader from './frag.shader'
import vertexShader from './vertex.shader'

import Utils from './utils'

import mapImage from './assets/map.png'

class Ball {
    geometry        = null
    material        = null
    uniforms        = null
    instance        = null

    parallelData    = []

    direction       = 1 // -1/1
    count           = 1000
    size            = 10
    position        = [ 0, 0, 0 ]
    isRotate        = true
    rotationSpeed   = 0.01
    minRadius       = 20
    maxRadius       = 30
    sizes           = [ 0.01, 0.1 ]
    moveSpeed       = -1
    rotationSpeed   = 0.00001

    utils           = null

    constructor({
        direction,
        count,
        size,
        position,
        isRotate,
        minRadius,
        maxRadius,
        rotationSpeed,
        sizes,
        moveSpeed
    }) {
        if ( direction ) { this.direction = direction }
        if ( count ) { this.count = count }
        if ( size ) { this.size = size }
        if ( position ) { this.position = position }
        if ( isRotate ) { this.isRotate = isRotate }
        if ( minRadius ) { this.minRadius = minRadius }
        if ( maxRadius ) { this.maxRadius = maxRadius }
        if ( sizes ) { this.sizes = sizes }
        if ( moveSpeed ) { this.moveSpeed = moveSpeed }
        if ( rotationSpeed ) { this.rotationSpeed = rotationSpeed }

        this.utils = new Utils()
        this.init()
    }

    init() {
        this.geometry = new THREE.BufferGeometry()
        this.geometry.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array( this.count * 3 ), 3 ) )
        this.geometry.setAttribute( 'color', new THREE.BufferAttribute( new Uint8Array( this.count * 3 ), 3, true ) )
        this.geometry.setAttribute( 'alpha', new THREE.BufferAttribute( new Float32Array( this.count * 1 ), 1 ) )
        this.geometry.setAttribute( 'size', new THREE.BufferAttribute( new Float32Array( this.count * 1 ), 1 ) )
        this.generateMaterial()

        this.uniforms = {
            uMap: { value: new THREE.TextureLoader().load( mapImage ) }
        }

        this.material = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            fragmentShader,
            vertexShader,
            transparent: true,
            wireframe: false
        })

        this.instance = new THREE.Points( this.geometry, this.material )
        this.instance.position.set( ...this.position )
    }

    generateMaterial() {
        for ( let i = 0; i < this.count; i++ ) {
            this.geometry.attributes.color.setXYZ( i, ...this.utils.rColor() )
            this.geometry.attributes.alpha.array[i] = this.utils.rMinMax( 0, 1 )
            this.geometry.attributes.size.array[i] = this.utils.rMinMax( 0.1, this.size )
            this.geometry.attributes.position.setXYZ( i, ...this.utils.rCircleMinMax( this.minRadius, this.maxRadius ) )
        
            this.parallelData.push({
                x: 0,
                y: 0,
                z: 0,
                savePosition: [
                    this.geometry.attributes.position.getX(i),
                    this.geometry.attributes.position.getY(i),
                    this.geometry.attributes.position.getZ(i)
                ],
                size: this.utils.rMinMax( ...this.sizes ),
                trx: this.utils.rMinMax( -0.01, 0.01 ),
                try: this.utils.rMinMax( -0.01, 0.01 ),
            })
            
        }

        this.geometry.attributes.color.needsUpdate = true
        this.geometry.attributes.alpha.needsUpdate = true
        this.geometry.attributes.size.needsUpdate = true
        this.geometry.attributes.position.needsUpdate = true
    }

    render() {
        for ( let i = 0; i < this.count; i++ ) {
            const x = this.geometry.attributes.position.getX(i)
            const y = this.geometry.attributes.position.getY(i)
            const z = this.geometry.attributes.position.getZ(i)

            const flyMode = ( this.direction === -1 )
            if ( flyMode ) {
                if ( Math.abs(x) > 5 ) { this.parallelData[i].trx *= -1 }
                if ( Math.abs(y) > 5 ) { this.parallelData[i].try *= -1 }
                this.geometry.attributes.position.setXYZ( i,
                    x + this.parallelData[i].trx,
                    y + this.parallelData[i].try,
                    z
                )
            }

            const goDeepMode = ( this.direction === 1 )
            if ( goDeepMode ) {
                if ( x ** 2 + y ** 2 + z ** 2 < this.maxRadius + 10 ) {
                    this.geometry.attributes.position.setXYZ( i, 
                        x + x / ( 1000 / this.moveSpeed ),
                        y + y / ( 1000 / this.moveSpeed ),
                        z + z / ( 1000 / this.moveSpeed )
                    )
                } else {
                    this.geometry.attributes.size.array[i] -= this.parallelData[i].size * 2
                }
            }

            const enouphSize = ( this.geometry.attributes.size.array[i] - this.parallelData[i].size > 0 )
            if ( enouphSize ) {
                this.geometry.attributes.size.array[i] -= this.parallelData[i].size
            } else {
                this.geometry.attributes.size.array[i] = this.size
                if ( goDeepMode ) {
                    this.geometry.attributes.position.setXYZ( i,
                        ...this.parallelData[i].savePosition
                    )
                }
            }

            if ( this.isRotate ) {
                this.instance.rotation.y += this.rotationSpeed
            }

            this.geometry.attributes.position.needsUpdate = true
            this.geometry.attributes.size.needsUpdate = true
        }  
    }

}

export default Ball