import { removeAction } from "../player/playerFunctions";
import { addEssence } from "../player/playerFunctions";

export function consumeVolume(id, resources, resourcesDispatch, player, playerDispatch){
    var consume = resources[id].rate;
    if(resources[id].getAvailable(player) < consume){
        consume = resources[id].getAvailable(player);
        resourcesDispatch({
            type: 'deactivateResource',
            id: id
        });
        removeAction(playerDispatch);
    }
    var essence = resources[id].value * consume;
    resourcesDispatch({
        type: 'consumeResource',
        id: id,
        value: consume
    });
    return(essence);
}

export function consumeDiscrete(id, resources, resourcesDispatch, player, playerDispatch){
    var progress = resources[id].progress;

    if(progress + resources[id].rate >= 100){
        if(!addEssence(resources[id].value, player, playerDispatch)){
            //TODO: throw warning message
        } else {
            progress = 0;
            resourcesDispatch({
                type: 'consumeResource',
                id: id,
                value: 1
            });
        }
        resourcesDispatch({
            type: 'deactivateResource',
            id: id,
        });
        removeAction(playerDispatch);
    } else {
        progress += resources[id].rate;
    }
    resourcesDispatch({
        type: 'updateProgress',
        id: id,
        value: progress
    })
}