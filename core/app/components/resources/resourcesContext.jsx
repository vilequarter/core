import { createContext, useContext, useReducer } from "react";

import { round } from "../functions";

export const ResourcesContext = createContext(null);
export const ResourcesDispatchContext = createContext(null);

export function ResourcesProvider({ children }) {
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

//  action
//      type
//      id
//      value?
// data validation done in external functions
function resourcesReducer(resources, action){
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

const initialResources = [
    {
        id: 0, 
        name: "Dirt", 
        type: "volume",
        ratio: .4, //multiplied by influence to get total amount
        value: 1, //per m^3
        rate: (1/10), //default 1/second
        unlocked: true,
        consumed: 0,
        active: false,
        getAvailable: function(player){return round((this.ratio * player.influenceVolume) - this.consumed)}
    },
    {
        id: 1, 
        name: "Pebbles",
        type: "discrete",
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
        ratio: (1/100),
        value: 10,
        rate: (1/100),
        unlocked: false,
        consumed: 0,
        active: false,
        getAvailable: function(player){return round((this.ratio * player.influenceVolume) - this.consumed)}
    },
    {
        id: 5, 
        name: "Grass",
        type: "volume",
        ratio: (1/1000),
        value: 1,
        rate: 1,
        unlocked: false,
        consumed: 0,
        active: false,
        getAvailable: function(player){return round((this.ratio * player.influenceVolume) - this.consumed)}
    },
    {
        id: 6,
        name: "Shrubs",
        type: "discrete",
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