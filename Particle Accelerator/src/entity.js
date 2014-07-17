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
                if(typeof behavior.condition === 'undefined' || behavior.condition.call(this)) {
                    for(var j = 0; j<behavior.actions.length; j++) {
                        behavior.actions[j].call(this, deltaTime);
                    }
                }
            }
        }
    }
    world.addEntity(ret)
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
        'leftmost': {get: function(){return this.position.x}},
        'rightmost': {get: function(){return this.position.x+this.w}},
        'topmost': {get: function(){return this.position.y}},
        'bottommost': {get: function(){return this.position.y+this.h}}});
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
        'leftmost': {get: function(){return this.position.x-this.radius}},
        'rightmost': {get: function(){return this.position.x+this.radius}},
        'topmost': {get: function(){return this.position.y-this.radius}},
        'bottommost': {get: function(){return this.position.y+this.radius}}
    });
    return ret;
}

function newTurretEntity(world, x, y) {
    var ret = newCircleEntity(world, x, y, 15);
    ret.cannon = newCannon([{direction: -Math.PI/12, template:{radius: 7, hue: 210, speed: 1}}, {direction: Math.PI/12, template:{radius: 7, hue: 210, speed: 1}}, {direction: 0, template:{radius: 7, hue: 240, speed: 1}}]);
    ret.cooldown = 0;
    ret.cooltime = 1000;
    ret.behaviors.push({condition: function(){return mouse.down && this.cooldown <= 0},
                        actions: [function(){this.cannon.fire(this.world, this.position.x, this.position.y, getDirection(this.position.x, this.position.y, mouse.x, mouse.y) )},
                                  function(){this.cooldown = this.cooltime;}] });
    ret.behaviors.push({actions: [function(deltaTime){this.cooldown = Math.max(this.cooldown-deltaTime, 0)}, function(){var lightness = Math.floor(this.cooldown*256/this.cooltime);this.color = 'rgb('+lightness+', ' +lightness+', '+lightness+')'}] } );
    return ret;
}

function newCannon(bullets) {
    var ret = {
        bullets: bullets,
        fire: function(world, x, y, dir){
            for(var i = 0; i < this.bullets.length; i++) {
                newBulletEntity(world, x, y, dir + this.bullets[i].direction, this.bullets[i].template);
            }
        }
    };
    return ret;
}

function newBulletEntity(world, x, y, dir, template) {
    var ret = newCircleEntity(world, x, y, template.radius);
    addMotion(ret);
    addOffScreenDeath(ret);
    ret.color = 'hsl('+template.hue+', 70%, 50%)';
    ret.velocity.xSpeed = 1;
    ret.velocity.ySpeed = 1;
    ret.velocity.direction = dir;
    ret.velocity.speed = template.speed;
    return ret;
}

//BEHAVIORS
function addMotion(entity) {
    entity.velocity = {xSpeed: 0, ySpeed: 0};
    function updatePosition(deltaTime) {
        entity.position.x += entity.velocity.xSpeed*deltaTime;
        entity.position.y += entity.velocity.ySpeed*deltaTime;
    }
    Object.defineProperties(entity.velocity, {
        'direction': {get: function(){return Math.atan2(this.xSpeed, this.ySpeed)},
                      set: function(newDir){var oldSpeed = this.speed; this.xSpeed = oldSpeed*Math.cos(newDir); this.ySpeed = oldSpeed*Math.sin(newDir)},
                      enumerable: true},
        'speed': {get: function(){return Math.sqrt(Math.pow(this.xSpeed, 2) + Math.pow(this.ySpeed, 2))},
                  set: function(newSpeed){var oldSpeed = this.speed; this.xSpeed*=newSpeed/oldSpeed; this.ySpeed*=newSpeed/oldSpeed},
                  enumerable: true}
    });
    entity.behaviors.push({condition: always, actions: [updatePosition]});
}

function addGravity(entity, velocity) {
    function updateVelocity(deltaTime) {
        entity.velocity.xSpeed += velocity.xSpeed*deltaTime;
        entity.velocity.ySpeed += velocity.ySpeed*deltaTime;
    }
    entity.behaviors.push({condition: always, actions: [updateVelocity]})
}

function addOffScreenDeath(entity) {
    entity.behaviors.push({condition: offScreen, actions: [destroy]});
    entity.behaviors.push({actions: [function(){console.log(entity.rightmost)}] })
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
    console.log('bleh');
    this.world.destroyEntity(this);
}


//utility
function getDirection(x1, y1, x2, y2) {
    return Math.atan2(y2-y1,x2-x1);
}