/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/cell.js":
/*!*********************!*\
  !*** ./src/cell.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Cell {\n    constructor(i, j, w) {\n        this.i = i;\n        this.j = j;\n        this.w = w;\n        this.walls = {\n            TOP: true, \n            RIGHT: true, \n            BOTTOM: true, \n            LEFT: true\n        };\n        \n        this.keyUp = false;\n        this.keyRight = false;\n        this.keyDown = false;\n        this.keyLeft = false;\n        \n        this.visited = false;\n    }\n\n    \n\n    show(ctx) {\n        let x = this.i * this.w;\n        let y = this.j * this.w;\n        \n        if (this.visited) {\n            // walls of maze color\n            ctx.strokeStyle = this.getRandomColor(); \n            // path of maze color\n            ctx.fillStyle = \"#FFFFFF\";\n        } else {\n            ctx.strokeStyle = this.getRandomColor();\n            ctx.fillStyle = \"#000000\";\n        }\n    \n        ctx.fillRect(x, y, this.w, this.w);\n        ctx.beginPath();\n        ///////////////  TOP  /////////////////////\n        if (this.walls[\"TOP\"]) {\n            ctx.moveTo(x, y);\n            ctx.lineTo(x + this.w, y);\n        };\n        //////////////  RIGHT  ///////////////////\n        if (this.walls[\"RIGHT\"]) {\n            ctx.moveTo(x + this.w, y);\n            ctx.lineTo(x + this.w, y + this.w);\n        }\n        //////////////  BOTTOM  //////////////////\n        if (this.walls[\"BOTTOM\"]) {\n            ctx.moveTo(x + this.w, y + this.w);\n            ctx.lineTo(x, y + this.w);\n        }\n        ///////////////  LEFT  ///////////////////\n        if (this.walls[\"LEFT\"]) {\n            ctx.moveTo(x, y + this.w);\n            ctx.lineTo(x, y);\n        }\n        //////////////////////////////////////////\n        ctx.stroke();\n    };\n\n    getRandomColor() {\n        let letters = \"0123456789ABCDEF\";\n        let color = \"#\";\n        for (let i = 0; i < 6; i++) {\n            color += letters[Math.floor(Math.random() * 16)];\n        }\n        return color;\n    }\n\n    checkNeighbors(grid, numOfColumns) {\n        let neighbors = [];\n        let top = grid[this.index(this.i, this.j - 1, numOfColumns)];\n        let right = grid[this.index(this.i + 1, this.j, numOfColumns)];\n        let bottom = grid[this.index(this.i, this.j + 1, numOfColumns)];\n        let left = grid[this.index(this.i - 1, this.j, numOfColumns)];\n\n        \n        if (top && !top.visited) {\n            neighbors.push(top);\n        }\n        if (right && !right.visited) {\n            neighbors.push(right);\n        }\n        if (bottom && !bottom.visited) {\n            neighbors.push(bottom);\n        }\n        if (left && !left.visited) {\n            neighbors.push(left);\n        }\n\n        if (neighbors.length > 0) {\n            let rng = Math.floor(Math.random() * neighbors.length);\n            return neighbors[rng];\n        } else {\n            return undefined;\n        }\n    }\n\n    index(i, j, numOfColumns) {\n        if(i < 0 || j < 0 || i > numOfColumns - 1 || j > numOfColumns - 1) {\n            return -1; //return undefined\n        }\n        return i + j * numOfColumns\n    }\n}\n\nmodule.exports = Cell;\n\n//# sourceURL=webpack:///./src/cell.js?");

/***/ }),

/***/ "./src/game_loop.js":
/*!**************************!*\
  !*** ./src/game_loop.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class GameLoop {\n    constructor(grid, ctx) {\n        this.grid = grid;\n        this.ctx = ctx;\n        // this.addKeyBindings = this.addKeyBindings.bind(this);\n    }\n\n    start() {\n        this.lastTime = 0;\n        //start the animation\n        //call the add key bindings method here\n        \n        this.addKeyBindings(this) //passed this in as a parameter\n        requestAnimationFrame(this.animate.bind(this));\n    }\n\n    animate(time) {\n        const timeDelta = time - this.lastTime;\n\n        // this.grid.step(timeDelta);\n        this.grid.draw(this.ctx);\n        this.lastTime = time;\n\n        requestAnimationFrame(this.animate.bind(this));\n    }\n\n    //add key binding method here\n    addKeyBindings(that) { //so that that could equal this and be used to access this.grid.player  \n                           //I do not know why i had to do it this way.  I found it out using trial by error and google\n        document.addEventListener('keydown', function (event) {\n            event.preventDefault()\n            let client = that.grid.player;\n            if (event.keyCode === 37) {\n                //left\n               client.keyLeft = true;\n               \n            }\n            else if (event.keyCode === 39) {\n                //right\n               client.keyRight = true;\n               \n            }\n            else if (event.keyCode === 38) {\n                //up\n               client.keyUp = true;\n               \n            }\n            else if (event.keyCode === 40) {\n                //down\n               client.keyDown = true;\n               \n            }\n        });\n        document.addEventListener('keyup', function (event) {\n            let client = that.grid.player;\n            if (event.keyCode === 37) {\n                //left\n               client.keyLeft = false;\n            //    client.canMove = true;\n               \n            }\n            else if (event.keyCode === 39) {\n                //right\n               client.keyRight = false;\n            //    client.canMove = true;\n               \n            }\n            else if (event.keyCode === 38) {\n                //up\n               client.keyUp = false;\n            //    client.canMove = true;\n               \n            }\n            else if (event.keyCode === 40) {\n                //down\n               client.keyDown = false;\n            //    client.canMove = true;\n               \n            }\n        });\n    }\n\n   \n\n}\nmodule.exports = GameLoop;\n\n//# sourceURL=webpack:///./src/game_loop.js?");

/***/ }),

/***/ "./src/grid.js":
/*!*********************!*\
  !*** ./src/grid.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Cell = __webpack_require__(/*! ./cell */ \"./src/cell.js\");\nconst Player = __webpack_require__(/*! ./player */ \"./src/player.js\");\n\nclass Grid {\n    constructor(){\n        this.cols = 0;\n        this.rows = 0;\n        this.w = 25; // size of the cell\n        this.grid = [];\n        this.drawCoolDown = 0;\n        this.drawCoolDownDefault = 7;  // generation speed\n        this.current = null;\n        this.next = null;\n        this.player = new Player(this.w, this.grid);\n        this.endCell = null;\n        this.max = 0;\n\n        this.stack = [];\n\n        this.generate = false;\n    }\n\n    highlight(ctx) {\n        if (this.stack.length > 0) {\n            if (this.generate) {\n                let x = this.current.i * this.w;\n                let y = this.current.j * this.w;\n                if ( this.generate ) {\n                    ctx.fillStyle = this.getRandomColor();\n                } else {\n                    ctx.fillStyle = \"#000000\";\n                }\n                ctx.fillRect(x, y, this.w, this.w);\n            }\n        } \n        if( this.endCell ) {\n            let end_x = this.endCell.i * this.w;\n            let end_y = this.endCell.j * this.w;\n            ctx.fillStyle = this.getRandomColor();\n            ctx.fillRect(end_x + 5, end_y + 5, this.w - 10, this.w - 10);\n        }\n        if (this.grid.every((i) => {\n            return i.visited === true;\n        })) {\n            if (this.player.i === this.endCell.i && this.player.j === this.endCell.j) {\n                this.reset();\n            }\n        }\n        \n    }\n\n    reset() {\n        this.generate = false;\n        for (let i =0; i < this.grid.length; i++) {\n            this.grid[i].visited = false;\n            this.grid[i].walls[\"TOP\"] = true;\n            this.grid[i].walls[\"RIGHT\"] = true;\n            this.grid[i].walls[\"BOTTOM\"] = true;\n            this.grid[i].walls[\"LEFT\"] = true;\n        }\n        this.stack = [];\n        this.endCell = null;\n        this.current = this.grid[Math.floor(Math.random() * this.grid.length)];\n        this.player.i = this.current.i;\n        this.player.j = this.current.j;\n    }\n\n    setup(ctx) {\n        this.cols = Math.floor(ctx.canvas.width / this.w);\n        this.rows = Math.floor(ctx.canvas.height / this.w);\n        for (let j = 0; j < this.rows; j++) {\n            for (let i = 0; i < this.cols; i++) {\n                let cell = new Cell(i, j, this.w);\n                this.grid.push(cell);\n            }\n        }\n\n        this.current = this.grid[Math.floor(Math.random() * this.grid.length)];\n        this.player.i = this.current.i;\n        this.player.j = this.current.j;\n        \n    };\n\n    draw(ctx) {\n        this.player.movement(ctx);\n        if(this.drawCoolDown === 0) {\n            ctx.clearRect(0, 0, ctx.canvas.width, ctx.height);\n            // ctx.fillStyle = this.getRandomColor();\n            ctx.fillStyle = \"#000000\";\n            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);\n            for (let i = 0; i < this.grid.length; i++) {\n                this.grid[i].show(ctx);\n            }\n            if (this.generate) {\n                this.generateMaze();\n            } else {\n                this.player.canMove = false;\n            }\n            this.player.show(ctx);\n            this.highlight(ctx);\n            this.drawCoolDown = this.drawCoolDownDefault;\n\n            // outline border for entire grid //\n            ////////////////////////////////////\n            ctx.beginPath();\n            ctx.lineWidth = 1;\n            ctx.strokeStyle = this.getRandomColor();\n            ///////////////  TOP  /////////////////////\n            ctx.moveTo(0, 0);\n            ctx.lineTo(0 + ctx.canvas.width, 0);\n            //////////////  RIGHT  ///////////////////\n            ctx.moveTo(0 + ctx.canvas.width, 0);\n            ctx.lineTo(0 + ctx.canvas.height, 0 + ctx.canvas.height);\n            //////////////  BOTTOM  //////////////////\n            ctx.moveTo(0 + ctx.canvas.height, 0 + ctx.canvas.height);\n            ctx.lineTo(0, 0 + ctx.canvas.width);\n            ///////////////  LEFT  ///////////////////\n            ctx.moveTo(0, 0 + ctx.canvas.height);\n            ctx.lineTo(0, 0);\n            //////////////////////////////////////////\n            ctx.stroke();\n            ctx.lineWidth = 1;\n        }\n        this.drawCoolDown--;\n    };\n\n    generateMaze() {\n        // STEP 2.1.1 of recursive backtracker algorithm\n        this.current.visited = true;\n        this.next = this.current.checkNeighbors(this.grid, this.cols);\n        \n        if (this.next) {\n            this.next.visited = true;\n            // STEP 2.1.2 of recursive backtraker algorithm\n            this.stack.push(this.current);\n            if (this.max < this.stack.length) {\n                this.max = this.stack.length;\n                this.endCell = this.current;\n            }\n            // STEP 2.1.3 of recursive backtracker algorithm\n            if (this.current && this.next) {\n                this.removeWalls(this.current, this.next);\n            }\n            \n            // STEP 2.1.4 of recursive backtracker algorithm\n            this.current = this.next;\n        } else if (this.stack.length > 0) {\n            this.current = this.stack.pop();;\n        }\n    }\n\n    removeWalls(current, next) {\n        let x = current.i - next.i;\n        let y = current.j - next.j;\n        if (x === 1) {\n            current.walls[\"LEFT\"] = false;\n            next.walls[\"RIGHT\"] = false;\n        } else if (x === -1) {\n            current.walls[\"RIGHT\"] = false;\n            next.walls[\"LEFT\"] = false;\n        } else if (y === 1) {\n            current.walls[\"TOP\"] = false;\n            next.walls[\"BOTTOM\"] = false;\n        } else if (y === -1) {\n            current.walls[\"BOTTOM\"] = false;\n            next.walls[\"TOP\"] = false;\n        } else {\n            alert (\"error with removing walls\")\n        }\n\n    }\n\n    getRandomColor() {\n        let letters = \"0123456789ABCDEF\";\n        let color = \"#\";\n        for (let i = 0; i < 6; i++) {\n            color += letters[Math.floor(Math.random() * 16)];\n        }\n        return color;\n    }\n\n\n}\n\nmodule.exports = Grid;\n\n\n\n\n//# sourceURL=webpack:///./src/grid.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Grid = __webpack_require__(/*! ./grid */ \"./src/grid.js\");\nconst GameLoop = __webpack_require__(/*! ./game_loop */ \"./src/game_loop.js\");\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n    const canvas = document.getElementById(\"canvas\");\n    const generate = document.getElementById(\"generate\");\n    const reset = document.getElementById(\"reset\");\n    \n    canvas.width = 500;\n    canvas.height = 500;\n    // canvas.style.zIndex = 1;\n\n    const ctx = canvas.getContext(\"2d\");\n    const grid = new Grid();\n    grid.setup(ctx);\n    new GameLoop(grid, ctx).start();\n\n    generate.onclick = function gen() {\n        grid.generate = !grid.generate;\n    }\n\n    reset.onclick = function res() {\n        grid.reset();\n    }\n\n});\n\n\n\n\n\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Player {\n    constructor(w, grid) {\n        this.i = 0;\n        this.j = 0;\n        this.w = w;\n        this.grid = grid;\n        \n        this.keyUp = false;\n        this.keyRight = false;\n        this.keyDown = false;\n        this.keyLeft = false;\n        \n        this.canMove = false;\n\n        this.next = null;\n    }\n      \n    show(ctx) {\n        let i = this.i * this.w;\n        let j = this.j * this.w;\n        ctx.fillStyle = this.getRandomColor();\n        ctx.fillRect(i + 5, j + 5, this.w - 10, this.w - 10);\n    };\n\n    getRandomColor() {\n        let letters = \"0123456789ABCDEF\";\n        let color = \"#\";\n        for (let i = 0; i < 6; i++) {\n            color += letters[Math.floor(Math.random() * 16)];\n        }\n        return color;\n    }\n      \n    movement(ctx) {\n        if (this.canMove) {\n            this._movement(ctx);\n        }\n        if (this.grid.stack && this.grid.stack.length) {\n            this.canMove = false;\n        } else {\n            if (!this.keyUp && !this.keyRight && !this.keyDown && !this.keyLeft) {\n                this.canMove = true;\n            }\n        }\n    }\n    _movement(ctx) {\n        let cols = Math.floor(ctx.canvas.width / this.w);\n        let current = this.grid[this.index(this.i, this.j, cols)]\n        let walls = {\n            TOP: current.walls[\"TOP\"],\n            RIGHT: current.walls[\"RIGHT\"],\n            BOTTOM: current.walls[\"BOTTOM\"],\n            LEFT: current.walls[\"LEFT\"]\n        };\n        if (this.keyUp) {\n            this.canMove = false;\n            this.next = this.grid[this.index(this.i, this.j - 1, cols)]; //next is the cell above player\n            if (this.next && !walls[\"TOP\"]) {\n                this.i = this.next.i;\n                this.j = this.next.j;\n            }\n        } else if (this.keyRight && !walls[\"RIGHT\"]) {\n            this.next = this.grid[this.index(this.i + 1, this.j, cols)]; //this.next is the cell above player\n            this.canMove = false;\n            if (this.next) {\n                this.i = this.next.i;\n                this.j = this.next.j;\n            }\n        } else if (this.keyDown && !walls[\"BOTTOM\"]) {\n            this.next = this.grid[this.index(this.i, this.j + 1, cols)]; //this.next is the cell above player\n            this.canMove = false;\n            if (this.next) {\n                this.i = this.next.i;\n                this.j = this.next.j;\n            }\n        } else if (this.keyLeft && !walls[\"LEFT\"]) {\n            this.next = this.grid[this.index(this.i - 1, this.j, cols)]; //this.next is the cell above player\n            this.canMove = false;\n            if (this.next) {\n                this.i = this.next.i;\n                this.j = this.next.j;\n            }\n        }\n    }\n\n    index(i, j, numOfColumns) {\n        if (i < 0 || j < 0 || i > numOfColumns - 1 || j > numOfColumns - 1) {\n            return -1; //return undefined\n        }\n        return i + j * numOfColumns\n    }\n\n}\n\nmodule.exports = Player;\n\n//# sourceURL=webpack:///./src/player.js?");

/***/ })

/******/ });