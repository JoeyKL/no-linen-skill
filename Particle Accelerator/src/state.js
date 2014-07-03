function newWorldState(width, height) {
    return {
        world: newWorld(width, height),
        
        update: function(deltaTime) {
            this.world.update(deltaTime);
        },
        
        render: function(ctx) {
            this.world.render(ctx);
        }
    }
}

function newMenuState() {
    return {
        buttons: [],
        
        update: function(deltaTime) {
            //menu stuff goes here
        },
        
        render: function(ctx) {
            //menu stuff goes here
        }
    }
}