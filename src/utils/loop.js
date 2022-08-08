const loop = ({ renders = [], delay = 0  }) => {
    let startTime = performance.now()
    function render() {
        requestAnimationFrame((time) => {
            if (time - startTime > delay) {
                renders.forEach(handler => handler())
                startTime = performance.now()
            }
            requestAnimationFrame(render)
        })
    }
    render()
}

export { loop }