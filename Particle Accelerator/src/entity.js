/**
 * Creates a basic entity with a position and an empty list of behaviors
 * @param {number} x - The horrizontal coordinate
 * @param {number} y - The vertical coordinate
 */
function newEntity(world, x, y) {
    var ret = {
        world: world,
        position: {x:x, y:y},
        
        behaviors: [],
        
        update: function(deltaTime) {
            for(var i = 0; i<this.behaviors.length; i++) {
                var behavior = this.behaviors[i];
                if(behavior.condition.call(this)) {
                    for(var j = 0; j<behavior.actions.length; j++) {
                        behavior.actions[j].call(this, deltaTime);
                    }
                }
            }
        }
    }
    world.entities.push(ret);
    return ret;
}

/**
 * Creates an new rectangular entity with the specified x, y, width, and height
 * @param {number} x - The horrizontal coordinate (entity origin top left)
 * @param {number} y - The vertical coordinate (entity origin top left)
 * @param {number} w - The width of the rectangle
 * @param {number} h - The height of the rectangle
 */
function newRectEntity(world, x, y, w, h) {
    var ret = newEntity(world, x, y);
    
    ret.w = w;
    ret.h = h;
        
    ret.render = function(ctx) {
        ctx.fillStyle = this.color || 'black';
        ctx.fillRect(x, y, w, h)
    }
    Object.defineProperties(ret, {
        'leftmost': {get: function(){return this.x}},
        'rightmost': {get: function(){return this.x+this.w}},
        'topmost': {get: function(){return this.y}},
        'bottommost': {get: function(){return this.y+this.h}}});
    return ret;
}

/**
 * Creates an new circlular entity with the specified x, y, and radius
 * @param {number} x - The horrizontal coordinate (entity origin center)
 * @param {number} y - The vertical coordinate (entity origin center)
 * @param {number} r - The circle radius
 */
function newCircleEntity(world, x, y, r) {
    var ret = newEntity(world, x, y);
      
    ret.radius = r;
        
    ret.render = function(ctx) {
        ctx.fillStyle = this.color || 'black';
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    };
    Object.defineProperties(ret, {
        'leftmost': {get: function(){return this.x-this.radius}},
        'rightmost': {get: function(){return this.x+this.radius}},
        'topmost': {get: function(){return this.y-this.radius}},
        'bottommost': {get: function(){return this.y+this.radius}}
    });
    return ret;
}

//BEHAVIORS
function addMotion() {
    this.velocity = {dx: 0, dy: 0};
    function updatePosition(deltaTime) {
        this.position.x += this.velocity.dx*deltaTime;
        this.position.y += this.velocity.dy*deltaTime;
    }
    
    this.behaviors.push({condition: always, actions: [updatePosition]});
    return this;
}

function addGravity(velocity) {
    function updateVelocity(deltaTime) {
        this.velocity.dx += velocity.dx*deltaTime;
        this.velocity.dy += velocity.dy*deltaTime;
    }
    this.behaviors.push({condition: always, actions: [updateVelocity]})
    return this;
}

//CONDITIONS
function always() {
    return true;
}

function collidesWith(condition) {
    return function(condition) {
        for(var i = 0; i < this.world.entities.length; i++) {
            var entity = this.world.entities[i];
            if(condition.call(entity)) return true;
        }
        return false;
    }
}

function offScreen() {
    return this.rightmost < 0 || this.leftmost > WIDTH || this.bottommost < 0 || this.topmost > HEIGHT;
}

//ACTIONS
function destroy() {
    this.world.deleteEntity(this);
}