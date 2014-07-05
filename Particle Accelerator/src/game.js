var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext('2d');

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

var currentState = newWorldState(WIDTH, HEIGHT);

var done = false;

var then = Date.now();
var now = Date.now();

function main() {
    init();
    mainLoop();
}

function init() {
    
}

function mainLoop() {
    now = Date.now();
        
    update(now - then);
    render(ctx);
    then = now;

    if(!done) setTimeout(mainLoop, 1);
}

function update(deltaTime) {
    currentState.update(deltaTime);
}

function render(ctx) {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    currentState.render(ctx);
}

main();
