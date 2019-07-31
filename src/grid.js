const Cell = require("./cell");
const Player = require("./player");

class Grid {
    constructor(){
        this.cols = 0;
        this.rows = 0;
        this.w = 40; // size of the cell
        this.grid = [];
        this.drawCoolDown = 0;
        this.drawCoolDownDefault = 1;  // generation speed
        this.current = null;
        this.next = null;
        this.player = new Player(this.w, this.grid);
        this.endCell = null;
        this.max = 0;

        this.stack = [];

        this.generate = false;
    }

    highlight(ctx) {
        if (this.stack.length > 0) {
            if (this.generate) {
                let x = this.current.i * this.w;
                let y = this.current.j * this.w;
                if ( this.generate ) {
                    ctx.fillStyle = this.getRandomColor();
                } else {
                    ctx.fillStyle = "#000000";
                }
                ctx.fillRect(x, y, this.w, this.w);
            }
        } 
        if( this.endCell ) {
            let end_x = this.endCell.i * this.w;
            let end_y = this.endCell.j * this.w;
            ctx.fillStyle = this.getRandomColor();
            ctx.fillRect(end_x + 5, end_y + 5, this.w - 10, this.w - 10);
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
        this.endCell = null;
        this.current = this.grid[Math.floor(Math.random() * this.grid.length)];
        this.player.i = this.current.i;
        this.player.j = this.current.j;
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

        this.current = this.grid[Math.floor(Math.random() * this.grid.length)];
        this.player.i = this.current.i;
        this.player.j = this.current.j;
        
    };

    draw(ctx) {
        if(this.drawCoolDown === 0) {
            // console.log(`x = ${this.player.i}`)
            // console.log(`y = ${this.player.j}`)
            ctx.clearRect(0, 0, ctx.width, ctx.height);
            // ctx.fillStyle = this.getRandomColor();
            ctx.fillStyle = "#000000";
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            for (let i = 0; i < this.grid.length; i++) {
                this.grid[i].show(ctx);
            }
            if (this.generate) {
                this.generateMaze();
            } else {
                this.player.canMove = false;
            }
            this.player.show(ctx);
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
            if (this.max < this.stack.length) {
                this.max = this.stack.length;
                this.endCell = this.current;
            }
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


