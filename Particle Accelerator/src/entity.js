/**
 * Creates an new rectangular entity with the specified x, y, width, and height
 * @param {number} x - The horrizontal coordinate (entity origin top left)
 * @param {number} y - The vertical coordinate (entity origin top left)
 * @param {number} w - The width of the rectangle
 * @param {number} h - The height of the rectangle
 */
function newRectEntity(x, y, w, h) {
    var ret = {
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
    var ret = {
        x: x,
        y: y,
        r: r,
        
        render: function(ctx) {
            ctx.fillStyle = this.color || 'black';
            
            ctx.beginPath();
            ctx.moveTo(x,y);
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
    }
}