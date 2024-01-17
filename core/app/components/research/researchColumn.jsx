import { useState } from "react";

import { TabSwitch } from "../tabs";
import { List } from "../list";
import { addAction, removeAction, removeEssence } from "../player/playerFunctions";
import { usePlayer, usePlayerDispatch } from "../player/playerContext";
import { useResearch, useResearchDispatch } from "./researchContext";
import { useResources } from "../resources/resourcesContext";
import { round } from "../functions";

export function ResearchColumn({messageHandler}){
    const [activeIndex, setActiveIndex] = useState(0);

    const research = useResearch();
    const researchDispatch = useResearchDispatch();
    const player = usePlayer();
    const playerDispatch = usePlayerDispatch();

    let availableItems = [];
    let completedItems = [];

    const toggleResearch = (id) => {
        if(research[id].active){
            removeAction(playerDispatch);
            researchDispatch({id: id, type: 'deactivateResearch'});
        } else if(!addAction(player, playerDispatch)){
            messageHandler("Not enough available actions, cancel an activity first", "errorMessage");
        } else {
            researchDispatch({id: id, type: 'activateResearch'});
        }
    }

    research.forEach((r) =>{
        if(r.complete){
            completedItems.push({
                title: r.name,
                text: r.flavorText,
                effect: r.effectDescription,
                handler: () => null
            })
        }
        else if(r.unlocked){
            availableItems.push({
                title: r.name,
                text: r.flavorText,
                effect: r.effectDescription,
                cost: round(r.essencePaid) + " / " + r.essenceCost + " essence",
                handler: () => toggleResearch(r.id),
                className: r.active ? "buttonActive" : "",
                progress: r.essencePaid > 0 ? (100 * (r.essencePaid / r.essenceCost)) : 0
            })
        }
    })

    function toAvailable(){
        setActiveIndex(0);
    }

    function toCompleted(){
        setActiveIndex(1);
    }

    return(
        <div className="column">
            <h3>Research</h3>
            <TabSwitch tabs={[
                {id: 0, title: "Available", handler: () => toAvailable()},
                {id: 1, title: "Completed", handler: () => toCompleted()}]}
                isActive={activeIndex}/>
            
                <List items={availableItems} isActive={activeIndex === 0}/>
                <List items={completedItems} isActive={activeIndex === 1}/>
        </div>
    )
}

