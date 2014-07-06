function newWorld(width, height) {
    var ret = {
        width: width,
        height: height,
        
        entities: [],
        
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
        }
    };
    
    ret.entities.push(newCircleEntity(this, 50, 50, 10));
    addMotion.call(ret.entities[0]);
    addGravity.call(ret.entities[0], {dx: 0, dy:0.001});
    
    return ret;
}