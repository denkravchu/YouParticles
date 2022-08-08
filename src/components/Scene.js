import * as THREE from 'three'
import { EffectComposer, EffectPass, RenderPass, BloomEffect, KernelSize } from 'postprocessing'

import Canvas3d from "../utils/canvas3d"

import Camera from "./Camera"
import Light from "./Light"
import Ball from "./Ball/Ball"
import Controller from './Controller'
import Logo from './Logo/Logo'

class Scene extends Canvas3d {
    composer

    camera      = null
    controller  = null
    balls       = []
    light       = null
    logo        = null

    constructor(canvas) {
        super(canvas)
        this.camera = new Camera()
        this.light = new Light()
        this.balls.push(
            new Ball({
                direction: -1,
                minRadius: 100,
                maxRadius: 250,
                size: 5,
                rotationSpeed: -0.00001
            }),
            new Ball({
                sizes: [ 0.1, 0.5 ],
                moveSpeed: 5
            })
        )
        this.logo = new Logo()
        this.controller = new Controller( this.camera.instance, canvas )

        this.scene.background = new THREE.Color( 0x000000 )

        this.scene.add( this.light.directional )
        this.scene.add( this.light.ambient )
        this.scene.add( this.camera.instance )
        this.balls.forEach(_ => this.scene.add( _.instance ))
        this.scene.add( this.logo.instance )


        this.composer = new EffectComposer( this.renderer )
        this.composer.addPass( new RenderPass( this.scene, this.camera.instance ) )
        this.composer.addPass( new EffectPass( this.camera.instance, new BloomEffect({
            luminanceThreshold: 0.1,
            luminanceSmoothing: 0.1,
            intensity: 1.7,
            kernelSize: KernelSize.HUGE
        }) ) )
        
        this.toRender(() => {
            this.controller.render()
            this.balls.forEach(_ => _.render())
            this.logo.render()
            // this.renderer.render( this.scene, this.camera.instance )
            this.composer.render()
        })

        this.toResize(() => {
            this.camera.resize()
            this.composer.setSize(window.innerWidth, window.innerHeight)
        }) 
    } 
}

export default Scene