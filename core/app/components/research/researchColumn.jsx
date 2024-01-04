import { useState } from "react";

import { research } from "./research";
import { TabSwitch } from "../tabs";
import { List } from "../list";

export function ResearchColumn(){
    const [activeIndex, setActiveIndex] = useState(0);

    let availableItems = [];
    let completedItems = [];

    research.forEach((research) =>{
        if(research.complete){
            completedItems.push({
                title: research.name,
                text: research.flavorText,
                effect: research.effectDescription,
                handler: () => null
            })
        }
        else if(research.unlocked){
            availableItems.push({
                title: research.name,
                text: research.flavorText,
                effect: research.effectDescription,
                cost: research.essencePaid + " / " + research.essenceCost + " essence",
                handler: () => null
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