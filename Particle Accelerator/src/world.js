function newWorld(width, height) {
    var ret = {
        width: width,
        height: height,
        
        entities: [newCircleEntity(50, 50, 10)],
        
        update: function(deltaTime) {
            for(var i = 0; i < this.entities.length; i++) {
                var entity = this.entities[i];
                if(typeof entity.update === 'function') {
                    entity.update(deltaTime);
                }
            }
        },
        
        render: function(ctx) {
            for(var i = 0; i < this.entities.length; i++) {
                var entity = this.entities[i];
                if(typeof entity.render === 'function') {
                    entity.render(ctx);
                }
            }
        }
    };
    return ret;
}