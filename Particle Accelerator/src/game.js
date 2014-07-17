var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext('2d');

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

var currentState = newWorldState(WIDTH, HEIGHT);

var done = false;

var then = Date.now();
var now = Date.now();

var mouse = {x: 0, y:0, down: false};

Array.prototype.remove = function(old) {
    this.forEach(function(element, index){if(element==old){this.splice(index, 1)}}, this);
}

function main() {
    init();
    mainLoop();
}

function init() {
    addEventListener("mousemove", function(e){mouse.x=e.pageX;mouse.y=e.pageY;}, false);
    addEventListener("mousedown", function(e){mouse.down = true;}, false);
    addEventListener("mouseup", function(e){mouse.down = false;}, false);
}

function mainLoop() {
    now = Date.now();
    
    update(now - then);
    render(ctx);
    then = now;

    if(!done) setTimeout(mainLoop, 10);
}

function update(deltaTime) {
    currentState.update(deltaTime);
}

function render(ctx) {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    currentState.render(ctx);
}

main();
