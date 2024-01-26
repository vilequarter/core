import { removeAction } from "../player/playerFunctions";
import { addEssence } from "../player/playerFunctions";


//active resource loop
export function consumeActiveResources(resources, resourcesDispatch, player, playerDispatch, constructs, messageHandler, expanding){
    resources.map(resource => {
        var toConsume = 0;
        var available = resource.getAvailable(player);
        if(resource.active){
            if(resource.type == "discrete"){
                consumeDiscrete(resource.id, resources, resourcesDispatch, player, playerDispatch, constructs, messageHandler);
                return;
            }
            else{
                //essence is full, turn off active resources
                if((player.essence == player.getMaxEssence(constructs)) || nearFullCheck(player, resource, constructs, expanding)){
                    resourcesDispatch({
                        type: 'deactivateResource',
                        id: resource.id
                    });
                    removeAction(playerDispatch);
                    messageHandler("Your essence is full, turned off consumption of " + resource.name, "errorMessage");
                    return;
                } else {
                    if(available < resource.rate){
                        toConsume = available;
                        resourcesDispatch({
                            type: 'deactivateResource',
                            id: resource.id
                        });
                        messageHandler("You've run out of " + resource.name, "infoMessage")
                        removeAction(playerDispatch);
                    } else {
                        toConsume = resource.rate;
                    }
                }
            }
        }
        //handle auto-consume
        if(resource.autoConstructId > -1){
            if(player.essence == player.getMaxEssence(constructs)) return;
            var toAutoConsume = constructs[resource.autoConstructId].owned * constructs[resource.autoConstructId].effectValue;
            if((available - toConsume) < toAutoConsume){
                toAutoConsume = (available - toConsume);
            }
            toConsume += toAutoConsume;
        }
        resourcesDispatch({
            type: 'consumeResource',
            id: resource.id,
            value: toConsume
        })
        var essenceToAdd = toConsume * resource.value;
        addEssence(essenceToAdd, player, playerDispatch, constructs);
    })
}

function nearFullCheck(player, resource, constructs, expanding){
    if(expanding && player.essence + (resource.rate * resource.value) >= player.getMaxEssence(constructs)){
        return true;
    }
    return false;
}


function consumeDiscrete(id, resources, resourcesDispatch, player, playerDispatch, constructs, messageHandler){
    var progress = resources[id].progress;

    if(progress + resources[id].rate >= 100){
        if(!addEssence(resources[id].value, player, playerDispatch, constructs)){
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