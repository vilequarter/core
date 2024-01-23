import { removeAction } from "../player/playerFunctions";
import { addEssence } from "../player/playerFunctions";

//active resource loop
export function consumeActiveResources(resources, resourcesDispatch, player, playerDispatch, messageHandler){
    resources.map(resource => {
        if(!resource.active){
            return;
        }
        if(resource.type == "discrete"){
            consumeDiscrete(resource.id, resources, resourcesDispatch, player, playerDispatch, messageHandler);
        }
        else{
            var essenceToAdd = consumeVolume(resource.id, resources, resourcesDispatch, player, playerDispatch, messageHandler);
            if(!addEssence(essenceToAdd, player, playerDispatch)){
                resourcesDispatch({
                    type: 'deactivateResource',
                    id: resource.id
                });
                removeAction(playerDispatch);
                messageHandler("Your essence is full, turned off consumption of " + resource.name, "errorMessage");
            }
        }
    })
}

function consumeVolume(id, resources, resourcesDispatch, player, playerDispatch, messageHandler){
    var consume = resources[id].rate;
    if(resources[id].getAvailable(player) < consume){
        consume = resources[id].getAvailable(player);
        resourcesDispatch({
            type: 'deactivateResource',
            id: id
        });
        messageHandler("You've run out of " + resources[id].name, "infoMessage")
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

function consumeDiscrete(id, resources, resourcesDispatch, player, playerDispatch, messageHandler){
    var progress = resources[id].progress;

    if(progress + resources[id].rate >= 100){
        if(!addEssence(resources[id].value, player, playerDispatch)){
            messageHandler("Your essence is full, consuming " + resources[id].name + " will waste essence, increase your capacity or spend some essence", "errorMessage");
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

//called on game load to update resources
export function updateAllResources(loaded, resources, resourcesDispatch){
    const nextResources = resources.map(resource => {
        return {
            ...resource,
            consumed: loaded.consumed[resource.id],
            progress: loaded.discreteProgress[resource.id]
        }
    })
    resourcesDispatch({
        type: 'updateAll',
        resources: nextResources
    })
}