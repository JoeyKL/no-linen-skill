/**
 * Creates an new rectangular entity with the specified x, y, width, and height
 * @param {number} x - The horrizontal coordinate (entity origin top left)
 * @param {number} y - The vertical coordinate (entity origin top left)
 * @param {number} w - The width of the rectangle
 * @param {number} h - The height of the rectangle
 */
function newRectEntity(x, y, w, h) {
    return {
        x: x,
        y: y,
        w: w,
        h: h,
        
        render: function(ctx) {
            ctx.fillStyle = this.color || 'black';

            ctx.fillRect(x, y, w, h)
        }
    }
}

/**
 * Creates an new circlular entity with the specified x, y, and radius
 * @param {number} x - The horrizontal coordinate (entity origin center)
 * @param {number} y - The vertical coordinate (entity origin center)
 * @param {number} r - The circle radius
 */
function newCircleEntity(x, y, r) {
    return {
        position: {x: x, y: y},
        velocity: {dx: 0, dy: 0},
        
        radius: r,
        
        render: function(ctx) {
            ctx.fillStyle = this.color || 'black';
            
            ctx.beginPath();
            ctx.moveTo(this.position.x, this.position.y);
            ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        },
        
        update: function(deltaTime) {
            this.velocity.dy += 0.001;
            updatePosition.call(this, deltaTime);
            if(this.position.x<0) this.position.x += WIDTH;
            if(this.position.x>=WIDTH) this.position.x -= WIDTH;
            if(this.position.y<0) this.position.x += HEIGHT;
            if(this.position.y>=HEIGHT) this.position.x -= HEIGHT;
        }
    };
}

function updatePosition(deltaTime) {
    this.position.x += this.velocity.dx*deltaTime;
    this.position.y += this.velocity.dy*deltaTime;
}