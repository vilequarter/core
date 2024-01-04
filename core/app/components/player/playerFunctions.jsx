export function addEssence(value, player, dispatch){
    if(player.essence == player.getMaxEssence()){
        //TODO: throw warning message
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

export function addAction(player, dispatch){
    if(player.activeActions == player.maxActions){
        //TODO: throw warning message
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