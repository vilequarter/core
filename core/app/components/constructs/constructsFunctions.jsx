import { removeAction } from "../player/playerFunctions";

export function doConstructs(playerDispatch, constructs, constructsDispatch, messageHandler){
    constructs.map(construct => {
        if(construct.active){
            if(construct.progress >= 100){
                removeAction(playerDispatch);
                constructsDispatch({
                    type: 'finishConstruct',
                    id: construct.id,
                    playerDispatch: playerDispatch
                })
                messageHandler(construct.name + " complete", "infoMessage");
                return;
            }
            constructsDispatch({
                id: construct.id,
                type: 'buildConstruct'
            })
        }
    })
}

export function updateAllConstructs(loaded, constructs, constructsDispatch){
    /*
    const newConstructs = constructs.map(construct => {
        return ({
            ...construct,
            owned: loaded.constructs[construct.id].owned,
            unlocked: loaded.constructs[construct.id].unlocked,
            paid: loaded.constructs[construct.id].paid,
            progress: loaded.constructs[construct.id].progress
        })
    })
    */
    constructsDispatch({
        type: 'updateAll',
        constructs: loaded.constructs
    })
}