import { List } from "../list"
import { usePlayer, usePlayerDispatch } from "../player/playerContext";
import { addAction, removeAction, removeEssence } from "../player/playerFunctions";
import { useResources } from "../resources/resourcesContext";
import { useConstructs, useConstructsDispatch } from "./constructsContext";

export function ConstructsColumn({messageHandler}){
    const constructs = useConstructs();
    const constructsDispatch = useConstructsDispatch();
    const player = usePlayer();
    const playerDispatch = usePlayerDispatch();
    const resources = useResources();

    const toggleConstruct = (id) => {
        if(!constructs[id].paid){
            if(softlockCheck(player, resources, constructs[id].cost)){
                messageHandler("If you pay for this construct you might starve! Expand your influence first!", "errorMessage");
                return;
            }
            if(removeEssence(constructs[id].cost, player, playerDispatch)){
                constructsDispatch({
                    id: id,
                    type: 'payConstruct'
                });
                messageHandler(constructs[id].name + " purchased", "infoMessage");
            } else {
                messageHandler("Not enough essence to pay for " + constructs[id].name, "infoMessage");
            }
        }
        if(constructs[id].paid){
            if(constructs[id].active){
                removeAction(playerDispatch);
                constructsDispatch({
                    id: id,
                    type: 'stopConstruct'
                })
            } else if(addAction(player, playerDispatch)) {
                constructsDispatch({
                    id: id,
                    type: 'startConstruct'
                })
            } else messageHandler("Not enough available actions, cancel an activity first", "errorMessage")
        }
    }

    function softlockCheck(player, resources, cost){
        const expandCost = player.getExpandCost();
        var softlockRisk = false;
        resources.every(r => {
            if(r.unlocked && r.getAvailable(player) <= 0){
                softlockRisk = true;
                return false;
            }
            return true;
        })
        if(softlockRisk && ((player.essence - cost) <= (10 * expandCost))) {
            console.log("risk of softlock");
            return true;
        }
        return false;
    }


    let items = [];

    constructs.forEach((construct) =>{
        if(construct.unlocked){
            items.push({
                title: construct.name + (construct.owned > 0 ? " (" + construct.owned + ")" : ""),
                text: construct.description,
                effect: construct.effectDescription,
                cost: "Cost: " + construct.cost() + " essence",
                flavorText: "Build progress: " + (construct.paid ? (construct.progress + " / 100") : "Not Bought"),
                handler: () => toggleConstruct(construct.id),
                progress: construct.progress,
                className: construct.active ? "buttonActive" : ""
            })
        }
    })

    return(
        <div className="column">
            <div style={{position: "relative"}}>
                <h3>Constructs</h3>
                <List items={items}/>
            </div>
        </div>
    )
}