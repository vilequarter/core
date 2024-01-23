import { createContext, useContext, useReducer } from "react";

import { round } from "../functions";

export const ResourcesContext = createContext(null);
export const ResourcesDispatchContext = createContext(null);

export function ResourcesProvider({ children }) {
    const initialResources = [
        {
            id: 0, 
            name: "Dirt", 
            type: "volume",
            flavorText: "Bland but filling",
            ratio: .4, //multiplied by influence to get total amount
            value: 1.5, //per m^3
            rate: .1, //volume per tick
            unlocked: true,
            consumed: 0,
            progress: 0,
            active: false,
            getAvailable: function(player){return round((this.ratio * player.influenceVolume) - this.consumed, 1)}
        },
        {
            id: 1, 
            name: "Pebbles",
            type: "discrete",
            flavorText: "Look up \"Luna Crunching\". That's you now",
            ratio: 10000,
            value: .01,
            rate: (10/5),
            unlocked: false,
            consumed: 0,
            progress: 0,
            active: false,
            getAvailable: function(player){return Math.floor((this.ratio * player.influenceVolume) - this.consumed)}
        },
        {
            id: 2, 
            name: "Rocks",
            type: "discrete",
            flavorText: "Large pebbles, or small boulders, take your pick",
            ratio: 5,
            value: 1,
            rate: (10/15),
            unlocked: false,
            consumed: 0,
            progress: 0,
            active: false,
            getAvailable: function(player){return Math.floor((this.ratio * player.influenceVolume) - this.consumed)}
        },
        {
            id: 3, 
            name: "Boulders",
            type: "discrete",
            flavorText: "There's a lot of nice ones in swamps",
            ratio: (1/10000),
            value: 100,
            rate: (10/60),
            unlocked: false,
            consumed: 0,
            progress: 0,
            active: false,
            getAvailable: function(player){return Math.floor((this.ratio * player.influenceVolume) - this.consumed)}
        },
        {
            id: 4, 
            name: "Stone",
            type: "volume",
            flavorText: "Like really, really hard dirt",
            ratio: (1/100),
            value: 10,
            rate: (1/100),
            unlocked: false,
            consumed: 0,
            progress: 0,
            active: false,
            getAvailable: function(player){return round((this.ratio * player.influenceVolume) - this.consumed, 1)}
        },
        {
            id: 5, 
            name: "Grass",
            type: "volume",
            flavorText: "Includes weird stuff like \"vitamins\" and \"nutrients\"",
            ratio: (1/1000),
            value: 1,
            rate: 1,
            unlocked: false,
            consumed: 0,
            progress: 0,
            active: false,
            getAvailable: function(player){return round((this.ratio * player.influenceVolume) - this.consumed, 1)}
        },
        {
            id: 6,
            name: "Shrubs",
            type: "discrete",
            flavorText: "Also called \"green, feathery boulders\"",
            ratio: (1/30),
            value: 10,
            rate: (10/10),
            unlocked: false,
            consumed: 0,
            progress: 0,
            active: false,
            getAvailable: function(player){return Math.floor((this.ratio * player.influenceVolume) - this.consumed)}
        },
        {
            id: 7, 
            name: "Trees",
            type: "discrete",
            flavorText: "Giant's Broccoli",
            ratio: (1/50),
            value: 100,
            rate: (10/30),
            unlocked: false,
            consumed: 0,
            progress: 0,
            active: false,
            getAvailable: function(player){return Math.floor((this.ratio * player.influenceVolume) - this.consumed)}
        },
        {
            id: 8, 
            name: "Insects",
            type: "discrete",
            flavorText: "Honestly, you prefer dirt",
            ratio: 100000,
            value: .00001,
            rate: (10/.01),
            unlocked: false,
            consumed: 0,
            progress: 0,
            active: false,
            getAvailable: function(player){return Math.floor((this.ratio * player.influenceVolume) - this.consumed)}
        },
        {
            id: 9, 
            name: "Small Animals",
            type: "discrete",
            flavorText: "Apex predator",
            ratio: (1/25),
            value: 100,
            rate: (10/15),
            unlocked: false,
            consumed: 0,
            progress: 0,
            active: false,
            getAvailable: function(player){return Math.floor((this.ratio * player.influenceVolume) - this.consumed)}
        }
    ]


    const [resources, dispatch] = useReducer(
        resourcesReducer,
        initialResources
    );

    return (
        <ResourcesContext.Provider value={resources}>
            <ResourcesDispatchContext.Provider value={dispatch}>
                {children}
            </ResourcesDispatchContext.Provider>
        </ResourcesContext.Provider>
    );
}

export function useResources(){
    return useContext(ResourcesContext);
}

export function useResourcesDispatch(){
    return useContext(ResourcesDispatchContext);
}


// data validation done in external functions
function resourcesReducer(resources, action){
    if(action.type == 'updateAll'){
        return action.resources;
    }else{
        const nextResources = resources.map(resource => {
            if(resource.id != action.id){
                return resource;
            } else {
                switch(action.type){
                    case 'consumeResource':{
                        return {
                            ...resource,
                            consumed: resource.consumed + action.value
                        }
                    }
                    case 'unlockResource':{
                        return{
                            ...resource,
                            unlocked: true
                        }
                    }
                    case 'activateResource':{
                        return{
                            ...resource,
                            active: true
                        }
                    }
                    case 'deactivateResource':{
                        return{
                            ...resource,
                            active: false
                        }
                    }
                    case 'editResourceValue':{
                        return{
                            ...resource,
                            value: resource.value + action.value
                        }
                    }
                    case 'editResourceRate':{
                        return{
                            ...resource,
                            rate: resource.rate + action.value
                        }
                    }
                    case 'updateProgress':{
                        return{
                            ...resource,
                            progress: action.value
                        }
                    }
                    default: {
                        throw Error("Unknown action: " + action.type);
                    }
                }
            }
        })
        return nextResources;
    }

}