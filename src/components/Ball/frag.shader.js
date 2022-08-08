export default `
    uniform sampler2D uMap;
    varying float vAlpha;
    varying vec3 vColor;

    void main() {
        vec4 texColor = texture2D( uMap, gl_PointCoord );
        if ( texColor.z < 0.5 ) discard;
        gl_FragColor = vec4( vColor, vAlpha );
    }
`