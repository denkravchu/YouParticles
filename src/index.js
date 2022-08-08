import './index.css'

import { loop } from './utils/loop'
import Scene from './components/Scene'

init()

function init() {
    const canvas = document.querySelector('#canvas')
    if ( !canvas ) { return }
    const animation = new Scene(canvas)
    loop({ renders: [ animation.render, animation.resize ], delay: 10 })
}