const Cell = require("./cell");


class Grid {
    constructor(){
        this.cols = 0;
        this.rows = 0;
        this.w = 40; // size of the cell
        this.grid = [];
        this.drawCoolDown = 0;
        this.drawCoolDownDefault = 7;  // generation speed
        this.current = null;
        this.next = null;

        this.stack = [];

        this.generate = false;
    }

    highlight(ctx) {
        if (this.stack.length > 0) {
            if (this.generate) {let x = this.current.i * this.w;
                let y = this.current.j * this.w;
                if (this.generate) {
                    ctx.fillStyle = this.getRandomColor();
                } else {
                    ctx.fillStyle = "#000000";

                }
                ctx.fillRect(x, y, this.w, this.w);
            }
        } 
    }

    reset() {
        this.generate = false;
        for (let i =0; i < this.grid.length; i++) {
            this.grid[i].visited = false;
            this.grid[i].walls["TOP"] = true;
            this.grid[i].walls["RIGHT"] = true;
            this.grid[i].walls["BOTTOM"] = true;
            this.grid[i].walls["LEFT"] = true;
        }
        this.stack = [];
        this.current = this.grid[Math.floor(this.grid.length / 2)];
    }

    setup(ctx) {
        this.cols = Math.floor(ctx.canvas.width / this.w);
        this.rows = Math.floor(ctx.canvas.height / this.w);
        for (let j = 0; j < this.rows; j++) {
            for (let i = 0; i < this.cols; i++) {
                let cell = new Cell(i, j, this.w);
                this.grid.push(cell);
            }
        }

        this.current = this.grid[Math.floor(this.grid.length / 2)];
    };

    draw(ctx) {
        if(this.drawCoolDown === 0) {
            ctx.clearRect(0, 0, ctx.width, ctx.height);
            // ctx.fillStyle = this.getRandomColor();
            ctx.fillStyle = "#000000";
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            for (let i = 0; i < this.grid.length; i++) {
                this.grid[i].show(ctx);
            }
            if (this.generate) {
                this.generateMaze();
            }
            this.highlight(ctx);
            this.drawCoolDown = this.drawCoolDownDefault;
        }
        this.drawCoolDown--;
    };

    generateMaze() {
        // STEP 2.1.1 of recursive backtracker algorithm
        this.current.visited = true;
        this.next = this.current.checkNeighbors(this.grid, this.cols);
        
        if (this.next) {
            this.next.visited = true;
            // STEP 2.1.2 of recursive backtraker algorithm
            this.stack.push(this.current);
            // STEP 2.1.3 of recursive backtracker algorithm
            if (this.current && this.next) {
                this.removeWalls(this.current, this.next);
            }
            
            // STEP 2.1.4 of recursive backtracker algorithm
            this.current = this.next;
        } else if (this.stack.length > 0) {
            this.current = this.stack.pop();;
        }
    }

    removeWalls(current, next) {
        let x = current.i - next.i;
        let y = current.j - next.j;
        if (x === 1) {
            current.walls["LEFT"] = false;
            next.walls["RIGHT"] = false;
        } else if (x === -1) {
            current.walls["RIGHT"] = false;
            next.walls["LEFT"] = false;
        } else if (y === 1) {
            current.walls["TOP"] = false;
            next.walls["BOTTOM"] = false;
        } else if (y === -1) {
            current.walls["BOTTOM"] = false;
            next.walls["TOP"] = false;
        } else {
            console.log("error with removing walls")
        }

    }

    getRandomColor() {
        let letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }


}

module.exports = Grid;


