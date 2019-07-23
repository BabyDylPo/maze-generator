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

eval("class Cell {\n    constructor(i, j, w) {\n        this.i = i;\n        this.j = j;\n        this.w = w;\n        this.walls = {\n            TOP: true, \n            RIGHT: true, \n            BOTTOM: true, \n            LEFT: true\n        };\n        \n        this.visited = false;\n    }\n\n    \n\n    show(ctx) {\n        let x = this.i * this.w;\n        let y = this.j * this.w;\n        \n        if (this.visited) {\n            // walls of maze color\n            ctx.strokeStyle = this.getRandomColor(); \n            // path of maze color\n            ctx.fillStyle = \"#FFFFFF\";\n        } else {\n            ctx.strokeStyle = this.getRandomColor();\n            ctx.fillStyle = \"#000000\";\n        }\n    \n        ctx.fillRect(x, y, this.w, this.w);\n        ctx.beginPath();\n        ///////////////  TOP  /////////////////////\n        if (this.walls[\"TOP\"]) {\n            ctx.moveTo(x, y);\n            ctx.lineTo(x + this.w, y);\n        };\n        //////////////  RIGHT  ///////////////////\n        if (this.walls[\"RIGHT\"]) {\n            ctx.moveTo(x + this.w, y);\n            ctx.lineTo(x + this.w, y + this.w);\n        }\n        //////////////  BOTTOM  //////////////////\n        if (this.walls[\"BOTTOM\"]) {\n            ctx.moveTo(x + this.w, y + this.w);\n            ctx.lineTo(x, y + this.w);\n        }\n        ///////////////  LEFT  ///////////////////\n        if (this.walls[\"LEFT\"]) {\n            ctx.moveTo(x, y + this.w);\n            ctx.lineTo(x, y);\n        }\n        //////////////////////////////////////////\n        ctx.stroke();\n    };\n\n    getRandomColor() {\n        let letters = \"0123456789ABCDEF\";\n        let color = \"#\";\n        for (let i = 0; i < 6; i++) {\n            color += letters[Math.floor(Math.random() * 16)];\n        }\n        return color;\n    }\n\n    checkNeighbors(grid, numOfColumns) {\n        let neighbors = [];\n        let top = grid[this.index(this.i, this.j - 1, numOfColumns)];\n        let right = grid[this.index(this.i + 1, this.j, numOfColumns)];\n        let bottom = grid[this.index(this.i, this.j + 1, numOfColumns)];\n        let left = grid[this.index(this.i - 1, this.j, numOfColumns)];\n\n        \n        if (top && !top.visited) {\n            neighbors.push(top);\n        }\n        if (right && !right.visited) {\n            neighbors.push(right);\n        }\n        if (bottom && !bottom.visited) {\n            neighbors.push(bottom);\n        }\n        if (left && !left.visited) {\n            neighbors.push(left);\n        }\n\n        if (neighbors.length > 0) {\n            let rng = Math.floor(Math.random() * neighbors.length);\n            return neighbors[rng];\n        } else {\n            return undefined;\n        }\n    }\n\n    index(i, j, numOfColumns) {\n        if(i < 0 || j < 0 || i > numOfColumns - 1 || j > numOfColumns - 1) {\n            return -1; //return undefined\n        }\n        return i + j * numOfColumns\n    }\n}\n\nmodule.exports = Cell;\n\n//# sourceURL=webpack:///./src/cell.js?");

/***/ }),

/***/ "./src/game_loop.js":
/*!**************************!*\
  !*** ./src/game_loop.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class GameLoop {\n    constructor(grid, ctx) {\n        this.grid = grid;\n        this.ctx = ctx;\n    }\n\n    start() {\n        this.lastTime = 0;\n        //start the animation\n        requestAnimationFrame(this.animate.bind(this));\n    }\n\n    animate(time) {\n        const timeDelta = time - this.lastTime;\n\n        // this.grid.step(timeDelta);\n        this.grid.draw(this.ctx);\n        this.lastTime = time;\n\n        requestAnimationFrame(this.animate.bind(this));\n    }\n\n}\nmodule.exports = GameLoop;\n\n//# sourceURL=webpack:///./src/game_loop.js?");

/***/ }),

/***/ "./src/grid.js":
/*!*********************!*\
  !*** ./src/grid.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Cell = __webpack_require__(/*! ./cell */ \"./src/cell.js\");\n\n\nclass Grid {\n    constructor(){\n        this.cols = 0;\n        this.rows = 0;\n        this.w = 40; // size of the cell\n        this.grid = [];\n        this.drawCoolDown = 0;\n        this.drawCoolDownDefault = 7;  // generation speed\n        this.current = null;\n        this.next = null;\n\n        this.stack = [];\n\n        this.generate = false;\n    }\n\n    highlight(ctx) {\n        if (this.stack.length > 0) {\n            if (this.generate) {let x = this.current.i * this.w;\n                let y = this.current.j * this.w;\n                if (this.generate) {\n                    ctx.fillStyle = this.getRandomColor();\n                } else {\n                    ctx.fillStyle = \"#000000\";\n\n                }\n                ctx.fillRect(x, y, this.w, this.w);\n            }\n        } \n    }\n\n    reset() {\n        this.generate = false;\n        for (let i =0; i < this.grid.length; i++) {\n            this.grid[i].visited = false;\n            this.grid[i].walls[\"TOP\"] = true;\n            this.grid[i].walls[\"RIGHT\"] = true;\n            this.grid[i].walls[\"BOTTOM\"] = true;\n            this.grid[i].walls[\"LEFT\"] = true;\n        }\n        this.stack = [];\n        this.current = this.grid[Math.floor(this.grid.length / 2)];\n    }\n\n    setup(ctx) {\n        this.cols = Math.floor(ctx.canvas.width / this.w);\n        this.rows = Math.floor(ctx.canvas.height / this.w);\n        for (let j = 0; j < this.rows; j++) {\n            for (let i = 0; i < this.cols; i++) {\n                let cell = new Cell(i, j, this.w);\n                this.grid.push(cell);\n            }\n        }\n\n        this.current = this.grid[Math.floor(this.grid.length / 2)];\n    };\n\n    draw(ctx) {\n        if(this.drawCoolDown === 0) {\n            ctx.clearRect(0, 0, ctx.width, ctx.height);\n            // ctx.fillStyle = this.getRandomColor();\n            ctx.fillStyle = \"#000000\";\n            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);\n            for (let i = 0; i < this.grid.length; i++) {\n                this.grid[i].show(ctx);\n            }\n            if (this.generate) {\n                this.generateMaze();\n            }\n            this.highlight(ctx);\n            this.drawCoolDown = this.drawCoolDownDefault;\n        }\n        this.drawCoolDown--;\n    };\n\n    generateMaze() {\n        // STEP 2.1.1 of recursive backtracker algorithm\n        this.current.visited = true;\n        this.next = this.current.checkNeighbors(this.grid, this.cols);\n        \n        if (this.next) {\n            this.next.visited = true;\n            // STEP 2.1.2 of recursive backtraker algorithm\n            this.stack.push(this.current);\n            // STEP 2.1.3 of recursive backtracker algorithm\n            if (this.current && this.next) {\n                this.removeWalls(this.current, this.next);\n            }\n            \n            // STEP 2.1.4 of recursive backtracker algorithm\n            this.current = this.next;\n        } else if (this.stack.length > 0) {\n            this.current = this.stack.pop();;\n        }\n    }\n\n    removeWalls(current, next) {\n        let x = current.i - next.i;\n        let y = current.j - next.j;\n        if (x === 1) {\n            current.walls[\"LEFT\"] = false;\n            next.walls[\"RIGHT\"] = false;\n        } else if (x === -1) {\n            current.walls[\"RIGHT\"] = false;\n            next.walls[\"LEFT\"] = false;\n        } else if (y === 1) {\n            current.walls[\"TOP\"] = false;\n            next.walls[\"BOTTOM\"] = false;\n        } else if (y === -1) {\n            current.walls[\"BOTTOM\"] = false;\n            next.walls[\"TOP\"] = false;\n        } else {\n            console.log(\"error with removing walls\")\n        }\n\n    }\n\n    getRandomColor() {\n        let letters = \"0123456789ABCDEF\";\n        let color = \"#\";\n        for (let i = 0; i < 6; i++) {\n            color += letters[Math.floor(Math.random() * 16)];\n        }\n        return color;\n    }\n\n\n}\n\nmodule.exports = Grid;\n\n\n\n\n//# sourceURL=webpack:///./src/grid.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("console.log(\"webpack is working\");\nconst Grid = __webpack_require__(/*! ./grid */ \"./src/grid.js\");\nconst GameLoop = __webpack_require__(/*! ./game_loop */ \"./src/game_loop.js\");\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n    const canvas = document.getElementById(\"canvas\");\n    const generate = document.getElementById(\"generate\");\n    const reset = document.getElementById(\"reset\");\n    \n    canvas.width = 600;\n    canvas.height = 600;\n    // canvas.style.zIndex = 1;\n\n    const ctx = canvas.getContext(\"2d\");\n    const grid = new Grid();\n    grid.setup(ctx);\n    new GameLoop(grid, ctx).start();\n\n    generate.onclick = function gen() {\n        grid.generate = !grid.generate;\n    }\n\n    reset.onclick = function res() {\n        grid.reset();\n    }\n});\n\n\n\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });