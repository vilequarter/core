import { createContext, useContext, useReducer } from 'react';

export const ResearchContext = createContext(null);
export const ResearchDispatchContext = createContext(null);

export function ResearchProvider({children}) {
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
        }
    */
    const initialResearch = [
        {
            id: 0,
            name: "Influence Awareness",
            essenceCost: 25,
            essencePaid: 0,
            flavorText: "There's so much dirt around you, but it seems like you can only reach a very small amount. You try to \"push\" a little further to get at some more...",
            effectDescription: "Unlocks Influence Expansion",
            effect: function(action){
                action.playerDispatch({
                    type: 'unlockInfluence'
                })
            },
            unlock: function(player, resources, research){
                return (player.essence >= 10);
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
            effectDescription: "Dirt consumption rate +100%",
            effect: function(action){

            },
            unlock: function(player, resources, research){

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
            effectDescription: "Influence expansion rate +100%",
            effect: function(action){

            },
            unlock: function(player, resources, research){

            },
            unlocked: false,
            complete: false,
            active: false
        },
        {
            id: 3,
            name: "Meta-Research",
            essenceCost: 200,
            essencePaid: 0,
            flavorText: "You're a rock that can think. You never thought about that before.",
            effectDescription: "Research rate +50%",
            effect: function(action){

            },
            unlock: function(player, resources, research){

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
            effectDescription: "Dirt essence value +50%",
            effect: function(action){

            },
            unlock: function(player, resources, research){

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

            },
            unlock: function(player, resources, research){

            },
            unlocked: false,
            complete: false,
            active: false
        },
        {
            id: 6,
            name: "Controlled Expansion",
            essenceCost: 5,
            essencePaid: 0,
            flavorText: "You got a little too excited to start expanding, so you were using more essence than you needed to. This should help you be more efficient!",
            effectDescription: "Influence expansion essence cost -50%",
            effect: function(action){

            },
            unlock: function(player, resources, research){

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

            },
            unlock: function(player, resources, research){

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