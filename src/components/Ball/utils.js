class Utils {
    colors = {
        GREEN200: [ 57, 245, 157 ],
        YELLOW: [ 208, 213, 122 ],
        ORANGE: [ 252, 162, 71 ]
    }

    rMinMax( min, max ) {
        return Math.random() * ( max - min ) + min
    }

    rCircleMinMax( min, max ) {
        const radius = Math.sqrt( this.rMinMax( min, max ) )
        const theta = Math.random() * Math.PI * 2
        const phi = Math.random() * Math.PI
        const x = radius * Math.cos( theta ) * Math.sin( phi )
        const y = radius * Math.sin( theta ) * Math.sin( phi )
        const z = radius * Math.cos( phi )
        return [ x, y, z ]
    }

    rColor() {
        const number = Math.random()
        for ( let i = 0; i < Object.keys( this.colors ).length; i++ ) {
            if ( number >= 1 / ( i + 1 ) ) {
                return this.colors[Object.keys(this.colors)[i]]
            }
        }
        return this.colors[Object.keys(this.colors)[0]]
    }
}

export default Utils