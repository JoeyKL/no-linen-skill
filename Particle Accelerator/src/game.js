var canvas = doccument.getElementById('canvas');
var ctx = canvas.getContext('2d');

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

var currentState = newWorldState(WIDTH, HEIGHT);

function main() {
    init();
    
    var done = false;
    var then = Date.time();
    var now = 0;
    
    while(!done) {
        now = Date.time();
        
        update(now - then);
        render(ctx);
        then = now;

    }
}

function init() {
    
}

function update(deltaTime) {
    currentState.update(deltaTime);
}

function render(ctx) {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    currentState.render(ctx);
}

main();
