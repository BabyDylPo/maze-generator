class GameLoop {
    constructor(grid, ctx) {
        this.grid = grid;
        this.ctx = ctx;
    }

    start() {
        this.lastTime = 0;
        //start the animation
        requestAnimationFrame(this.animate.bind(this));
    }

    animate(time) {
        const timeDelta = time - this.lastTime;

        // this.grid.step(timeDelta);
        this.grid.draw(this.ctx);
        this.lastTime = time;

        requestAnimationFrame(this.animate.bind(this));
    }

}
module.exports = GameLoop;