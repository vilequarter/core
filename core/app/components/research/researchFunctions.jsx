import { removeAction, removeEssence } from "../player/playerFunctions";

export function doResearch(research, researchDispatch, player, playerDispatch, resources, resourcesDispatch, constructsDispatch, messageHandler){
    research.map(r => {
        if(r.active){
            if(r.essencePaid >= r.essenceCost){
                researchDispatch({id: r.id, type: 'completeResearch', playerDispatch: playerDispatch, resourcesDispatch: resourcesDispatch, constructsDispatch: constructsDispatch});
                removeAction(playerDispatch);
                messageHandler("Research \"" + r.name + "\" complete!", "infoMessage");
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
                researchDispatch({id: r.id, type: 'payEssence', value: essenceToPay});
            } else {
                researchDispatch({id: r.id, type: 'deactivateResearch'});
                removeAction(playerDispatch);
                messageHandler("Not enough essence, \"" + r.name + "\" cancelled", "infoMessage");
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
    var softlockRisk = false;
    resources.every(r => {
        if(r.unlocked && r.getAvailable(player) <= 0){
            softlockRisk = true;
            return false;
        }
        return true;
    })
    if(softlockRisk && ((player.essence - researchCost) <= (10 * expandCost))) {
        console.log("risk of softlock");
        return true;
    }
    return false;
}

export function updateAllResearch(loaded, researchDispatch, playerDispatch, resourcesDispatch, constructsDispatch){
    const complete = [...loaded.researchCompleted];
    complete.forEach(r => {
        researchDispatch({
            id: r,
            type: 'completeResearch',
            playerDispatch: playerDispatch,
            resourcesDispatch: resourcesDispatch,
            constructsDispatch: constructsDispatch
        })
    });
    const unlocked = [...loaded.researchUnlocked];
    unlocked.forEach(r => {
        researchDispatch({
            id: r,
            type: 'unlockResearch'
        })
    })
    const progress = [...loaded.researchProgress];
    progress.forEach(r => {
        researchDispatch({
            type: 'payEssence',
            value: r.value,
            id: r.id
        })
    })
}