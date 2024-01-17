import { removeAction, removeEssence } from "../player/playerFunctions";

export function doResearch(research, researchDispatch, player, playerDispatch, resources, resourcesDispatch, messageHandler){
    research.map(r => {
        if(r.active){
            if(r.essencePaid >= r.essenceCost){
                researchDispatch({id: r.id, type: 'completeResearch', playerDispatch: playerDispatch, resourcesDispatch: resourcesDispatch});
                removeAction(playerDispatch);
                messageHandler("Research " + r.name + " complete!", "infoMessage");
                return;
            }
            if(softlockCheck(player, resources)){
                researchDispatch({id: r.id, type: 'deactivateResearch'});
                messageHandler("You're almost out of essence and have no resources! Expand your influence or you'll starve!", "errorMessage");
                removeAction(playerDispatch);
                return;
            }
            const essenceRemaining = r.essenceCost - r.essencePaid;
            const rate = player.getResearchRate();
            const essenceToPay = rate < essenceRemaining ? rate : essenceRemaining;
            if(removeEssence(essenceToPay, player, playerDispatch)){
                researchDispatch({id: r.id, type: 'payEssence', value: essenceToPay})
            } else {
                researchDispatch({id: r.id, type: 'deactivateResearch'});
                removeAction(playerDispatch);
                messageHandler("Not enough essence, " + r.name + " cancelled", "infoMessage");
            }
        }
        if(!r.unlocked && r.unlock(player, resources, research)){
            researchDispatch({id: r.id, type: 'unlockResearch'});
        }
    })
}

//returns true if there's a risk of becoming softlocked
function softlockCheck(player, resources){
    const expandCost = player.getExpandCost();
    const researchCost = player.getResearchRate();
    if((player.essence - researchCost) <= expandCost){
        var available = true;
        resources.map(r => {
            if(r.getAvailable(player) > 0){
                available = false;
            }
        })
        return available;
    }
    return false;
}