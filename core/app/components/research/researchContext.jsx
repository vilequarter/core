import { createContext, useContext, useReducer } from 'react';

export const ResearchContext = createContext(null);
export const ResearchDispatchContext = createContext(null);

export function ResearchProvider({children}) {
    /* Unlock Breakpoints
        essence == 300
    */
    /* Effects
        maxActions +1
        multiplier to max essence (essence spiral)
    */
    /*
        {
            id: ,
            name: "",
            essenceCost: ,
            essencePaid: 0,
            flavorText: "",
            effectDescription: "",
            effect: function(action){

            },
            unlock: function(player, resources, research){

            },
            unlocked: false,
            complete: false,
            active: false
        },
    */
    const initialResearch = [
        {
            id: 0,
            name: "Influence Awareness",
            essenceCost: 15,
            essencePaid: 0,
            flavorText: "There's so much dirt around you, but it seems like you can only reach a very small amount. You try to \"push\" a little further to get at some more...",
            effectDescription: "Unlocks Influence Expansion",
            effect: function(action){
                console.log(this.name);
                action.playerDispatch({
                    type: 'unlockInfluence'
                })
            },
            unlock: function(player, resources, research){
                return (player.essence >= 10 && research[4].complete);
            },
            unlocked: false,
            complete: false,
            active: false
        },
        {
            id: 1,
            name: "Tastes Pretty Good",
            essenceCost: 50,
            essencePaid: 0,
            flavorText: "You've started to think of consuming dirt as \"eating\" it. This shift in perspective makes it more enjoyable!",
            effectDescription: "Dirt consumption rate +1 m³/second",
            effect: function(action){
                console.log(this.name);
                action.resourcesDispatch({
                    id: 0,
                    type: 'editResourceRate',
                    value: .1
                })
            },
            unlock: function(player, resources, research){
                return(resources[0].consumed >= 50);
            },
            unlocked: false,
            complete: false,
            active: false
        },
        {
            id: 2,
            name: "But Why is the Dirt Gone?",
            essenceCost: 15,
            essencePaid: 0,
            flavorText: "You've consumed every bit of dirt you can reach, but there's a whole lot more out there!",
            effectDescription: "Base Influence expansion rate +1m³ per second",
            effect: function(action){
                console.log(this.name);
                action.playerDispatch({
                    type: 'adjustExpandRateBase',
                    value: .1
                })
            },
            unlock: function(player, resources, research){
                return(research[6].complete && resources[0].getAvailable(player) == 0);
            },
            unlocked: false,
            complete: false,
            active: false
        },
        {
            id: 3,
            name: "Meta-Research",
            essenceCost: 75,
            essencePaid: 0,
            flavorText: "You're a rock that can think. That's weird to think about.",
            effectDescription: "Base Research rate +1/second",
            effect: function(action){
                console.log(this.name);
                action.playerDispatch({
                    type: 'adjustResearchRateMultiplier',
                    value: 1
                })
            },
            unlock: function(player, resources, research){
                return(research[1].complete);
            },
            unlocked: false,
            complete: false,
            active: false
        },
        {
            id: 4,
            name: "Essence...?",
            essenceCost: 10,
            essencePaid: 0,
            flavorText: "Most properties of essence are commonly known, but you doubt many could describe its \"taste\".",
            effectDescription: "Increase Dirt essence value by 1 per m³",
            effect: function(action){
                console.log(this.name);
                action.resourcesDispatch({
                    id: 0,
                    type: 'editResourceValue',
                    value: 1
                })
            },
            unlock: function(player, resources, research){
                return(resources[0].consumed >= 5);
            },
            unlocked: false,
            complete: false,
            active: false
        },
        {
            id: 5,
            name: "Dirt's Nice and All...",
            essenceCost: 500,
            essencePaid: 0,
            flavorText: "You've had to eat around these tiny hard things for a while, but now you feel like you should be able to break them down too.",
            effectDescription: "Unlock Pebbles",
            effect: function(action){
                console.log(this.name);
                action.resourcesDispatch({
                    id: 1,
                    type: 'unlockResource'
                })
            },
            unlock: function(player, resources, research){
                return(resources[0].consumed >= 1000);
            },
            unlocked: false,
            complete: false,
            active: false
        },
        {
            id: 6,
            name: "Controlled Expansion",
            essenceCost: 10,
            essencePaid: 0,
            flavorText: "You got a little too excited to start expanding, so you were using more essence than you needed to. This should help you be more efficient!",
            effectDescription: "Influence expansion essence cost -50%",
            effect: function(action){
                console.log(this.name);
                action.playerDispatch({
                    type: 'adjustExpandCostMultiplier',
                    value: 1
                })
            },
            unlock: function(player, resources, research){
                return (player.influenceVolume >= 70);
            },
            unlocked: false,
            complete: false,
            active: false
        },
        {
            id: 7,
            name: "Too Full",
            essenceCost: 100,
            essencePaid: 0,
            flavorText: "Try as you might, you can't fit any more essence in your core. Maybe there's a way to store it elsewhere?",
            effectDescription: "Unlock Essence Cores",
            effect: function(action){
                console.log(this.name);
                action.constructsDispatch({
                    type: 'unlockConstruct',
                    id: 0
                })
            },
            unlock: function(player, resources, research){
                return(player.essence >= 100);
            },
            unlocked: false,
            complete: false,
            active: false
        },
        {
            id: 8,
            name: "Forced Expansion",
            essenceCost: 50,
            essencePaid: 0,
            flavorText: "You're getting the hang of pushing out your will, and you think you can do it faster now.",
            effectDescription: "Influence expansion rate x2",
            effect: function(action){
                console.log(this.name);
                console.log("ForcedExpansion");
                action.playerDispatch({
                    type: 'adjustExpandRateMultiplier',
                    value: 1
                })
            },
            unlock: function(player, resources, research){
                return (player.influenceVolume >= 200)
            },
            unlocked: false,
            complete: false,
            active: false
        },
        {
            id: 9,
            name: "Expanded Mind",
            essenceCost: 150,
            essencePaid: 0,
            flavorText: "It's hard to judge distance as a rock, but you think you're now able to reach 5 meters out in every direction now! You feel motivated by this milestone!",
            effectDescription: "Research rate x2",
            effect: function(action){
                console.log(this.name);
                action.playerDispatch({
                    type: 'adjustResearchRateMultiplier',
                    value: 1
                })
            },
            unlock: function(player, resources, research){
                return(player.getInfluenceRadius() >= 5)
            },
            unlocked: false,
            complete: false,
            active: false
        },
    ]

    const [research, dispatch] = useReducer(
        researchReducer,
        initialResearch
    );

    return (
        <ResearchContext.Provider value={research}>
            <ResearchDispatchContext.Provider value={dispatch}>
                {children}
            </ResearchDispatchContext.Provider>
        </ResearchContext.Provider>
    );
}

export function useResearch(){
    return useContext(ResearchContext);
}

export function useResearchDispatch(){
    return useContext(ResearchDispatchContext);
}

function researchReducer(research, action){
    const nextResearch = research.map(r => {
        if(r.id != action.id){
            return r;
        } else {
            switch(action.type){
                case 'payEssence':{
                    return {
                        ...r,
                        essencePaid: r.essencePaid + action.value
                    }
                }
                case 'completeResearch':{
                    r.effect(action);
                    return {
                        ...r,
                        complete: true,
                        active: false
                    }
                }
                case 'unlockResearch':{
                    return{
                        ...r,
                        unlocked: true
                    }
                }
                case 'activateResearch':{
                    return{
                        ...r,
                        active: true
                    }
                }
                case 'deactivateResearch':{
                    return{
                        ...r,
                        active: false
                    }
                }
                default: {
                    throw Error("Unknown action: " + action.type);
                }
            }
        }
    })
    return nextResearch;
}