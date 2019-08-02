const Grid = require("./grid");
const GameLoop = require("./game_loop");



document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("canvas");
    const generate = document.getElementById("generate");
    const reset = document.getElementById("reset");
    
    canvas.width = 600;
    canvas.height = 600;
    // canvas.style.zIndex = 1;

    const ctx = canvas.getContext("2d");
    const grid = new Grid();
    grid.setup(ctx);
    new GameLoop(grid, ctx).start();

    generate.onclick = function gen() {
        grid.generate = !grid.generate;
    }

    reset.onclick = function res() {
        grid.reset();
    }

});






