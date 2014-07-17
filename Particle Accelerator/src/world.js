function newWorld(width, height) {
    var ret = {
        width: width,
        height: height,
        
        entities: [],
        newEntities: [],
        oldEntities: [],
        behaviors: [],
        
        update: function(deltaTime) {
            for(var i = 0; i < this.entities.length; i++) {
                var entity = this.entities[i];
                if(entity && typeof entity.update === 'function') {
                    entity.update(deltaTime);
                }
            }
            
            this.newEntities.forEach(function(entity){this.entities.push(entity)}, this);
            this.oldEntities.forEach(function(entity){this.entities.remove(entity)}, this);
            this.newEntities = [];
            this.oldEntities = [];
        },
        
        render: function(ctx) {
            for(var i = 0; i < this.entities.length; i++) {
                var entity = this.entities[i];
                if(entity && typeof entity.render === 'function') {
                    entity.render(ctx);
                }
            }
        }, 
        
        addEntity: function(newEntity) {
            this.newEntities.push(newEntity);
        }, 
        
        destroyEntity: function(oldEntity) {
            this.oldEntities.push(oldEntity);
        }
    };
    
    ret.addEntity(newTurretEntity(ret, width/2, height/2));
    
    return ret;
}