import { List } from "../list";
import { logarithmic } from "../functions";
import { round } from "../functions";
import { usePlayer, usePlayerDispatch} from "../player/playerContext";
import { useResources, useResourcesDispatch } from "./resourcesContext";
import { Button } from "../button";

import { addAction, removeAction } from "../player/playerFunctions";

export function ResourcesColumn({speed, speedHandler, messageHandler}){
    const player = usePlayer();
    const playerDispatch = usePlayerDispatch();
    const resources = useResources();
    const resourcesDispatch = useResourcesDispatch();

    function toggleResource(id){
        if(!resources[id].active){
            if(resources[id].getAvailable(player) == 0) {
                messageHandler("You're out of " + resources[id].name + ", expand your influence further", "infoMessage");
                return;
            }
            if(!addAction(player, playerDispatch)) {
                messageHandler("Not enough available actions, cancel an activity first", "errorMessage");
                return;
            }
            resourcesDispatch({
                type: 'activateResource',
                id: id
            })
        }
        else{
            removeAction(playerDispatch);
            resourcesDispatch({
                type: 'deactivateResource',
                id: id
            })
        }
    }

    let items = [];

    resources.forEach(resource =>{
        if(resource.unlocked){
            items.push({
                title: resource.name,
                text: "Available: " + resource.getAvailable(player) + (resource.type == "volume" ? " m³" : ""),
                cost: "Value: " + resource.value + " essence " + (resource.type == "volume" ? "per m³" : "each"),
                handler: () => toggleResource(resource.id),
                className: (resource.active ? "buttonActive" : ""),
                progress: resource.progress
            })
        }
    })

    return(
        <div className="column">
            <div style={{position: "relative"}}>
                <h3>Resources</h3>
                <b>Essence: </b>{round(player.essence)}
                <br></br>
                <progress value={logarithmic(player.essence, player.getMaxEssence())}></progress>
                <br></br>
                <b>Actions: </b>{player.activeActions} / {player.maxActions}<br></br>
                <b>Contemplation: </b>{player.contemplation}<br></br>
                <b>Game Speed: </b>
                <Button
                    content = {<div>x2</div>}
                    handler = {() => speed != 2 ? speedHandler(2) : speedHandler(1)}
                    className = {speed == 2 ? "buttonActive" : ""}
                />
                <Button
                    content = {<div>x5</div>}
                    handler = {() => speed != 5 ? speedHandler(5) : speedHandler(1)}
                    className = {speed == 5 ? "buttonActive" : ""}
                />
                <Button
                    content = {<div>x10</div>}
                    handler = {() => speed != 10 ? speedHandler(10) : speedHandler(1)}
                    className = {speed == 10 ? "buttonActive" : ""}
                />
                <List items={items}/>
            </div>
        </div>
    )
}