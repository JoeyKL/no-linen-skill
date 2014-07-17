function newWorldState(width, height) {
    var worldState = {
        world: newWorld(width, height),
        
        update: function(deltaTime) {
            this.world.update(deltaTime);
        },
        
        render: function(ctx) {
            this.world.render(ctx);
        }
    };
    
    return worldState;
}



function newMenuState(buttons) {
    var menuState = {
        buttons: buttons,
        
        update: function(deltaTime) {
        },
        
        render: function(ctx) {
        }
    };
    
    return menuState;
}
