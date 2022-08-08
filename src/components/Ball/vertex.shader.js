export default `
    attribute float alpha;
    attribute float size;
    attribute vec3 color;
    varying float vAlpha;
    varying vec3 vColor;

    void main() {
        vAlpha = alpha;
        vColor = color;

        gl_PointSize = size;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
`