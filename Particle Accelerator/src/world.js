function newWorld(width, height) {
    var ret = {
        width: width,
        height: height,
        
        entities: [],
        behaviors: [],
        
        update: function(deltaTime) {
            for(var i = 0; i < this.entities.length; i++) {
                var entity = this.entities[i];
                if(entity && typeof entity.update === 'function') {
                    entity.update(deltaTime);
                }
            }
        },
        
        render: function(ctx) {
            for(var i = 0; i < this.entities.length; i++) {
                var entity = this.entities[i];
                if(entity && typeof entity.render === 'function') {
                    entity.render(ctx);
                }
            }
        },
    };
    
    ret.entities.push(newTurretEntity(ret, WIDTH/2, HEIGHT/2));
    
    return ret;
}