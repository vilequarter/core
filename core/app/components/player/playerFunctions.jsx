//attempts to add essence to storage, returns false if storage is full, adjusts value if it is more than available storage
export function addEssence(value, player, dispatch){
    if(player.essence == player.getMaxEssence()){
        return false;
    }

    let actualValue = (
        player.essence + value < player.getMaxEssence() ? 
            value : 
            (player.getMaxEssence() - player.essence)
    );

    dispatch({
        type: 'addEssence',
        value: actualValue
    });
    return true;
}

//attempts to remove essence (to pay for something, etc), returns false if the amount of essence available is less than the cost
export function removeEssence(value, player, dispatch){
    if(player.essence < value){
        return false;
    }

    dispatch({
        type: 'removeEssence',
        value: value
    });
    return true;
}

//attempts to add an active action, returns false if there are no available actions
export function addAction(player, dispatch){
    if(player.activeActions == player.maxActions){
        return false;
    }

    dispatch({
        type: 'addAction'
    });
    return true;
}

export function removeAction(dispatch){
    dispatch({
        type: 'removeAction'
    });
}

export function addContemplation(value, dispatch){
    dispatch({
        type: 'addContemplation',
        value: value
    });
}

//attempts to remove contemplation (to pay for increased game speed), returns false if there is no contemplation,
//adjusts value if the cost is more than the available contemplation
export function removeContemplation(value, player, dispatch){
    if(player.contemplation == 0){
        return false;
    }
    let actualValue = (player.contemplation < value ? player.contemplation : value);
    dispatch({
        type: 'removeContemplation',
        value: actualValue
    });
    return true;
}

//called on game load to update player object with loaded values
export function updateAllPlayer(loaded, dispatch){
    dispatch({
        type: 'updateAll',
        contemplation: loaded.contemplation,
        essence: loaded.essence,
        influence: loaded.influence
    })
}